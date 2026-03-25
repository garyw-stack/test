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
   Last updated: <strong>March 24, 2026</strong> • The Track Family Fun Parks
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
const images = document.querySelectorAll('.fullscreen-image');

images.forEach(img => {
    img.addEventListener('click', async () => {
        try {
            if (!document.fullscreenElement) {
                // Enter fullscreen – modern + prefixed for Safari
                if (img.requestFullscreen) {
                    await img.requestFullscreen();
                } else if (img.webkitRequestFullscreen) {
                    await img.webkitRequestFullscreen();   // Safari (macOS + iPad)
                } else if (img.msRequestFullscreen) {
                    img.msRequestFullscreen();             // Old IE (rare now)
                } else {
                    console.warn('Fullscreen not supported on this device/browser');
                    // Optional: show a message to iPhone users
                    alert("Fullscreen is not supported on iPhone Safari.\n\nTry rotating your device or using a different browser.");
                }
            } else {
                // Exit fullscreen
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        } catch (err) {
            console.error('Fullscreen error:', err);
        }
    });
});


// Function to apply theme
function setTheme(isDark) {
    if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
}

// Initial detection
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
setTheme(prefersDark.matches);

// Listen for changes (user switches OS theme)
prefersDark.addEventListener('change', (e) => {
    setTheme(e.matches);
});

// Optional: Manual toggle button
const toggleBtn = document.getElementById('theme-toggle');
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        const isCurrentlyDark = document.documentElement.getAttribute('data-theme') === 'dark';
        setTheme(!isCurrentlyDark);
        
        // Optional: save user preference in localStorage (overrides system)
        localStorage.setItem('theme', !isCurrentlyDark ? 'dark' : 'light');
    });
}

// Optional: Respect saved user preference on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme === 'dark');
}