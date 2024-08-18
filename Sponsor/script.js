const PAGE_SIZE = 15;
let currentPage = 1;
let sponsorsData = [];

function toggleAddForm() {
    const blur = document.getElementById('blur');
    const popup = document.getElementById('popup');
    blur.classList.toggle('active');
    popup.classList.toggle('active');
}
async function fetchAndDisplaySponsors() {
    const apiURL = "http://164.92.244.59:3000/dashboard/sponsors/get?page=1&limit=1000";
    try {
        const response = await fetch(apiURL, {
            method: 'GET',
            headers: {
                'Authorization': `${localStorage.getItem('expecto Patronum')}`,
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

function displaySponsors() {
    const sponsorCardsContainer = document.querySelector('.cards');
    sponsorCardsContainer.innerHTML = '';

    addNewCard();

    const start = (currentPage - 1) * PAGE_SIZE;
    const sponsorsToDisplay = sponsorsData.slice(start, start + PAGE_SIZE);

    sponsorsToDisplay.forEach(sponsor => {
        const cardHTML = `
            <div class="card1">
                <div class="image">
                    <span class="delete" data-id="${sponsor._id}">delete</span>
                    <img src="${sponsor.image}" alt="sponsor image">
                </div>
            </div>
        `;
        sponsorCardsContainer.insertAdjacentHTML('beforeend', cardHTML);
    });

    document.getElementById('previousteam').style.display = currentPage > 1 ? 'block' : 'none';
    document.getElementById('nextteam').style.display = (currentPage * PAGE_SIZE) < sponsorsData.length ? 'block' : 'none';

    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', deleteSponsor);
    });
}
function addNewCard() {
    const sponsorCardsContainer = document.querySelector('.cards');
    const addCardHTML = `
        <div class="card-add" id="searchButton" onclick="toggleAddForm()">
            <i id="magnifying-glass" class="fa-solid fa-plus" style="color: #080808;"></i>
            <h5>Add New Sponsor</h5>
        </div>
    `;
    sponsorCardsContainer.insertAdjacentHTML('beforeend', addCardHTML);
}
async function deleteSponsor(event) {
    const sponsorId = event.target.getAttribute('data-id');
        try {
            const response = await fetch(`http://164.92.244.59:3000/dashboard/sponsors/delete/${sponsorId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${localStorage.getItem('expecto Patronum')}`,
                }
            });
            if (response.ok) {
                console.log("Sponsor deleted:", sponsorId);
                fetchAndDisplaySponsors();
            } else {
                console.error('Error deleting sponsor:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting sponsor:', error);
        }
}
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
                    'Authorization': `${localStorage.getItem('expecto Patronum')}`,
                },
                body: formData
            });

            const data = await response.json();
            console.log("Sponsor added:", data);
            toggleAddForm();
            fetchAndDisplaySponsors();
        } catch (error) {
            console.error('Error adding sponsor:', error);
        }
    } else {
        alert("Please upload an image.");
    }
});

document.getElementById('closePopup').addEventListener('click', toggleAddForm);

document.getElementById('cancel').addEventListener('click', toggleAddForm);

document.getElementById('previousteam').addEventListener('click', function () {
    if (currentPage > 1) {
        currentPage--;
        displaySponsors();
    }
});

document.getElementById('nextteam').addEventListener('click', function () {
    if ((currentPage * PAGE_SIZE) < sponsorsData.length) {
        currentPage++;
        displaySponsors();
    }
});

document.addEventListener("DOMContentLoaded", fetchAndDisplaySponsors);

function handleFileUploadDisplay(inputElement, textElement) {
    if (inputElement && textElement) {
        inputElement.addEventListener('change', () => {
            const fileName = inputElement.value.split('\\').pop(); // Get the file name
            textElement.innerHTML = `${fileName.length > 21 ? fileName.slice(0, 21) + '...' : fileName}`;
        });
    }
}

// Handle file upload display for Add New Member popup
const btnUpload = document.querySelector("#image-upload");
// btnUpload.style.color = "#7B1D80";
const txtFile = document.querySelector("#txtFile");
txtFile.style.color = "#7B1D80";

handleFileUploadDisplay(btnUpload, txtFile);

