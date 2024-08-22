// start Constans

const optionMenu = document.querySelector(".select-menu"),
  selectBtn = optionMenu.querySelector(".select-btn"),
  options = optionMenu.querySelectorAll(".option"),
  sBtn_text = optionMenu.querySelector(".sBtn-text");
const btnPrev = document.querySelector("#previousAll");
const btnNex = document.querySelector("#nextAll");

let btnUpload = document.querySelectorAll("#image-upload")[0];
let txtFile = document.querySelectorAll("#txtFile")[0];

let closeBtn = document.querySelector("#closePopup");
let containerPopup = document.querySelector(".popUp-gallery");
let formFrame2 = document.querySelector(".form");
const limit = 1500;
// End Constans

btnUpload.addEventListener("change", () => {
  txtFile.innerHTML = `${btnUpload.value
    .toString()
    .slice(12, 21)}<span style="color:#7B1D80 !important;">..${btnUpload.value
    .toString()
    .slice(-4)}</span>`;
});

//Start Function to close the popup which responsible to add image to gallery
function closepopup() {
  containerPopup.style.opacity = 0;
  containerPopup.style.cssText += `
  backdrop-filter: blur(0px);
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  `;
  formFrame2.style.cssText = `
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
//End Function to close the popup which responsible to add image to gallery

// Start Getting All data of gallery from api
let storagePage = localStorage.getItem("pageNum");
var pageNum;
pageNum = 1;
async function getDataGalleryAll(pageNum) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("expecto Patronum"));
  var res = await fetch(
    `https://api.msp-alazhar.tech/dashboard/gallery/get?page=${
      pageNum || 1
    }&limit=15`,
    {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }
  );
  var data = await res.json();
  console.log(data);

  if ("next" in data) {
    btnNex.style.display = "block";
    btnNex.onclick = () => {
      pageNum = data["next"]["page"];
      localStorage.setItem("pageNum", pageNum);
      getDataGalleryAll(localStorage.getItem(pageNum) || pageNum);
    };
  } else {
    btnNex.style.display = "none";
  }
  if ("previous" in data) {
    btnPrev.style.display = "block";
    btnPrev.onclick = () => {
      pageNum = data["previous"]["page"];
      localStorage.setItem("pageNum", pageNum);
      getDataGalleryAll(localStorage.getItem(pageNum) || pageNum);
    };
  } else {
    btnPrev.style.display = "none";
  }

  document.querySelector("#Gallery .container-images").innerHTML = `
          <div class="btn-add-img">
                      <div>
                          <span>+</span>
                          <p>Add new dish</p>
                      </div>
              </div>
          `;
  for (let i = 0; i < data["results"].length; i++) {
    document.querySelector("#Gallery .container-images").innerHTML += `
              <div class="p-con-img">
                      <div class="conatiner-img">

                       <span class="zoom-icon"><a href="${
                         data["results"][i]["image"]
                       }" data-lightbox="galleryimages" data-title="${
      data["results"][i]["name"]
    }-image #${i + 1}"><img src="../assests/zoom-in.webp" alt=""></a></span>
                        <span class="edit-icon" onclick="editingImage('${
                          data["results"][i]["_id"]
                        }')"><img src="../assests/edit.webp" alt=""></span>
                        
                          <span onclick='
                            DeleteFromGallery("${data["results"][i]["_id"]}");
                          '>Delete</span>
                          <img src="${data["results"][i]["image"]}" alt="">
                      </div>
                  </div>
              `;
  }
  addingImage();
}
getDataGalleryAll(storagePage || pageNum);
// End Getting All data of gallery from api

// Start Getting Events data of gallery from api
async function getDataGalleryEvents(pageNum) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("expecto Patronum"));
  let res = await fetch(
    `https://api.msp-alazhar.tech/dashboard/gallery/getEvents?page=${
      pageNum || 1
    }&limit=15`,
    {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }
  );
  let data = await res.json();
  if ("next" in data && data["results"].length == 15) {
    btnNex.style.display = "block";
    btnNex.onclick = () => {
      pageNum = data["next"]["page"];
      localStorage.setItem("pageNum", pageNum);
      getDataGalleryEvents(localStorage.getItem(pageNum) || pageNum);
    };
  } else {
    btnNex.style.display = "none";
  }
  if ("previous" in data) {
    btnPrev.style.display = "block";
    btnPrev.onclick = () => {
      pageNum = data["previous"]["page"];
      localStorage.setItem("pageNum", pageNum);
      getDataGalleryEvents(localStorage.getItem(pageNum) || pageNum);
    };
  } else {
    btnPrev.style.display = "none";
  }
  document.querySelector("#Gallery .container-images").innerHTML = `
          <div class="btn-add-img">
                      <div>
                          <span>+</span>
                          <p>Add new dish</p>
                      </div>
              </div>
          `;
  for (let i = 0; i < data["results"].length; i++) {
    document.querySelector("#Gallery .container-images").innerHTML += `
    
     <div class="p-con-img">
                      <div class="conatiner-img">

                       <span class="zoom-icon"><a href="${
                         data["results"][i]["image"]
                       }" data-lightbox="galleryimages" data-title="${
      data["results"][i]["name"]
    }-image #${i + 1}"><img src="../assests/zoom-in.webp" alt=""></a></span>
                        <span class="edit-icon" onclick="editingImage('${
                          data["results"][i]["_id"]
                        }')"><img src="../assests/edit.webp" alt=""></span>
                        
                          <span onclick='
                            DeleteFromGallery("${data["results"][i]["_id"]}");
                          '>Delete</span>
                          <img src="${data["results"][i]["image"]}" alt="">
                      </div>
                  </div>
    `;
  }
  addingImage();
}
// End Getting Events data of gallery from api

// Start Getting Sessions data of gallery from api
async function getDataGallerySessions(pageNum) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("expecto Patronum"));
  let res = await fetch(
    `https://api.msp-alazhar.tech/dashboard/gallery/getSessions?page=${
      pageNum || 1
    }&limit=15`,
    {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }
  );
  let data = await res.json();
  console.log(data);

  if ("next" in data && data["results"].length == 15) {
    btnNex.style.display = "block";
    btnNex.onclick = () => {
      pageNum = data["next"]["page"];
      localStorage.setItem("pageNum", pageNum);
      getDataGallerySessions(localStorage.getItem(pageNum) || pageNum);
    };
  } else {
    btnNex.style.display = "none";
  }
  if ("previous" in data) {
    btnPrev.style.display = "block";
    btnPrev.onclick = () => {
      pageNum = data["previous"]["page"];
      localStorage.setItem("pageNum", pageNum);
      getDataGallerySessions(localStorage.getItem(pageNum) || pageNum);
    };
  } else {
    btnPrev.style.display = "none";
  }

  document.querySelector("#Gallery .container-images").innerHTML = `
          <div class="btn-add-img">
                      <div>
                          <span>+</span>
                          <p>Add new dish</p>
                      </div>
              </div>
          `;
  for (let i = 0; i < data["results"].length; i++) {
    document.querySelector("#Gallery .container-images").innerHTML += `
              <div class="p-con-img">
                      <div class="conatiner-img">

                       <span class="zoom-icon"><a href="${
                         data["results"][i]["image"]
                       }" data-lightbox="galleryimages" data-title="${
      data["results"][i]["name"]
    }-image #${i + 1}"><img src="../assests/zoom-in.webp" alt=""></a></span>
                        <span class="edit-icon" onclick="editingImage('${
                          data["results"][i]["_id"]
                        }')"><img src="../assests/edit.webp" alt=""></span>
                        
                          <span onclick='
                            DeleteFromGallery("${data["results"][i]["_id"]}");
                          '>Delete</span>
                          <img src="${data["results"][i]["image"]}" alt="">
                      </div>
                  </div>
              `;
  }
  addingImage();
}
// Start Getting Sessions data of gallery from api

//Start Posting data of gallery to api
function postGallery() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("expecto Patronum"));

  const formdata = new FormData();
  formdata.append("name", sBtn_text.innerText);
  formdata.append(
    "image",
    document.querySelectorAll("#image-upload")[0].files[0]
  );

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch("https://api.msp-alazhar.tech/dashboard/gallery/add", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      if (
        document.querySelector(".types-gallery").children[0].classList ==
        "active"
      ) {
        getDataGalleryAll(localStorage.getItem("pageNum") || pageNum);
      }
      if (
        document.querySelector(".types-gallery").children[1].classList ==
        "active"
      ) {
        getDataGalleryEvents(localStorage.getItem("pageNum") || pageNum);
      }
      if (
        document.querySelector(".types-gallery").children[2].classList ==
        "active"
      ) {
        getDataGallerySessions(localStorage.getItem("pageNum") || pageNum);
      }
    })
    .catch((error) => console.error(error));
}
//End Posting data of gallery to api

[...document.querySelector(".types-gallery").children].forEach((e) => {
  e.onclick = () => {
    [...document.querySelector(".types-gallery").children].forEach((e) => {
      e.classList.remove("active");
    });

    if (e === document.querySelector(".types-gallery").children[1]) {
      getDataGalleryEvents();
      e.classList.add("active");
    } else if (e === document.querySelector(".types-gallery").children[0]) {
      e.classList.add("active");
      getDataGalleryAll();
    } else if (e === document.querySelector(".types-gallery").children[2]) {
      getDataGallerySessions();
      e.classList.add("active");
    }
  };
});

async function DeleteFromGallery(id) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("expecto Patronum"));

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  let res = await fetch(
    `https://api.msp-alazhar.tech/dashboard/gallery/delete/${id}`,
    requestOptions
  );
  let data = await res.text();
  if (
    document.querySelector(".types-gallery").children[0].classList == "active"
  ) {
    getDataGalleryAll(localStorage.getItem("pageNum") || pageNum);
  }
  if (
    document.querySelector(".types-gallery").children[1].classList == "active"
  ) {
    getDataGalleryEvents(localStorage.getItem("pageNum") || pageNum);
  }
  if (
    document.querySelector(".types-gallery").children[2].classList == "active"
  ) {
    getDataGallerySessions(localStorage.getItem("pageNum") || pageNum);
  }
}

// Start Button "Add new dish" in gallery page
function addingImage() {
  let addNewImg = document.querySelectorAll(".btn-add-img")[0];
  let formFrame = document.querySelector(".form");

  addNewImg.onclick = function () {
    localStorage.setItem("btnVal", "Add");
    document.querySelector("#addBtn").innerHTML =
      localStorage.getItem("btnVal");
    containerPopup.style.display = "block";
    containerPopup.style.opacity = "1";
    localStorage.setItem("edit","Add")
    document.querySelector("#addOrEdit").innerHTML =
    localStorage.getItem("edit");
    setTimeout(() => {
      formFrame.style.cssText = `
      transform: scale(1) translate(-50%,-50%);
      `;
    }, 100);
    setTimeout(() => {
      containerPopup.style.cssText += `
      backdrop-filter: blur(12px);
      `;
    }, 500);
  };
  // End Button "Add new dish" in gallery page
}

selectBtn.onclick = () => {
  optionMenu.classList.toggle("active");
};

options.forEach((option) => {
  option.addEventListener("click", () => {
    let selectedOption = option.querySelector(".option-text").innerText;
    sBtn_text.innerText = selectedOption;
    selectBtn.style.color = "#7B1D80";

    optionMenu.classList.remove("active");
  });
});

function editingImage(imageId) {
  getImageById(imageId);
  localStorage.setItem("imageId", imageId);
  localStorage.setItem("btnVal", "Update");
  localStorage.setItem("edit","EDIT")
  document.querySelector("#addBtn").innerHTML = localStorage.getItem("btnVal");
  document.querySelector("#addOrEdit").innerHTML = localStorage.getItem("edit");
  // getDataGalleryAll();
}
// let imageIdFromLocal = ;
function apiEdit() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("expecto Patronum"));

  const formdata = new FormData();
  formdata.append("name", sBtn_text.innerText);
  formdata.append(
    "image",
    document.querySelectorAll("#image-upload")[0].files[0]
  );

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(
    `https://api.msp-alazhar.tech/dashboard/gallery/edit/${localStorage.getItem(
      "imageId"
    )}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      if (
        document.querySelector(".types-gallery").children[0].classList ==
        "active"
      ) {
        getDataGalleryAll(localStorage.getItem("pageNum") || pageNum);
      }
      if (
        document.querySelector(".types-gallery").children[1].classList ==
        "active"
      ) {
        getDataGalleryEvents(localStorage.getItem("pageNum") || pageNum);
      }
      if (
        document.querySelector(".types-gallery").children[2].classList ==
        "active"
      ) {
        getDataGallerySessions(localStorage.getItem("pageNum") || pageNum);
      }
    })
    .catch((error) => console.error(error));
}

function getImageById(imageId) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", localStorage.getItem("expecto Patronum"));

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://api.msp-alazhar.tech/dashboard/gallery/getById/${imageId}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      sBtn_text.innerText = result["name"];
      selectBtn.style.color = "#7B1D80";
      txtFile.innerHTML = `${result["image"].slice(
        27,
        37
      )}<span style="color:#7B1D80 !important;">..${result["image"].slice(
        -4
      )}</span>`;
    })
    .catch((error) => console.error(error));

  (function () {
    let formFrame = document.querySelector(".form");

    containerPopup.style.display = "block";
    containerPopup.style.opacity = "1";
    setTimeout(() => {
      formFrame.style.cssText = `
        transform: scale(1) translate(-50%,-50%);
        `;
    }, 100);
    setTimeout(() => {
      containerPopup.style.cssText += `
        backdrop-filter: blur(12px);
        `;
    }, 500);
  })();
}
// window.addEventListener("beforeunload", () => {
//   localStorage.clear();
// });
