
        // --- System Init & Loader ---
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loader = document.getElementById('loader');
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    // Trigger hero animations explicitly after load
                    gsap.from('.hero .fade-in', {
                        opacity: 0,
                        y: 30,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power3.out"
                    });
                }, 500);
            }, 2000);
        });

        // --- Theme Toggle ---
        const themeToggle = document.getElementById('theme-toggle');
        const root = document.documentElement;
        const themeIcon = themeToggle.querySelector('i');
        let isLight = false;

        themeToggle.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                root.setAttribute('data-theme', 'light');
                themeIcon.className = 'fas fa-moon';
                isLight = true;
            } else {
                root.setAttribute('data-theme', 'dark');
                themeIcon.className = 'fas fa-sun';
                isLight = false;
            }
        });

        // --- Custom Cursor ---
        const cursor = document.querySelector('.custom-cursor');
        const follower = document.querySelector('.custom-cursor-follower');
        
        if (window.innerWidth > 768) {
            document.addEventListener('mousemove', e => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                
                setTimeout(() => {
                    follower.style.left = e.clientX + 'px';
                    follower.style.top = e.clientY + 'px';
                }, 80);
            });

            document.querySelectorAll('a, button, .project-card, .skill-badge, .contact-card, input, textarea').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(0)';
                    follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    follower.style.backgroundColor = 'rgba(0, 212, 255, 0.1)';
                });
                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                    follower.style.transform = 'translate(-50%, -50%) scale(1)';
                    follower.style.backgroundColor = 'transparent';
                });
            });
        }

        // --- Navbar & Scroll Behavior ---
        const nav = document.querySelector('nav');
        const sections = document.querySelectorAll('section, header');
        const navLinks = document.querySelectorAll('.nav-links a');
        const backToTop = document.getElementById('back-to-top');

        window.addEventListener('scroll', () => {
            // Navbar blur
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }

            // Back to top visibility
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }

            // Active links
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Mobile Menu
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinksContainer = document.querySelector('.nav-links');

        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });

        // --- Typed.js ---
        new Typed('.typed-roles', {
            strings: [
                'Electrical Engineer',
                'Electronics Engineer',
                'Cyber Security Enthusiast',
                'AI & ML Enthusiast',
                'Network Security Researcher'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            cursorChar: '|'
        });

        // --- Particles System ---
        const pCanvas = document.getElementById('particles-canvas');
        const ctx = pCanvas.getContext('2d');
        let particles = [];
        let w, h;

        function resizeParticles() {
            w = pCanvas.width = window.innerWidth;
            h = pCanvas.height = window.innerHeight;
        }
        window.addEventListener('resize', () => {
            resizeParticles();
        });
        resizeParticles();

        class Particle {
            constructor() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.6 - 0.3;
                this.speedY = Math.random() * 0.6 - 0.3;
                this.baseOpacity = Math.random() * 0.4 + 0.1;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x > w) this.x = 0;
                if (this.x < 0) this.x = w;
                if (this.y > h) this.y = 0;
                if (this.y < 0) this.y = h;
            }
            draw() {
                ctx.fillStyle = isLight ? `rgba(2, 132, 199, ${this.baseOpacity})` : `rgba(0, 212, 255, ${this.baseOpacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 80; i++) particles.push(new Particle());

        function animateParticles() {
            ctx.clearRect(0, 0, w, h);
            particles.forEach(p => { p.update(); p.draw(); });
            
            // Draw circuit connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = isLight ? `rgba(2, 132, 199, ${0.2 * (1 - distance/150)})` : `rgba(0, 212, 255, ${0.2 * (1 - distance/150)})`;
                        ctx.lineWidth = 1.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        // --- GSAP ScrollTrigger ---
        gsap.registerPlugin(ScrollTrigger);

        // General Fade-ins (excluding hero since it's handled by loader)
        gsap.utils.toArray('section .fade-in').forEach(element => {
            gsap.from(element, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power2.out"
            });
        });

        // Staggered Skills Badges
        gsap.utils.toArray('.skill-category').forEach((category, i) => {
            const badges = category.querySelectorAll('.skill-badge');
            gsap.from(badges, {
                scrollTrigger: {
                    trigger: category,
                    start: "top 85%",
                },
                opacity: 0,
                y: 20,
                stagger: 0.05,
                duration: 0.5,
                ease: "back.out(1.5)",
                delay: 0.2
            });
        });

        // --- Stat Counters ---
        const counters = document.querySelectorAll('.counter-val');
        let countersStarted = false;

        window.addEventListener('scroll', () => {
            const aboutSection = document.getElementById('about');
            if (!countersStarted && window.scrollY + window.innerHeight > aboutSection.offsetTop + 200) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const hasPlus = counter.getAttribute('data-plus') === 'true';
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current) + (hasPlus ? '+' : '');
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target + (hasPlus ? '+' : '');
                        }
                    };
                    updateCounter();
                });
                countersStarted = true;
            }
        });

        // --- Project Filtering ---
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category').split(' ');
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px) scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // --- Form Validation & Animation ---
        const form = document.getElementById('contact-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            let isValid = true;
            form.querySelectorAll('input, textarea').forEach(input => {
                if(!input.value.trim()) {
                    input.classList.add('error-shake');
                    setTimeout(() => input.classList.remove('error-shake'), 500);
                    isValid = false;
                }
            });

            if(isValid) {
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                btn.style.pointerEvents = 'none';
                
                // Simulate network request
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    btn.classList.add('success');
                    form.reset();
                    
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.pointerEvents = 'auto';
                        btn.classList.remove('success');
                    }, 4000);
                }, 1500);
            }
        });

        // --- Matrix Rain Effect ---
        const mCanvas = document.getElementById('matrix-canvas');
        const mCtx = mCanvas.getContext('2d');

        function resizeMatrix() {
            mCanvas.width = 300;
            mCanvas.height = mCanvas.offsetHeight || 800;
        }
        resizeMatrix();

        const matrixChars = "01";
        const mFontSize = 14;
        const mColumns = Math.floor(mCanvas.width / mFontSize);
        const mDrops = [];

        for(let x = 0; x < mColumns; x++) {
            mDrops[x] = Math.random() * -100;
        }

        function drawMatrix() {
            mCtx.fillStyle = isLight ? "rgba(248, 250, 252, 0.1)" : "rgba(10, 10, 15, 0.1)";
            mCtx.fillRect(0, 0, mCanvas.width, mCanvas.height);

            mCtx.fillStyle = isLight ? "#0284c7" : "#00d4ff";
            mCtx.font = "bold " + mFontSize + "px monospace";

            for(let i = 0; i < mDrops.length; i++) {
                if(mDrops[i] * mFontSize > 0) {
                    const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
                    mCtx.fillText(text, i * mFontSize, mDrops[i] * mFontSize);
                }

                if(mDrops[i] * mFontSize > mCanvas.height && Math.random() > 0.975) {
                    mDrops[i] = 0;
                }
                mDrops[i] += 0.5;
            }
            requestAnimationFrame(drawMatrix);
        }
        drawMatrix();

        window.addEventListener('resize', resizeMatrix);
    