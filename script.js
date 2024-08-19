const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('psw');
form.addEventListener('submit', function (e) {
    e.preventDefault()
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "email": email.value,
        "password": password.value
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://164.92.244.59:3000/admin/login", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if (result != "Wrong Email Or Password...") {
                alert("Login successful!"); 
                window.location.href = "Team/index.html";
                localStorage.setItem("expecto Patronum", `MSP ${result["token"]}`);
            }
            else {
                email.style.cssText += "border-color:red;";
                password.style.cssText += "border-color:red;";
            }
            // console.log(result);
        })
        .catch((error) => console.error(error));
})