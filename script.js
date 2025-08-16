// Logic ẩn preloader
window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');

  setTimeout(() => {
    if (preloader) {
      preloader.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }
  }, 2800);
});


// Logic hiển thị header khi cuộn trang (Giữ nguyên)
document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header');
  const heroSection = document.querySelector('.home-section');

  if (header && heroSection) {
    window.addEventListener('scroll', function () {
      const heroHeight = heroSection.offsetHeight;
      const triggerPoint = heroHeight * 0.2;
      const currentScroll = window.scrollY;

      if (currentScroll > triggerPoint) {
        header.classList.add('visible');
      } else {
        header.classList.remove('visible');
      }
    });
  }
});

// ---- LOGIC HIỂN THỊ HEADER KHI SCROLL ----
window.addEventListener('scroll', function () {
  const heroHeight = heroSection.offsetHeight;
  const triggerPoint = heroHeight * 0.2;
  const currentScroll = window.scrollY;

  if (currentScroll > triggerPoint) {
    header.classList.add('visible');
  } else {
    header.classList.remove('visible');
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
    hue: Math.random() < 0.7 ? 60 + Math.random() * 30 : 200 + Math.random() * 30
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
      ctx.lineTo(this.x - this.len * Math.cos(this.angle), this.y - this.len * Math.sin(this.angle));
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
    stars.forEach(star => {
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
    meteors.forEach(meteor => {
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
document.addEventListener('DOMContentLoaded', function () {
  const faders = document.querySelectorAll('.fade-in-section');

  const appearOptions = {
    threshold: 0.2
  };

  const appearOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});

// Logic hiển thị hiệu ứng hạt trong phần Tech
(function () {
  const canvas = document.getElementById('particles-bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  let width, height;
  function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    width = canvas.width = rect.width;
    height = canvas.height = rect.height;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const colors = ['#ff4d6d', '#f9c74f', '#90be6d', '#4cc9f0', '#f72585'];

  const particles = Array.from({ length: 500 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    radius: 1 + Math.random() * 1.5,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));

  let mouse = { x: null, y: null };

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
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

// Logic hiển thị hiệu ứng di chuyển chuột trong phần About
document.addEventListener("DOMContentLoaded", function () {
  const box = document.querySelector('.about-box');
  if (!box) return;

  box.addEventListener('mousemove', (e) => {
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    box.style.setProperty('--x', `${x}px`);
    box.style.setProperty('--y', `${y}px`);

    const edgeThresholdX = rect.width * 0.15;
    const edgeThresholdY = rect.height * 0.15;

    const nearEdge =
      x < edgeThresholdX || x > rect.width - edgeThresholdX ||
      y < edgeThresholdY || y > rect.height - edgeThresholdY;

    box.style.setProperty('--glow-opacity', nearEdge ? '1' : '0');
  });
});

const aboutBox = document.querySelector('.about-box');

aboutBox.addEventListener('mousemove', (e) => {
  const rect = aboutBox.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  aboutBox.style.setProperty('--mouse-x', `${x}px`);
  aboutBox.style.setProperty('--mouse-y', `${y}px`);
});

const box = document.querySelector('.about-box');

box.addEventListener('mousemove', (e) => {
  const rect = box.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  box.style.setProperty('--mouse-x', `${x}px`);
  box.style.setProperty('--mouse-y', `${y}px`);
});

// Logic hiển thị danh sách project theo skills
const username = 'Ocennami';
const badges = document.querySelectorAll('.skill-badge');
const panel = document.querySelector('.skill-panel');
const panelContent = document.getElementById('panel-content');
let reposData = [];

fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
  .then(res => res.json())
  .then(data => {
    reposData = data;
  })
  .catch(err => console.error('Lỗi khi fetch GitHub API:', err));

badges.forEach(btn => {
  btn.addEventListener('click', () => {
    const skill = btn.dataset.skill;

    if (panel.style.display === 'block' && panel.dataset.current === skill) {
      closePanel();
    } else {
      const filtered = reposData.filter(repo => {
        if (repo.language) return repo.language.toLowerCase() === skill.toLowerCase();
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
    JavaScript: '#f7df1e',
    Java: '#007396',
    'C++': '#00599C',
    'C#': '#68217A',
    CSS: '#2965f1',
    HTML: '#E34F26'
  };

  // Cải thiện cấu trúc HTML để dễ dàng tạo kiểu
  panelContent.innerHTML = `
    <div class="panel-header-new">
      <span class="language-icon" style="background-color: ${skillIconColors[capitalizedSkill] || '#fff'};"></span>
      <div class="language-info">
        <h3 class="language-title">${capitalizedSkill}</h3>
        <span class="language-tag">Programming Language</span>
      </div>
    </div>
    
    <p class="projects-count">Projects using ${capitalizedSkill} (${repos.length})</p>
    
    <div class="card-grid-new">
      ${repos.map(repo => {
        // Định dạng lại ngôn ngữ để hiển thị trên badge
        const repoLanguage = repo.language || 'Unknown';
        
        return `
        <div class="project-card-new" data-url="${repo.html_url}">
          <div class="card-header-new">
            <h4 class="card-title-new">${repo.name}</h4>
            <i class="fab fa-github github-link"></i>
          </div>
          <p class="card-description-new">${repo.description || 'No description provided.'}</p>
          <div class="card-footer-new">
            <span class="card-language-badge-new">
              <span class="dot" style="color: ${skillIconColors[repoLanguage] || '#ccc'};">●</span>
              ${repoLanguage}
            </span>
            <small class="card-date-new">Updated: ${new Date(repo.updated_at).toLocaleDateString()}</small>
          </div>
        </div>
      `}).join('')}
    </div>
  `;
  
  panel.style.display = 'block';
  
  const projectCards = panel.querySelectorAll('.project-card-new');
  projectCards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (!e.target.matches('a')) {
        const url = this.dataset.url;
        window.open(url, '_blank');
      }
    });
  });
}

function closePanel() {
  panel.style.display = 'none';
  panel.dataset.current = '';
}

function fallbackSkillMatch(repoName, skill) {
  const map = {
    Java: ['Parkour'],
    // thêm repo nếu GitHub API không nhận diện đúng ngôn ngữ
  };
  return map[skill]?.includes(repoName) || false;
}

// Logic hiển thị hiệu ứng di chuyển chuột trong phần Contact
document.addEventListener("DOMContentLoaded", function () {
  const contactBox = document.querySelector('.contact-box');
  if (!contactBox) return;

  contactBox.addEventListener('mousemove', (e) => {
    const rect = contactBox.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    contactBox.style.setProperty('--mouse-x', `${x}px`);
    contactBox.style.setProperty('--mouse-y', `${y}px`);
  });
});