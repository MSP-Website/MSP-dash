// Global variables for pagination
let currentPage = 1;
const limit = 15;
let totalItems = 0; // Global variable to store total number of items

// Toggle Add New Member popup
function toggle() {
    var blur = document.getElementById('blur');
    if (blur) {
        blur.classList.toggle('active');
    }
    var popup = document.getElementById('popup');
    if (popup) {
        popup.classList.toggle('active');
    }
}

// Toggle Edit Member popup
function EditToggle(id) {
    var blur = document.getElementById('blur');
    if (blur) {
        blur.classList.toggle('active');
    }
    var popupp = document.getElementById('popupp');
    if (popupp) {
        popupp.classList.toggle('active');
    }

    const editButton = document.getElementById('addd');
    if (editButton) {
        editButton.setAttribute('data-edit-id', id);
    }
}

// GET API
function getTeam(page = 1) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("expecto Patronum"));

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(`https://api.msp-alazhar.tech/dashboard/teams/get?page=${page}&limit=${limit}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            const teamCardsContainer = document.getElementById('teams-cards');
            if (!teamCardsContainer) {
                console.error('Element with ID "teams-cards" not found');
                return;
            }

            // Update the total number of items
            totalItems = data.totalItems || 0;

            const addNewCardHTML = `
                <div class="card-add" id="searchButton">
                    <i id="magnifying-glass" class="fa-solid fa-plus" style="color: #080808;" onclick="toggle()"></i>
                    <h5>Add New dash</h5>
                </div>
            `;

            // Clear any existing cards except the add new card
            teamCardsContainer.innerHTML = addNewCardHTML;

            data["results"].forEach(member => {
                teamCardsContainer.innerHTML += `
                    <div class="card1" id="card${member._id}">
                        <div class="image">
                            <img src="${member.image}" alt="">
                        </div>
                        <div class="text">
                            <h4>${member.name.length >= 7 ? `${member.name.slice(0, 7)}...` : member.name}</h4>
                            <p>${member.track.length >= 7 ? `${member.track.slice(0, 7)}...` : member.track}</p>
                            <p class="delet" onclick="deleteCard('${member._id}')">Delete</p>
                        </div>
                        <div class="icon" onclick="EditToggle('${member._id}')" style="margin-left=30px">
                            <i class="fa-solid fa-pen" style="color: #000000;"></i>
                            <p style="padding-left:px;" class="edits">Edit Profile</p>
                        </div>
                    </div>
                `;
            });

            // Handle pagination visibility
            handlePagination();
        })
        .catch(error => console.error('Error:', error));
}

// Pagination controls
document.getElementById('nextteam').addEventListener('click', () => {
    currentPage++;
    getTeam(currentPage);
});

document.getElementById('previousteam').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        getTeam(currentPage);
    }
});

// Initial fetch
getTeam(currentPage);

// DELETE API
function deleteCard(cardId) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("expecto Patronum"));

    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(`https://api.msp-alazhar.tech/dashboard/teams/delete/${cardId}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            const cardElement = document.getElementById(`card${cardId}`);
            if (cardElement) {
                cardElement.remove();
            }
            getTeam(currentPage);  // Refresh the team list
        })
        .catch(error => console.error('Error:', error));
}

// POST API (Add new member)
document.getElementById('add').addEventListener('click', function () {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("expecto Patronum"));

    const formdata = new FormData();
    formdata.append("name", document.getElementById('text').value);
    formdata.append("phone", document.getElementById('phone').value);
    formdata.append("track", document.getElementById('track').value);
    formdata.append("linkedin", document.getElementById('link').value);
    formdata.append("facebook", document.getElementById('face').value);
    formdata.append("behanceOrGithub", document.getElementById('git').value);
    formdata.append("linktree", document.getElementById('linktree').value);

    const fileInput = document.getElementById('image-upload');
    if (fileInput.files.length > 0) {
        formdata.append("image", fileInput.files[0]);
    }

    formdata.append("description", document.getElementById('textarea').value);

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
    };

    fetch("https://api.msp-alazhar.tech/dashboard/teams/add", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            getTeam(currentPage);  // Refresh the team list
        })
        .catch(error => console.error('Error:', error));

    toggle();  // Close the popup
});

// PATCH API (Edit member)
document.getElementById('addd').addEventListener('click', function (event) {
    event.preventDefault();

    const id = this.getAttribute('data-edit-id');  // Get the ID of the item to edit
    const myHeaders = new Headers();
    myHeaders.append("Authorization", localStorage.getItem("expecto Patronum"));

    const formData = new FormData();
    formData.append("name", document.getElementById('textt').value);
    formData.append("phone", document.getElementById('phonee').value);
    formData.append("track", document.getElementById('trackk').value);
    formData.append("linkedin", document.getElementById('linkk').value);
    formData.append("facebook", document.getElementById('facee').value);
    formData.append("behanceOrGithub", document.getElementById('gitt').value);
    formData.append("linktree", document.getElementById('linktreee').value);
    formData.append("description", document.getElementById('textareaa').value);

    const fileInput = document.getElementById('image-upload-Edit');
    if (fileInput.files.length > 0) {
        formData.append("image", fileInput.files[0]);
    }

    const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        redirect: 'follow',
        body: formData,
    };

    fetch(`https://api.msp-alazhar.tech/dashboard/teams/edit/${id}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            getTeam(currentPage);  // Refresh the team list
        })
        .catch(error => console.error('Error updating data:', error));

    EditToggle();  // Close the edit popup
});

// Function to handle file upload display
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
const txtFile = document.querySelector("#txtFile");
txtFile.style.color = "#7B1D80";
handleFileUploadDisplay(btnUpload, txtFile);

// Handle file upload display for Edit Member popup
const btnUploadEdit = document.querySelector("#image-upload-Edit");
const txtFileEdit = document.querySelector("#txtFile-Edit");
txtFileEdit.style.color = "#7B1D80";
handleFileUploadDisplay(btnUploadEdit,txtFileEdit);


// Function to handle pagination visibility
function handlePagination() {
    const nextButton = document.getElementById('nextteam');
    const previousButton = document.getElementById('previousteam');
    
    // Calculate total pages
    const totalPages = Math.ceil(totalItems / limit);

    // Show/hide buttons based on current page and total pages
    if (currentPage >= totalPages) {
        nextButton.style.display = 'block'; // Hide next button if on the last page
    } else {
        nextButton.style.display = 'none'; // Show next button if not on the last page
    }

    if (currentPage <= 1) {
        previousButton.style.display = 'none'; // Hide previous button if on the first page
    } else {
        previousButton.style.display = 'block'; // Show previous button if not on the first page
    }
}
