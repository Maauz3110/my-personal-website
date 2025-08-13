// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const particlesContainer = document.querySelector('.particles-container');
const sparklesContainer = document.querySelector('.sparkles-container');
const floatingBooksContainer = document.querySelector('.floating-books');
const flickeringCandlesContainer = document.querySelector('.flickering-candles');
const shadowFiguresContainer = document.querySelector('.shadow-figures');
const gothicRunesContainer = document.querySelector('.gothic-runes');
const customCursor = document.querySelector('.custom-cursor');
const cursorTrail = document.querySelector('.cursor-trail');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const musicToggle = document.querySelector('.music-toggle');
const contactForm = document.querySelector('.contact-form');

// Dark Magical Horror Background System
class DarkMagicalHorrorSystem {
    constructor() {
        this.init();
    }

    init() {
        this.createParticles();
        this.createSparkles();
        this.setupVideoAutoplay();
        this.setupSmoothMovement();
    }

    createParticles() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const particleCount = isMobile ? 15 : 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: ${Math.random() > 0.5 ? '#00ffff' : '#ffd700'};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5 + 0.3};
                animation: float-particle-slow ${Math.random() * 20 + 15}s ease-in-out infinite;
                animation-delay: ${Math.random() * 10}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }

    createSparkles() {
        const sparklesContainer = document.querySelector('.sparkles');
        if (!sparklesContainer) return;

        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        const sparkleCount = isMobile ? 10 : 12;

        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.innerHTML = '✨';
            sparkle.style.cssText = `
                position: absolute;
                font-size: ${Math.random() * 10 + 8}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.7 + 0.3};
                animation: sparkle-twinkle-slow ${Math.random() * 15 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 12}s;
                pointer-events: none;
            `;
            sparklesContainer.appendChild(sparkle);
        }
    }

    setupVideoAutoplay() {
        const videos = document.querySelectorAll('.floating-video');
        if (!videos.length) return;

        videos.forEach((video, index) => {
            // Ensure video plays automatically and continuously
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;

            // Force play on user interaction
            document.addEventListener('click', () => {
                if (video.paused) {
                    video.play().catch(e => console.log(`Video ${index + 1} autoplay failed:`, e));
                }
            });

            // Ensure video plays when page loads
            window.addEventListener('load', () => {
                setTimeout(() => {
                    video.play().catch(e => console.log(`Video ${index + 1} autoplay failed:`, e));
                }, 1000 + (index * 500)); // Stagger video loading
            });

            // Handle video errors
            video.addEventListener('error', (e) => {
                console.log(`Video ${index + 1} error:`, e);
            });

            // Ensure video restarts if it stops
            video.addEventListener('ended', () => {
                video.currentTime = 0;
                video.play().catch(e => console.log(`Video ${index + 1} restart failed:`, e));
            });
        });
    }

    setupSmoothMovement() {
        // Add gentle parallax effect on scroll
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // Also re-apply parallax after visibility toggles to avoid stuck transforms
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.updateParallax();
            }
        });
    }

    updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.1;

        // Gentle parallax for magical elements
        const magicalImages = document.querySelectorAll('.magical-image');
        const magicalVideos = document.querySelectorAll('.magical-video');
        const floatingBooks = document.querySelectorAll('.floating-book');
        const flickeringCandles = document.querySelectorAll('.flickering-candle');
        const shadowFigures = document.querySelectorAll('.shadow-figure');
        const gothicRunes = document.querySelectorAll('.gothic-rune');

        // Apply gentle parallax movement
        magicalImages.forEach((image, index) => {
            const speed = 0.05 + (index * 0.01);
            image.style.transform = `translateY(${rate * speed}px)`;
        });

        // Apply parallax to all videos with different speeds
        magicalVideos.forEach((video, index) => {
            const speed = 0.03 + (index * 0.01);
            if (index === 0) {
                // Main video (center)
                video.style.transform = `translateX(-50%) translateY(${rate * speed}px)`;
            } else {
                // Additional videos (positioned absolutely) - gentler movement
                const gentleSpeed = 0.02 + (index * 0.005);
                video.style.transform = `translateY(${rate * gentleSpeed}px)`;
            }
        });

        floatingBooks.forEach((book, index) => {
            const speed = 0.04 + (index * 0.01);
            book.style.transform = `translateY(${rate * speed}px)`;
        });

        flickeringCandles.forEach((candle, index) => {
            const speed = 0.06 + (index * 0.01);
            candle.style.transform = `translateY(${rate * speed}px)`;
        });

        shadowFigures.forEach((shadow, index) => {
            const speed = 0.03 + (index * 0.01);
            shadow.style.transform = `translateY(${rate * speed}px)`;
        });

        gothicRunes.forEach((rune, index) => {
            const speed = 0.05 + (index * 0.01);
            rune.style.transform = `translateY(${rate * speed}px)`;
        });
    }
}

// Custom Cursor
class CustomCursor {
    constructor() {
        this.cursor = customCursor;
        this.trail = cursorTrail;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.moveCursor(e);
        });

        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .skill-orb, .project-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(2)';
                this.trail.style.transform = 'scale(1.5)';
            });

            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.trail.style.transform = 'scale(1)';
            });
        });
    }

    moveCursor(e) {
        const x = e.clientX;
        const y = e.clientY;

        // Main cursor
        gsap.to(this.cursor, {
            x: x - 10,
            y: y - 10,
            duration: 0.1,
            ease: "power2.out"
        });

        // Cursor trail
        gsap.to(this.trail, {
            x: x - 5,
            y: y - 5,
            duration: 0.3,
            ease: "power2.out"
        });
    }
}

// Navigation
class Navigation {
    constructor() {
        this.hamburger = hamburger;
        this.navMenu = navMenu;
        this.init();
    }

    init() {
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => {
                this.toggleMenu();
            });
        }

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    e.preventDefault();
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    toggleMenu() {
        if (this.hamburger) this.hamburger.classList.toggle('active');
        if (this.navMenu) this.navMenu.classList.toggle('active');
    }

    closeMenu() {
        if (this.hamburger) this.hamburger.classList.remove('active');
        if (this.navMenu) this.navMenu.classList.remove('active');
    }
}

// Background Music Player
class BackgroundMusicPlayer {
	constructor() {
		this.playerRoot = document.querySelector('.music-player');
		if (!this.playerRoot) return;

		this.toggleBtn = this.playerRoot.querySelector('#musicToggle');
		this.toggleIcon = this.toggleBtn ? this.toggleBtn.querySelector('i') : null;
		this.volumeSlider = this.playerRoot.querySelector('.volume-slider');
		this.trackChanger = this.playerRoot.querySelector('#trackChanger');
		this.progressFill = this.playerRoot.querySelector('.progress-fill');
		this.trackNameEl = this.playerRoot.querySelector('.track-name');
		this.tracks = [
			document.getElementById('bgMusic1'),
			document.getElementById('bgMusic2'),
			document.getElementById('bgMusic3')
		].filter(Boolean);
		this.trackTitles = ['Dark Magical Ambience I', 'Dark Magical Ambience II', 'Dark Magical Ambience III'];
		this.current = 0;
		this.isPlaying = false;

		this.init();
	}

	get currentAudio() {
		return this.tracks[this.current];
	}

	init() {
		if (!this.tracks.length || !this.toggleBtn) return;

        // Set initial volume (low by default on first visit)
        const savedVolume = Number(localStorage.getItem('music_volume'));
        const initialVolume = isNaN(savedVolume) ? 0.25 : Math.min(1, Math.max(0, savedVolume));
		this.setVolume(initialVolume);
		if (this.volumeSlider) this.volumeSlider.value = Math.round(initialVolume * 100);

		// Wire events
		this.toggleBtn.addEventListener('click', () => this.toggle());
		if (this.trackChanger) this.trackChanger.addEventListener('click', () => this.next());
		if (this.volumeSlider) this.volumeSlider.addEventListener('input', () => this.setVolume(this.volumeSlider.value / 100));

		// Audio events
		this.tracks.forEach((audio, idx) => {
			// Ensure proper attributes
			audio.loop = false; // we will manage next track manually
			audio.preload = 'auto';
			audio.addEventListener('timeupdate', () => this.updateProgress());
			audio.addEventListener('ended', () => this.next());
			audio.addEventListener('error', () => this.next());
		});

		// Update UI title
		this.updateTrackTitle();
	}

	play() {
		if (!this.tracks.length) return;
		// Pause all first
		this.tracks.forEach(a => { try { a.pause(); } catch(e) {} });
		const audio = this.currentAudio;
		if (!audio) return;
		const playPromise = audio.play();
		if (playPromise && typeof playPromise.then === 'function') {
			playPromise.then(() => this.setPlayingUI(true)).catch(() => {
				// Autoplay blocked; wait for a user gesture
				this.setPlayingUI(false);
			});
		} else {
			this.setPlayingUI(true);
		}
	}

	pause() {
		const audio = this.currentAudio;
		if (!audio) return;
		audio.pause();
		this.setPlayingUI(false);
	}

	toggle() {
		this.isPlaying = !this.isPlaying;
		if (this.isPlaying) {
			this.play();
		} else {
			this.pause();
		}
	}

	next() {
		this.current = (this.current + 1) % this.tracks.length;
		this.updateTrackTitle();
		if (this.isPlaying) this.play();
	}

	setVolume(v) {
		this.tracks.forEach(a => { try { a.volume = v; } catch(e) {} });
		localStorage.setItem('music_volume', String(v));
	}

	updateTrackTitle() {
		if (this.trackNameEl) this.trackNameEl.textContent = this.trackTitles[this.current] || `Track ${this.current + 1}`;
	}

	updateProgress() {
		const a = this.currentAudio;
		if (!a || !this.progressFill) return;
		const pct = a.duration ? (a.currentTime / a.duration) * 100 : 0;
		this.progressFill.style.width = `${pct}%`;
	}

	setPlayingUI(isPlaying) {
		this.isPlaying = isPlaying;
		if (this.toggleBtn) this.toggleBtn.classList.toggle('playing', isPlaying);
		if (this.toggleIcon) {
			this.toggleIcon.classList.remove(isPlaying ? 'fa-play' : 'fa-pause');
			this.toggleIcon.classList.add(isPlaying ? 'fa-pause' : 'fa-play');
		}
	}
}

// Contact Form
class ContactForm {
    constructor() {
        this.form = contactForm;
        this.endpoint = 'https://formspree.io/f/xbldogee'; // replace with your Formspree form ID
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Add floating label effect
        const inputs = this.form.querySelectorAll('.magical-input');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    async handleSubmit() {
        const submitBtn = this.form.querySelector('.submit-button');
        const originalText = submitBtn.querySelector('span').textContent;
        submitBtn.querySelector('span').textContent = 'Sending...';
        submitBtn.disabled = true;

        gsap.to(submitBtn, { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1 });

        try {
            const formData = new FormData(this.form);
            const resp = await fetch(this.endpoint, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
            if (resp.ok) {
                submitBtn.querySelector('span').textContent = 'Message Sent!';
                submitBtn.style.background = 'linear-gradient(45deg, #00ff00, #00ffff)';
                this.showSuccessMessage(true);
                this.form.reset();
            } else {
                this.showSuccessMessage(false);
                submitBtn.querySelector('span').textContent = 'Try Again';
            }
        } catch (e) {
            this.showSuccessMessage(false);
            submitBtn.querySelector('span').textContent = 'Error';
        }

        setTimeout(() => {
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.style.background = 'linear-gradient(45deg, #00ffff, #ffd700)';
            submitBtn.disabled = false;
            const inputs = this.form.querySelectorAll('.magical-input');
            inputs.forEach(input => input.parentElement.classList.remove('focused'));
        }, 2000);
    }

    showSuccessMessage(success = true) {
        // Create success message
        const messageDiv = document.createElement('div');
        messageDiv.className = 'success-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <i class="fas ${success ? 'fa-check-circle' : 'fa-exclamation-triangle'}"></i>
                <h3>${success ? 'Message Sent Successfully!' : 'Failed to send message'}</h3>
                <p>${success ? 'Thanks! I will get back to you soon.' : 'Please try again later or contact me directly at muhammadmaauz2018@gmail.com.'}</p>
            </div>
        `;
        
        document.body.appendChild(messageDiv);
        
        // Animate message
        gsap.fromTo(messageDiv, 
            { opacity: 0, y: -50, scale: 0.8 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
        );

        // Remove message after 5 seconds
        setTimeout(() => {
            gsap.to(messageDiv, {
                opacity: 0,
                y: -50,
                scale: 0.8,
                duration: 0.5,
                onComplete: () => messageDiv.remove()
            });
        }, 5000);
    }
}

// GSAP Animations
class GSAPAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHeroAnimations();
        this.setupSkillAnimations();
        this.setupProjectAnimations();
        this.setupExperienceAnimations();
        this.setupPortfolioAnimations();
        this.setupAchievementAnimations();
        this.setupBlogAnimations();
        this.setupSocialAnimations();
    }

    setupScrollAnimations() {
        // Navbar scroll effect
        gsap.to('.navbar', {
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                onUpdate: (self) => {
                    if (self.direction === 1) {
                        gsap.to('.navbar', {
                            y: -100,
                            duration: 0.3
                        });
                    } else {
                        gsap.to('.navbar', {
                            y: 0,
                            duration: 0.3
                        });
                    }
                }
            }
        });

        // Section fade-in animations
        gsap.utils.toArray('section').forEach(section => {
            gsap.fromTo(section, {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });
        });
    }

    setupHeroAnimations() {
        // Hero title animation
        gsap.from('.hero-title', {
            opacity: 0,
            y: 100,
            duration: 1.5,
            ease: "power3.out"
        });

        // Hero subtitle animation
        gsap.from('.hero-subtitle', {
            opacity: 0,
            y: 50,
            duration: 1.5,
            delay: 0.3,
            ease: "power3.out"
        });

        // Hero description animation
        gsap.from('.hero-description', {
            opacity: 0,
            y: 50,
            duration: 1.5,
            delay: 0.6,
            ease: "power3.out"
        });

        // CTA button animation
        gsap.from('.cta-button', {
            opacity: 0,
            scale: 0.5,
            duration: 1,
            delay: 0.9,
            ease: "back.out(1.7)"
        });

        // Floating orb animation
        gsap.to('.floating-orb', {
            y: -20,
            duration: 3,
            yoyo: true,
            repeat: -1,
            ease: "power2.inOut"
        });

        // Magical symbols rotation
        gsap.to('.magical-symbols i', {
            rotation: 360,
            duration: 8,
            repeat: -1,
            ease: "none",
            stagger: 0.5
        });
    }

    setupSkillAnimations() {
        // Skill orbs entrance animation
        gsap.from('.skill-orb', {
            opacity: 0,
            scale: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.skills',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        // Skill orb hover effects
        document.querySelectorAll('.skill-orb').forEach(orb => {
            orb.addEventListener('mouseenter', () => {
                gsap.to(orb, {
                    scale: 1.1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            orb.addEventListener('mouseleave', () => {
                gsap.to(orb, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    setupProjectAnimations() {
        // Project cards entrance animation
        gsap.from('.project-card', {
            opacity: 0,
            y: 100,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.projects',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        // Project card hover effects
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    setupExperienceAnimations() {
        // Timeline items entrance animation
        gsap.from('.timeline-item', {
            opacity: 0,
            x: -100,
            duration: 1,
            stagger: 0.3,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.experience',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        // Timeline markers animation
        gsap.from('.timeline-marker', {
            scale: 0,
            duration: 0.8,
            stagger: 0.3,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.experience',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    setupPortfolioAnimations() {
        // Portfolio items entrance animation
        gsap.from('.portfolio-item', {
            opacity: 0,
            y: 100,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.portfolio',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        // Portfolio hover effects
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item, {
                    y: -10,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    setupAchievementAnimations() {
        // Achievement cards entrance animation
        gsap.from('.achievement-card', {
            opacity: 0,
            scale: 0.5,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.achievements',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        // Achievement icons animation
        gsap.from('.achievement-icon', {
            rotation: 360,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.achievements',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    }

    setupBlogAnimations() {
        // Blog cards entrance animation
        gsap.from('.blog-card', {
            opacity: 0,
            x: 100,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.blog',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        // Blog hover effects
        document.querySelectorAll('.blog-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    setupSocialAnimations() {
        // Social cards entrance animation
        gsap.from('.social-card', {
            opacity: 0,
            y: 50,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.social-hub',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });

        // Social icons animation
        gsap.from('.social-icon', {
            scale: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.social-hub',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    }
}

// Interactive Features for New Sections
class InteractiveFeatures {
    constructor() {
        this.init();
    }

    init() {
        this.setupTimelineInteractions();
        this.setupPortfolioLightbox();
        this.setupAchievementUnlock();
        this.setupSocialCardEffects();
        this.setupBlogInteractions();
    }

    setupTimelineInteractions() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item.querySelector('.timeline-marker'), {
                    scale: 1.2,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item.querySelector('.timeline-marker'), {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            // Add click effect
            item.addEventListener('click', () => {
                gsap.to(item, {
                    scale: 1.05,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1
                });
            });
        });
    }

    setupPortfolioLightbox() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                // Create lightbox effect
                const lightbox = document.createElement('div');
                lightbox.className = 'portfolio-lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <span class="close-lightbox">&times;</span>
                        <h2>${item.querySelector('h3').textContent}</h2>
                        <p>${item.querySelector('p').textContent}</p>
                        <div class="lightbox-tags">
                            ${item.querySelector('.portfolio-tags').innerHTML}
                        </div>
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                
                // Animate lightbox
                gsap.fromTo(lightbox, 
                    { opacity: 0, scale: 0.5 },
                    { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
                );

                // Close lightbox
                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox || e.target.classList.contains('close-lightbox')) {
                        gsap.to(lightbox, {
                            opacity: 0,
                            scale: 0.5,
                            duration: 0.3,
                            onComplete: () => lightbox.remove()
                        });
                    }
                });
            });
        });
    }

    setupAchievementUnlock() {
        const achievementCards = document.querySelectorAll('.achievement-card');
        
        achievementCards.forEach((card, index) => {
            // Add unlock animation on scroll
            card.addEventListener('mouseenter', () => {
                gsap.to(card.querySelector('.achievement-icon'), {
                    rotation: 360,
                    duration: 1,
                    ease: "power2.out"
                });
            });

            // Add sparkle effect
            card.addEventListener('click', () => {
                this.createSparkles(card);
            });
        });
    }

    setupSocialCardEffects() {
        const socialCards = document.querySelectorAll('.social-card');
        
        socialCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card.querySelector('.social-icon'), {
                    rotation: 360,
                    duration: 0.8,
                    ease: "power2.out"
                });
            });

            // Add ripple effect on click
            card.addEventListener('click', (e) => {
                this.createRipple(e, card);
            });
        });
    }

    setupBlogInteractions() {
        const blogCards = document.querySelectorAll('.blog-card');
        
        blogCards.forEach(card => {
            card.addEventListener('click', () => {
                // Add reading progress indicator
                const progressBar = document.createElement('div');
                progressBar.className = 'reading-progress';
                progressBar.style.cssText = `
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #00ffff, #ffd700);
                    width: 0%;
                    transition: width 0.3s ease;
                `;
                
                card.appendChild(progressBar);
                
                // Simulate reading progress
                gsap.to(progressBar, {
                    width: '100%',
                    duration: 2,
                    ease: "power2.out",
                    onComplete: () => {
                        setTimeout(() => {
                            gsap.to(progressBar, {
                                opacity: 0,
                                duration: 0.5,
                                onComplete: () => progressBar.remove()
                            });
                        }, 1000);
                    }
                });
            });
        });
    }

    createSparkles(element) {
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle-effect';
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #ffd700;
                border-radius: 50%;
                pointer-events: none;
                z-index: 10;
            `;
            
            element.appendChild(sparkle);
            
            const rect = element.getBoundingClientRect();
            const x = Math.random() * rect.width;
            const y = Math.random() * rect.height;
            
            gsap.fromTo(sparkle, 
                { x: x, y: y, scale: 0, opacity: 1 },
                { 
                    x: x + (Math.random() - 0.5) * 100,
                    y: y + (Math.random() - 0.5) * 100,
                    scale: 1,
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out",
                    onComplete: () => sparkle.remove()
                }
            );
        }
    }

    createRipple(event, element) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(0, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
        `;
        
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        element.appendChild(ripple);
        
        gsap.to(ripple, {
            scale: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => ripple.remove()
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Force all sections to be visible
    setTimeout(() => {
        forceSectionsVisible();
    }, 100);
    // Second pass after layout settles to beat race conditions
    setTimeout(() => {
        forceSectionsVisible();
        try { ScrollTrigger.refresh(); } catch(e) {}
    }, 800);
    
    new DarkMagicalHorrorSystem();
    new CustomCursor();
    new Navigation();
    new BackgroundMusicPlayer();
    new ContactForm();
    new GSAPAnimations();
    new InteractiveFeatures(); // Initialize new interactive features

    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(() => {});
    }

    // Performance mode toggle
    const perfToggle = document.getElementById('perfToggle');
    if (perfToggle) {
        const saved = localStorage.getItem('low_perf_mode');
        if (saved === '1') {
            document.documentElement.classList.add('low-perf');
            perfToggle.classList.add('active');
            perfToggle.setAttribute('aria-pressed', 'true');
        } else if (saved === null) {
            // First visit: suggest low-perf if device likely weak or user prefers reduced motion
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const lowHardware = (navigator.hardwareConcurrency || 2) <= 2;
            if (prefersReduced || lowHardware) {
                setTimeout(() => {
                    const enable = confirm('Your device may benefit from Low Performance Mode. Enable it? You can change later from the gauge button.');
                    if (enable) {
                        document.documentElement.classList.add('low-perf');
                        perfToggle.classList.add('active');
                        perfToggle.setAttribute('aria-pressed', 'true');
                        localStorage.setItem('low_perf_mode', '1');
                    } else {
                        localStorage.setItem('low_perf_mode', '0');
                    }
                }, 300);
            }
        }
        perfToggle.addEventListener('click', () => {
            const isOn = document.documentElement.classList.toggle('low-perf');
            perfToggle.classList.toggle('active', isOn);
            perfToggle.setAttribute('aria-pressed', String(isOn));
            localStorage.setItem('low_perf_mode', isOn ? '1' : '0');
            // Re-assert visibility and media state after mode switch
            forceSectionsVisible();
            try { ScrollTrigger.refresh(); } catch(e) {}
            document.querySelectorAll('.floating-video').forEach(v => {
                try { if (isOn) { /* nothing */ } v.play().catch(()=>{}); } catch(e) {}
            });
        });
    }
});

// Function to force all sections to be visible
function forceSectionsVisible() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'block';
        section.style.visibility = 'visible';
        section.style.opacity = '1';
        section.style.position = 'relative';
        section.style.zIndex = '1';
    });
    
    // Force grids to be visible
    const grids = document.querySelectorAll('.grid, .grid-container, .timeline, .portfolio-grid, .achievements-grid, .blog-grid, .social-grid');
    grids.forEach(grid => {
        grid.style.display = 'grid';
        grid.style.visibility = 'visible';
        grid.style.opacity = '1';
    });
    
    console.log('All sections forced to be visible');
}

// Add scroll-based background transitions
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrolled / maxScroll;

    // Background color transition based on scroll
    if (scrollProgress < 0.33) {
        // Dark forest scene
        document.body.style.background = `linear-gradient(135deg, #000000 0%, #0a0a0a 15%, #1a0a2e 30%, #16213e 50%, #2d1b69 70%, #4a0e0e 85%, #000000 100%)`;
    } else if (scrollProgress < 0.66) {
        // Gothic castle interior scene
        document.body.style.background = `linear-gradient(135deg, #000000 0%, #1a0a2e 20%, #2d1b69 40%, #4a0e0e 60%, #2d1b69 80%, #000000 100%)`;
    } else {
        // Enchanted library scene
        document.body.style.background = `linear-gradient(135deg, #000000 0%, #2d1b69 25%, #4a0e0e 50%, #2d1b69 75%, #000000 100%)`;
    }
});

// Add window resize handler
window.addEventListener('resize', () => {
    // Recalculate any size-dependent animations
    ScrollTrigger.refresh();
});

// Add performance optimization
let ticking = false;
function updateOnScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            // Update scroll-based animations here if needed
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateOnScroll);
