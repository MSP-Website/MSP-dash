let text =document.getElementById("text");
let phone =document.getElementById("phone");
let track =document.getElementById("track");
let link =document.getElementById("link");
let face =document.getElementById("face");
let git =document.getElementById("git");
let linktree =document.getElementById("linktree");
let getFile =document.getElementById("getFile");
let textarea =document.getElementById("textarea");
let button =document.getElementById("button-up");
let cancel =document.getElementById("cancel");
let add =document.getElementById("add");

// creat



let datapro;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}
else{
    datapro = [];
}
add.onclick =  function(){
    let newPro = {
        text:text.value,
        phone:phone.value,
        track:track.value,
        link:link.value,
        face:face.value,
        git:git.value,
        linktree:linktree.value,
        getFile:getFile.value,
        textarea:textarea.value,

    }
    datapro.push(newPro);
    localStorage.setItem('product', JSON.stringify(datapro));
    // console.log(datapro);

    clearData();
    showData()
}

// clear

function clearData(){
    text.value = '';
    phone.value = '';
   track.value = '';
   link.value = '';
    face.value = '';
    git.value = '';
    linktree.value = '';
    getFile.value = '';
    textarea.value = '';
}
// search

// let searchMood = 'Name';
// function getSearch(id){
//    let search = document.getElementById('searchName');
//     if(id == 'searchName'){
//         searchMood = 'Name';
//         search.placeholder = 'Search about Name';

//     }
//     else{
//         searchMood = null;
//     }
// }


// function searchData(value){
//     console.log(value);
// }


// showdata

// function showData(){
//     let tab = '';

//     for(let i =0 ;i<datapro.length;i++){
       
       
//     }
//     // document.getElementById("pageall").innerHTML = tab;

// }
// showData();

















// document.getElementById("magnifying-glass").onclick = function() {
//     var myDiv = document.getElementById("myDiv");
//     if (myDiv.style.display === "none") {
//         myDiv.style.display = "block";
//         document.body.classList.add("page");
//     } else {
//         myDiv.style.display = "none";
//         document.body.classList.remove("page");
//     }
// };





// const magnifyingGlass = document.getElementById('magnifying-glass');

//     // Add click event listener to the magnifying glass icon
//     magnifyingGlass.onclick = function() {
//         var myDiv = document.getElementById("myDiv");
//         if (myDiv.style.display === "none") {
//             myDiv.style.display = "block";
//             document.body.classList.add("blur");
//         } else {
//             myDiv.style.display = "none";
//             document.body.classList.remove("blur");
//         }
//     };




// Edit
    // function makeEditable(element) {
    
    //     var inputsDiv = document.querySelector('.input');
    //     inputsDiv.style.display = 'block';
    //  }

// cancel in  edit
    //  document.getElementById("out").onclick = function() {
    //     document.getElementById("my").style.display = "none";
    //   };



// exit in edit
      function hideDiv() {
        var div = document.getElementById("my");
        div.style.display = "none";
      }

// add in edit
      let textt =document.getElementById("textt");
let phonee =document.getElementById("phonee");
let trackk =document.getElementById("trackk");
let linkk =document.getElementById("linkk");
let facee =document.getElementById("facee");
let gitt =document.getElementById("gitt");
let linktreee =document.getElementById("linktreee");
let getFilee =document.getElementById("getFilee");
let textareaa =document.getElementById("textareaa");
let buttonn =document.getElementById("button-upp");
let out =document.getElementById("out");
let addd =document.getElementById("addd");

// creat



let dataproo;
if(localStorage.productt != null){
    dataproo = JSON.parse(localStorage.productt)
}
else{
    dataproo = [];
    
}
addd.onclick =  function(){
    let newwPro = {
        textt:textt.value,
        phonee:phonee.value,
        trackk:trackk.value,
        linkk:linkk.value,
        facee:facee.value,
        gitt:gitt.value,
        linktreee:linktreee.value,
        getFilee:getFilee.value,
        textareaa:textareaa.value,

    }
    dataproo.push(newwPro);
    localStorage.setItem('productt', JSON.stringify(dataproo));
    // console.log(datapro);

    clearData();

}

// clear

function clearData(){
    textt.value = '';
    phonee.value = '';
   trackk.value = '';
   linkk.value = '';
    facee.value = '';
    gitt.value = '';
    linktreee.value = '';
    getFilee.value = '';
    textareaa.value = '';
}








// add data in page

// Function to handle "Add" button click
function handleAddButtonClick() {
    // Get the values from the form inputs
    var name = document.getElementById("text").value;
    var phoneNumber = document.getElementById("phone").value;
    var trackPosition = document.getElementById("track").value;
    var linkedin = document.getElementById("link").value;
    var facebook = document.getElementById("face").value;
    var behanceOrGithub = document.getElementById("git").value;
    var linktree = document.getElementById("linktree").value;
    var description = document.getElementById("textarea").value;

    // Update the content of the homepage
    var homepageContent = document.getElementById("homepage");
    homepageContent.innerHTML = `
        <h2>Name: ${name}</h2>
        <p>Phone Number: ${phoneNumber}</p>
        <p>Track With Position: ${trackPosition}</p>
        <p>LinkedIn: ${linkedin}</p>
        <p>Facebook: ${facebook}</p>
        <p>Behance or Github: ${behanceOrGithub}</p>
        <p>Linktree: ${linktree}</p>
        <p>Description: ${description}</p>
    `;

    // Hide the form
    var formDiv = document.getElementById("myDiv");
    formDiv.style.display = "none";
}

// Attach the handleAddButtonClick function to the "Add" button's click event
var addButton = document.getElementById("add");
addButton.addEventListener("click", handleAddButtonClick);




   
// ADD Button Upload on popup 
let btnUpload = document.querySelector("#image-upload");
let txtFile = document.querySelector("#txtFile")
btnUpload.addEventListener('change', ()=>{
    console.log(btnUpload.value.toString());
    txtFile.innerHTML = `${(btnUpload.value.toString()).slice(12,21)}<span style="color:#7B1D80 !important;">..${(btnUpload.value.toString()).slice(-4)}</span>` 
});

// Edit Button Upload on popup 
let btnUploadEdit = document.querySelector("#image-upload-Edit");
let txtFileEdit = document.querySelector("#txtFile-Edit")
btnUploadEdit.addEventListener('change', ()=>{
    console.log(btnUploadEdit.value.toString());
    txtFileEdit.innerHTML = `${(btnUploadEdit.value.toString()).slice(12,21)}<span style="color:#7B1D80 !important;">..${(btnUploadEdit.value.toString()).slice(-4)}</span>` 
});

    




     

