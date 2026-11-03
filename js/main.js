// Safeer Ahmad Portfolio - Main Interactive Logic
document.addEventListener('DOMContentLoaded', () => {
  // 1. Render Projects Grid
  const projectsContainer = document.getElementById('projectsContainer');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderProjects(category = 'all') {
    if (!projectsContainer || typeof PORTFOLIO_PROJECTS === 'undefined') return;

    const filtered = category === 'all' 
      ? PORTFOLIO_PROJECTS 
      : PORTFOLIO_PROJECTS.filter(p => p.category === category);

    projectsContainer.innerHTML = '';

    filtered.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.dataset.id = project.id;

      card.innerHTML = `
        <div class="project-thumb-box">
          <span class="project-badge-pill">${project.categoryLabel}</span>
          <img src="${project.coverUrl}" alt="${project.title}" loading="lazy">
          <div class="project-overlay-links">
            <button class="project-link-btn primary view-details-btn" data-id="${project.id}">
              <i class="fa-solid fa-eye"></i> Details
            </button>
            <a href="${project.behanceUrl}" target="_blank" rel="noopener noreferrer" class="project-link-btn secondary">
              <i class="fa-brands fa-behance"></i> Behance
            </a>
          </div>
        </div>
        <div class="project-info-body">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.description}</p>
          <div class="project-tags-cloud">
            ${project.tags.map(t => `<span class="project-tag">#${t}</span>`).join('')}
          </div>
        </div>
      `;

      projectsContainer.appendChild(card);
    });

    // Attach click events to modal triggers
    document.querySelectorAll('.view-details-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        openModal(id);
      });
    });
  }

  // Initial render
  renderProjects('all');

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      renderProjects(filter);
    });
  });

  // 2. Modal Setup
  const modal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTags = document.getElementById('modalTags');
  const modalBehanceBtn = document.getElementById('modalBehanceBtn');

  function openModal(projectId) {
    const project = PORTFOLIO_PROJECTS.find(p => p.id === projectId);
    if (!project) return;

    modalImg.src = project.coverUrl;
    modalCategory.textContent = project.categoryLabel;
    modalTitle.textContent = project.title;
    modalDesc.textContent = project.description;
    modalBehanceBtn.href = project.behanceUrl;

    modalTags.innerHTML = project.tags.map(t => `<span class="project-tag">#${t}</span>`).join('');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // 3. Header Scroll Effect & Active Nav Highlight
  const header = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.background = 'rgba(7, 10, 8, 0.96)';
      header.style.borderBottomColor = 'rgba(0, 255, 102, 0.25)';
    } else {
      header.style.background = 'rgba(7, 10, 8, 0.85)';
      header.style.borderBottomColor = 'rgba(0, 255, 102, 0.12)';
    }

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 4. Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  const sendWhatsAppBtn = document.getElementById('sendWhatsAppBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value.trim();
      const contact = document.getElementById('senderContact').value.trim();
      const service = document.getElementById('projectType').value;
      const message = document.getElementById('senderMessage').value.trim();

      const subject = encodeURIComponent(`Portfolio Inquiry: ${service} - from ${name}`);
      const body = encodeURIComponent(
        `Hi Safeer,\n\nName: ${name}\nContact: ${contact}\nService: ${service}\n\nProject Details:\n${message}\n\nSent from your portfolio website.`
      );

      window.location.href = `mailto:ssafeerahhmad@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener('click', () => {
      const name = document.getElementById('senderName').value.trim() || 'Client';
      const contact = document.getElementById('senderContact').value.trim() || 'Not specified';
      const service = document.getElementById('projectType').value;
      const message = document.getElementById('senderMessage').value.trim() || 'Hi Safeer, I would like to discuss a project with you.';

      const waText = encodeURIComponent(
        `*New Inquiry via Portfolio*\n\n*Name:* ${name}\n*Contact:* ${contact}\n*Service:* ${service}\n*Message:* ${message}`
      );

      window.open(`https://wa.me/916282426380?text=${waText}`, '_blank');
    });
  }

  // 5. Interactive Cursor Tracker / Spotlight on SAFEER AHMAD Title
  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) {
    const updateTitleLight = (e) => {
      const rect = heroTitle.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      heroTitle.style.setProperty('--mouse-x', `${x}%`);
      heroTitle.style.setProperty('--mouse-y', `${y}%`);
    };

    heroTitle.addEventListener('mousemove', updateTitleLight);
    heroTitle.addEventListener('pointermove', updateTitleLight);

    heroTitle.addEventListener('mouseleave', () => {
      heroTitle.style.setProperty('--mouse-x', '50%');
      heroTitle.style.setProperty('--mouse-y', '50%');
    });
  }

  // 6. Fast & Snappy 3D Zoom-out Overlap Across All Sections (Skills, Works, Journey, Contact)
  const stackSections = [
    { el: document.getElementById('skills'), inner: document.getElementById('skillsInner') },
    { el: document.getElementById('works'), inner: document.getElementById('worksInner') },
    { el: document.getElementById('journey'), inner: document.getElementById('journeyInner') },
    { el: document.getElementById('contact'), inner: document.getElementById('contactInner') }
  ].filter(s => s.el && s.inner);

  const updateSectionStacks = () => {
    if (window.innerWidth <= 768) {
      stackSections.forEach(s => {
        s.inner.style.transform = '';
        s.inner.style.opacity = '';
        s.inner.style.filter = '';
      });
      return;
    }

    const winHeight = window.innerHeight;
    const headerHeight = 72;

    for (let i = 0; i < stackSections.length - 1; i++) {
      const current = stackSections[i];
      const next = stackSections[i + 1];

      const nextRect = next.el.getBoundingClientRect();

      // The moment the next section enters the bottom of the viewport
      // up until it locks into position at the header:
      if (nextRect.top < winHeight && nextRect.top > headerHeight) {
        // Immediate overlap: progress moves from 0 (touches bottom) to 1 (reaches top)
        const progress = Math.min(Math.max((winHeight - nextRect.top) / (winHeight - headerHeight), 0), 1);

        // Immediate 3D pushback: scale 1 -> 0.86, opacity 1 -> 0.35, blur 0 -> 5px
        const scale = (1 - 0.14 * progress).toFixed(3);
        const opacity = (1 - 0.65 * progress).toFixed(3);
        const translateY = (progress * 40).toFixed(1);
        const blur = (progress * 5).toFixed(1);

        current.inner.style.transform = `scale(${scale}) translateY(${translateY}px) translateZ(-${progress * 70}px)`;
        current.inner.style.opacity = opacity;
        current.inner.style.filter = `blur(${blur}px)`;
      } else if (nextRect.top <= headerHeight) {
        // Fully overlapped by next section
        current.inner.style.transform = 'scale(0.86) translateY(40px) translateZ(-70px)';
        current.inner.style.opacity = '0.35';
        current.inner.style.filter = 'blur(5px)';
      } else {
        // Next section has not yet started entering
        current.inner.style.transform = 'scale(1) translateY(0px) translateZ(0)';
        current.inner.style.opacity = '1';
        current.inner.style.filter = 'blur(0px)';
      }
    }
  };

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateSectionStacks();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', updateSectionStacks);
  updateSectionStacks();
});
