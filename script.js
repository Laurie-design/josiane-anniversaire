// ========== PROGRESS BAR ==========
(function initProgress() {
  const fill = document.getElementById('progressFill');
  window.addEventListener('scroll', () => {
    const scrollH = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollH <= 0) return;
    const pct = (window.scrollY / scrollH) * 100;
    fill.style.width = pct + '%';
  });
})();

// ========== LAZY VIDEO LOADING ==========
function initVideos() {
  document.querySelectorAll('.vid-main, .vid-sub').forEach(video => {
    const playBtn = video.parentElement.querySelector('.play-btn');
    const loadedKey = video.getAttribute('data-src');

    video.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleVideo(video, playBtn, loadedKey);
    });

    if (playBtn) {
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleVideo(video, playBtn, loadedKey);
      });
    }
  });
}

function toggleVideo(video, playBtn, src) {
  if (!video.src || video.src === window.location.href) {
    video.src = src;
    video.load();
  }

  if (video.paused) {
    video.play().catch(() => {});
    video.setAttribute('controls', '');
    if (playBtn) playBtn.classList.add('hidden');
    video.style.opacity = '1';
  } else {
    video.pause();
    if (playBtn) playBtn.classList.remove('hidden');
    video.removeAttribute('controls');
  }

  video.addEventListener('ended', () => {
    if (playBtn) playBtn.classList.remove('hidden');
    video.removeAttribute('controls');
  }, { once: true });
}

// ========== MOSAIC VIDEOS 11-22 ==========
function buildMosaic() {
  const container = document.getElementById('videoMosaic');
  if (!container) return;

  const videoNumbers = [11, 19, 17, 18, 25, 15, 24, 20];
  for (const i of videoNumbers) {
    const wrapper = document.createElement('div');
    wrapper.className = 'mosaic-item';

    const video = document.createElement('video');
    video.src = 'videos/Video' + i + '.mp4';
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'none';

    const playIcon = document.createElement('div');
    playIcon.className = 'mosaic-play';
    playIcon.textContent = '▶';

    wrapper.appendChild(video);
    wrapper.appendChild(playIcon);
    container.appendChild(wrapper);

    let playing = false;

    wrapper.addEventListener('click', () => {
      if (!playing) {
        video.src = 'videos/Video' + i + '.mp4';
        video.currentTime = 0;
        video.muted = false;
        video.play().catch(() => {});
        video.setAttribute('controls', '');
        playIcon.style.display = 'none';
        playing = true;
      } else {
        video.pause();
        video.removeAttribute('controls');
        video.muted = true;
        playIcon.style.display = 'flex';
        playing = false;
      }
    });

    video.addEventListener('ended', () => {
      playing = false;
      video.removeAttribute('controls');
      video.muted = true;
      playIcon.style.display = 'flex';
    });
  }
}

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
  initVideos();
  buildMosaic();
});
