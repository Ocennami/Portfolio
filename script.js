// Magnifier Glass Effect
const magnifier = document.getElementById("magnifier");
let magX = 0,
  magY = 0;

document.addEventListener("mousemove", (e) => {
  magX = e.clientX - 40;
  magY = e.clientY - 40;
  magnifier.style.transform = `translate(${magX}px, ${magY}px)`;

  // get the background of the body
  const bodyStyles = window.getComputedStyle(document.body);
  const bg = bodyStyles.backgroundImage || bodyStyles.backgroundColor;
  // get scroll position
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  // calculate background position for magnification effect
  magnifier.style.background = bg;
  magnifier.style.backgroundPosition = `${-magX + 40 + scrollX}px ${
    -magY + 40 + scrollY
  }px`;
});
// logic hide preloader
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");

  setTimeout(() => {
    if (preloader) {
      preloader.classList.add("hidden");
      document.body.style.overflow = "auto";
    }
  }, 2800);
});

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const heroSection = document.querySelector(".home-section");

  if (header && heroSection) {
    window.addEventListener("scroll", function () {
      const heroHeight = heroSection.offsetHeight;
      const triggerPoint = heroHeight * 0.2;
      const currentScroll = window.scrollY;

      if (currentScroll > triggerPoint) {
        header.classList.add("visible");
      } else {
        header.classList.remove("visible");
      }
    });
  }

  // Hamburger Menu Toggle Logic
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburger && nav) {
    // toggle menu when hamburger is clicked
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      nav.classList.toggle("active");

      // update aria-expanded for accessibility
      const isExpanded = hamburger.classList.contains("active");
      hamburger.setAttribute("aria-expanded", isExpanded);

      // prevent body scroll when menu is open
      if (isExpanded) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    });

    // close menu when a nav link is clicked
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        nav.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "auto";
      });
    });

    // close menu when clicking outside
    document.addEventListener("click", function (event) {
      const isClickInsideNav = nav.contains(event.target);
      const isClickOnHamburger = hamburger.contains(event.target);

      if (
        !isClickInsideNav &&
        !isClickOnHamburger &&
        nav.classList.contains("active")
      ) {
        hamburger.classList.remove("active");
        nav.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "auto";
      }
    });
  }
});

// ---- LOGIC FOR DISPLAYING HEADER WHEN SCROLLING ----
window.addEventListener("scroll", function () {
  const heroHeight = heroSection.offsetHeight;
  const triggerPoint = heroHeight * 0.2;
  const currentScroll = window.scrollY;

  if (currentScroll > triggerPoint) {
    header.classList.add("visible");
  } else {
    header.classList.remove("visible");
  }
});

// logic to display shooting star and star effects in Space section
(() => {
  const c = document.getElementById("space");
  const ctx = c.getContext("2d");

  c.width = window.innerWidth;
  c.height = window.innerHeight;

  const meteors = [];
  const stars = Array.from({ length: 150 }, () => ({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    radius: Math.random() * 1.5 + 0.3,
    baseOpacity: Math.random() * 0.5 + 0.3,
    phase: Math.random() * Math.PI * 2,
    speed: Math.random() < 0.5 ? 0 : Math.random() * 0.02,
    hue:
      Math.random() < 0.7 ? 60 + Math.random() * 30 : 200 + Math.random() * 30,
  }));

  class Meteor {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * c.width;
      this.y = Math.random() * c.height * 0.4;
      this.len = Math.random() * 100 + 20;
      this.speed = Math.random() * 5 + 3;
      this.angle = Math.random() < 0.8 ? Math.PI / 3 : (Math.PI * 2) / 3;
      this.alpha = Math.random() * 0.5 + 0.5;
      this.fadeSpeed = Math.random() * 0.005 + 0.003;
    }

    update() {
      this.x += this.speed * Math.cos(this.angle);
      this.y += this.speed * Math.sin(this.angle);
      this.alpha -= this.fadeSpeed;

      const offScreen =
        this.x > c.width || this.y > c.height || this.alpha <= 0;

      if (offScreen) {
        const index = meteors.indexOf(this);
        if (index !== -1) meteors.splice(index, 1);
      }
    }

    draw() {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(
        this.x - this.len * Math.cos(this.angle),
        this.y - this.len * Math.sin(this.angle)
      );
      ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  // create new meteors at random intervals
  setInterval(() => {
    const num = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < num; i++) {
      meteors.push(new Meteor());
    }
  }, Math.random() * 2000 + 2000);

  function loop() {
    ctx.fillStyle = "rgba(7, 11, 20, 0.5)";
    ctx.fillRect(0, 0, c.width, c.height);

    // star
    stars.forEach((star) => {
      star.phase += 0.02;
      const opacity = star.baseOpacity + Math.sin(star.phase) * 0.2;
      star.y += star.speed;
      if (star.y > c.height) star.y = 0;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${star.hue}, 100%, 88%, ${opacity})`;
      ctx.fill();
    });

    // meteors
    meteors.forEach((meteor) => {
      meteor.update();
      meteor.draw();
    });

    requestAnimationFrame(loop);
  }

  loop();

  window.addEventListener("resize", () => {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  });
})();

// logic to display fade-in/fade-out effect when scrolling page
document.addEventListener("DOMContentLoaded", function () {
  let lastScrollY = window.scrollY;

  const faders = document.querySelectorAll(".fade-in-section");

  // Adjust threshold and rootMargin based on screen size
  const isMobile = window.innerWidth <= 768;
  const appearOptions = {
    threshold: isMobile ? 0.1 : 0.2,
    rootMargin: isMobile ? "0px 0px 0px 0px" : "0px 0px -50px 0px",
  };

  const appearOnScroll = new IntersectionObserver(function (entries) {
    const currentScrollY = window.scrollY;
    const isScrollingUp = currentScrollY < lastScrollY;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else if (isScrollingUp) {
        entry.target.classList.remove("visible");
      }
    });

    lastScrollY = currentScrollY;
  }, appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });

  // Force check visibility on load and resize (especially for mobile)
  function checkVisibility() {
    faders.forEach((fader) => {
      const rect = fader.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // If element is in viewport or very close, make it visible
      if (rect.top < windowHeight * 0.9 && rect.bottom > 0) {
        fader.classList.add("visible");
      }
    });
  }

  // Check on load
  setTimeout(checkVisibility, 100);

  // Re-check on window resize (important for responsive design)
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(checkVisibility, 250);
  });

  // Timeline items fade-in/fade-out effect
  let lastScrollYTimeline = window.scrollY;
  const timelineItems = document.querySelectorAll(".timeline-item");

  // Adjust for mobile
  const isMobileTimeline = window.innerWidth <= 768;
  const timelineOptions = {
    threshold: isMobileTimeline ? 0.2 : 0.3,
    rootMargin: isMobileTimeline ? "0px 0px -50px 0px" : "0px 0px -100px 0px",
  };

  const timelineObserver = new IntersectionObserver(function (entries) {
    const currentScrollY = window.scrollY;
    const isScrollingUp = currentScrollY < lastScrollYTimeline;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      } else if (isScrollingUp) {
        entry.target.classList.remove("fade-in");
      }
    });

    lastScrollYTimeline = currentScrollY;
  }, timelineOptions);

  timelineItems.forEach((item) => {
    timelineObserver.observe(item);
  });
});

// particle effect display logic in Tech section
(function () {
  const canvas = document.getElementById("particles-bg");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let width, height;
  let particles = [];

  const colors = ["#ff4d6d", "#f9c74f", "#90be6d", "#4cc9f0", "#f72585"];

  function createParticles() {
    let particleCount = 600;
    if (width < 200) {
      particleCount = 400;
    } else if (width < 250) {
      particleCount = 500;
    }

    particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      radius: 1 + Math.random() * 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    width = rect.width;
    height = rect.height;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    createParticles();
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let mouse = { x: null, y: null };

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      if (mouse.x !== null && mouse.y !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = 50;

        if (dist < minDist) {
          const force = (minDist - dist) / minDist;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force * 0.5;
          p.y += Math.sin(angle) * force * 0.5;
        }
      }

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > width) p.dx *= -1;
      if (p.y < 0 || p.y > height) p.dy *= -1;

      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
})();

// Mouse follower animation
const follower = document.getElementById("mouse-follower");
let mouseX = 0,
  mouseY = 0;
let currentX = 0,
  currentY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX - 20;
  mouseY = e.clientY - 20;
});

function animateFollower() {
  currentX += (mouseX - currentX) * 0.15;
  currentY += (mouseY - currentY) * 0.15;
  follower.style.transform = `translate(${currentX}px, ${currentY}px)`;
  requestAnimationFrame(animateFollower);
}
animateFollower();

// logic to display mouse movement effect in About section
document.addEventListener("DOMContentLoaded", function () {
  const box = document.querySelector(".about-box");
  if (!box) return;

  box.addEventListener("mousemove", (e) => {
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    box.style.setProperty("--x", `${x}px`);
    box.style.setProperty("--y", `${y}px`);

    const edgeThresholdX = rect.width * 0.15;
    const edgeThresholdY = rect.height * 0.15;

    const nearEdge =
      x < edgeThresholdX ||
      x > rect.width - edgeThresholdX ||
      y < edgeThresholdY ||
      y > rect.height - edgeThresholdY;

    box.style.setProperty("--glow-opacity", nearEdge ? "1" : "0");
  });
});

const aboutBox = document.querySelector(".about-box");

aboutBox.addEventListener("mousemove", (e) => {
  const rect = aboutBox.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  aboutBox.style.setProperty("--mouse-x", `${x}px`);
  aboutBox.style.setProperty("--mouse-y", `${y}px`);
});

const box = document.querySelector(".about-box");

box.addEventListener("mousemove", (e) => {
  const rect = box.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  box.style.setProperty("--mouse-x", `${x}px`);
  box.style.setProperty("--mouse-y", `${y}px`);
});

// Logic for fetching GitHub repos and displaying in skill panel
const username = "Ocennami";
const badges = document.querySelectorAll(".skill-badge");
const panel = document.querySelector(".skill-panel");
const panelContent = document.getElementById("panel-content");
let reposData = [];

fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
  .then((res) => res.json())
  .then((data) => {
    reposData = data;
  })
  .catch((err) => console.error("Lỗi khi fetch GitHub API:", err));

badges.forEach((btn) => {
  btn.addEventListener("click", () => {
    const skill = btn.dataset.skill;

    if (panel.style.display === "block" && panel.dataset.current === skill) {
      closePanel();
    } else {
      const filtered = reposData.filter((repo) => {
        if (repo.language)
          return repo.language.toLowerCase() === skill.toLowerCase();
        return fallbackSkillMatch(repo.name, skill);
      });

      showPanel(skill, filtered);
    }
  });
});

function showPanel(skill, repos) {
  panel.dataset.current = skill;

  const capitalizedSkill = skill.charAt(0).toUpperCase() + skill.slice(1);

  const skillIconColors = {
    JavaScript: "#f7df1e",
    Java: "#FF7800",
    "C++": "#00599C",
    "C#": "#68217A",
    CSS: "#2965f1",
    HTML: "#E34F26",
    Python: "#3776AB",
  };

  // Improve HTML structure for easier styling
  panelContent.innerHTML = `
    <div class="panel-header-new">
      <span class="language-icon" style="background-color: ${
        skillIconColors[capitalizedSkill] || "#fff"
      };"></span>
      <div class="language-info">
        <h3 class="language-title">${capitalizedSkill}</h3>
        <span class="language-tag">Programming Language</span>
      </div>
    </div>
    
    <p class="projects-count">Projects using ${capitalizedSkill} (${
    repos.length
  })</p>
    
    <div class="card-grid-new">
      ${repos
        .map((repo) => {
          // Format language for display on badge
          const repoLanguage = repo.language || "Unknown";

          return `
        <div class="project-card-new" data-url="${repo.html_url}">
          <div class="card-header-new">
            <h4 class="card-title-new">${repo.name}</h4>
            <i class="fab fa-github github-link"></i>
          </div>
          <p class="card-description-new">${
            repo.description || "No description provided."
          }</p>
          <div class="card-footer-new">
            <span class="card-language-badge-new">
              <span class="dot" style="color: ${
                skillIconColors[repoLanguage] || "#ccc"
              };">●</span>
              ${repoLanguage}
            </span>
            <small class="card-date-new">Last Updated: ${new Date(
              repo.updated_at
            ).toLocaleDateString()}</small>
          </div>
        </div>
      `;
        })
        .join("")}
    </div>
  `;

  panel.style.display = "block";

  const projectCards = panel.querySelectorAll(".project-card-new");
  projectCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      if (!e.target.matches("a")) {
        const url = this.dataset.url;
        window.open(url, "_blank");
      }
    });
  });
}

function closePanel() {
  panel.style.display = "none";
  panel.dataset.current = "";
}

function fallbackSkillMatch(repoName, skill) {
  const map = {
    Java: ["Parkour"],
  };
  return map[skill]?.includes(repoName) || false;
}

// logic to display mouse movement effect in Contact section
document.addEventListener("DOMContentLoaded", function () {
  const contactBox = document.querySelector(".contact-box");
  if (!contactBox) return;

  contactBox.addEventListener("mousemove", (e) => {
    const rect = contactBox.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    contactBox.style.setProperty("--mouse-x", `${x}px`);
    contactBox.style.setProperty("--mouse-y", `${y}px`);
  });
});

// Music Player Functionality
document.addEventListener("DOMContentLoaded", function () {
  const musicPlayer = document.querySelector(".music-player");
  const audio = musicPlayer.querySelector(".player-audio");
  const playBtn = musicPlayer.querySelector('[data-action="toggle"]');
  const prevBtn = musicPlayer.querySelector('[data-action="prev"]');
  const nextBtn = musicPlayer.querySelector('[data-action="next"]');
  const coverImg = musicPlayer.querySelector(".player-cover");
  const titleElement = musicPlayer.querySelector(".player-title");
  const artistElement = musicPlayer.querySelector(".player-artist");
  const linkBtn = musicPlayer.querySelector(".player-link");

  // Playlist of tracks
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
    },
  ];

  let currentTrackIndex = 0;
  let isPlaying = false;

  // Load track
  function loadTrack(index) {
    const track = playlist[index];
    if (!track) return;

    titleElement.textContent = track.title;
    artistElement.textContent = track.artist;
    coverImg.src = track.cover;
    coverImg.alt = `${track.title} album art`;
    audio.src = track.src;

    // Update link button
    if (track.link) {
      linkBtn.href = track.link;
      linkBtn.classList.remove("is-disabled");
    } else {
      linkBtn.href = "#";
      linkBtn.classList.add("is-disabled");
    }

    // Reset play button
    updatePlayButton(false);
    musicPlayer.classList.remove("playing");
  }

  // Update play button icon
  function updatePlayButton(playing) {
    const icon = playBtn.querySelector("i");
    icon.className = playing ? "fas fa-pause" : "fas fa-play";
    isPlaying = playing;
  }

  // Play/Pause functionality
  function togglePlayPause() {
    if (audio.src === "" || !audio.src.includes(".mp3")) {
      loadTrack(currentTrackIndex);
      setTimeout(() => togglePlayPause(), 100);
      return;
    }

    if (isPlaying) {
      audio.pause();
      updatePlayButton(false);
      musicPlayer.classList.remove("playing");
    } else {
      // Check if audio can play
      if (audio.readyState >= 2) {
        // HAVE_CURRENT_DATA
        playAudio();
      } else {
        // If not ready, try to load and play
        audio.load();
        audio.addEventListener("canplaythrough", playAudio, { once: true });
        audio.addEventListener("error", handleAudioError, { once: true });
      }
    }
  }

  // Separate play function with error handling
  function playAudio() {
    audio
      .play()
      .then(() => {
        updatePlayButton(true);
        musicPlayer.classList.add("playing");
        showNotification(`Đang phát: ${playlist[currentTrackIndex].title}`);
      })
      .catch((error) => {
        console.error("Error playing audio:", error);
        showNotification(
          "This file cannot be played. Check the MP3 file path."
        );
        handleAudioError();
      });
  }

  // Handle audio errors
  function handleAudioError() {
    updatePlayButton(false);
    musicPlayer.classList.remove("playing");
    showNotification(
      `Error: File not found ${playlist[currentTrackIndex].src}`
    );
  }

  // Previous track
  function previousTrack() {
    currentTrackIndex =
      currentTrackIndex > 0 ? currentTrackIndex - 1 : playlist.length - 1;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
      setTimeout(() => togglePlayPause(), 100);
    }
  }

  // Next track
  function nextTrack() {
    currentTrackIndex =
      currentTrackIndex < playlist.length - 1 ? currentTrackIndex + 1 : 0;
    loadTrack(currentTrackIndex);
    if (isPlaying) {
      setTimeout(() => togglePlayPause(), 100);
    }
  }

  // Show notification
  function showNotification(message) {
    const notification = document.createElement("div");
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 10000;
            font-size: 14px;
            backdrop-filter: blur(10px);
        `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // Event listeners
  playBtn.addEventListener("click", togglePlayPause);
  prevBtn.addEventListener("click", previousTrack);
  nextBtn.addEventListener("click", nextTrack);

  // Audio events
  audio.addEventListener("ended", () => {
    nextTrack(); // Auto play next track
  });

  audio.addEventListener("pause", () => {
    updatePlayButton(false);
    musicPlayer.classList.remove("playing");
  });

  audio.addEventListener("play", () => {
    updatePlayButton(true);
    musicPlayer.classList.add("playing");
  });

  audio.addEventListener("error", (e) => {
    console.error("Audio error:", e);
    updatePlayButton(false);
    musicPlayer.classList.remove("playing");
    showNotification("Error loading music. Go to next song.");
    setTimeout(() => nextTrack(), 1000);
  });

  // Load first track on init
  loadTrack(currentTrackIndex);

  // Keyboard controls (optional)
  document.addEventListener("keydown", (e) => {
    // Only work if no input is focused
    if (
      document.activeElement.tagName === "INPUT" ||
      document.activeElement.tagName === "TEXTAREA"
    ) {
      return;
    }

    switch (e.key) {
      case " ": // Spacebar
        e.preventDefault();
        togglePlayPause();
        break;
      case "ArrowLeft":
        e.preventDefault();
        previousTrack();
        break;
      case "ArrowRight":
        e.preventDefault();
        nextTrack();
        break;
    }
  });

  // Volume control (if you want to add volume slider later)
  function setVolume(volume) {
    audio.volume = Math.max(0, Math.min(1, volume));
  }

  // Expose some functions globally if needed
  window.musicPlayer = {
    play: () => togglePlayPause(),
    pause: () => togglePlayPause(),
    next: nextTrack,
    prev: previousTrack,
    setVolume: setVolume,
    getCurrentTrack: () => playlist[currentTrackIndex],
    isPlaying: () => isPlaying,
  };
});
