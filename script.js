/**
 * Vikash Kumar — Personal Profile & Digital Brand Website
 * Client Interactions, Navigation, Lightbox & Gallery Config
 */

// ==========================================================================
// 1. EASILY CONFIGURABLE PHOTO GALLERY CONFIGURATION
// To add or update photos, modify this list with your image paths and details.
// ==========================================================================
const galleryImages = [
  {
    id: "photo-01",
    src: "assets/gallery/vikash-kumar-profile.jpg",
    fallbackSrc: "assets/gallery/vikash-kumar-profile.svg",
    alt: "Vikash Kumar — Co-Founder of Elite Interior, Ahmedabad",
    caption: "Vikash Kumar — Co-Founder & Head of Digital Operations",
    category: "Profile"
  },
  {
    id: "photo-02",
    src: "assets/gallery/vikash-kumar-elite-interior.jpg",
    fallbackSrc: "assets/gallery/vikash-kumar-elite-interior.svg",
    alt: "Elite Interior — Turnkey Interior Execution & Modular Concepts",
    caption: "Turnkey Interior Projects & Residential Spaces",
    category: "Elite Interior"
  },
  {
    id: "photo-03",
    src: "assets/gallery/vikash-kumar-office.jpg",
    fallbackSrc: "assets/gallery/vikash-kumar-office.svg",
    alt: "Elite Interior Office at Sun South Trade, South Bopal, Ahmedabad",
    caption: "Business Office — Sun South Trade, South Bopal",
    category: "Workspace"
  },
  {
    id: "photo-04",
    src: "assets/gallery/vikash-kumar-projects.jpg",
    fallbackSrc: "assets/gallery/vikash-kumar-projects.svg",
    alt: "Modern Modular Living & Dining Interior Concepts by Elite Interior",
    caption: "Modular Living & Dining Interior Concepts",
    category: "Projects"
  },
  {
    id: "photo-05",
    src: "assets/gallery/vikash-kumar-execution.jpg",
    fallbackSrc: "assets/gallery/vikash-kumar-execution.svg",
    alt: "Turnkey Site Execution & Material Craftsmanship in Gujarat",
    caption: "Turnkey Site Execution & Material Craftsmanship",
    category: "Execution"
  },
  {
    id: "photo-06",
    src: "assets/gallery/vikash-kumar-event.jpg",
    fallbackSrc: "assets/gallery/vikash-kumar-event.svg",
    alt: "Design Industry Engagements & Professional Collaborations",
    caption: "Professional Design Industry Collaborations",
    category: "Engagements"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // Global Toast Notification Helper
  const toastNotice = document.getElementById('toastNotice');
  function showToast(message) {
    if (!toastNotice) return;
    toastNotice.textContent = message;
    toastNotice.classList.add('is-visible');
    setTimeout(() => {
      toastNotice.classList.remove('is-visible');
    }, 3200);
  }

  // 1. Mobile Menu Drawer
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileDrawerOverlay');
  const mobileClose = document.getElementById('mobileDrawerClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-doc-link');

  function openMobileMenu() {
    mobileDrawer?.classList.add('is-open');
    mobileOverlay?.classList.add('is-open');
    mobileToggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileDrawer?.classList.remove('is-open');
    mobileOverlay?.classList.remove('is-open');
    mobileToggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openMobileMenu);
  mobileClose?.addEventListener('click', closeMobileMenu);
  mobileOverlay?.addEventListener('click', closeMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // 2. Documents Dropdown Menu in Header
  const docsDropdown = document.getElementById('docsDropdown');
  const docsDropdownBtn = document.getElementById('docsDropdownBtn');

  if (docsDropdown && docsDropdownBtn) {
    docsDropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = docsDropdown.classList.contains('is-open');
      if (isOpen) {
        docsDropdown.classList.remove('is-open');
        docsDropdownBtn.setAttribute('aria-expanded', 'false');
      } else {
        docsDropdown.classList.add('is-open');
        docsDropdownBtn.setAttribute('aria-expanded', 'true');
      }
    });

    document.addEventListener('click', (e) => {
      if (!docsDropdown.contains(e.target)) {
        docsDropdown.classList.remove('is-open');
        docsDropdownBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 3. Digital Visiting Card Preview Modal
  const previewCardBtn = document.getElementById('previewCardBtn');
  const cardModal = document.getElementById('cardModal');
  const cardModalClose = document.getElementById('cardModalClose');

  function openCardModal() {
    cardModal?.classList.add('is-active');
    cardModal?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCardModal() {
    cardModal?.classList.remove('is-active');
    cardModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  previewCardBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    openCardModal();
  });

  cardModalClose?.addEventListener('click', closeCardModal);
  cardModal?.addEventListener('click', (e) => {
    if (e.target === cardModal) {
      closeCardModal();
    }
  });

  // 4. Copy Contact Details Action
  const copyDetailsBtn = document.getElementById('copyDetailsBtn');
  copyDetailsBtn?.addEventListener('click', async () => {
    const contactText = `Vikash Kumar
Co-Founder, Elite Interior
Phone / WhatsApp: +91 8529326036
Email: vikashkumar823981@gmail.com
Address: A-212a, Sun South Trade, Gala Gymkhana Rd, South Bopal, Ahmedabad, Gujarat 380058
Web: https://vikash.eliteinterior.pro/ | https://eliteinterior.pro/`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(contactText);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = contactText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showToast('✓ Contact details copied to clipboard!');
    } catch (err) {
      showToast('Contact details ready to copy');
    }
  });

  // 5. Generate & Save vCard (.vcf)
  const downloadVcfBtn = document.getElementById('downloadVcfBtn');
  downloadVcfBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Vikash Kumar',
      'N:Kumar;Vikash;;;',
      'ORG:Elite Interior',
      'TITLE:Co-Founder',
      'TEL;TYPE=CELL,VOICE,PREF:+918529326036',
      'EMAIL;TYPE=WORK,INTERNET:vikashkumar823981@gmail.com',
      'URL;TYPE=WORK:https://vikash.eliteinterior.pro/',
      'URL;TYPE=Company:https://eliteinterior.pro/',
      'ADR;TYPE=WORK:;;A-212a Sun South Trade Gala Gymkhana Road;South Bopal Ahmedabad;Gujarat;380058;India',
      'NOTE:Co-Founder at Elite Interior. Turnkey Interiors & Digital Systems.',
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vikash-kumar.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('✓ Contact saved as vikash-kumar.vcf');
  });

  // ==========================================================================
  // 6. LIGHTBOX FUNCTIONALITY (Gallery Page & Homepage Previews)
  // ==========================================================================
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentGalleryList = [...galleryImages];
  let currentImageIndex = 0;

  function updateLightboxView() {
    if (!lightboxImg || currentGalleryList.length === 0) return;
    const item = currentGalleryList[currentImageIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxImg.onerror = function() {
      if (item.fallbackSrc) {
        this.onerror = null;
        this.src = item.fallbackSrc;
      }
    };
    if (lightboxCaption) lightboxCaption.textContent = item.caption || item.alt;
    if (lightboxCounter) lightboxCounter.textContent = `${currentImageIndex + 1} / ${currentGalleryList.length}`;
  }

  function openLightbox(index, customList) {
    if (customList && customList.length) {
      currentGalleryList = customList;
    } else {
      currentGalleryList = [...galleryImages];
    }
    currentImageIndex = Math.max(0, Math.min(index, currentGalleryList.length - 1));
    updateLightboxView();
    lightbox?.classList.add('is-active');
    lightbox?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox?.classList.remove('is-active');
    lightbox?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showNextImage() {
    if (currentGalleryList.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % currentGalleryList.length;
    updateLightboxView();
  }

  function showPrevImage() {
    if (currentGalleryList.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + currentGalleryList.length) % currentGalleryList.length;
    updateLightboxView();
  }

  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxNext?.addEventListener('click', showNextImage);
  lightboxPrev?.addEventListener('click', showPrevImage);

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Touch Swipe on Mobile for Lightbox
  let touchStartX = 0;
  let touchEndX = 0;
  lightbox?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      showNextImage();
    } else if (touchEndX - touchStartX > 50) {
      showPrevImage();
    }
  }, { passive: true });

  // Attach click listeners to gallery cards
  document.querySelectorAll('.gallery-card[data-index]').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.getAttribute('data-index') || '0', 10);
      openLightbox(idx);
    });
  });

  // 7. Category Filter Tabs on Gallery Page
  const filterTabs = document.querySelectorAll('.filter-tab');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      const filterVal = tab.getAttribute('data-category');
      let visibleIndex = 0;
      let filteredItems = [];

      galleryCards.forEach(card => {
        const itemCategory = card.getAttribute('data-category');
        if (filterVal === 'all' || itemCategory === filterVal) {
          card.style.display = 'flex';
          const cardId = card.getAttribute('data-id');
          const matchedItem = galleryImages.find(img => img.id === cardId);
          if (matchedItem) filteredItems.push(matchedItem);
          card.setAttribute('data-filtered-index', String(visibleIndex));
          visibleIndex++;
        } else {
          card.style.display = 'none';
        }
      });

      // Update click handler on filtered cards
      galleryCards.forEach(card => {
        if (card.style.display !== 'none') {
          card.onclick = () => {
            const filteredIdx = parseInt(card.getAttribute('data-filtered-index') || '0', 10);
            openLightbox(filteredIdx, filteredItems);
          };
        }
      });
    });
  });

  // 8. Share Gallery Action (Web Share API with Copy-Link Fallback)
  const shareGalleryBtn = document.getElementById('shareGalleryBtn');
  shareGalleryBtn?.addEventListener('click', async () => {
    const shareData = {
      title: 'Vikash Kumar — Photo Gallery',
      text: 'Explore the official photo gallery of Vikash Kumar, Co-Founder of Elite Interior.',
      url: 'https://vikash.eliteinterior.pro/gallery.html'
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        // User cancelled or share failed, fallback to copy
      }
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareData.url);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = shareData.url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showToast('✓ Gallery link copied to clipboard!');
    } catch (err) {
      showToast('Link: https://vikash.eliteinterior.pro/gallery.html');
    }
  });

  // 9. Global Escape & Arrow Keys Listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightbox?.classList.contains('is-active')) closeLightbox();
      if (cardModal?.classList.contains('is-active')) closeCardModal();
      if (mobileDrawer?.classList.contains('is-open')) closeMobileMenu();
      if (docsDropdown?.classList.contains('is-open')) {
        docsDropdown.classList.remove('is-open');
        docsDropdownBtn?.setAttribute('aria-expanded', 'false');
      }
    } else if (e.key === 'ArrowRight' && lightbox?.classList.contains('is-active')) {
      showNextImage();
    } else if (e.key === 'ArrowLeft' && lightbox?.classList.contains('is-active')) {
      showPrevImage();
    }
  });

  // 10. Back to Top Button
  const backToTopBtn = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('is-visible');
    } else {
      backToTopBtn?.classList.remove('is-visible');
    }
  }, { passive: true });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 11. Image Error Resilience for Profile Photo & Logo
  const heroImg = document.getElementById('heroPortraitImage');
  if (heroImg) {
    heroImg.addEventListener('error', function() {
      this.onerror = null;
      this.src = '/vikashkumar.svg';
    });
  }

  const logoImg = document.getElementById('siteLogoImg');
  if (logoImg) {
    logoImg.addEventListener('error', function() {
      this.onerror = null;
      this.src = '/logo.svg';
    });
  }
});
