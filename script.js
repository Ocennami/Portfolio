// Magnifier Glass Effect
const magnifier = document.getElementById("magnifier");
let magX = 0,
  magY = 0;

document.addEventListener("mousemove", (e) => {
  magX = e.clientX - 40;
  magY = e.clientY - 40;
  magnifier.style.transform = `translate(${magX}px, ${magY}px)`;

  // Lấy background của body
  const bodyStyles = window.getComputedStyle(document.body);
  const bg = bodyStyles.backgroundImage || bodyStyles.backgroundColor;
  // Lấy vị trí scroll
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  // Tính vị trí background cho hiệu ứng phóng đại
  magnifier.style.background = bg;
  magnifier.style.backgroundPosition = `${-magX + 40 + scrollX}px ${
    -magY + 40 + scrollY
  }px`;
});
// Logic ẩn preloader
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");

  setTimeout(() => {
    if (preloader) {
      preloader.classList.add("hidden");
      document.body.style.overflow = "auto";
    }
  }, 2800);
});

// Logic hiển thị header khi cuộn trang (Giữ nguyên)
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
});

// ---- LOGIC HIỂN THỊ HEADER KHI SCROLL ----
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

// Logic hiển thị hiệu ứng sao băng và sao trong phần Space
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

  //Tạo sao băng mới ngẫu nhiên mỗi 2–4 giây
  setInterval(() => {
    const num = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < num; i++) {
      meteors.push(new Meteor());
    }
  }, Math.random() * 2000 + 2000);

  function loop() {
    ctx.fillStyle = "rgba(7, 11, 20, 0.5)";
    ctx.fillRect(0, 0, c.width, c.height);

    // Vẽ sao
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

    // Vẽ sao băng
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

// Logic hiển thị phần tử khi cuộn trang (Fade-in effect)
document.addEventListener("DOMContentLoaded", function () {
  const faders = document.querySelectorAll(".fade-in-section");

  const appearOptions = {
    threshold: 0.2,
  };

  const appearOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });
});

// Logic hiển thị hiệu ứng hạt trong phần Tech
(function () {
  const canvas = document.getElementById("particles-bg");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let width, height;
  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = canvas.width = rect.width;
    height = canvas.height = rect.height;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const colors = ["#ff4d6d", "#f9c74f", "#90be6d", "#4cc9f0", "#f72585"];

  const particles = Array.from({ length: 500 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    radius: 1 + Math.random() * 1.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

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
      // Tính lực đẩy nếu chuột hiện diện
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

// Logic hiển thị hiệu ứng di chuyển chuột trong phần About
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

// Logic hiển thị danh sách project theo skills
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

  // Viết hoa chữ cái đầu của skill (javascript -> Javascript)
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

  // Cải thiện cấu trúc HTML để dễ dàng tạo kiểu
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
          // Định dạng lại ngôn ngữ để hiển thị trên badge
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
    // thêm repo nếu GitHub API không nhận diện đúng ngôn ngữ
  };
  return map[skill]?.includes(repoName) || false;
}

// Logic hiển thị hiệu ứng di chuyển chuột trong phần Contact
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

  // Playlist với file MP3 thực
  const playlist = [
    {
      title: "Nếu một ngày chúng ta không còn gặp",
      artist: "2CAN",
      cover: "picture/NẾU MỘT NGÀY CHÚNG TA KHÔNG CÒN GẶP.jpg",
      src: "music/NẾU MỘT NGÀY CHÚNG TA KHÔNG CÒN GẶP (ft. 2CAN).mp3",
      link: "https://open.spotify.com/track/5BsnY4AATNyLE3OWUqHLQg?si=4a2c8b4d59414f51",
    },
    {
      title: "Điều chưa nói",
      artist: "Tứa ft. CM1X",
      cover: "picture/Điều Chưa Nói - Tùa ft. CM1X - TÙA.png",
      src: "music/Điều Chưa Nói - Tùa ft. CM1X - TÙA.mp3",
      link: "https://open.spotify.com/track/5hzjqKMQPampmtM6eObybz?si=0c869d7ff79a4f8b",
    },
    {
      title: "Ai Đưa Em Về",
      artist: "1nG x VoVanDuc",
      cover: "picture/Ai Đưa Em Về - 1nG x VoVanDuc.jpg",
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
