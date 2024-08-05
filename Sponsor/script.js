const PAGE_SIZE = 15;
let currentPage = 1;
let sponsorsData = [];

// Function to toggle form visibility
function toggleAddForm() {
    const blur = document.getElementById('blur');
    const popup = document.getElementById('popup');
    blur.classList.toggle('active');
    popup.classList.toggle('active');
}

// Fetch sponsors from the API
async function fetchAndDisplaySponsors() {
    const apiURL = "http://164.92.244.59:3000/dashboard/sponsors/get?page=1&limit=1000";
    try {
        const response = await fetch(apiURL, {
            method: 'GET',
            headers: {
                'Authorization': 'MSP eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmExNWMyNGE5NDE0NjNiNmQ5MTEwZjQiLCJpYXQiOjE3MjI4OTMwOTgsImV4cCI6MTcyMjk1Nzg5OH0.rS0tB47Xamfrs3MnBuTk9X5La2NPuISxPJKqq7-SdEc',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Network response was not ok ' + response.statusText);

        const data = await response.json();
        if (data.results && Array.isArray(data.results)) {
            sponsorsData = data.results;
            displaySponsors();
        } else {
            console.error('Expected an array in the "results" key but received:', data);
        }
    } catch (error) {
        console.error('Error fetching sponsors:', error);
    }
}

// Display sponsor cards with pagination
function displaySponsors() {
    const sponsorCardsContainer = document.getElementById('sponsorCards');
    sponsorCardsContainer.innerHTML = '';

    addNewCard();

    const start = (currentPage - 1) * PAGE_SIZE;
    const sponsorsToDisplay = sponsorsData.slice(start, start + PAGE_SIZE);

    sponsorsToDisplay.forEach(sponsor => {
        const sponsorCard = document.createElement('div');
        sponsorCard.className = 'card1';

        const imageDiv = document.createElement('div');
        imageDiv.className = 'image';

        const img = document.createElement('img');
        img.src = `http://164.92.244.59:3000/${sponsor.image.slice(27)}`;
        img.alt = 'Sponsor image';

        imageDiv.appendChild(img);
        sponsorCard.appendChild(imageDiv);
        sponsorCardsContainer.appendChild(sponsorCard);
    });

    document.getElementById('previousteam').style.display = currentPage > 1 ? 'block' : 'none';
    document.getElementById('nextteam').style.display = (currentPage * PAGE_SIZE) < sponsorsData.length ? 'block' : 'none';
}

// Add New card
function addNewCard() {
    const sponsorCardsContainer = document.getElementById('sponsorCards');

    const addCard = document.createElement('div');
    addCard.className = 'card-add';
    addCard.id = 'searchButton';
    addCard.addEventListener('click', toggleAddForm);

    const plusIcon = document.createElement('i');
    plusIcon.id = 'magnifying-glass';
    plusIcon.className = 'fa-solid fa-plus';
    plusIcon.style.color = '#080808';

    const addText = document.createElement('h5');
    addText.textContent = 'Add New Sponsor';

    addCard.appendChild(plusIcon);
    addCard.appendChild(addText);

    sponsorCardsContainer.appendChild(addCard);
}

// Handle form submission
document.getElementById('addSponsorForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const imageUpload = document.getElementById('image-upload').files[0];

    if (imageUpload) {
        const formData = new FormData();
        formData.append('image', imageUpload);

        try {
            const response = await fetch('http://164.92.244.59:3000/dashboard/sponsors/add', {
                method: 'POST',
                headers: {
                    'Authorization': 'MSP eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmExNWMyNGE5NDE0NjNiNmQ5MTEwZjQiLCJpYXQiOjE3MjI4OTMwOTgsImV4cCI6MTcyMjk1Nzg5OH0.rS0tB47Xamfrs3MnBuTk9X5La2NPuISxPJKqq7-SdEc',
                },
                body: formData
            });

            const data = await response.json();
            console.log("Sponsor added:", data);
            toggleAddForm(); // Hide the form after adding
            fetchAndDisplaySponsors(); // Refresh the sponsor list
        } catch (error) {
            console.error('Error adding sponsor:', error);
        }
    } else {
        alert("Please upload an image.");
    }
});

document.getElementById('closePopup').addEventListener('click', toggleAddForm);

document.getElementById('previousteam').addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--;
        displaySponsors();
    }
});

document.getElementById('nextteam').addEventListener('click', function () {
    if (currentPage * PAGE_SIZE < sponsorsData.length) {
        currentPage++;
        displaySponsors();
    }
});

document.addEventListener("DOMContentLoaded", fetchAndDisplaySponsors);
