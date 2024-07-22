//start nav bar
document.querySelector(".fa-bars").onclick = function () {
    let arrOfNav = []
    for (let i = 0; i < 8; i++) {
        arrOfNav.push(document.querySelector(".container-nav").children[0].children[i])
    }
    arrOfNav.forEach(element => {
        element.classList.add("normalizing");
    });
    document.querySelector(".fa-bars").style.display = "none";
    document.querySelector(".container-nav").children[0].style.height = "100dvh";
}
document.querySelector(".fa-xmark").onclick = function () {
    let arrOfNav = []
    for (let i = 0; i < 8; i++) {
        arrOfNav.push(document.querySelector(".container-nav").children[0].children[i])
    }
    arrOfNav.forEach(element => {
        element.classList.remove("normalizing");
    });
    document.querySelector(".fa-bars").style.display = "block";
    document.querySelector(".container-nav").children[0].style.height = "0dvh";
}
//end nav bar

// start controling website ro make it a single page application
let myItemNavBar = document.querySelectorAll(".item");
let mains = document.querySelectorAll("main")
myItemNavBar.forEach((item) => {
    item.onclick = function () {
        myItemNavBar.forEach((i) => {
            i.classList.remove("active");
        })
        item.classList.add("active");
        //   here is if-condition to check if "Team" item in nav bar clicked to show it's content in first <main>
        if (item == myItemNavBar[0]) {
            mains.forEach((m) => {
                m.style.opacity = 0;
                setTimeout(function () {
                    m.style.display = "none";
                }, 700);
            });
            setTimeout(() => {
                mains[0].style.display = "block";
            }, 800);
            setTimeout(() => {
                mains[0].style.opacity = "1";
            }, 900);
        }
        //check if "Gallery" item in nav bar clicked to show it's content in second <main>
        else if (item == myItemNavBar[1]) {
            mains.forEach((m) => {
                m.style.opacity = 0;
                setTimeout(function () {
                    m.style.display = "none";
                }, 700);
            });
            setTimeout(() => {
                mains[1].style.display = "block";
            }, 800);
            setTimeout(() => {
                mains[1].style.opacity = "1";
            }, 900);
        }
        //check if "Blog" item in nav bar clicked to show it's content in third <main>
        else if (item == myItemNavBar[2]) {
            mains.forEach((m) => {
                m.style.opacity = 0;
                setTimeout(function () {
                    m.style.display = "none";
                }, 700);
            });
            setTimeout(() => {
                mains[2].style.display = "block";
            }, 800);
            setTimeout(() => {
                mains[2].style.opacity = "1";
            }, 900);
        }
        //check if "histor-of-team" item in nav bar clicked to show it's content in fourth <main>
        else if (item == myItemNavBar[3]) {
            mains.forEach((m) => {
                m.style.opacity = 0;
                setTimeout(function () {
                    m.style.display = "none";
                }, 700);
            });
            setTimeout(() => {
                mains[3].style.display = "block";
            }, 800);
            setTimeout(() => {
                mains[3].style.opacity = "1";
            }, 900);
        }
        //check if "our-main-sponsors" item in nav bar clicked to show it's content in fifth <main>
        else if (item == myItemNavBar[4]) {
            mains.forEach((m) => {
                m.style.opacity = 0;
                setTimeout(function () {
                    m.style.display = "none";
                }, 700);
            });
            setTimeout(() => {
                mains[4].style.display = "block";
            }, 800);
            setTimeout(() => {
                mains[4].style.opacity = "1";
            }, 900);
        }
    }
})
// end controling website ro make it a single page application

//Start Attaching Api and Images on "Our Gallery" Page You Will Find The End -> 180 on *VSCODE*
// let arrOfAllGallery = [];
// let arrOfEventsGallery = [];
// let arrOfSessionsGallery = [];
// function apiOurGallery() {
//     let myImageo = document.querySelectorAll(".image");
//     //Attaching Api for Images on Gallery on *All* Page
//     const endpointAll = "http://24.199.127.212:3000/galleryClient/get";
//     const imagesPerPageAll = 10;
//     let currentPage = 1;
//     let images = [];

//     const imageGridAll = document.getElementById("imageGridAll");
//     const nextBtnAll = document.getElementById("nextAll");
//     const preBtnAll = document.getElementById("previousAll");

//     async function fetchImagesAll() {
//         try {
//             const response = await fetch(`${endpointAll}?page=${currentPage}`);
//             const data = await response.json();
//             arrOfImgs = data["results"].map((obj) => obj.image);
//             images = arrOfImgs; 

//             renderImagesAll();
//         } catch (error) {
//             console.error("Error fetching images:", error);
//         }
//     }

//     function renderImagesAll() {
//         imageGridAll.innerHTML = "";

//         const startIndex = (currentPage - 1) * imagesPerPageAll;
//         const endIndex = startIndex + imagesPerPageAll;
//         if (currentPage === 1) {
//             preBtnAll.style.display = "none";
//         }
//         for (let i = startIndex; i < endIndex && i < images.length; i++) {

//             const myLink = document.createElement("a");
//             const img = document.createElement("img");
//             img.src = images[i];
//             let containerImg = document.createElement("div");
//             containerImg.classList.add(`image`, `item${i + 1}`);
//             myLink.appendChild(img)
//             containerImg.appendChild(myLink);
//             imageGridAll.appendChild(containerImg);
//             if (images.length < 10) {
//                 nextBtnAll.style.display = "none";
//             }
//         }
//         arrOfAllGallery.push(...imageGridAll.children);
//     }

//     nextBtnAll.addEventListener("click", () => {
//         currentPage++;
//     renderImagesAll();
// });
// preBtnAll.addEventListener("click", () => {
//     currentPage--;
//     renderImagesAll();
// });

// fetchImagesAll();

// //Attaching Api for Images on Gallery on *Events* Page
// const endpointEvents = "http://24.199.127.212:3000/galleryClient/getEvents";
// const imagesPerPageEvents = 10;
// let currentPageEvents = 1;
// let imagesEvents = [];

// const imageGridEvents = document.getElementById("imageGridEvents");
// const nextBtnEvents = document.getElementById("nextEvents");
// const preBtnEvents = document.getElementById("previousEvents");

// async function fetchImagesEvents() {
//     try {
//         const response = await fetch(
//             `${endpointEvents}?page=${currentPageEvents}`
//             );
//             const data = await response.json();
//             arrOfImgs = data["results"].map((obj) => obj.image);
//             imagesEvents = arrOfImgs; 

//       renderImagesEvents();
//     } catch (error) {
//         console.error("Error fetching images:", error);
//     }
// }

// function renderImagesEvents() {
//     imageGridEvents.innerHTML = "";

//     const startIndex = (currentPageEvents - 1) * imagesPerPageEvents;
//     const endIndex = startIndex + imagesPerPageEvents;
//     if (currentPageEvents === 1) {
//         preBtnEvents.style.display = "none";
//     }
//     for (let i = startIndex; i < endIndex && i < imagesEvents.length; i++) {
//         const img = document.createElement("img");
//         img.src = imagesEvents[i];
//         let containerImg = document.createElement("div");
//         containerImg.classList.add(`image`, `item${i + 1}`);
//         containerImg.appendChild(img);
//         imageGridEvents.appendChild(containerImg);
//         if (imagesEvents.length < 10) {
//             nextBtnEvents.style.display = "none";
//         }
//     }
//     arrOfEventsGallery.push(...imageGridEvents.children);
// }

// nextBtnEvents.addEventListener("click", () => {
//     currentPageEvents++;
//     renderImagesEvents();
// });
// preBtnEvents.addEventListener("click", () => {
//     currentPageEvents--;
//     renderImagesEvents();
// });

// fetchImagesEvents();

// //Attaching Api for Images on Gallery on *Sessions* Page
// const endpointSessions =
// "http://24.199.127.212:3000/galleryClient/getSessions";
// const imagesPerPageSessions = 10;
// let currentPageSessions = 1;
// let imagesSessions = [];

// const imageGridSessions = document.getElementById("imageGridSessions");
// const nextBtnSessions = document.getElementById("nextSessions");
// const preBtnSessions = document.getElementById("previousSessions");

// async function fetchImagesSessions() {
//     try {
//         const response = await fetch(
//             `${endpointSessions}?page=${currentPageSessions}`
//             );
//             const data = await response.json();
//             arrOfImgs = data["results"].map((obj) => obj.image);
//             imagesSessions = arrOfImgs;

//             renderImagesSessions();
//         } catch (error) {
//             console.error("Error fetching images:", error);
//     }
// }

// function renderImagesSessions() {
//     imageGridSessions.innerHTML = "";

//     const startIndex = (currentPageSessions - 1) * imagesPerPageSessions;
//     const endIndex = startIndex + imagesPerPageSessions;
//     if (currentPageSessions === 1) {
//         preBtnSessions.style.display = "none";
//     }
//     for (let i = startIndex; i < endIndex && i < imagesSessions.length; i++) {
//         const img = document.createElement("img");
//         img.src = imagesSessions[i];
//         let containerImg = document.createElement("div");
//         containerImg.classList.add(`item${i + 1}`, `image`);
//         containerImg.appendChild(img);
//         imageGridSessions.appendChild(containerImg);
//         if (imagesSessions.length < 10) {
//             nextBtnSessions.style.display = "none";
//         }
//     }
//     arrOfSessionsGallery.push(...imageGridSessions.children);
// }

// nextBtnSessions.addEventListener("click", () => {
//     currentPageSessions++;
//     renderImagesSessions();
// });
// preBtnSessions.addEventListener("click", () => {
//     currentPageSessions--;
//     renderImagesSessions();
// });

// fetchImagesSessions();
// }
// //End Attaching Api and Images on "Our Gallery" Page
// apiOurGallery();
const optionMenu = document.querySelector(".select-menu"),
    selectBtn = optionMenu.querySelector(".select-btn"),
    options = optionMenu.querySelectorAll(".option"),
    sBtn_text = optionMenu.querySelector(".sBtn-text");

// Start Button Upload on popup in gallery page
let btnUpload = document.querySelector("#image-upload");
let txtFile = document.querySelector("#txtFile")
btnUpload.addEventListener('change', () => {
    console.log(btnUpload.value.toString());
    txtFile.innerHTML = `${(btnUpload.value.toString()).slice(12, 21)}<span style="color:#7B1D80 !important;">..${(btnUpload.value.toString()).slice(-4)}</span>`
});
// End Button Upload on popup in gallery page

// Start Button closePopup on popup in gallery page
let closeBtn = document.querySelector("#closePopup");
let containerPopup = document.querySelector(".popUp-gallery");
function closepopup() {
    containerPopup.style.opacity = 0;
    containerPopup.style.cssText += `
    backdrop-filter: blur(0px);
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    `;
    formFrame.style.cssText = `
    transform: scale(0) translate(0%, 0%);
    /*top:0;
    left:0;*/
    `;
    setTimeout(() => {
        containerPopup.style.display = "none";
    }, 700);
    sBtn_text.innerText = "Name Section-*";
    txtFile.innerHTML = "Upload Image-*";
    selectBtn.style.color = "#92929D";
}
// End Button closePopup on popup in gallery page

// Start Button "Add new dish" in gallery page
let addNewImg = document.querySelector(".btn-add-img");
let formFrame = document.querySelector(".form")
addNewImg.onclick = function () {
    containerPopup.style.display = "block";
    containerPopup.style.opacity = "1";
    setTimeout(() => {
        formFrame.style.cssText = `
        transform: scale(1) translate(-50%,-50%);
        `;
    }, 100)
    setTimeout(() => {
        containerPopup.style.cssText += `
        backdrop-filter: blur(12px);
        `;
    }, 500)
}
// End Button "Add new dish" in gallery page

selectBtn.addEventListener("click", () => optionMenu.classList.toggle("active"));

options.forEach(option => {
    option.addEventListener("click", () => {
        let selectedOption = option.querySelector(".option-text").innerText;
        sBtn_text.innerText = selectedOption;
        selectBtn.style.color = "#7B1D80";

        optionMenu.classList.remove("active");
    });
});



const myHeaders = new Headers();
myHeaders.append("Authorization", "MSP eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWI5YTBmYzk5YzQyOGNiZjczN2Q0ZTMiLCJpYXQiOjE3MTA4ODkzODAsImV4cCI6MTcxMDk1NDE4MH0.eXmwh3g0fMmRLKXmlzRrX1Qt5PcCi8Wxxgo2BIUjdPc");

let form = document.querySelector("#form");
const formdata = new FormData(form);
formdata.append("name", sBtn_text.innerText);
if (btnUpload.files[0]) {
    formdata.append("image", btnUpload.files[0]);  // Pass only the File object
}

const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow"
};

fetch("http://24.199.127.212:3000/dashboard/gallery/add", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));





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
