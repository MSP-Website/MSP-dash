const api_url = 'http://164.92.244.59:3000';

let currentPage = 1;
const limit = 15;

// Event Listeners for Pagination
document.getElementById('nextteam').addEventListener('click', () => {
    currentPage++;
    fetchTeams();
});

document.getElementById('previousteam').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchTeams();
    }
});

// Toggle Add Form
function toggle() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popup = document.getElementById('popup');
    popup.classList.toggle('active');
}

// Toggle Edit Form
function EditToggle() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popupp = document.getElementById('popupp');
    popupp.classList.toggle('active');
}

// Fetch and Display Teams
function fetchTeams() {
    const urlWithParams = `${api_url}/dashboard/teamHistory/get?page=${currentPage}&limit=${limit}`;
    fetch(urlWithParams, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('expecto Patronum')}`
        }
    }).then((res) => {
        if (!res.ok) {
            if (res.status === 401) {
                console.error('Unauthorized: Check your token and API endpoint.');
            }
            throw new Error('Network response was not ok');
        }
        return res.json();
    }).then((data) => {
        const teams = data.results;
        renderTeams(teams);
        updatePaginationButtons(teams.length);
    }).catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

// Render Teams
function renderTeams(teams) {
    const teamContainer = document.querySelector('.teamsHistory');
    teamContainer.innerHTML = '';  // Clear previous content

    let addCardHTML = `
        <div class="card-add" id="searchButton" onclick="toggle()">
            <i id="magnifying-glass" class="fa-solid fa-plus" style="color: #080808;"></i>
            <h5>Add New Team</h5>
        </div>
    `;
    teamContainer.innerHTML += addCardHTML;

    // Render each team
    teams.forEach((item) => {
        const cardHTML = `   
            <div class="card1">
                <div class="image">
                    <img src="${item.image}" alt="team image">
                    <div class="text">
                        <p>${item.name.length >= 7 ? `${item.name.slice(0, 7)}...` : item.name}</p>
                        <p class="delet" onclick="deleteTeam('${item._id}')">Delete</p>
                        <div class="icon" onclick="fillEditForm('${item._id}')">
                            <i class="fa-solid fa-pen" style="color: #000000;"></i>
                            <p>Edit Team</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        teamContainer.innerHTML += cardHTML;
    });
}

// Update Pagination Buttons
function updatePaginationButtons(teamCount) {
    document.getElementById('previousteam').style.display = currentPage > 1 ? 'block' : 'none';
    document.getElementById('nextteam').style.display = teamCount === limit ? 'block' : 'none';
}

// Add New Team
function addTeam() {
    const AddedUrl = `${api_url}/dashboard/teamHistory/add`;
    const formData = new FormData();
    formData.append('name', document.getElementById('add-name').value);
    formData.append('description', document.getElementById('add-description').value);
    formData.append('image', document.getElementById('add-image').files[0]);

    fetch(AddedUrl, {
        method: 'POST',
        headers: {
            'Authorization': `${localStorage.getItem('expecto Patronum')}`
        },
        body: formData
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            toggle();  // Close the form
            fetchTeams();  // Refresh teams
        }).catch((error) => console.error('Error:', error));
}

// Fill Edit Form
function fillEditForm(teamId) {
    const fetchTeamUrl = `${api_url}/dashboard/teamHistory/getById/${teamId}`;
    fetch(fetchTeamUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('expecto Patronum')}`
        }
    }).then((res) => res.json())
        .then((data) => {
            const team = data;
            document.getElementById('edit-teamId').value = teamId;
            document.getElementById('edit-name').value = team.name;
            document.getElementById('edit-description').value = team.description;
            EditToggle();
        }).catch((error) => console.error('Error:', error));
}

// Update Team
function updateTeam() {
    const TeamId = document.getElementById('edit-teamId').value;
    const updateUrl = `${api_url}/dashboard/teamHistory/edit/${TeamId}`;
    const formData = new FormData();
    formData.append('name', document.getElementById('edit-name').value);
    formData.append('description', document.getElementById('edit-description').value);

    const imageFile = document.getElementById('edit-image').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }

    fetch(updateUrl, {
        method: 'PATCH',
        headers: {
            'Authorization': `${localStorage.getItem('expecto Patronum')}`
        },
        body: formData
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            EditToggle();
            fetchTeams();  
        }).catch((error) => console.error('Error:', error));
}

// Delete Team
function deleteTeam(teamId) {
    const deleteUrl = `${api_url}/dashboard/teamHistory/delete/${teamId}`;
    fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('expecto Patronum')}`
        }
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            fetchTeams();  // Refresh teams
        }).catch((error) => console.error('Error:', error));
}

// Initial Fetch
document.addEventListener('DOMContentLoaded', () => {
    fetchTeams();  // Initial fetch when the page loads
});
