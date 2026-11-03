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

      window.location.href = `mailto:safeerahhmad@gmail.com?subject=${subject}&body=${body}`;
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

  // 6. Skills Horizontal Carousel + 3D Zoom-out Exit + Section Stacks
  const pinWrapper = document.getElementById('skillsPinWrapper');
  const skillsViewport = document.getElementById('skillsStickyViewport');
  const softwareTrack = document.getElementById('softwareTrack');
  const cards = Array.from(document.querySelectorAll('.software-card-featured'));
  const stepDots = Array.from(document.querySelectorAll('.step-dot'));
  const stepNum = document.getElementById('carouselStepNum');

  const worksSection = document.getElementById('works');
  const worksInner = document.getElementById('worksInner');
  const journeySection = document.getElementById('journey');
  const journeyInner = document.getElementById('journeyInner');
  const contactSection = document.getElementById('contact');
  const contactInner = document.getElementById('contactInner');

  // Interactive Dot Click Navigation
  stepDots.forEach(dot => {
    dot.addEventListener('click', () => {
      if (!pinWrapper) return;
      const step = parseInt(dot.getAttribute('data-step'), 10);
      const headerHeight = 72;
      const totalScrollable = pinWrapper.offsetHeight - window.innerHeight;
      const targetProgress = (step / 3) * 0.98;
      const targetScrollTop = pinWrapper.offsetTop - headerHeight + (targetProgress * totalScrollable);
      window.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
    });
  });

  const remainingStack = [
    { el: worksSection, inner: worksInner },
    { el: journeySection, inner: journeyInner },
    { el: contactSection, inner: contactInner }
  ].filter(s => s.el && s.inner);

  const updateSectionStacks = () => {
    const isMobile = window.innerWidth <= 768;
    const winHeight = window.innerHeight;
    const winWidth = window.innerWidth;
    const headerEl = document.querySelector('header.site-header');
    const headerHeight = headerEl ? headerEl.offsetHeight : 72;

    // --- Phase A: Skills Horizontal Glide & Fast 3D Exit to Works (Active on BOTH Desktop & Mobile) ---
    if (pinWrapper && skillsViewport && softwareTrack && cards.length > 0) {
      const wrapperRect = pinWrapper.getBoundingClientRect();
      const totalScrollable = pinWrapper.offsetHeight - winHeight;
      const currentScroll = -(wrapperRect.top - headerHeight);

      // Compute starting and ending horizontal translations to center Card 0 and Card 3
      const card0 = cards[0];
      const cardLast = cards[cards.length - 1];
      const startX = (winWidth - card0.offsetWidth) / 2 - card0.offsetLeft;
      const endX = (winWidth - cardLast.offsetWidth) / 2 - cardLast.offsetLeft;

      if (currentScroll < totalScrollable) {
        // Horizontal sliding between 4 cards (Card 0 -> Card 1 -> Card 2 -> Card 3)
        const pCard = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
        const currentX = startX + (endX - startX) * pCard;
        softwareTrack.style.transform = `translateX(${currentX}px)`;

        // Keep skills viewport completely active, clear & in-place
        skillsViewport.style.transform = 'scale(1) translateY(0px) translateZ(0)';
        skillsViewport.style.opacity = '1';
        skillsViewport.style.filter = 'blur(0px)';

        if (worksSection) {
          worksSection.style.transform = '';
        }
      } else {
        // Card 4 locked in center position
        softwareTrack.style.transform = `translateX(${endX}px)`;

        // Fast & snappy transition to Works (completes in 1-2 drags / ~260px)
        const delta = currentScroll - totalScrollable;
        const TRANSITION_DIST = 260; // 1-2 mouse wheel drags
        const totalTravel = winHeight - headerHeight;
        const pTrans = Math.min(Math.max(delta / TRANSITION_DIST, 0), 1);

        // Immediate 3D Zoom-out + Fade of Skills:
        const scale = (1 - 0.16 * pTrans).toFixed(3);
        const opacity = (1 - 0.92 * pTrans).toFixed(3);
        const translateY = (pTrans * 40).toFixed(1);
        const blur = (pTrans * 6).toFixed(1);

        skillsViewport.style.transform = `scale(${scale}) translateY(${translateY}px) translateZ(-${pTrans * 80}px)`;
        skillsViewport.style.opacity = opacity;
        skillsViewport.style.filter = `blur(${blur}px)`;

        // Swift upward curtain-glide of Works to cover the screen full-bleed:
        if (worksSection) {
          if (delta < totalTravel) {
            const currentTravel = pTrans * totalTravel;
            const boostY = -(currentTravel - delta);
            worksSection.style.transform = `translateY(${boostY.toFixed(1)}px)`;
          } else {
            worksSection.style.transform = '';
          }
        }
      }

      // Update active card badge & step indicator based on screen center proximity
      let bestIndex = 0;
      let minDistance = Infinity;
      cards.forEach((card, idx) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(winWidth / 2 - cardCenter);
        if (dist < minDistance) {
          minDistance = dist;
          bestIndex = idx;
        }
      });

      cards.forEach((card, idx) => {
        if (idx === bestIndex) {
          card.classList.add('card-active');
        } else {
          card.classList.remove('card-active');
        }
      });

      stepDots.forEach((dot, idx) => {
        if (idx === bestIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });

      if (stepNum) {
        stepNum.textContent = `0${bestIndex + 1} / 04`;
      }
    }

    // --- Phase B: Works, Journey, Contact Overlapping 3D Stacks (Desktop only) ---
    if (isMobile) {
      remainingStack.forEach(s => {
        s.inner.style.transform = '';
        s.inner.style.opacity = '';
        s.inner.style.filter = '';
      });
      return;
    }

    for (let i = 0; i < remainingStack.length - 1; i++) {
      const current = remainingStack[i];
      const next = remainingStack[i + 1];
      const nextRect = next.el.getBoundingClientRect();

      if (nextRect.top < winHeight && nextRect.top > headerHeight) {
        const p = Math.min(Math.max((winHeight - nextRect.top) / (winHeight - headerHeight), 0), 1);
        const scale = (1 - 0.14 * p).toFixed(3);
        const opacity = (1 - 0.65 * p).toFixed(3);
        const translateY = (p * 40).toFixed(1);
        const blur = (p * 5).toFixed(1);

        current.inner.style.transform = `scale(${scale}) translateY(${translateY}px) translateZ(-${p * 70}px)`;
        current.inner.style.opacity = opacity;
        current.inner.style.filter = `blur(${blur}px)`;
      } else if (nextRect.top <= headerHeight) {
        current.inner.style.transform = 'scale(0.86) translateY(40px) translateZ(-70px)';
        current.inner.style.opacity = '0.35';
        current.inner.style.filter = 'blur(5px)';
      } else {
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
