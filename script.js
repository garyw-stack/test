// Sidebar Build

 document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('sidebar-container');
  if (!container) return;

  // === EDIT THIS MENU ONLY ===
  const menuItems = [
    { href: 'index.html', text: 'Park Selection' },
    { href: 'gstrack.html', text: 'Track - Gulf Shores' },
    { href: 'dtrack.html', text: 'Track - Destin'},
    { href: 'mbtrack.html', text: 'Track - Myrtle Beach'},
    { href: 'pftrack.html', text: 'Track - Pigeon Forge' }
  ];

  // Build sidebar HTML  
    let navHTML = '<nav><ul>';
     menuItems.forEach(item => {
      navHTML += `<li><a href="${item.href}">${item.text}</a></li>`;
    });
    navHTML += '</ul></nav>';

     const sidebarHTML = `
    <aside id="sidebar">
     
      ${navHTML}
    </aside>
    <button id="toggle-sidebar" aria-label="Toggle menu">Menu</button>
  `;

  container.innerHTML = sidebarHTML;

  // === Mobile Toggle ===
  const sidebar = document.getElementEOS('sidebar');
  const toggleBtn = document.getElementById('toggle-sidebar');

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('visible');
  });

  // Close on outside click (mobile only)
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !sidebar.contains(e.target) && 
        !toggleBtn.contains(e.target)) {
      sidebar.classList.remove('visible');
    }
  });

  // === Highlight Active Page ===
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#sidebar a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});



// Sidebar Functions
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const overlay = document.getElementById('overlay');

menuBtn.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('open');
      
      // Shift content
    if (isOpen) {
        mainContent.classList.add('content-shift');
        overlay.classList.add('active');
        // Adjust button position when sidebar opens
        menuBtn.style.left = (window.innerWidth <= 768 ? '210px' : '260px');
      }else {
        mainContent.classList.remove('content-shift');
        overlay.classList.remove('active');
        menuBtn.style.left = '15px';
      }
});

// Close sidebar when clicking overlay (mobile)
overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    mainContent.classList.remove('content-shift');
    overlay.classList.remove('active');
    menuBtn.style.left = '15px';
});

// Optional: Close on ESC key
document.addEventListener('keydown', (e) => {
     if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        mainContent.classList.remove('content-shift');
        overlay.classList.remove('active');
        menuBtn.style.left = '15px';
      }
});




//Footer JS
document.addEventListener('DOMContentLoaded', () => {
   const container = document.getElementById('footer-container');
    if (!container) return;

   const footerText = `
   Last updated: <strong>March 24, 2026</strong> • Maintained with care 
    `; // Edit Text ONLY

  container.innerHTML = `
   <footer id="footer">
   <p>${footerText}</p>
   </footer>
   `;
  });



//Accordion for Milestones

  const coll = document.getElementsByClassName("collapsible");
    for (let i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active1");
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                // Close others first (accordion behavior)
                for (let j = 0; j < coll.length; j++) {
                    if (j !== i) {
                        coll[j].classList.remove("active1");
                        coll[j].nextElementSibling.style.maxHeight = null;
                    }
                }
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }


// Select ALL images you want to make fullscreen-clickable
const images = document.querySelectorAll('.fullscreen-image');   // ← change selector as needed

images.forEach(img => {
    img.addEventListener('click', () => {
        if (!document.fullscreenElement) {
            // Enter fullscreen
            if (img.requestFullscreen) {
                img.requestFullscreen();
            } else if (img.webkitRequestFullscreen) {     // Safari
                img.webkitRequestFullscreen();
            } else if (img.msRequestFullscreen) {         // IE11
                img.msRequestFullscreen();
            }
        } else {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {   // Safari
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {       // IE11
                document.msExitFullscreen();
            }
        }
    });
});

