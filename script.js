/* ══════════════════════════════════════════════════
   script.js — Serhat ALPER Portfolio
   Dark Cyber Theme | Blue Neon Accents
══════════════════════════════════════════════════ */

(function() {
    'use strict';

    // ─── DOM Elements ────────────────────────────────────
    const loader = document.getElementById('loader');
    const header = document.getElementById('header');
    const backTop = document.getElementById('back-top');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    const canvas = document.getElementById('particles-canvas');
    const typedTextEl = document.getElementById('typed-text');
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    // ─── 1. LOGO KÜP ANİMASYONU (10 SANİYEDE BİR DÖNEN İSİMLER) ───
    const cubeNames = ['Serhat', 'Alper', 'SerhatBOOM', 'BOOM'];
    let cubeIndex = 0;
    const cubeNameSpan = document.getElementById('cube-name');
    if(cubeNameSpan) {
        setInterval(() => {
            cubeIndex = (cubeIndex + 1) % cubeNames.length;
            cubeNameSpan.style.opacity = '0';
            setTimeout(() => {
                cubeNameSpan.textContent = cubeNames[cubeIndex];
                cubeNameSpan.style.opacity = '1';
            }, 200);
        }, 10000); // 10 saniye
    }

    // ─── 2. AÇILIŞ METNİ (LOADER) ─────────────────────────
    const loaderText = document.getElementById('loader-text');
    if(loaderText) loaderText.textContent = "Selam ben serhat";

    // ─── 3. ANİMASYONLU PP GALERİSİ (8 RESİM) ─────────────
    // Örnek resim URL'leri (kendi resimlerinle değiştir)
    const avatarImages = [
        "image/pp1.jpg",
        "image/pp2.jpg",
        "image/pp3.jpg",
        "image/pp4.jpg",
        "image/pp5.jpg",
        "image/pp6.jpg",
        "image/myPP.png",
        "image/myPP2.png"
    ];
    let avatarIndex = 0;
    const avatarIcon = document.getElementById('avatar-icon');
    const avatarImg = document.getElementById('avatar-img');
    if(avatarIcon && avatarImg) {
        // İlk resmi göster
        avatarIcon.style.display = 'none';
        avatarImg.style.display = 'block';
        avatarImg.src = avatarImages[0];
        
        setInterval(() => {
            avatarIndex = (avatarIndex + 1) % avatarImages.length;
            avatarImg.style.opacity = '0';
            setTimeout(() => {
                avatarImg.src = avatarImages[avatarIndex];
                avatarImg.style.opacity = '1';
            }, 300);
        }, 3000); // 3 saniyede bir değiş
    }

    // ─── 4. BLOG MODAL / POPUP SİSTEMİ ───────────────────
    const modal = document.getElementById('blogModal');
    const modalBody = document.getElementById('blog-modal-body');
    const closeBtn = document.getElementsByClassName('blog-modal-close')[0];
    
    // Blog içerikleri (Sen buraya istediğini yazabileceksin)
    const blogContents = {
        1: `
            <h3>Electron ile Masaüstü Uygulamaları</h3>
            <p>Electron, JavaScript, HTML ve CSS kullanarak masaüstü uygulamaları oluşturmayı sağlayan bir framework'tür. Bu yazıda, Electron'un temellerini, yapılandırmasını ve popüler uygulamalarını ele alacağım.</p>
            <p>Ayrıca, Electron ile bir uygulama geliştirme sürecini ve dağıtım yöntemlerini de anlatacağım. Electron ile SPA (Single Page Application) geliştirmek oldukça keyifli!</p>
        `,
        2: `
            <h3>Unity'de C# ile Oyun Geliştirme</h3>
            <p>Unity, sektörün en güçlü oyun motorlarından biridir. C# bilgisiyle 2D ve 3D oyunlar geliştirebilirsiniz. Bu yazıda, karakter hareketleri, fizik simülasyonları (Rigidbody, Collider) ve sahne yönetimi konularını ele alacağım.</p>
            <p>Kendi runner oyunumu yaparken karşılaştığım zorluklar ve çözümleri. Oyun yapmak isteyenler için başlangıç rehberi niteliğinde.</p>
        `,
        3: `
            <h3>Vibe Coding Nedir? Yapay Zeka ile Kod Yazmak</h3>
            <p>"Vibe Coding" yapay zeka araçlarını (GitHub Copilot, ChatGPT gibi) kullanarak daha hızlı ve yaratıcı kod yazma felsefesidir. Bu yazıda, AI yardımıyla projelerimi nasıl hızlandırdığımı, prompt yazma tekniklerini ve etik sınırları tartışacağım.</p>
            <p>Yapay zeka, tekrarlayan kodları yazmakta harika bir yardımcı, ancak mantık ve mimari tamamen bize ait. Kendi deneyimlerimi paylaşıyorum.</p>
        `
    };

    function openBlogPost(postId) {
        if(blogContents[postId]) {
            modalBody.innerHTML = blogContents[postId];
            modal.style.display = "block";
        } else {
            modalBody.innerHTML = "<p>İçerik hazırlanıyor. Buraya istediğin yazıyı ekleyebilirsin.</p>";
            modal.style.display = "block";
        }
    }

    if(modal && closeBtn) {
        closeBtn.onclick = function() { modal.style.display = "none"; }
        window.onclick = function(event) {
            if (event.target == modal) { modal.style.display = "none"; }
        }
        // Blog kartlarına tıklama olayı ekle
        document.querySelectorAll('.blog-post-trigger').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                const postId = trigger.getAttribute('data-post-id');
                if(postId) openBlogPost(postId);
                else openBlogPost('default');
            });
        });
    }

    // ─── LOADER ────────────────────────────────────────
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loader) loader.classList.add('hidden');
        }, 1400);
    });

    // ─── PARTICLES (Canvas Effect) ─────────────────────
    function initParticles() {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        let particles = [];
        const PARTICLE_COUNT = 80;

        function resizeCanvas() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }

        function createParticles() {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.5 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: (Math.random() - 0.5) * 0.2,
                    opacity: Math.random() * 0.4 + 0.1
                });
            }
        }

        function drawParticles() {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);
            for (let p of particles) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(76, 201, 255, ${p.opacity})`;
                ctx.fill();
                
                p.x += p.speedX;
                p.y += p.speedY;
                
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;
            }
            requestAnimationFrame(drawParticles);
        }

        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });

        resizeCanvas();
        createParticles();
        drawParticles();
    }

    // ─── CUSTOM CURSOR ────────────────────────────────
    function initCustomCursor() {
        if (!cursorDot || !cursorRing) return;
        
        document.addEventListener('mousemove', (e) => {
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorRing.style.left = e.clientX + 'px';
                cursorRing.style.top = e.clientY + 'px';
            }, 30);
        });
        
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorRing.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
            cursorRing.style.opacity = '1';
        });
    }

    // ─── TYPED TEXT ───────────────────────────
    function initTypedText() {
        if (!typedTextEl) return;
        
        const strings = [
            'Fullstack Developer',
            'Game Developer',
            'AI Enthusiast',
            'Problem Solver'
        ];
        let stringIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentString = strings[stringIndex];
            
            if (isDeleting) {
                typedTextEl.textContent = currentString.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextEl.textContent = currentString.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentString.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
                return;
            }
            
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                stringIndex = (stringIndex + 1) % strings.length;
                setTimeout(typeEffect, 500);
                return;
            }
            
            const speed = isDeleting ? 50 : 100;
            setTimeout(typeEffect, speed);
        }
        
        typeEffect();
    }

    // ─── SCROLL EFFECTS ─────────────────────
    function initScrollEffects() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            if (window.scrollY > 500) {
                backTop.classList.add('visible');
            } else {
                backTop.classList.remove('visible');
            }
        });
        
        if (backTop) {
            backTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // ─── HAMBURGER MENU ──────────────────────────────
    function initHamburger() {
        if (!hamburger || !navLinks) return;
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }

    // ─── ACTIVE NAVIGATION LINK ──────────────────────
    function initActiveNav() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPos = window.scrollY + 200;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                const href = item.getAttribute('href');
                if (href === `#${current}`) {
                    item.classList.add('active');
                }
            });
        });
    }

    // ─── TECH FILTER ─────────────────────────────────
    function initTechFilter() {
        const filterBtns = document.querySelectorAll('.tech-filter');
        const techCards = document.querySelectorAll('.tech-card');
        
        if (!filterBtns.length) return;
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                techCards.forEach(card => {
                    if (filter === 'all') {
                        card.classList.remove('hidden');
                    } else {
                        const category = card.getAttribute('data-category');
                        if (category === filter) {
                            card.classList.remove('hidden');
                        } else {
                            card.classList.add('hidden');
                        }
                    }
                });
            });
        });
    }

    // ─── PROJECTS FILTER ─────────────────────────────
    function initProjectsFilter() {
        const filterBtns = document.querySelectorAll('.proj-filter');
        const projectCards = document.querySelectorAll('.proj-card');
        
        if (!filterBtns.length) return;
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-pfilter');
                
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.classList.remove('hidden');
                    } else {
                        const category = card.getAttribute('data-pcat');
                        if (category === filter) {
                            card.classList.remove('hidden');
                        } else {
                            card.classList.add('hidden');
                        }
                    }
                });
            });
        });
    }

    // ─── STATS COUNTER ANIMATION ─────────────────────
    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-num');
        let animated = false;
        
        function animateNumbers() {
            if (animated) return;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                if (isNaN(target)) return;
                
                let current = 0;
                const increment = target / 50;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                    }
                };
                updateCounter();
            });
            animated = true;
        }
        
        function checkVisibility() {
            const statsRow = document.querySelector('.stats-row');
            if (statsRow && !animated) {
                const rect = statsRow.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    animateNumbers();
                }
            }
        }
        
        window.addEventListener('scroll', checkVisibility);
        checkVisibility();
    }

    // ─── TECH BARS ANIMATION ─────────────────────────
    function initTechBars() {
        const techFills = document.querySelectorAll('.tech-fill');
        let animated = false;
        
        function animateBars() {
            if (animated) return;
            techFills.forEach(fill => {
                const width = fill.style.width;
                fill.style.transform = 'scaleX(1)';
                fill.classList.add('animated');
            });
            animated = true;
        }
        
        function checkVisibility() {
            const techSection = document.getElementById('tech');
            if (techSection && !animated) {
                const rect = techSection.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    animateBars();
                }
            }
        }
        
        window.addEventListener('scroll', checkVisibility);
        techFills.forEach(fill => {
            const width = fill.getAttribute('style')?.match(/width:(\d+%)/)?.[1] || '0%';
            fill.style.width = width;
            fill.style.transform = 'scaleX(0)';
        });
        checkVisibility();
    }

    // ─── CONTACT FORM ────────────────────────────────
    function initContactForm() {
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('cf-name')?.value;
            const email = document.getElementById('cf-email')?.value;
            const message = document.getElementById('cf-msg')?.value;
            
            console.log('Form submitted:', { name, email, message });
            
            if (formSuccess) {
                formSuccess.classList.add('show');
                contactForm.reset();
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                }, 3000);
            }
        });
    }

    // ─── SMOOTH SCROLL ───────────────────────────────
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // ─── SWIPER INITIALIZATION ───────────────────────
    function initSwipers() {
        if (document.querySelector('.blog-swiper')) {
            new Swiper('.blog-swiper', {
                slidesPerView: 1,
                spaceBetween: 24,
                loop: true,
                pagination: {
                    el: '.blog-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.blog-next',
                    prevEl: '.blog-prev',
                },
                breakpoints: {
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }
            });
        }
        
        if (document.querySelector('.gallery-swiper')) {
            new Swiper('.gallery-swiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                pagination: {
                    el: '.gallery-pagination',
                    clickable: true,
                },
                breakpoints: {
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }
            });
        }
    }

    // ─── AOS INITIALIZATION ──────────────────────────
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                once: true,
                offset: 50,
                easing: 'ease-out-quad'
            });
        }
    }

    // ─── HIDE LOADER MANUALLY (Fallback) ─────────────
    function fallbackLoader() {
        setTimeout(() => {
            if (loader && !loader.classList.contains('hidden')) {
                loader.classList.add('hidden');
            }
        }, 3000);
    }

    // ─── INITIALIZE ALL ──────────────────────────────
    function init() {
        initParticles();
        initCustomCursor();
        initTypedText();
        initScrollEffects();
        initHamburger();
        initActiveNav();
        initTechFilter();
        initProjectsFilter();
        initStatsCounter();
        initTechBars();
        initContactForm();
        initSmoothScroll();
        initSwipers();
        initAOS();
        fallbackLoader();
        
        if ('ontouchstart' in window) {
            document.body.style.cursor = 'auto';
            if (cursorDot) cursorDot.style.display = 'none';
            if (cursorRing) cursorRing.style.display = 'none';
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();