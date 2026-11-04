// 여행지 데이터 (기획서 기준)
const places = [
  {
    id: 'gangneung',
    name: '강릉',
    english: 'GANGNEUNG',
    region: '강원',
    status: 'visited',
    date: '',
    description: '바다와 커피, 천천히 머물고 싶은 동해의 풍경.',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'sokcho',
    name: '속초',
    english: 'SOKCHO',
    region: '강원',
    status: 'visited',
    date: '',
    description: '파도와 산이 가까이 만나는 도시의 분위기.',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'busan',
    name: '부산',
    english: 'BUSAN',
    region: '경상',
    status: 'visited',
    date: '',
    description: '바다와 도시의 리듬이 함께 이어지는 곳.',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'jeonju',
    name: '전주',
    english: 'JEONJU',
    region: '전라',
    status: 'visited',
    date: '',
    description: '골목과 오래된 건물 사이를 걷는 여행.',
    image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'daejeon',
    name: '대전',
    english: 'DAEJEON',
    region: '충청',
    status: 'visited',
    date: '',
    description: '익숙한 일상 속 새로운 장면을 발견하는 도시.',
    image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'jeju',
    name: '제주도',
    english: 'JEJU',
    region: '제주',
    status: 'visited',
    date: '',
    description: '바람과 초록, 바다의 색을 오래 기억하고 싶은 섬.',
    image: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'pocheon',
    name: '포천',
    english: 'POCHEON',
    region: '경기',
    status: 'visited',
    date: '',
    description: '자연 가까이에서 잠시 쉬어가는 시간.',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'gyeongju',
    name: '경주',
    english: 'GYEONGJU',
    region: '경상',
    status: 'wishlist',
    date: '',
    description: '역사와 계절의 풍경을 천천히 만나고 싶은 곳.',
    image: 'https://images.unsplash.com/photo-1514894780887-121968d00567?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'daegu',
    name: '대구',
    english: 'DAEGU',
    region: '경상',
    status: 'wishlist',
    date: '',
    description: '도시의 골목과 지역의 일상을 경험하고 싶은 곳.',
    image: 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'ulsan',
    name: '울산',
    english: 'ULSAN',
    region: '경상',
    status: 'wishlist',
    date: '',
    description: '바다와 산업도시의 서로 다른 풍경을 보고 싶은 곳.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85'
  }
];

// DOM 참조
const siteHeader = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.nav-link');
const grid = document.querySelector('#place-grid');
const archiveGrid = document.querySelector('#archive-grid');
const regionFilter = document.querySelector('#region-filter');
const sortOrder = document.querySelector('#sort-order');
const lightbox = document.querySelector('#lightbox');
const lightboxCounter = document.querySelector('#lightbox-counter');
const lightboxImg = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('figcaption');
const heroVideo = document.querySelector('.hero-video');

// 상태 변수
let activeStatus = 'all';
let visibleItems = [...places];
let currentArchiveItems = [...places];
let activeLightboxItems = [...places];
let lightboxIndex = 0;
let lastFocusedElement = null;

// 라벨 포맷터
const statusLabel = status => status === 'visited' ? 'VISITED' : 'WISHLIST';
const dateLabel = date => {
  if (!date) return '날짜 미입력';
  try {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(`${date}T00:00:00`));
  } catch (e) {
    return date;
  }
};

const formatCount = num => String(num).padStart(2, '0');

// 탭 카운트 동적 업데이트
function updateTabCounts() {
  const countAll = places.length;
  const countVisited = places.filter(p => p.status === 'visited').length;
  const countWishlist = places.filter(p => p.status === 'wishlist').length;

  const elAll = document.querySelector('#count-all');
  const elVisited = document.querySelector('#count-visited');
  const elWishlist = document.querySelector('#count-wishlist');

  if (elAll) elAll.textContent = formatCount(countAll);
  if (elVisited) elVisited.textContent = formatCount(countVisited);
  if (elWishlist) elWishlist.textContent = formatCount(countWishlist);
}

// 지역 드롭다운 옵션 채우기
function populateRegionOptions() {
  const regions = [...new Set(places.map(p => p.region))].sort((a, b) => a.localeCompare(b, 'ko'));
  regions.forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    option.textContent = region;
    regionFilter.append(option);
  });
}

// TRAVEL 카드 목록 렌더링
function renderPlaces() {
  const region = regionFilter.value;
  visibleItems = places.filter(place => {
    const matchStatus = activeStatus === 'all' || place.status === activeStatus;
    const matchRegion = region === 'all' || place.region === region;
    return matchStatus && matchRegion;
  });

  if (!visibleItems.length) {
    grid.innerHTML = '<p class="empty-state">선택한 조건에 해당하는 여행지가 없습니다.</p>';
    return;
  }

  grid.innerHTML = visibleItems.map(place => `
    <article class="place-card" data-id="${place.id}" tabindex="0" role="button" aria-label="${place.name} 이미지 크게 보기">
      <div class="place-image">
        <img src="${place.image}" alt="${place.name} 여행 분위기 참고 이미지" loading="lazy">
        <span class="place-status">${statusLabel(place.status)}</span>
        <span class="image-sample">IMAGE SAMPLE</span>
      </div>
      <div class="place-meta">
        <h3>${place.name}</h3>
        <span class="place-region">${place.region.toUpperCase()} · ${place.english}</span>
      </div>
      <p class="place-description">${place.description}</p>
    </article>
  `).join('');

  grid.querySelectorAll('.place-card').forEach(card => {
    const open = () => openLightbox(card.dataset.id, visibleItems, card);
    card.addEventListener('click', open);
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });
  });
}

// ARCHIVE 그리드 렌더링
function renderArchive() {
  currentArchiveItems = [...places].sort((a, b) => {
    if (!a.date && !b.date) return a.name.localeCompare(b.name, 'ko');
    if (!a.date) return 1;
    if (!b.date) return -1;
    return sortOrder.value === 'oldest' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
  });

  archiveGrid.innerHTML = currentArchiveItems.map(place => `
    <button class="archive-card" type="button" data-id="${place.id}" aria-label="${place.name} 이미지 크게 보기">
      <div class="archive-image">
        <img src="${place.image}" alt="${place.name} 이미지 예시" loading="lazy">
      </div>
      <span>${statusLabel(place.status)} · ${dateLabel(place.date)}</span>
      <strong>${place.name}</strong>
    </button>
  `).join('');

  archiveGrid.querySelectorAll('.archive-card').forEach(card => {
    card.addEventListener('click', () => openLightbox(card.dataset.id, currentArchiveItems, card));
  });
}

// 라이트박스 열기
function openLightbox(id, contextList, triggerElement) {
  lastFocusedElement = triggerElement || document.activeElement;
  activeLightboxItems = (contextList && contextList.length) ? contextList : places;
  
  const foundIndex = activeLightboxItems.findIndex(p => p.id === id);
  lightboxIndex = foundIndex !== -1 ? foundIndex : 0;

  showLightboxItem();
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const closeBtn = lightbox.querySelector('.lightbox-close');
  if (closeBtn) closeBtn.focus();
}

// 현재 라이트박스 항목 렌더링
function showLightboxItem() {
  const item = activeLightboxItems[lightboxIndex];
  if (!item) return;

  lightboxImg.src = item.image;
  lightboxImg.alt = `${item.name} 이미지 예시`;
  lightboxCaption.textContent = `${item.name} (${item.english})  /  ${statusLabel(item.status)}  /  ${dateLabel(item.date)} · ${item.description}`;

  if (lightboxCounter) {
    const cur = formatCount(lightboxIndex + 1);
    const total = formatCount(activeLightboxItems.length);
    lightboxCounter.textContent = `${cur} / ${total}`;
  }
}

// 라이트박스 닫기
function closeLightbox() {
  if (!lightbox.classList.contains('open')) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
}

// 라이트박스 탐색
function moveLightbox(direction) {
  if (!activeLightboxItems.length) return;
  lightboxIndex = (lightboxIndex + direction + activeLightboxItems.length) % activeLightboxItems.length;
  showLightboxItem();
}

// 헤더 스크롤 효과 및 ScrollSpy
function initScrollInteractions() {
  const sections = ['home', 'about', 'travel', 'archive'].map(id => document.getElementById(id)).filter(Boolean);

  function onScroll() {
    // 1. 헤더 다크 블러 배경 토글
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // 2. 현재 스크롤 위치에 따른 내비게이션 활성 링크 갱신
    const scrollPos = window.scrollY + 120;
    let currentSectionId = 'home';

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.id;
      }
    });

    navLinks.forEach(link => {
      const target = link.getAttribute('data-section') || link.getAttribute('href').replace('#', '');
      link.classList.toggle('active', target === currentSectionId);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// 모바일 내비게이션 초기화
function initMobileNav() {
  if (!menuToggle || !mainNav) return;

  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', '메뉴 열기');
    });
  });

  // 메뉴 바깥 클릭 시 닫기
  document.addEventListener('click', event => {
    if (mainNav.classList.contains('open') &&
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)) {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', '메뉴 열기');
    }
  });
}

// 모바일 라이트박스 터치 스와이프 지원
function initLightboxTouch() {
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) moveLightbox(-1);
      else moveLightbox(1);
    }
  }, { passive: true });
}

// 이벤트 리스너 등록
function initEventListeners() {
  // 상태 탭 (ALL / VISITED / WISHLIST)
  document.querySelectorAll('.status-tab').forEach(button => {
    button.addEventListener('click', () => {
      activeStatus = button.dataset.status;
      document.querySelectorAll('.status-tab').forEach(tab => tab.classList.toggle('active', tab === button));
      renderPlaces();
    });
  });

  // 지역 필터 & 정렬
  regionFilter.addEventListener('change', renderPlaces);
  sortOrder.addEventListener('change', renderArchive);

  // 라이트박스 컨트롤
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => moveLightbox(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => moveLightbox(1));

  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });

  // 키보드 내비게이션 (Esc, 화살표)
  document.addEventListener('keydown', event => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') moveLightbox(-1);
    if (event.key === 'ArrowRight') moveLightbox(1);
  });

  // 부드러운 스크롤 등장 효과 (IntersectionObserver)
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // 비디오 로드 에러 핸들링
  if (heroVideo) {
    heroVideo.addEventListener('error', () => {
      heroVideo.style.display = 'none';
    });
  }
}

// 초기화 실행
function init() {
  updateTabCounts();
  populateRegionOptions();
  renderPlaces();
  renderArchive();
  initMobileNav();
  initScrollInteractions();
  initLightboxTouch();
  initEventListeners();
}

document.addEventListener('DOMContentLoaded', init);
{
    id: 'osaka',
    name: '오사카',
    english: 'OSAKA',
    region: '해외',
    status: 'visited', // 다녀온 곳
    date: '2026-08-15',
    description: '맛있는 음식과 활기찬 거리가 있는 도시.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf'
  },
  {
    id: 'swiss',
    name: '스위스',
    english: 'SWITZERLAND',
    region: '해외',
    status: 'wishlist', // 가고싶은 곳
    date: '',
    description: '대자연과 알프스의 아름다운 풍경을 만나는 곳.',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99'
  },
  {
    id: 'newyork',
    name: '뉴욕',
    english: 'NEW YORK',
    region: '해외',
    status: 'wishlist', // 가고싶은 곳
    date: '',
    description: '화려한 야경과 트렌디함이 공존하는 대도시.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9'
  },
