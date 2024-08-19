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
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Ẩn nội dung
function toggleContent() {
    var hiddenContent = document.getElementById("hiddenContent");
    
    if (hiddenContent.classList.contains("hidden")) {
        hiddenContent.classList.remove("hidden");
        toggleButton.textContent = "//ẩn đi";
    } else {
        hiddenContent.classList.add("hidden");
        toggleButton.textContent = "...xem thêm";
    }
}

// Hàm hiển thị chú thích
function hienThiChuThich(element, chuThich) {
    element.title = chuThich;
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
