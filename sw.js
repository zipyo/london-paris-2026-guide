const CACHE_NAME = 'travel-guide-v1';

const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './HP_라콕.html',
  './HP_리든홀마켓.html',
  './HP_옥스포드.html',
  './HP_킹스크로스.html',
  './결제_환전_가이드.html',
  './과학박물관.html',
  './교통_준비_가이드.html',
  './근위병_교대식.html',
  './날씨_대비_가이드.html',
  './대영박물관.html',
  './라콕.html',
  './런던_가이드.html',
  './런던_타워.html',
  './리든홀_마켓.html',
  './문화_예절_가이드.html',
  './바스.html',
  './빅벤_국회의사당.html',
  './사치갤러리.html',
  './세븐시스터즈.html',
  './세인트_제임스_파크.html',
  './스톤헨지.html',
  './여행_필수_정보.html',
  './웨스트민스터_사원.html',
  './웨스트엔드_뮤지컬.html',
  './윔블던.html',
  './자연사박물관.html',
  './저녁_라이시엄.html',
  './저녁_블룸즈버리.html',
  './저녁_코벤트가든.html',
  './점심_라콕.html',
  './점심_브라이튼.html',
  './점심_사우스켄싱턴.html',
  './점심_웨스트민스터.html',
  './점심_윔블던.html',
  './점심_타워힐.html',
  './준비물_체크리스트.html',
  './코벤트_가든.html',
  './타워_브리지.html',
  './탄식의_다리_래드클리프_카메라.html',
  './트라팔가_광장.html',
  './파리_가이드.html',
  './피카디리_서커스.html',
  './해러즈.html',
  './해리포터_스튜디오.html',
];

// 설치: 모든 파일 사전 캐싱
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// 활성화: 이전 버전 캐시 정리
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 요청 가로채기: 캐시 우선, 네트워크 폴백
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
