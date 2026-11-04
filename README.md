# KANG DAEUN — Personal Travel Archive

국내 여행에 관심이 많은 대학생 강다은의 감성적인 개인 여행 아카이브 웹사이트입니다.  
미니멀 럭셔리와 시네마틱 무드의 디자인 시스템을 적용하여 절제된 흑백 톤과 여백의 미를 살렸습니다.

---

## 📂 파일 구조

```text
daeun-portfolio/
├── index.html        # 메인 웹페이지 구조 (HOME / ABOUT / TRAVEL / ARCHIVE)
├── styles.css        # 미니멀 럭셔리 스타일시트 및 모바일 반응형 디자인
├── app.js            # 여행 데이터, 상태/지역 필터, 날짜 정렬, 라이트박스, 스크롤 연동
├── netlify.toml      # Netlify 호스팅 배포 설정 파일
├── website_plan.md   # 웹사이트 기획 및 설계서
└── README.md         # 프로젝트 안내 및 배포 매뉴얼
```

---

## 🚀 빠른 실행 (로컬 환경)

별도의 Node.js 설치, 빌드 도구, 웹 서버 없이 바로 실행할 수 있습니다.

1. 본 폴더의 `index.html` 파일을 더블 클릭하여 크롬, 사파리, 엣지 등의 웹 브라우저로 엽니다.
2. 인터넷이 연결되어 있으면 Pexels 부산 해운대 항공 영상과 Unsplash 고화질 여행지 이미지가 표시됩니다.
3. 데이터 절약 모드 또는 인터넷 연결이 원활하지 않은 경우에도 시네마틱 포스터 배경이 자동으로 노출됩니다.

---

## 🧭 주요 메뉴 및 기능

1. **HOME**: 전체 화면형 시네마틱 배경 영상, 메인/보조 타이틀, ABOUT 및 EXPLORE TRAVEL 바로가기 버튼, 스크롤 인디케이터.
2. **ABOUT**: 강다은(융합관광경영전공 3학년, INTP)의 프로필 및 여행 소개.
3. **TRAVEL**:
   - 상태 탭 필터: `ALL (10)`, `VISITED (07)`, `WISHLIST (03)`
   - 지역 드롭다운 필터: 강원, 경상, 전라, 충청, 제주, 경기 등 실시간 필터링
   - 카드 클릭 또는 키보드(Enter/Space)로 사진 확대 보기 지원
4. **ARCHIVE**:
   - 날짜순 정렬 셀렉트 (`Newest first` / `Oldest first`)
   - 감성적인 카드 갤러리 및 라이트박스 연동
5. **라이트박스 (사진 확대)**:
   - 마우스 클릭, 이전/다음 버튼, 키보드 화살표(`←` / `→`), `Esc` 닫기 키 지원
   - 모바일 화면에서 좌우 스와이프 터치 제스처 지원
   - 현재 보고 있는 필터/정렬 목록 순서대로 이전/다음 탐색
   - 상단에 현재 사진 번호 / 전체 개수(`01 / 10`) 표시

---

## ✏️ 콘텐츠 교체 및 커스터마이징 방법

### 1. 여행지 데이터 수정 (`app.js`)
`app.js` 상단의 `places` 배열에서 각 여행지 정보를 쉽게 수정할 수 있습니다:

```javascript
{
  id: 'gangneung',
  name: '강릉',
  english: 'GANGNEUNG',
  region: '강원',
  status: 'visited',        // 'visited' 또는 'wishlist'
  date: '2026-05-12',       // 'YYYY-MM-DD' 형식 (날짜를 모를 때는 빈 문자열 '')
  description: '바다와 커피, 천천히 머물고 싶은 동해의 풍경.',
  image: 'https://images.unsplash.com/...' // 또는 'assets/gangneung.jpg'
}
```

- 실제 촬영한 사진으로 변경하려면 프로젝트 내에 `assets` 폴더를 만들고 사진을 넣은 뒤, `image: 'assets/사진파일명.jpg'`로 지정하면 됩니다.
- 실제 방문 날짜를 입력하면 ARCHIVE 섹션의 `SORT BY DATE`에 맞춰 최신순/오래된순으로 정확하게 정렬됩니다.

### 2. 소개 문구 수정 (`index.html`)
`index.html`의 `<section id="about">` 영역에서 본인의 여행 철학이나 관광에 관심을 갖게 된 계기를 자유롭게 보완하세요.

---

## 🌐 GitHub & Netlify 무료 배포 방법

본 프로젝트는 정적 웹사이트(HTML/CSS/JS)로 구성되어 있어 GitHub Pages 또는 Netlify를 통해 1분 만에 무료로 배포할 수 있습니다.

### 방법 1: Netlify에 배포하기 (가장 간편)
1. [Netlify](https://www.netlify.com/)에 로그인합니다.
2. 대시보드의 **Sites** 메뉴에서 `daeun-portfolio` 폴더를 드래그 앤 드롭(Drag & Drop)합니다.
3. 포함된 `netlify.toml` 설정에 의해 즉시 공개 웹사이트 URL이 생성됩니다.

### 방법 2: GitHub Pages로 배포하기
1. GitHub에서 새로운 공개 저장소(Repository)를 생성합니다.
2. 본 폴더의 파일들을 커밋하고 Push합니다.
3. 저장소의 **Settings** → **Pages** 탭으로 이동합니다.
4. **Source**를 `Deploy from a branch`로 선택하고, `main` 브랜치의 `/ (root)`를 지정한 뒤 **Save**를 누릅니다.
5. 잠시 후 `https://<깃허브아이디>.github.io/<저장소이름>/` 주소로 사이트가 배포됩니다.

---

## 📄 저작권 및 크레딧
- **히어로 영상**: [Pexels — Aerial View of Haeundae Beach and Skyline (by Pexels)](https://videos.pexels.com/video-files/34267136/14518918_3840_2160_60fps.mp4)
- **카드 이미지**: Unsplash Free License 기반의 감성 풍경 이미지 예시
- **폰트**: Google Fonts (DM Sans, Playfair Display), Pretendard
