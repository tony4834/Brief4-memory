
var elClick = Array();
elClick = [0,0,0,0,0];


function displayID(cboxClicked, index) {
    console.log(cboxClicked.id);
    
    cboxClicked.style.backgroundColor = "red";

    elClick[index]=1;
    console.log(elClick);
}
  
const cbox = document.querySelectorAll(".card");
console.log(cbox);

for (let i = 0; i < cbox.length; i++) {
    cbox[i].addEventListener("click", function() {
        displayID(cbox[i], i)
    });
}

