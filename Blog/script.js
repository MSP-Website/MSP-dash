const api_url = 'https://api.msp-alazhar.tech';

let currentPage = 1;
const limit = 15;

document.getElementById('nextteam').addEventListener('click', () => {
    currentPage++;
    fetchBlogs();
});

document.getElementById('previousteam').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchBlogs();
    }
});

function toggle() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popup = document.getElementById('popup');
    popup.classList.toggle('active');
}

function EditToggle() {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    var popupp = document.getElementById('popupp');
    popupp.classList.toggle('active');
}

function fetchBlogs() {
    const urlWithParams = `${api_url}/dashboard/blogs/get?page=${currentPage}&limit=${limit}`;

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
        const blogs = data.results;
        renderBlogs(blogs);
        updatePaginationButtons(blogs.length);
    }).catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

function renderBlogs(blogs) {
    const blogContainer = document.querySelector('.blogs');
    blogContainer.innerHTML = '';  // Clear previous content

    // Add "Add New Blog" card
    let addCardHTML = `
        <div class="card-add" id="searchButton" onclick="toggle()">
            <i id="magnifying-glass" class="fa-solid fa-plus" style="color: #080808;"></i>
            <h5>Add New Blog</h5>
        </div>
    `;
    blogContainer.innerHTML += addCardHTML;

    // Render each blog
    blogs.forEach((item) => {
        const cardHTML = `   
            <div class="card1">
                <div class="image">
                    <img src="${item.image}" alt="blog image">
                    <div class="text">
                        <p>${item.name.length >= 7 ? `${item.name.slice(0, 7)}...` : item.name}</p>
                        <p>${new Date(item.createdAt).toLocaleDateString()}</p>
                        <p class="delet" onclick="deleteBlog('${item._id}')">Delete</p>
                        <div class="icon" onclick="fillEditForm('${item._id}')">
                            <i class="fa-solid fa-pen" style="color: #000000;"></i>
                            <p>Edit Blog</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        blogContainer.innerHTML += cardHTML;
    });
}

function updatePaginationButtons(blogCount) {
    // Show/Hide Previous Button
    document.getElementById('previousteam').style.display = currentPage > 1 ? 'block' : 'none';

    // Show/Hide Next Button
    document.getElementById('nextteam').style.display = blogCount === limit ? 'block' : 'none';
}

function addBlog() {
    const AddedUrl = `${api_url}/dashboard/blogs/add`;
    const formData = new FormData();
    formData.append('name', document.getElementById('add-name').value);
    formData.append('date', document.getElementById('add-date').value);
    formData.append('instagram', document.getElementById('add-instagram').value);
    formData.append('linkedin', document.getElementById('add-linkedin').value);
    formData.append('facebook', document.getElementById('add-facebook').value);
    formData.append('twitter', document.getElementById('add-twitter').value);
    formData.append('linktree', document.getElementById('add-linktree').value);
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
            fetchBlogs();  // Refresh blogs
        }).catch((error) => console.error('Error:', error));
}

function fillEditForm(blogId) {
    const fetchBlogUrl = `${api_url}/dashboard/blogs/getById/${blogId}`;
    fetch(fetchBlogUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('expecto Patronum')}`
        }
    }).then((res) => res.json())
        .then((data) => {
            const blog = data;
            document.getElementById('edit-name').value = blog.name;
            document.getElementById('edit-date').value = new Date(blog.createdAt).toISOString().split('T')[0];
            document.getElementById('edit-instagram').value = blog.instagram;
            document.getElementById('edit-linkedin').value = blog.linkedin;
            document.getElementById('edit-facebook').value = blog.facebook;
            document.getElementById('edit-twitter').value = blog.twitter;
            document.getElementById('edit-linktree').value = blog.linktree;
            document.getElementById('edit-description').value = blog.description;
            document.getElementById('edit-blogId').value = blogId; // Store blogId in hidden input
            EditToggle();
        }).catch((error) => console.error('Error:', error));
}

function updateBlog() {
    const blogId = document.getElementById('edit-blogId').value; // Get the blogId from the hidden input
    const updateUrl = `${api_url}/dashboard/blogs/edit/${blogId}`;
    const formData = new FormData();
    formData.append('name', document.getElementById('edit-name').value);
    formData.append('date', document.getElementById('edit-date').value);
    formData.append('instagram', document.getElementById('edit-instagram').value);
    formData.append('linkedin', document.getElementById('edit-linkedin').value);
    formData.append('facebook', document.getElementById('edit-facebook').value);
    formData.append('twitter', document.getElementById('edit-twitter').value);
    formData.append('linktree', document.getElementById('edit-linktree').value);
    formData.append('description', document.getElementById('edit-description').value);
    
    // Conditionally append image if it's present
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
            EditToggle();  // Close the edit form
            fetchBlogs();  // Refresh blogs
        }).catch((error) => console.error('Error:', error));
}

function deleteBlog(blogId) {
    const deleteUrl = `${api_url}/dashboard/blogs/delete/${blogId}`;
    fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
            'Authorization': `${localStorage.getItem('expecto Patronum')}`
        }
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            fetchBlogs();  // Refresh blogs after deletion
        }).catch((error) => console.error('Error:', error));
}

// Initial fetch
fetchBlogs();
