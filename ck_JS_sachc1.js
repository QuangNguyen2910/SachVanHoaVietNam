window.onscroll = function() {
    updateProgressBar();
    };
  
    function updateProgressBar() {
    var progressBar = document.getElementById('progressBar');
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrollPercentage = (scrollTop / scrollHeight) * 100;
  
    progressBar.style.width = scrollPercentage + '%';
  
    // Giữ màu xanh lá cây cho dù cuộn đến cuối
    progressBar.style.backgroundColor = '#C68484';
    }
  
    //Menu
    function toggleMenu(menuId) {
      var menu = document.getElementById(menuId);
      var mainContent = document.getElementById("mainContent");
  
      // Close all other menus before opening the new one
      var allMenus = document.querySelectorAll('.left-menu');
      allMenus.forEach(function(m) {
          if (m.id !== menuId) {
              m.style.left = "-250px";
          }
      });
  
      if (menu.style.left === "-250px") {
          menu.style.left = "0";
          mainContent.style.marginLeft = "250px";
      } else {
          menu.style.left = "-250px";
          mainContent.style.marginLeft = "0";
      }
  }
  
  function closeMenu(menuId) {
      var menu = document.getElementById(menuId);
      var mainContent = document.getElementById("mainContent");
      menu.style.left = "-250px";
      mainContent.style.marginLeft = "0";
  }
  
    /*Dropdown menu*/
    function toggleDropdown(event, button) {
    event.stopPropagation();
    const menuItem = button.closest('.menu-item');
    const isOpen = menuItem.classList.contains('open');
    // Đóng tất cả các dropdown đang mở
    const allMenuItems = document.querySelectorAll('.menu-item');
    allMenuItems.forEach(item => {
        item.classList.remove('open');
        item.style.top = ''; // Reset lại vị trí của menu items khi đóng dropdown
    });
    // Nếu menuItem chưa mở, mở nó
    if (!isOpen) {
        menuItem.classList.add('open');
        adjustMenuHeight(menuItem); // Đảm bảo menu-item không bị che mất
    }
    }
    function adjustMenuHeight(menuItem) {
    const dropdownContent = menuItem.querySelector('.dropdown-content');
    const menuRect = menuItem.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const spaceBelow = windowHeight - menuRect.bottom;
  
    if (spaceBelow < dropdownContent.clientHeight) {
        dropdownContent.style.top = "auto";
        dropdownContent.style.bottom = "100%";
    } else {
        dropdownContent.style.top = "100%";
        dropdownContent.style.bottom = "auto";
    }
    const menuHeight = dropdownContent.getBoundingClientRect().height;
    const siblings = Array.from(menuItem.parentNode.children).filter(item => item !== menuItem);
    siblings.forEach(sibling => {
        const siblingRect = sibling.getBoundingClientRect();
        if (siblingRect.top > menuRect.top) {
            sibling.style.top = `${menuHeight}px`;
        }
    });
    }
    // Đóng dropdown khi click bên ngoài menu
    document.addEventListener('click', (event) => {
    const allMenuItems = document.querySelectorAll('.menu-item');
    allMenuItems.forEach(item => {
        item.classList.remove('open');
        item.style.top = ''; // Reset lại vị trí của menu items khi đóng dropdown
    });
    });
    // Ngăn chặn đóng dropdown khi click bên trong menu
    document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', (event) => {
        event.stopPropagation();
    });
    });
  
    // Thay đổi cỡ chữ
    function adjustFontSizeWithSlider(elementId) {
    const element = document.getElementById(elementId);
    const slider = document.getElementById('slider');
    const knob = document.getElementById('knob');
    const plusIcon = document.getElementById('plusIcon');
    const minusIcon = document.getElementById('minusIcon');
    let fontSize = 14; // cỡ chữ mặc định
    let isDragging = false;
    // Lắng nghe sự kiện khi chuột được nhấn
    knob.addEventListener('mousedown', function(event) {
        isDragging = true;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
    // Xử lý khi chuột di chuyển
    function onMouseMove(event) {
        if (isDragging) {
            const sliderWidth = slider.offsetWidth;
            const knobWidth = knob.offsetWidth;
            let newPosition = event.clientX - slider.getBoundingClientRect().left - knobWidth / 2;
            newPosition = Math.max(0, Math.min(newPosition, sliderWidth - knobWidth));
            const percentage = newPosition / (sliderWidth - knobWidth);
            fontSize = 10 + percentage * 20; // Scale từ 10px đến 30px (tùy chỉnh theo nhu cầu)
            element.style.fontSize = fontSize + 'px';
            knob.style.left = newPosition + 'px';
        }
    }
    // Kết thúc việc lắng nghe sự kiện khi chuột được nhấn
    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
    // Lắng nghe sự kiện khi click vào biểu tượng "+"
    plusIcon.addEventListener('click', function() {
        fontSize += 1;
        element.style.fontSize = fontSize + 'px';
    });
    // Lắng nghe sự kiện khi click vào biểu tượng "-"
    minusIcon.addEventListener('click', function() {
        fontSize -= 1;
        element.style.fontSize = fontSize + 'px';
    });
    }
    // Sử dụng hàm với phần tử có id là "mainContent"
    adjustFontSizeWithSlider('mainContent');
  
  
    //Màu nền
    function changeBackgroundColor(color, element) {
        // Thay đổi màu nền của phần nội dung chính
        const mainContent = document.querySelector('.content');
        mainContent.style.backgroundColor = color;

        // Xóa lớp 'selected' khỏi tất cả các nút màu trong bộ chọn màu nền
        const backgroundButtons = document.querySelectorAll('#colorPickerBackground .color-button');
        backgroundButtons.forEach(button => button.classList.remove('selected'));

        // Thêm lớp 'selected' vào nút đã chọn
        element.classList.add('selected');
    }  
  // Nhạc nền
  document.addEventListener('DOMContentLoaded', function() {
      const audioPlayer = document.getElementById('audio-player');
      const playlistItems = document.querySelectorAll('.playlist-item');
  
      let currentPlayingItem = null;
  
      // Hàm lấy tên tệp từ đường dẫn
      // Giải thích: Chúng ta sử dụng tên tệp để so sánh vì audioPlayer.src chứa toàn bộ URL (bao gồm cả domain),
      // điều này sẽ luôn trả về false nếu so sánh toàn bộ URL. So sánh chỉ tên tệp giúp đảm bảo chúng ta
      // đang kiểm tra đúng nguồn âm thanh ngay cả khi URL đầy đủ khác nhau.
      const getFileName = (path) => path.split('/').pop();
  
      playlistItems.forEach(item => {
          item.addEventListener('click', function() {
              const src = item.getAttribute('data-src');
              const currentSrcFileName = getFileName(audioPlayer.src);
              const clickedSrcFileName = getFileName(src);
  
              // Nếu có mục đang phát và mục đó không phải là mục hiện tại thì dừng phát
              if (currentPlayingItem && currentPlayingItem !== item) {
                  currentPlayingItem.querySelector('.play-icon').innerHTML = '<i class="fa-solid fa-circle-play"></i>';
                  currentPlayingItem.classList.remove('playing');
                  audioPlayer.pause(); // Tạm dừng âm thanh
              }
  
              if (currentSrcFileName === clickedSrcFileName) {
                  if (audioPlayer.paused) {
                      // Phát âm thanh nếu nó đang bị tạm dừng
                      audioPlayer.play();
                      item.querySelector('.play-icon').innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
                      item.classList.add('playing');
                  } else {
                      // Tạm dừng âm thanh nếu nó đang phát
                      audioPlayer.pause();
                      item.querySelector('.play-icon').innerHTML = '<i class="fa-solid fa-circle-play"></i>';
                      item.classList.remove('playing');
                  }
              } else {
                  // Tải và phát nguồn âm thanh mới
                  audioPlayer.src = src;
                  audioPlayer.play();
                  item.querySelector('.play-icon').innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
                  item.classList.add('playing');
              }
  
              // Cập nhật mục đang phát hiện tại
              currentPlayingItem = audioPlayer.paused ? null : item;
          });
      });
  
      audioPlayer.addEventListener('ended', function() {
          if (currentPlayingItem) {
              currentPlayingItem.querySelector('.play-icon').innerHTML = '<i class="fa-solid fa-circle-play"></i>';
              currentPlayingItem.classList.remove('playing');
              currentPlayingItem = null;
          }
      });
  });
  
  //Note
  document.addEventListener("DOMContentLoaded", function() {
      const notesContainer = document.getElementById('notesContainer');
      const createNoteBtn = document.getElementById('createNoteBtn');
      const modal = document.getElementById('myModal');
      const closeBtn = document.getElementsByClassName('close')[0];
      const saveNoteBtn = document.getElementById('saveNoteBtn');
      const noteTitleInput = document.getElementById('noteTitle');
      const noteContentInput = document.getElementById('noteContent');
      let currentNote = null;
  
      // Load notes from LocalStorage
      function loadNotes() {
          const notes = JSON.parse(localStorage.getItem('notes')) || [];
          notes.forEach(note => {
              addNoteToDOM(note.title, note.content, note.timestamp);
          });
      }
  
      // Save notes to LocalStorage
      function saveNotes() {
          const notes = [];
          document.querySelectorAll('.note').forEach(noteElement => {
              const title = noteElement.querySelector('h3').innerText;
              const content = noteElement.querySelector('p').innerText;
              const timestamp = noteElement.querySelector('.timestamp').innerText;
              notes.push({ title, content, timestamp });
          });
          localStorage.setItem('notes', JSON.stringify(notes));
      }
  
      // Function to format the current date and time
      function getCurrentTimestamp() {
          const now = new Date();
          const hours = String(now.getHours()).padStart(2, '0');
          const minutes = String(now.getMinutes()).padStart(2, '0');
          const day = String(now.getDate()).padStart(2, '0');
          const month = String(now.getMonth() + 1).padStart(2, '0');
          return `${hours}:${minutes} ${day}/${month}`;
      }
  
      // Function to open the modal
      function openModal() {
          modal.style.display = "block";
      }
  
      // Function to close the modal
      function closeModal() {
          modal.style.display = "none";
          noteTitleInput.value = '';
          noteContentInput.value = '';
          currentNote = null;
      }
  
      // Event listener to open the modal when clicking create note button
      createNoteBtn.addEventListener('click', openModal);
  
      // Event listener to close the modal when clicking the close button
      closeBtn.addEventListener('click', closeModal);
  
      // Event listener to close the modal when clicking outside of it
      window.addEventListener('click', function(event) {
          if (event.target == modal) {
              closeModal();
          }
      });
  
      // Function to add note to DOM
      function addNoteToDOM(title, content, timestamp) {
          const note = document.createElement('div');
          note.classList.add('note');
          note.innerHTML = `<h3>${title}</h3><p>${content}</p><div class="note-footer"><div class="timestamp">${timestamp}</div></div>`;
  
          const editButton = document.createElement('button');
          editButton.innerText = 'Sửa';
          editButton.addEventListener('click', function() {
              noteTitleInput.value = title;
              noteContentInput.value = content;
              openModal();
              currentNote = note;
          });
  
          const deleteButton = document.createElement('button');
          deleteButton.innerText = 'Xóa';
          deleteButton.addEventListener('click', function() {
              notesContainer.removeChild(note);
              saveNotes();
          });
  
          const buttonsDiv = document.createElement('div');
          buttonsDiv.classList.add('note-buttons');
          buttonsDiv.appendChild(editButton);
          buttonsDiv.appendChild(deleteButton);
  
          note.querySelector('.note-footer').appendChild(buttonsDiv);
          notesContainer.appendChild(note);
      }
  
      // Function to create or update a note
      function createNote() {
          const title = noteTitleInput.value.trim();
          const content = noteContentInput.value.trim();
          const timestamp = getCurrentTimestamp();
  
          if (title && content) {
              if (currentNote) {
                  currentNote.querySelector('h3').innerText = title;
                  currentNote.querySelector('p').innerText = content;
                  currentNote.querySelector('.timestamp').innerText = timestamp;
              } else {
                  addNoteToDOM(title, content, timestamp);
              }
  
              closeModal();
              saveNotes();
          } else {
              alert("Vui lòng nhập cả tiêu đề và nội dung.");
          }
      }
  
      // Event listener for the save note button
      saveNoteBtn.addEventListener('click', createNote);
  
      // Load existing notes when the page loads
      loadNotes();
  });
  
  function changeFont(font, element) {
    // Change the font family of the <main> element
    document.querySelector('main').style.fontFamily = font;
    
    // Get all font buttons and remove the 'active' class from each
    const buttons = document.querySelectorAll('.fontButton');
    buttons.forEach(button => button.classList.remove('active'));
    
    // Add the 'active' class to the clicked button
    element.classList.add('active');
  }

  // Search
  function searchKeyword() {
        var input = document.getElementById('searchInput').value.trim();
        var mainContent = document.querySelector('main').innerHTML;
        var resultsContainer = document.getElementById('searchResults');
        resultsContainer.innerHTML = '';

        // Xóa highlight cũ
        var highlightedContent = mainContent.replace(/<span class="highlight" id="result-\d+">(.*?)<\/span>/g, '$1');
        document.querySelector('main').innerHTML = highlightedContent;

        if (input === '') {
            resultsContainer.innerHTML = '<p>Vui lòng nhập từ khóa.</p>';
            return;
        }

        // Sử dụng regex để tìm kiếm từ khóa và 5 từ phía sau
        var regex = new RegExp(`(\\b${input}\\b(?:\\s+\\w+){0,5})`, 'gi');
        var matches = [];
        var match;

        while ((match = regex.exec(highlightedContent)) !== null) {
            matches.push(match[0]);
        }

        if (matches.length > 0) {
            // Highlight các từ khóa trùng khớp trong ngữ cảnh và gán ID duy nhất
            var newContent = highlightedContent;
            var index = 0;
            newContent = newContent.replace(regex, function(matched) {
                index++;
                return matched.replace(new RegExp(`(${input})`, 'gi'), `<span class="highlight" id="result-${index}">$1</span>`);
            });
            document.querySelector('main').innerHTML = newContent;

            // Hiển thị kết quả
            index = 0;
            matches.forEach(match => {
                index++;
                var resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `${match}...`;
                resultItem.setAttribute('data-id', `result-${index}`);
                resultItem.onclick = function() {
                    var id = this.getAttribute('data-id');
                    var element = document.getElementById(id);
                    element.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                };
                resultsContainer.appendChild(resultItem);
            });
        } else {
            resultsContainer.innerHTML = '<p>Không tìm thấy kết quả.</p>';
        }
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
// Màu chữ
function changeTextColor(color, element) {
    // Thay đổi màu chữ của phần nội dung chính
    const mainContent = document.getElementById('mainContent');
    mainContent.style.color = color;

    // Xóa lớp 'selected' khỏi tất cả các nút màu trong bộ chọn màu chữ
    const textButtons = document.querySelectorAll('#colorPickerText .color-button');
    textButtons.forEach(button => button.classList.remove('selected'));

    // Thêm lớp 'selected' vào nút đã chọn
    element.classList.add('selected');
}

// Full screen
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
}

document.addEventListener('fullscreenchange', () => {
    const fullscreenIcon = document.getElementById('fullscreen-icon');
    if (document.fullscreenElement) {
        fullscreenIcon.classList.remove('fa-maximize');
        fullscreenIcon.classList.add('fa-minimize');
    } else {
        fullscreenIcon.classList.remove('fa-minimize');
        fullscreenIcon.classList.add('fa-maximize');
    }
});


// Highlight Text
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('highlightToggle');
    const mainContent = document.getElementById('mainContent');
    const eraser = document.querySelector('.eraser');

    toggle.addEventListener('change', function() {
        if (toggle.checked) {
            enableHighlighting();
        } else {
            disableHighlighting();
        }
    });

    function enableHighlighting() {
        mainContent.addEventListener('mouseup', highlightSelection);
    }

    function disableHighlighting() {
        mainContent.removeEventListener('mouseup', highlightSelection);
    }

    function highlightSelection() {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const span = document.createElement('span');
            span.className = 'highlight';

            // Sao chép các thuộc tính phong cách từ đoạn văn bản gốc
            const selectedText = range.extractContents();
            span.appendChild(selectedText);

            range.insertNode(span);
        }
        window.getSelection().removeAllRanges();
    }

    eraser.addEventListener('click', function() {
        const highlights = mainContent.querySelectorAll('.highlight');
        highlights.forEach(function(highlight) {
            const parent = highlight.parentNode;
            while (highlight.firstChild) {
                parent.insertBefore(highlight.firstChild, highlight);
            }
            parent.removeChild(highlight);
            parent.normalize(); // Combine adjacent text nodes
        });
    });
});

// Hàm xử lý khi click vào các id trong nội dung sách
document.addEventListener('DOMContentLoaded', function() {
    // Xử lý khi click vào các dropdown-item
    document.querySelectorAll('.dropdown-item a[href^="#"]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a

            const targetId = this.getAttribute('href').substring(1); // Lấy id của phần tử muốn cuộn đến
            const targetElement = document.getElementById(targetId); // Tìm phần tử có id tương ứng

            if (targetElement) {
                const navbarHeight = document.querySelector('header').offsetHeight; // Chiều cao của phần header (nếu có)
                const offsetTop = targetElement.offsetTop - navbarHeight; // Vị trí top của phần tử cộng với navbarHeight để căn giữa

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth' // Cuộn mượt
                });
            }
        });
    });
});

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
