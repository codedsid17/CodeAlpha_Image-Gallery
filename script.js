(() => {
    'use strict';
    const galleryData = [
        { src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&q=80', title: 'Emerald Waters', category: 'nature', size: 'tall'},
        { src: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=900&q=80', title: 'Alpine Solitude', category: 'nature', size: ''},
        { src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=900&q=80', title: 'Eiffel Dawn', category: 'travel', size: ''},
        { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&q=80', title: 'Margherita', category: 'food', size: 'tall'},
        { src: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=900&q=80', title: 'Cheetah Watch', category: 'animals', size: ''},
        { src: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=900&q=80', title: 'Skyline', category: 'architecture', size: 'wide'},
        { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80', title: 'Cloudbreak', category: 'nature', size: ''},
        { src: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=900&q=80', title: 'Souk Stroll', category: 'travel', size: ''},
        { src: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=900&q=80', title: 'Café Mornings', category: 'food', size: ''},
        { src: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=900&q=80', title: 'Wild Stallion', category: 'animals', size: 'tall'},
        { src: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=900&q=80', title: 'Notre Dame', category: 'architecture', size: ''},
        { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=80', title: 'Quiet Moment', category: 'people', size: ''},
        { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=900&q=80', title: 'Pine Mist', category: 'nature', size: 'wide'},
        { src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=80', title: 'Parisian Light', category: 'travel', size: ''},
        { src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=900&q=80', title: 'Berry Bowl', category: 'food', size: ''},
        { src: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=900&q=80', title: 'Forest Friend', category: 'animals', size: ''},
        { src: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=900&q=80', title: 'Curve & Form', category: 'architecture', size: ''},
        { src: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=900&q=80', title: 'Street Portrait', category: 'people', size: 'tall' },
        { src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&q=80', title: 'Fjord Glow', category: 'travel', size: ''},
        { src: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=900&q=80', title: 'Aurora Dance', category: 'nature', size: ''},
        { src: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=900&q=80', title: 'Pasta Craft', category: 'food', size: ''},
        { src: 'https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?w=900&q=80', title: 'Gothic', category: 'architecture', size: ''},
        { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&q=80', title: 'The Reader', category: 'people', size: ''},
        { src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=900&q=80', title: 'Cat Eyes', category: 'animals', size: ''},
    ];
    const $ = (s, p = document) => p.querySelector(s);
    const $$ = (s, p = document) => Array.from(p.querySelectorAll(s));

    const loader = $('#loader');
    const navbar = $('#navbar');
    const navMenu = $('#navMenu');
    const hamburger = $('#hamburger');
    const themeToggle = $('#themeToggle');
    const filterBar = $('#filterBar');
    const galleryGrid = $('#galleryGrid');
    const emptyState = $('#emptyState');
    const lightbox = $('#lightbox');
    const lightboxImg = $('#lightboxImg');
    const lightboxCaption = $('#lightboxCaption');
    const lightboxClose = $('#lightboxClose');
    const lightboxPrev = $('#lightboxPrev');
    const lightboxNext = $('#lightboxNext');
    const backToTop = $('#backToTop');
    const carouselEl = $('#carouselEl');
    const carouselTrack = $('#carouselTrack');
    const carouselPrev = $('#carouselPrev');
    const carouselNext = $('#carouselNext');
    const carouselDots = $('#carouselDots');
    let lightboxIndex = 0;
    let visibleItems = [];
    window.addEventListener('load', () => {
        setTimeout(() => loader.classList.add('hide'), 400);
    });
    const initTheme = () => {
        const saved = localStorage.getItem('lumiere-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = saved || (prefersDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
    };
    initTheme();
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('lumiere-theme', next);
    });
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
    });
    $$('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });
    const sections = ['home', 'carousel', 'categories', 'about'];
    const navLinks = $$('.nav-link');
    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
        backToTop.classList.toggle('show', window.scrollY > 600);
        let current = 'home';
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el && window.scrollY >= el.offsetTop - 150) {
                current = id;
            }
        });
        navLinks.forEach(link => {
            const href = link.getAttribute('href')?.replace('#', '');
            link.classList.toggle('active', href === current);
        });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    const slides = $$('.carousel-slide', carouselTrack);
    const totalSlides = slides.length;
    let currentSlide = 0;
    let autoPlayInterval;
    let isDragging = false;
    let startX = 0;
    let dragDeltaX = 0;
    const dragThreshold = 60;

    const positionSlides = () => {
        slides.forEach((slide, i) => {
            const offset = i - currentSlide;
            const absOffset = Math.abs(offset);

            let translateX = offset * 280;
            let translateZ = -absOffset * 200;
            let rotateY = offset * -25;
            let scale = 1 - absOffset * 0.18;
            let opacity = 1 - absOffset * 0.4;
            let zIndex = totalSlides - absOffset;

            if (isDragging) {
                translateX += dragDeltaX;
            }

            if (absOffset > 3) {
                opacity = 0;
                zIndex = 0;
            }

            slide.style.transform = `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${Math.max(scale, 0.5)})`;
            slide.style.opacity = Math.max(opacity, 0);
            slide.style.zIndex = zIndex;
            slide.classList.toggle('active', offset === 0);
        });
    };

    const updateDots = () => {
        $$('.carousel-dot', carouselDots).forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    };

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        carouselDots.appendChild(dot);
    });

    const goToSlide = (index) => {
        currentSlide = (index + totalSlides) % totalSlides;
        positionSlides();
        updateDots();
    };

    const nextSlide = () => goToSlide(currentSlide + 1);
    const prevSlide = () => goToSlide(currentSlide - 1);

    carouselNext.addEventListener('click', nextSlide);
    carouselPrev.addEventListener('click', prevSlide);

    const startAutoPlay = () => {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, 4500);
    };
    const stopAutoPlay = () => clearInterval(autoPlayInterval);

    carouselEl.addEventListener('mouseenter', stopAutoPlay);
    carouselEl.addEventListener('mouseleave', startAutoPlay);

    const onDragStart = (e) => {
        isDragging = true;
        startX = (e.touches ? e.touches[0].clientX : e.clientX);
        dragDeltaX = 0;
        stopAutoPlay();
        carouselEl.style.cursor = 'grabbing';
    };

    const onDragMove = (e) => {
        if (!isDragging) return;
        const x = (e.touches ? e.touches[0].clientX : e.clientX);
        dragDeltaX = x - startX;
        positionSlides();
    };

    const onDragEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        carouselEl.style.cursor = '';
        if (Math.abs(dragDeltaX) > dragThreshold) {
            if (dragDeltaX < 0) nextSlide();
            else prevSlide();
        } else {
            positionSlides();
        }
        dragDeltaX = 0;
        startAutoPlay();
    };

    carouselEl.addEventListener('mousedown', onDragStart);
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);
    carouselEl.addEventListener('mouseleave', () => {
        if (isDragging) onDragEnd();
    });

    carouselEl.addEventListener('touchstart', onDragStart, { passive: true });
    carouselEl.addEventListener('touchmove', onDragMove, { passive: true });
    carouselEl.addEventListener('touchend', onDragEnd);

    positionSlides();
    startAutoPlay();

    window.addEventListener('resize', positionSlides);

    const buildGalleryItem = (item, index) => {
        const el = document.createElement('div');
        el.className = 'gallery-item' + (item.size ? ` ${item.size}` : '');
        el.dataset.category = item.category;
        el.dataset.index = index;
        el.innerHTML = `
            <img src="${item.src}" alt="${item.title}" loading="lazy" decoding="async">
            <div class="gallery-overlay">
                <span class="gallery-category">${item.category}</span>
                <h3 class="gallery-title">${item.title}</h3>
            </div>
        `;
        el.addEventListener('click', () => openLightbox(index));
        return el;
    };

    const renderGallery = (filter = 'all') => {
        galleryGrid.innerHTML = '';
        visibleItems = [];

        galleryData.forEach((item, i) => {
            if (filter !== 'all' && item.category !== filter) return;
            const el = buildGalleryItem(item, galleryData.indexOf(item));
            visibleItems.push({ ...item, elIndex: galleryData.indexOf(item) });
            galleryGrid.appendChild(el);
        });

        emptyState.hidden = visibleItems.length > 0;

        $$('.gallery-item', galleryGrid).forEach((el, i) => {
            setTimeout(() => el.classList.add('show'), i * 50);
        });
    };

    renderGallery();

    filterBar.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        $$('.filter-btn', filterBar).forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        // Animate out then in
        $$('.gallery-item', galleryGrid).forEach(el => el.classList.remove('show'));
        setTimeout(() => renderGallery(filter), 300);
    });

    const openLightbox = (dataIndex) => {
        lightboxIndex = dataIndex;
        updateLightbox();
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    const updateLightbox = () => {
        const item = galleryData[lightboxIndex];
        if (!item) return;
        lightboxImg.src = item.src;
        lightboxImg.alt = item.title;
        lightboxCaption.textContent = `${item.title} · ${item.category}`;
    };

    const lightboxNextSlide = () => {
        lightboxIndex = (lightboxIndex + 1) % galleryData.length;
        updateLightbox();
    };

    const lightboxPrevSlide = () => {
        lightboxIndex = (lightboxIndex - 1 + galleryData.length) % galleryData.length;
        updateLightbox();
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', lightboxNextSlide);
    lightboxPrev.addEventListener('click', lightboxPrevSlide);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') lightboxNextSlide();
        if (e.key === 'ArrowLeft') lightboxPrevSlide();
    });
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    $$('.reveal').forEach(el => revealObserver.observe(el));

})();
