// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Khung tk
var modal = document.getElementById('myModal');

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

//Về đầu trang
function scrollToTop(){
    window.scrollTo(0, 0);
}

// Về cuối trang
function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
    });
}

//Chú thích
function hienThiChuThich(event, content) {
    var tooltip = document.getElementById("tooltip");
    tooltip.textContent = content;
    tooltip.style.display = "block";
    tooltip.style.left = event.target.offsetLeft + 'px';
    tooltip.style.top = (event.target.offsetTop - tooltip.clientHeight) + 'px';
}
function anChuThich(element) {
    var tooltip = document.getElementById("tooltip");
    tooltip.style.display = "none";
}

//Thông tin tgia
function openPage(pageName,elmnt,color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;
  }
  
// Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();  