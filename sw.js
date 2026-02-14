const CACHE_NAME = 'travel-guide-v2';

const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './HP_라콕.html',
  './HP_리든홀마켓.html',
  './HP_옥스포드.html',
  './HP_킹스크로스.html',
  './개선문.html',
  './갤러리_라파예트_오페라_가르니에.html',
  './결제_환전_가이드.html',
  './과학박물관.html',
  './교통_준비_가이드.html',
  './근위병_교대식.html',
  './날씨_대비_가이드.html',
  './노트르담_대성당.html',
  './대영박물관.html',
  './디즈니랜드_파리.html',
  './라콕.html',
  './런던_가이드.html',
  './런던_타워.html',
  './로열파빌리언.html',
  './루브르_박물관.html',
  './리든홀_마켓.html',
  './몽마르트.html',
  './문화_예절_가이드.html',
  './바스.html',
  './베르사유_궁전.html',
  './빅벤_국회의사당.html',
  './사치갤러리.html',
  './생_샤펠.html',
  './샹젤리제.html',
  './세븐시스터즈.html',
  './세인트_제임스_파크.html',
  './센강변_산책.html',
  './스톤헨지.html',
  './시테섬_라틴_쿼터.html',
  './앵발리드.html',
  './여행_필수_정보.html',
  './오랑주리_미술관.html',
  './오르세_미술관.html',
  './웨스트민스터_사원.html',
  './웨스트엔드_뮤지컬.html',
  './윔블던.html',
  './유로스타.html',
  './자연사박물관.html',
  './저녁_라이시엄.html',
  './저녁_마레.html',
  './저녁_블룸즈버리.html',
  './저녁_코벤트가든.html',
  './점심_라콕.html',
  './점심_브라이튼.html',
  './점심_사우스켄싱턴.html',
  './점심_옥스포드.html',
  './점심_웨스트민스터.html',
  './점심_윔블던.html',
  './점심_타워힐.html',
  './점심_튈르리.html',
  './준비물_체크리스트.html',
  './코벤트_가든.html',
  './크라이스트_처치.html',
  './타워_브리지.html',
  './탄식의_다리_래드클리프_카메라.html',
  './템즈강변_산책.html',
  './트라팔가_광장.html',
  './트로카데로_에펠탑.html',
  './파리_가이드.html',
  './피카디리_서커스.html',
  './픽처_갤러리.html',
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

// 네트워크 우선, 오프라인 시 캐시 폴백
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
