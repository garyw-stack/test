// Sidebar Build
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('sidebar-container');
  if (!container) return;

  const menuItems = [
    { href: 'index.html',   text: 'Park Selection' },
    { href: 'gstrack.html', text: 'Track - Gulf Shores' },
    { href: 'dtrack.html',  text: 'Track - Destin' },
    { href: 'mbtrack.html', text: 'Track - Myrtle Beach' },
    { href: 'pftrack.html', text: 'Track - Pigeon Forge' }
  ];

  let navHTML = '<nav><ul>';
  menuItems.forEach(item => {
    navHTML += `<li><a href="${item.href}">${item.text}</a></li>`;
  });
  navHTML += '</ul></nav>';

  container.innerHTML = navHTML;

  // Highlight active page link
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#sidebar a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});



// Sidebar Toggle
const menuBtn    = document.getElementById('menuBtn');
const sidebar    = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const overlay    = document.getElementById('overlay');

function closeSidebar() {
  sidebar.classList.remove('open');
  mainContent.classList.remove('content-shift');
  overlay.classList.remove('active');
  menuBtn.style.left = '15px';
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'Open navigation menu');
}

menuBtn.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  menuBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');

  if (isOpen) {
    mainContent.classList.add('content-shift');
    overlay.classList.add('active');
    menuBtn.style.left = (window.innerWidth <= 768 ? '210px' : '260px');
  } else {
    mainContent.classList.remove('content-shift');
    overlay.classList.remove('active');
    menuBtn.style.left = '15px';
  }
});

overlay.addEventListener('click', closeSidebar);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && sidebar.classList.contains('open')) {
    closeSidebar();
  }
});

// Swipe left to close sidebar on mobile
let touchStartX = 0;
document.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
}, { passive: true });
document.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  if (touchStartX - touchEndX > 50 && sidebar.classList.contains('open')) {
    closeSidebar();
  }
}, { passive: true });



// Footer
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('footer-container');
  if (!container) return;

  container.innerHTML = `
    <footer id="footer">
      <p>Last updated: <strong>March 24, 2026</strong> &bull; The Track Family Fun Parks</p>
    </footer>
  `;
});



// Accordion for Milestones
const coll = document.getElementsByClassName('collapsible');
for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener('click', function () {
    this.classList.toggle('active1');
    const content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      // Close others first (accordion behavior)
      for (let j = 0; j < coll.length; j++) {
        if (j !== i) {
          coll[j].classList.remove('active1');
          coll[j].nextElementSibling.style.maxHeight = null;
        }
      }
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
}



// Fullscreen image viewer (click to enlarge)
const images = document.querySelectorAll('.fullscreen-image');
images.forEach(img => {
  img.addEventListener('click', async () => {
    try {
      if (!document.fullscreenElement) {
        if (img.requestFullscreen) {
          await img.requestFullscreen();
        } else if (img.webkitRequestFullscreen) {
          await img.webkitRequestFullscreen();
        } else if (img.msRequestFullscreen) {
          img.msRequestFullscreen();
        }
      } else {
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
