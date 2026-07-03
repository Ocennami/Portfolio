/* ==========================================================================
   1. PRELOADER & PAGE REVEAL ANIMATION
   ========================================================================== */
window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;

    // Start Phase 1: Fade out and blur the preloader content
    setTimeout(() => {
        preloader.classList.add("exiting");
        
        // Start Phase 2: Fade out the preloader background overlay
        setTimeout(() => {
            preloader.classList.add("hidden");
            
            // Mark body as loaded to restore scrolling and trigger entrance transitions
            setTimeout(() => {
                document.body.classList.add("loaded");
            }, 500); // Allow overlay fade time
        }, 600); // Duration of Phase 1 animation
    }, 1500); // Showcase the logo briefly before exiting
});

// Fallback safety timeout for preloader (in case of slow resources)
setTimeout(() => {
    const preloader = document.getElementById("preloader");
    if (preloader && !preloader.classList.contains("hidden")) {
        preloader.classList.add("exiting");
        setTimeout(() => {
            preloader.classList.add("hidden");
            document.body.classList.add("loaded");
        }, 600);
    }
}, 5000);

/* ==========================================================================
   2. HEADER & NAVIGATION LOGIC
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("site-header");
    const heroSection = document.getElementById("hero");
    const hamburger = document.getElementById("hamburger-btn");
    const nav = document.getElementById("site-nav");
    const navLinks = document.querySelectorAll(".nav-link");

    // Header scroll-up show / scroll-down hide behavior
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        // Show header when scrolled past hero, and scroll direction is up
        if (heroSection) {
            const heroHeight = heroSection.offsetHeight;
            if (currentScrollY > heroHeight * 0.15) {
                header.classList.add("visible");
            } else {
                header.classList.remove("visible");
            }
        }
        
        lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Run once initially

    // Mobile navigation active toggle
    if (hamburger && nav) {
        hamburger.addEventListener("click", () => {
            const isActive = hamburger.classList.toggle("active");
            nav.classList.toggle("active");
            hamburger.setAttribute("aria-expanded", isActive);

            if (isActive) {
                document.body.style.overflow = "hidden"; // Prevent scrolling when menu open
            } else {
                document.body.style.overflow = "";
            }
        });

        // Close navigation when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                nav.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
                document.body.style.overflow = "";
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains("active")) {
                hamburger.classList.remove("active");
                nav.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
                document.body.style.overflow = "";
            }
        });
    }

    /* ==========================================================================
       3. INTERSECTION OBSERVER FOR SECTION ANIMATIONS & SCROLL SPY
       ========================================================================== */
    const sections = document.querySelectorAll("section");
    const faders = document.querySelectorAll(".fade-in-section");

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px"
    });

    faders.forEach(fader => sectionObserver.observe(fader));

    // Scroll Spy active navigation state
    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navLinks.forEach(link => {
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    } else {
                        link.classList.remove("active");
                    }
                });
            }
        });
    }, {
        threshold: 0.4,
        rootMargin: "-20% 0px -20% 0px"
    });

    sections.forEach(section => spyObserver.observe(section));
});

/* ==========================================================================
   4. CANVASES: STARRY SPACE BACKGROUND & HEART TECH PARTICLES
   ========================================================================== */

// 4a. Space Background (Stars & Shooting Stars)
(() => {
    const canvas = document.getElementById("space");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const stars = Array.from({ length: 140 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.3 + 0.3,
        baseOpacity: Math.random() * 0.5 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() < 0.35 ? 0 : Math.random() * 0.015,
        hue: Math.random() < 0.7 ? 220 + Math.random() * 30 : 280 + Math.random() * 40 // Cyber colors: blues/purples
    }));

    const meteors = [];

    class Meteor {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height * 0.3;
            this.len = Math.random() * 80 + 30;
            this.speed = Math.random() * 4 + 3;
            this.angle = Math.PI / 4; // 45 degree angle downward
            this.alpha = 1;
            this.fadeSpeed = Math.random() * 0.008 + 0.004;
        }

        update() {
            this.x += this.speed * Math.cos(this.angle);
            this.y += this.speed * Math.sin(this.angle);
            this.alpha -= this.fadeSpeed;
        }

        draw() {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(
                this.x - this.len * Math.cos(this.angle),
                this.y - this.len * Math.sin(this.angle)
            );
            const gradient = ctx.createLinearGradient(
                this.x, this.y,
                this.x - this.len * Math.cos(this.angle),
                this.y - this.len * Math.sin(this.angle)
            );
            gradient.addColorStop(0, `rgba(236, 72, 153, ${this.alpha})`); // Pink head
            gradient.addColorStop(0.3, `rgba(168, 85, 247, ${this.alpha * 0.6})`); // Purple middle
            gradient.addColorStop(1, "rgba(0, 0, 0, 0)"); // Fading tail
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
    }

    // Spawn meteors periodically
    const spawnMeteor = () => {
        if (meteors.length < 3) {
            meteors.push(new Meteor());
        }
        setTimeout(spawnMeteor, Math.random() * 6000 + 4000);
    };
    spawnMeteor();

    const loop = () => {
        ctx.fillStyle = "rgba(3, 6, 13, 0.2)"; // Soft tail trail for animation
        ctx.fillRect(0, 0, width, height);

        // Render Stars
        stars.forEach(star => {
            star.phase += 0.015;
            const opacity = star.baseOpacity + Math.sin(star.phase) * 0.25;
            star.y += star.speed;
            if (star.y > height) star.y = 0;

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${star.hue}, 85%, 85%, ${Math.max(0.1, opacity)})`;
            ctx.fill();
        });

        // Render & Update Meteors
        for (let i = meteors.length - 1; i >= 0; i--) {
            const meteor = meteors[i];
            meteor.update();
            meteor.draw();
            if (meteor.alpha <= 0 || meteor.x > width || meteor.y > height) {
                meteors.splice(i, 1);
            }
        }

        requestAnimationFrame(loop);
    };

    loop();

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }, { passive: true });
})();

// 4b. Avatar Heart/Tech Particles Background
(() => {
    const canvas = document.getElementById("particles-bg");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = 0, height = 0;
    let particles = [];
    const colors = ["#a855f7", "#ec4899", "#06b6d4", "#c084fc", "#6366f1"];

    const createParticles = () => {
        const count = width < 220 ? 120 : 180;
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 1.5 + 0.6,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: Math.random() * 0.6 + 0.2
        }));
    };

    const resize = () => {
        const rect = canvas.getBoundingClientRect();
        width = rect.width;
        height = rect.height;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        createParticles();
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    let mouse = { x: null, y: null };
    canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    }, { passive: true });

    canvas.addEventListener("mouseleave", () => {
        mouse.x = null;
        mouse.y = null;
    }, { passive: true });

    const animate = () => {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            // Apply slight interactive attraction force if mouse is near
            if (mouse.x !== null && mouse.y !== null) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 45;

                if (dist < maxDist) {
                    const force = (maxDist - dist) / maxDist;
                    const angle = Math.atan2(dy, dx);
                    p.x += Math.cos(angle) * force * 0.6;
                    p.y += Math.sin(angle) * force * 0.6;
                }
            }

            p.x += p.vx;
            p.y += p.vy;

            // Bounce back boundaries
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();
        });
        
        ctx.globalAlpha = 1.0;
        requestAnimationFrame(animate);
    };

    animate();
})();

/* ==========================================================================
   5. MOUSE FOLLOWER
   ========================================================================== */
(() => {
    const follower = document.getElementById("mouse-follower");
    if (!follower) return;

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    let active = false;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX - 15;
        mouseY = e.clientY - 15;
        
        if (!active) {
            // Unhide or activate styling
            follower.style.opacity = "1";
            active = true;
        }
    }, { passive: true });

    const update = () => {
        // Smooth lerping transition
        currentX += (mouseX - currentX) * 0.16;
        currentY += (mouseY - currentY) * 0.16;
        follower.style.transform = `translate(${currentX}px, ${currentY}px)`;
        requestAnimationFrame(update);
    };

    update();
})();

/* ==========================================================================
   6. MUSIC PLAYER SYSTEM
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const musicPlayer = document.querySelector(".music-player");
    if (!musicPlayer) return;

    const audio = musicPlayer.querySelector(".player-audio");
    const playBtn = musicPlayer.querySelector('[data-action="toggle"]');
    const prevBtn = musicPlayer.querySelector('[data-action="prev"]');
    const nextBtn = musicPlayer.querySelector('[data-action="next"]');
    const coverImg = musicPlayer.querySelector(".player-cover");
    const titleElement = musicPlayer.querySelector(".player-title");
    const artistElement = musicPlayer.querySelector(".player-artist");
    const linkBtn = musicPlayer.querySelector(".player-link");

    // Static playlist (fully functioning and updated)
    const playlist = [
        {
            title: "Nếu một ngày chúng ta không còn gặp",
            artist: "2CAN",
            cover: "picture/Music Images/NẾU MỘT NGÀY CHÚNG TA KHÔNG CÒN GẶP.jpg",
            src: "music/NẾU MỘT NGÀY CHÚNG TA KHÔNG CÒN GẶP (ft. 2CAN).mp3",
            link: "https://open.spotify.com/track/5BsnY4AATNyLE3OWUqHLQg?si=4a2c8b4d59414f51",
        },
        {
            title: "Điều chưa nói",
            artist: "Tứa ft. CM1X",
            cover: "picture/Music Images/Điều Chưa Nói - Tùa ft. CM1X - TÙA.jpg",
            src: "music/Điều Chưa Nói - Tùa ft. CM1X - TÙA.mp3",
            link: "https://open.spotify.com/track/5hzjqKMQPampmtM6eObybz?si=0c869d7ff79a4f8b",
        },
        {
            title: "Ai Đưa Em Về",
            artist: "1nG x VoVanDuc",
            cover: "picture/Music Images/Ai Đưa Em Về - 1nG x VoVanDuc.jpg",
            src: "music/Ai Đưa Em Về - 1nG x VoVanDuc.mp3",
            link: "https://open.spotify.com/track/6GICR3XCKLGs1llkGTo17f?si=d2ad0316221046ab",
        }
    ];

    let currentTrackIndex = 0;
    let isPlaying = false;

    // Load track by index
    const loadTrack = (index) => {
        const track = playlist[index];
        if (!track) return;

        titleElement.textContent = track.title;
        artistElement.textContent = track.artist;
        coverImg.src = track.cover;
        coverImg.alt = `${track.title} Album Art`;
        audio.src = track.src;

        // Configure Spotify Link
        if (track.link) {
            linkBtn.href = track.link;
            linkBtn.classList.remove("is-disabled");
        } else {
            linkBtn.href = "#";
            linkBtn.classList.add("is-disabled");
        }

        // Reset view classes
        updatePlayState(false);
    };

    // Keep play state icon & status styling synchronous
    const updatePlayState = (playing) => {
        isPlaying = playing;
        const icon = playBtn.querySelector("i");
        if (playing) {
            icon.className = "fas fa-pause";
            musicPlayer.classList.add("playing");
        } else {
            icon.className = "fas fa-play";
            musicPlayer.classList.remove("playing");
        }
    };

    // Play action
    const playAudio = () => {
        audio.play()
            .then(() => {
                updatePlayState(true);
                showToast(`Now Playing: ${playlist[currentTrackIndex].title}`);
            })
            .catch((err) => {
                console.error("Audio playback error:", err);
                updatePlayState(false);
            });
    };

    // Toggle logic
    const togglePlay = () => {
        if (!audio.src) {
            loadTrack(currentTrackIndex);
        }
        
        if (isPlaying) {
            audio.pause();
            updatePlayState(false);
        } else {
            if (audio.readyState >= 2) {
                playAudio();
            } else {
                audio.load();
                audio.addEventListener("canplaythrough", playAudio, { once: true });
            }
        }
    };

    // Prev / Next actions
    const prevTrack = () => {
        currentTrackIndex = currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1;
        loadTrack(currentTrackIndex);
        if (isPlaying) playAudio();
    };

    const nextTrack = () => {
        currentTrackIndex = currentTrackIndex === playlist.length - 1 ? 0 : currentTrackIndex + 1;
        loadTrack(currentTrackIndex);
        if (isPlaying) playAudio();
    };

    // Floating alert toast (non-intrusive)
    const showToast = (message) => {
        const existing = document.querySelector(".player-toast");
        if (existing) existing.remove();

        const toast = document.createElement("div");
        toast.className = "player-toast";
        toast.style.cssText = `
            position: fixed;
            bottom: 86px;
            right: 24px;
            padding: 10px 18px;
            background: rgba(10, 14, 24, 0.94);
            border: 1px solid var(--border-hover);
            border-radius: var(--radius-md);
            color: #e9d5ff;
            font-size: 12px;
            font-weight: 500;
            z-index: 9999;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
            animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            backdrop-filter: blur(8px);
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = "slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) reverse forwards";
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    };

    // Attach control listeners
    playBtn.addEventListener("click", togglePlay);
    prevBtn.addEventListener("click", prevTrack);
    nextBtn.addEventListener("click", nextTrack);

    audio.addEventListener("ended", nextTrack);
    audio.addEventListener("error", () => {
        showToast("Error loading track. Trying next one...");
        setTimeout(nextTrack, 1500);
    });

    // Keyboard shortcuts (non-input forms only)
    document.addEventListener("keydown", (e) => {
        const activeNode = document.activeElement.tagName;
        if (activeNode === "INPUT" || activeNode === "TEXTAREA" || activeNode === "SELECT") return;

        if (e.key === " ") {
            e.preventDefault();
            togglePlay();
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            prevTrack();
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            nextTrack();
        }
    });

    // Load initial track
    loadTrack(currentTrackIndex);
});
