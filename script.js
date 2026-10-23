/*
 * EDIT YOUR PORTFOLIO HERE.
 * This website uses plain JavaScript (not Java), HTML and CSS.
 * No frameworks, build tools, paid services, or API keys required.
 */

const SETTINGS = {
  name: 'Frence ALbarracin',                          // Replace with your actual name
  email: 'albarracinfrence@gmail.com',                                  // e.g. hello@yourdomain.com — REQUIRED to activate the contact form
  location: 'Based in the Philippines · Collaborating worldwide',
  heroKicker: 'AI FILMMAKER / VIDEO EDITOR / PHILIPPINES',
  showreelUrl: '',                            // YouTube, Vimeo or .mp4 URL

  // Add each project's playable local videos to its videos list.
  projects: [
    {
      id: 'ai-narrative',
      title: 'Cinematic AI Drama',
      category: 'ai',
      categoryLabel: 'AI FILM / CINEMATIC STORYTELLING',
      description: 'Narrative shots, atmosphere, character-driven emotion.',
      image: 'assets/ai-sample-preview.jpg',
      videos: [
        { url: 'assets/AI SAMPLE 1.mov', label: 'AI SAMPLE 1', image: 'assets/ai-sample-1-thumb.jpg' },
        { url: 'assets/AI SAMPLE 2.mov', label: 'AI SAMPLE 2', image: 'assets/ai-sample-2-thumb.jpg' },
        { url: 'assets/AI SAMPLE 3 .mp4', label: 'AI SAMPLE 3', image: 'assets/ai-sample-3-thumb.jpg' }
      ],
      tags: ['AI FILMMAKING', 'CINEMATIC DIRECTION', 'STORY FIRST'],
      detail: 'Three AI film samples. Choose a clip from the showcase to watch it.'
    },
    {
      id: 'product-film',
      title: 'Product Films',
      category: 'commercial',
      categoryLabel: 'COMMERCIAL / PRODUCT ADS',
      description: 'Beautiful products. Sharper hooks. Better stories.',
      image: 'assets/product-sample-preview.jpg',
      videos: [
        { url: 'assets/PRODUCT SAMPLE 1.mp4', label: 'PRODUCT SAMPLE 1', image: 'assets/product-sample-1-thumb.jpg' },
        { url: 'assets/PRODUCT SAMPLE 2.mp4', label: 'PRODUCT SAMPLE 2', image: 'assets/product-sample-2-thumb.jpg' },
        { url: 'assets/PRODUCT SAMPLE 3.mp4', label: 'PRODUCT SAMPLE 3', image: 'assets/product-sample-3-thumb.jpg' }
      ],
      tags: ['PRODUCT EDITING', 'VISUAL RHYTHM', 'AD CREATIVE'],
      detail: 'Three product film samples. Choose a clip from the showcase to watch it.'
    }
  ]
};

// --- Identity, basic setup ---
document.documentElement.classList.add('js');
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

$$('[data-site-name]').forEach(el => { el.textContent = SETTINGS.name; });
const heroKicker = $('[data-hero-kicker]');
if (heroKicker) heroKicker.textContent = SETTINGS.heroKicker;
$('#contactLocation').textContent = SETTINGS.location;
$('#footerYear').textContent = new Date().getFullYear();
document.title = `${SETTINGS.name} — AI Filmmaker & Video Editor`;

// --- Contact details ---
const validContactEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(SETTINGS.email) && !/example\.(com|org|net)$/i.test(SETTINGS.email);
const emailLink = $('#emailLink');
emailLink.innerHTML = '';
const emailText = document.createElement('span');
emailText.textContent = validContactEmail ? SETTINGS.email : 'ADD YOUR EMAIL';
const emailArrow = document.createElement('span');
emailArrow.setAttribute('aria-hidden', 'true');
emailArrow.textContent = '↗';
emailLink.append(emailText, emailArrow);
if (validContactEmail) emailLink.href = `mailto:${SETTINGS.email}`;
else {
  emailLink.href = '#contact';
  emailLink.addEventListener('click', event => {
    event.preventDefault();
    showToast('Set your contact email in SETTINGS at the top of script.js.');
  });
}

// --- Project cards and real, working category filters ---
const grid = $('#projectsGrid');
const count = $('#projectCount');
const projectButtons = $$('.filter-chip');
const safeText = str => String(str ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'": '&#39;' })[char]);
let activeFilter = 'all';
let revealObserver;

function renderProjects(filter = 'all') {
  activeFilter = filter;
  const list = SETTINGS.projects.filter(project => filter === 'all' || project.category === filter);
  grid.innerHTML = '';

  list.forEach((project, i) => {
    const originalIndex = SETTINGS.projects.indexOf(project);
    const featured = filter === 'all' && SETTINGS.projects.length > 2
      && (originalIndex === 0 || originalIndex === SETTINGS.projects.length - 1);
    const card = document.createElement('article');
    card.className = `project-card reveal${featured ? ' is-featured' : ''}`;
    const formattedNum = String(originalIndex + 1).padStart(2, '0');
    const firstVideo = project.videos?.[0];
    card.innerHTML = `
      <div class="project-thumb"><img src="${safeText(project.image)}" alt="Frame from ${safeText(firstVideo?.label || project.title)}" loading="eager" /></div>
      <div class="project-shade" aria-hidden="true"></div>
      <div class="project-topline"><span class="project-no">PROJECT ${formattedNum}</span><span class="project-label">${firstVideo ? `${project.videos.length} VIDEO${project.videos.length === 1 ? '' : 'S'}` : 'NO VIDEOS YET'}</span></div>
      <div class="project-bottom">
        <div><span class="project-cat">${safeText(project.categoryLabel)}</span><h3 class="project-title">${safeText(project.title)}</h3><p class="project-desc">${safeText(project.description)}</p></div>
        <button class="project-open" type="button" data-project-id="${safeText(project.id)}" aria-label="View ${safeText(project.title)} details">↗</button>
      </div>
    `;
    card.querySelector('.project-open').addEventListener('click', event => {
      event.stopPropagation();
      openVideo(project);
    });
    grid.appendChild(card);
    if (revealObserver) revealObserver.observe(card);
    else card.classList.add('in-view');
  });

  count.textContent = `SHOWING ${String(list.length).padStart(2, '0')} ${list.length === 1 ? 'PROJECT' : 'PROJECTS'}`;
  $$('.filter-chip span').forEach(el => { if (el.parentElement.dataset.filter === 'all') el.textContent = String(SETTINGS.projects.length).padStart(2, '0'); });
  projectButtons.forEach(button => {
    const active = button.dataset.filter === filter;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}
projectButtons.forEach(button => button.addEventListener('click', () => renderProjects(button.dataset.filter)));

// --- Scroll reveal and navigation progress ---
if ('IntersectionObserver' in window && !reduceMotion) {
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -35px 0px', threshold: .08 });
}
renderProjects();
$$('.reveal').forEach(element => {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add('in-view');
});

let scrollRequested = false;
function updateScrollProgress() {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  const progress = distance > 0 ? Math.max(0, Math.min(100, window.scrollY / distance * 100)) : 0;
  $('#scrollProgress').style.width = `${progress}%`;
  scrollRequested = false;
}
window.addEventListener('scroll', () => {
  if (!scrollRequested) {
    requestAnimationFrame(updateScrollProgress);
    scrollRequested = true;
  }
}, { passive: true });
updateScrollProgress();

// --- Accessible mobile navigation ---
const menuToggle = $('#menuToggle');
const navLinks = $('#navLinks');
function closeMenu() {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  document.body.classList.remove('menu-open');
}
menuToggle.addEventListener('click', () => {
  const isOpening = !navLinks.classList.contains('open');
  navLinks.classList.toggle('open', isOpening);
  menuToggle.setAttribute('aria-expanded', String(isOpening));
  menuToggle.setAttribute('aria-label', isOpening ? 'Close navigation' : 'Open navigation');
  document.body.classList.toggle('menu-open', isOpening);
});
$$('.nav-link').forEach(link => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => { if (window.innerWidth > 720) closeMenu(); });

// --- Cinematic timecode (decorative only) ---
const start = performance.now();
if (!reduceMotion) {
  const timeDisplay = $('#heroTimecode');
  setInterval(() => {
    const elapsed = (performance.now() - start) / 1000;
    const s = Math.floor(elapsed % 60);
    const m = Math.floor(elapsed / 60 % 60);
    const frames = Math.floor((elapsed % 1) * 24);
    timeDisplay.textContent = `00:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
  }, 100);
}

// --- Workflow tabs ---
const STEPS = [
  { label: 'THE WHY BEFORE THE HOW', title: 'Every great edit starts with intent.', description: 'I shape the message, pacing, emotion and references before opening the timeline. The story sets the direction.', image: 'assets/thoughtful-editor.webp', alt: 'Video editor studying a sequence at a workstation.' },
  { label: 'TURNING IDEAS INTO IMAGES', title: 'Give every shot a reason to exist.', description: 'I plan visual geography, framing, movement, lighting and consistent references before generating or assembling scenes.', image: 'assets/camera-editor.webp', alt: 'Creator holding a cinema camera in the editing studio.' },
  { label: 'STORY FINDS ITS RHYTHM', title: 'Cut with pace, never by accident.', description: 'I assemble the strongest takes, build meaningful transitions, and let performance, movement and sound guide the timing.', image: 'assets/working-editor.webp', alt: 'Editor building a sequence on professional editing monitors.' },
  { label: 'THE FINISH MAKES IT FEEL REAL', title: 'Polish every detail that matters.', description: 'Color, music, sound design, pacing and final quality control pull the whole experience into one coherent film.', image: 'assets/client-editor.webp', alt: 'Editor presenting work and discussing the final creative details.' }
];
const stepTabs = $$('.process-step');
function activateStep(index, shouldFocus = false) {
  const data = STEPS[index];
  $('#processTag').textContent = data.label;
  $('#processHeading').textContent = data.title;
  $('#processDescription').textContent = data.description;
  $('#processImage').src = data.image;
  $('#processImage').alt = data.alt;
  $('.process-graphic').textContent = `${String(index + 1).padStart(2, '0')} / ${String(STEPS.length).padStart(2, '0')}`;
  $('#processPanel').setAttribute('aria-labelledby', `processTab${index}`);
  stepTabs.forEach((tab, i) => {
    tab.classList.toggle('active', i === index);
    tab.setAttribute('aria-selected', String(i === index));
    tab.tabIndex = i === index ? 0 : -1;
  });
  if (shouldFocus) stepTabs[index].focus();
}
stepTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateStep(index));
  tab.addEventListener('keydown', event => {
    if (!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    const target = event.key === 'Home' ? 0 : event.key === 'End' ? STEPS.length - 1 : (index + (['ArrowDown','ArrowRight'].includes(event.key) ? 1 : -1) + STEPS.length) % STEPS.length;
    activateStep(target, true);
  });
});

// --- Color look slider ---
const compareRange = $('#compareRange');
compareRange.addEventListener('input', () => {
  $('#compareStage').style.setProperty('--split', `${compareRange.value}%`);
  $('#comparePercent').textContent = `${compareRange.value}%`;
});

// --- Video playback modal (YouTube / Vimeo / direct .mp4) ---
const modal = $('#videoModal');
const modalMedia = $('#modalMedia');
const modalDescription = $('#modalDescription');
const showcaseLibrary = $('#showcaseLibrary');
const showcasePlaylist = $('#showcasePlaylist');
const modalClose = $('#modalClose');
let focusBeforeModal = null;

function parseVideoUrl(value) {
  const url = (value || '').trim();
  if (!url) return { type:'empty' };
  // Files placed beside this website can be played without online hosting.
  if (/^(?:\.\/?|\.\.\/)?assets\/.+\.(?:mp4|mov|webm|ogg)(?:[?#].*)?$/i.test(url)) return { type:'video', url };
  try {
    const parsed = new URL(url);
    if (!['https:', 'http:'].includes(parsed.protocol)) return { type:'invalid' };
    const host = parsed.hostname.toLowerCase();
    const youtubeId = host === 'youtu.be' ? parsed.pathname.split('/')[1]
      : host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com') ? (parsed.searchParams.get('v') || parsed.pathname.match(/\/(?:shorts|embed)\/([\w-]{11})/)?.[1]) : null;
    if (youtubeId && /^[\w-]{11}$/.test(youtubeId)) return { type:'iframe', url:`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0` };
    if (host === 'vimeo.com' || host.endsWith('.vimeo.com')) {
      const match = parsed.pathname.match(/\/(\d+)(?:\/|$)/);
      if (match) return { type:'iframe', url:`https://player.vimeo.com/video/${match[1]}?autoplay=1` };
    }
    if (/\.(mp4|mov|webm|ogg)$/i.test(parsed.pathname)) return { type:'video', url:parsed.href };
    return { type:'external', url:parsed.href };
  } catch { return { type:'invalid' }; }
}
function mediaPlaceholder() {
  const div = document.createElement('div');
  div.className = 'media-empty';
  div.innerHTML = '<span class="media-symbol" aria-hidden="true">▶</span><strong>Your video goes here</strong><p>Add a YouTube, Vimeo or direct MP4 URL in the <code>SETTINGS</code> section at the top of <code>script.js</code>. Your showreel and portfolio videos will then play here automatically.</p>';
  return div;
}
function mediaErrorPlaceholder() {
  const div = document.createElement('div');
  div.className = 'media-error';
  div.setAttribute('role', 'status');
  div.textContent = 'This browser could not display this video. Re-export it as MP4 (H.264/AVC video with AAC audio), then update its filename in script.js.';
  return div;
}
function getShowcaseVideos(selectedProject) {
  return selectedProject.videos.map((video, index) => ({
    id: `${selectedProject.id}-video-${index + 1}`,
    projectId: selectedProject.id,
    title: selectedProject.title,
    videoUrl: video.url,
    videoLabel: video.label || `VIDEO ${index + 1}`,
    image: video.image || selectedProject.image,
    categoryLabel: selectedProject.categoryLabel,
    detail: selectedProject.detail,
    tags: selectedProject.tags
  }));
}
function selectShowcaseVideo(video) {
  const title = video.title;
  const url = video.videoUrl;
  const parsed = parseVideoUrl(url);
  $('#modalTitle').textContent = title;
  modalMedia.replaceChildren();
  modalDescription.replaceChildren();
  modalMedia.classList.remove('is-portrait');

  if (parsed.type === 'iframe') {
    const iframe = document.createElement('iframe');
    iframe.title = `${title} — video player`;
    iframe.src = parsed.url;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    modalMedia.append(iframe);
  } else if (parsed.type === 'video') {
    const video = document.createElement('video');
    video.src = parsed.url;
    video.controls = true;
    video.playsInline = true;
    video.autoplay = true;
    video.addEventListener('loadedmetadata', () => {
      modalMedia.classList.toggle('is-portrait', video.videoHeight > video.videoWidth);
    }, { once: true });
    video.addEventListener('error', () => {
      video.pause();
      modalMedia.replaceChildren(mediaErrorPlaceholder());
      modalMedia.classList.remove('is-portrait');
    }, { once: true });
    modalMedia.append(video);
    video.play().catch(() => {});
  } else if (parsed.type === 'empty') {
    modalMedia.append(mediaPlaceholder());
  } else if (parsed.type === 'external') {
    const link = document.createElement('a');
    link.href = parsed.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Open video in a new tab ↗';
    modalMedia.append(link);
  } else {
    modalMedia.append(mediaPlaceholder());
  }

  if (video.detail) {
    const detail = document.createElement('p');
    detail.textContent = video.detail;
    modalDescription.append(detail);
    const tags = document.createElement('div');
    tags.className = 'modal-tags';
    (video.tags || []).forEach(tag => {
      const span = document.createElement('span');
      span.textContent = tag;
      tags.append(span);
    });
    modalDescription.append(tags);
  }

  if (parsed.type === 'invalid') {
    const p = document.createElement('p');
    p.textContent = 'This video link is not a valid URL. Check it in script.js.';
    modalDescription.append(p);
  }
  $$('.showcase-video', showcasePlaylist).forEach(button => {
    const active = button.dataset.videoId === video.id;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}
function openVideo(project = null) {
  focusBeforeModal = document.activeElement;
  showcasePlaylist.replaceChildren();
  showcaseLibrary.hidden = !project;
  modal.hidden = false;
  document.body.classList.add('modal-open');

  if (project) {
    const videos = getShowcaseVideos(project).filter(video => {
      const type = parseVideoUrl(video.videoUrl).type;
      return type === 'video' || type === 'iframe';
    });
    videos.forEach(item => {
      const button = document.createElement('button');
      button.className = 'showcase-video';
      button.type = 'button';
      button.dataset.videoId = item.id;
      button.setAttribute('aria-pressed', 'false');
      button.innerHTML = `<img src="${safeText(item.image)}" alt="" loading="lazy"><span class="showcase-video-title">${safeText(item.title)} — ${safeText(item.videoLabel)}</span><span class="showcase-video-label">${safeText(item.categoryLabel)}</span>`;
      button.addEventListener('click', () => selectShowcaseVideo(item));
      showcasePlaylist.append(button);
    });
    selectShowcaseVideo(videos.find(video => video.projectId === project.id) || {
      id: project.id,
      title: project.title,
      videoUrl: '',
      detail: project.detail,
      tags: project.tags
    });
  } else {
    const reel = {
      id: 'showreel',
      title: 'My showreel',
      videoUrl: SETTINGS.showreelUrl,
      detail: ''
    };
    selectShowcaseVideo(reel);
    modalDescription.textContent = 'The reel will appear here once you add your own video link to SETTINGS.showreelUrl.';
  }
  modalClose.focus();
}
function closeVideo() {
  if (modal.hidden) return;
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  modalMedia.replaceChildren(); // stop playback immediately
  modalMedia.classList.remove('is-portrait');
  if (focusBeforeModal?.focus) focusBeforeModal.focus();
}
$('#showreelTrigger').addEventListener('click', () => openVideo());
modalClose.addEventListener('click', closeVideo);
$('[data-close-modal]').addEventListener('click', closeVideo);
window.addEventListener('keydown', event => {
  if (event.key === 'Escape') { closeVideo(); closeMenu(); }
  if (event.key !== 'Tab' || modal.hidden) return;
  const controls = [...modal.querySelectorAll('button:not([disabled]),a[href],iframe,[tabindex]:not([tabindex="-1"])')];
  if (!controls.length) return;
  const first = controls[0], last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});

// --- Mailto form: front-end only, no fake "sent" message ---
$('#contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const feedback = $('#formMessage');
  if (!validContactEmail) {
    feedback.textContent = 'Before publishing: add your real email to SETTINGS.email in script.js.';
    showToast('To activate the form, set your email in script.js.');
    return;
  }
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`Hello,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`);
  feedback.textContent = 'Opening your email application with your drafted message. Please send it there to complete your inquiry.';
  window.location.href = `mailto:${SETTINGS.email}?subject=${subject}&body=${body}`;
});

// --- Non-blocking alert / guidance ---
let toastTimer;
function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 4300);
}
