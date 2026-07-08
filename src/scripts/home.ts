/* KARMOT ana sayfa yönetmeni: preloader → sahneler → jenerik */
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initCursor } from './cursor';

gsap.registerPlugin(ScrollTrigger);
initCursor();

const q = <T extends Element = HTMLElement>(s: string) => document.querySelector<T>(s);
const qa = <T extends Element = HTMLElement>(s: string) => Array.from(document.querySelectorAll<T>(s));
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(pointer: fine)').matches;

/* ---------------------------------------------------------------- Lenis */
let velocity = 0;
let lenis: Lenis | null = null;

if (!reduced) {
  lenis = new Lenis({ autoRaf: false });
  lenis.on('scroll', (e: { velocity: number }) => {
    velocity = e.velocity;
    ScrollTrigger.update();
  });
  gsap.ticker.add((t) => lenis?.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  qa<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (ev) => {
      const target = document.querySelector(a.getAttribute('href') ?? '');
      if (target) {
        ev.preventDefault();
        lenis?.scrollTo(target as HTMLElement, { duration: 1.4 });
      }
    });
  });
}

/* ------------------------------------------------------- RPM göstergesi */
const needle = q('#rpmNeedle');
const readout = q('#rpmReadout');
/* SVG attribute ile döndür: CSS transform-origin DPI/GSAP etkileşiminde ibreyi kaydırıyor */
const setNeedle = (deg: number) => needle?.setAttribute('transform', `rotate(${deg} 60 60)`);
let rpmShown = 0;
let rpmLive = false; // preloader marş süiti bitene dek ticker dokunmasın

gsap.ticker.add(() => {
  if (!rpmLive || !needle) return;
  const target = Math.min(Math.abs(velocity) / 28, 1);
  rpmShown += (target - rpmShown) * (target > rpmShown ? 0.16 : 0.05);
  velocity *= 0.9;
  setNeedle(-120 + rpmShown * 240);
  if (readout) readout.textContent = String(Math.round(rpmShown * 1450)).padStart(4, '0');
});

/* ------------------------------------------------------- Volan (rotor) */
const rotorOuter = q('#rotorOuter');
const rotorInner = q('#rotorInner');
let rotorAngle = 0;
if ((rotorOuter || rotorInner) && !reduced) {
  gsap.ticker.add(() => {
    rotorAngle += 0.05 + Math.min(Math.abs(velocity) * 0.1, 2.2);
    if (rotorOuter) gsap.set(rotorOuter, { rotation: rotorAngle, svgOrigin: '450 450' });
    if (rotorInner) gsap.set(rotorInner, { rotation: rotorAngle * -0.6, svgOrigin: '450 450' });
  });
}

/* ------------------------------------------------------------- Klaket */
const slateEl = q('#slate');
const slateText = q('#slateText');
const tcScene = q('#tcScene');
let slateTl: gsap.core.Timeline | null = null;
let lastSlate = '';

function setScene(name: string) {
  if (tcScene) tcScene.textContent = name;
}

function slate(text: string, name: string) {
  setScene(name);
  if (!slateEl || reduced || text === lastSlate) return;
  lastSlate = text;
  if (slateText) slateText.textContent = text;
  slateTl?.kill();
  slateTl = gsap
    .timeline()
    .fromTo(slateEl, { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: 0.18 })
    .to(slateEl, { opacity: 0.35, duration: 0.07, yoyo: true, repeat: 3 })
    .to(slateEl, { autoAlpha: 0, y: -6, duration: 0.3, delay: 1.25 })
    .call(() => (lastSlate = ''));
}

/* ------------------------------------------------------------ Preloader */
const pre = q('#pre');

function heroIntro() {
  if (reduced) return;
  gsap.from('.hero__t1 .kin-line', {
    yPercent: 118,
    skewY: 5,
    duration: 1.2,
    ease: 'power4.out',
    stagger: 0.12,
  });
  gsap.from('.hero__kicker, .hero__hint', {
    autoAlpha: 0,
    duration: 0.9,
    delay: 0.5,
    ease: 'power2.out',
  });
  slate('Sahne 01 · Sessizlik — İnt. Karanlık', 'Sahne 01 · Sessizlik');
}

if (!pre || reduced) {
  pre?.remove();
  rpmLive = true;
} else {
  lenis?.stop();
  const pct = { v: 0 };
  const sweep = { v: -120 };
  const blades = ['#blade1', '#blade2', '#blade3'];
  gsap.set(blades, { xPercent: -260, skewX: -27 });

  gsap
    .timeline({
      onComplete: () => {
        pre.remove();
        rpmLive = true;
        lenis?.start();
        heroIntro();
      },
    })
    .from('#preKicker, #preTitle, #preSpec', { autoAlpha: 0, y: 16, stagger: 0.14, duration: 0.5 })
    // kontak marşı: ibre tavana vurur, geri düşer
    .to(sweep, { v: 120, duration: 0.6, ease: 'power2.in', onUpdate: () => setNeedle(sweep.v) }, 0.1)
    .to(sweep, { v: -120, duration: 0.7, ease: 'power3.out', onUpdate: () => setNeedle(sweep.v) }, '>')
    .to('#preBar', { scaleX: 1, duration: 1.15, ease: 'power2.inOut' }, 0.15)
    .to(
      pct,
      {
        v: 100,
        duration: 1.15,
        ease: 'power2.inOut',
        onUpdate: () => {
          const el = q('#prePct');
          if (el) el.textContent = String(Math.round(pct.v)).padStart(3, '0');
        },
      },
      0.15
    )
    .to(blades, { xPercent: 150, duration: 0.85, ease: 'power4.inOut', stagger: 0.09 }, '>-0.05')
    .to(pre, { autoAlpha: 0, duration: 0.2 }, '>-0.25');
}

/* --------------------------------------------------------------- Sahne kur */
const mm = gsap.matchMedia();

/* Masaüstü + hareket serbest: sinema düzeni */
mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
  /* Sahne 01 — pinli kinetik geçiş */
  const t2Lines = qa('.hero__t2 .kin-line');
  gsap.set(t2Lines, { y: 0, yPercent: 135 });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '+=150%',
        scrub: 0.7,
        pin: true,
        anticipatePin: 1,
      },
    })
    .to('.hero__t1 .kin-line', {
      yPercent: -128,
      skewY: -4,
      stagger: 0.04,
      duration: 0.5,
      ease: 'power2.in',
    })
    /* kısa bir nefes: "her şey durur…" — sessizlik — "ta ki güç…" */
    .to(t2Lines, { yPercent: 0, skewY: 0, stagger: 0.07, duration: 0.75, ease: 'power3.out' }, 0.62)
    .fromTo(
      '.hero__foot',
      { y: 36 },
      { autoAlpha: 1, y: 0, duration: 0.45 },
      '>-0.2'
    )
    .to('.hero__corner', { autoAlpha: 0, duration: 0.25 }, 0)
    .to('.hero__ghost', { yPercent: 30, ease: 'none', duration: 1.35 }, 0);

  /* Sahne 02 — yatay tahrik hattı */
  const track = q('#chainTrack');
  const zincir = q('#zincir');
  if (track && zincir) {
    const dist = () => track.scrollWidth - window.innerWidth;
    const brandPanels = qa('.panel[data-brand]');
    const chainBar = q('#chainBar');
    const chainPct = q('#chainPct');
    const chainCount = q('#chainCount');
    let centers: number[] = [];
    const measure = () => {
      centers = brandPanels.map((p) => (p as HTMLElement).offsetLeft);
    };
    measure();
    ScrollTrigger.addEventListener('refreshInit', measure);

    /* letterbox: anamorfik bantlar pin süresince (sol HUD bu sırada gizlenir) */
    const lbIn = () => {
      gsap.to(['#lbTop', '#lbBot'], { yPercent: 0, y: 0, duration: 0.6, ease: 'power3.out', overwrite: true });
      gsap.to('.hud', { autoAlpha: 0, duration: 0.35, overwrite: true });
    };
    const lbOut = () => {
      gsap.to('#lbTop', { yPercent: -101, y: 0, duration: 0.6, ease: 'power3.in', overwrite: true });
      gsap.to('#lbBot', { yPercent: 101, y: 0, duration: 0.6, ease: 'power3.in', overwrite: true });
      gsap.to('.hud', { autoAlpha: 1, duration: 0.5, overwrite: true });
    };
    gsap.set('#lbTop', { y: 0, yPercent: -101 });
    gsap.set('#lbBot', { y: 0, yPercent: 101 });

    const chainTween = gsap.to(track, {
      x: () => -dist(),
      ease: 'none',
      scrollTrigger: {
        trigger: zincir,
        start: 'top top',
        end: () => '+=' + dist(),
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onToggle(self) {
          if (self.isActive) lbIn();
          else lbOut();
        },
        onUpdate(self) {
          const p = self.progress;
          if (chainBar) chainBar.style.transform = `scaleX(${p})`;
          if (chainPct) chainPct.textContent = '%' + Math.round(p * 100);
          const cx = p * dist() + window.innerWidth * 0.55;
          const n = centers.filter((c) => c < cx).length;
          if (chainCount) chainCount.textContent = `Halka ${Math.min(n, brandPanels.length)} / ${brandPanels.length}`;
          gsap.set('.coupling', { rotation: p * -880 });
          gsap.set('.chain__shaft', { backgroundPositionX: `${-p * dist() * 1.4}px` });
        },
      },
    });

    /* panel içi paralaks */
    brandPanels.forEach((panel) => {
      const ghost = panel.querySelector('.panel__ghost');
      const frame = panel.querySelector('.film-frame');
      if (ghost) {
        gsap.fromTo(
          ghost,
          { xPercent: 16 },
          {
            xPercent: -16,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: chainTween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        );
      }
      if (frame) {
        gsap.from(frame, {
          rotate: 2.4,
          y: 46,
          autoAlpha: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: chainTween,
            start: 'left 88%',
            end: 'left 45%',
            scrub: true,
          },
        });
      }
    });

  }
});

/* Mobil + hareket serbest: dikey sadeleştirilmiş akış */
mm.add('(max-width: 899.98px) and (prefers-reduced-motion: no-preference)', () => {
  qa('.panel').forEach((panel) => {
    const body = panel.querySelector('.panel__body');
    if (!body) return;
    gsap.from(body, {
      y: 48,
      autoAlpha: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: panel, start: 'top 82%' },
    });
  });
});

/* Her genişlik + hareket serbest: ortak sinema dili */
mm.add('(prefers-reduced-motion: no-preference)', () => {
  /* klaketler + sahne adları */
  const scenes: Array<[string, string, string]> = [
    ['#zincir', 'Sahne 02 · Güç Zinciri — İnt. Tahrik Hattı', 'Sahne 02 · Güç Zinciri'],
    ['#guven', 'Sahne 03 · Kanıt — Dış. Gün Işığı', 'Sahne 03 · Kanıt'],
    ['#iletisim', 'Sahne 04 · Temas — Final', 'Sahne 04 · Temas'],
  ];
  scenes.forEach(([sel, text, name]) => {
    ScrollTrigger.create({
      trigger: sel,
      start: 'top 60%',
      onEnter: () => slate(text, name),
      onEnterBack: () => setScene(name),
    });
  });
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top 40%',
    onEnterBack: () => setScene('Sahne 01 · Sessizlik'),
  });

  /* timecode: 154 sn'lik film, 24 kare */
  const tc = q('#tc');
  const RUNTIME = 154;
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate(self) {
      if (!tc) return;
      const s = self.progress * RUNTIME;
      const mmn = String(Math.floor(s / 60)).padStart(2, '0');
      const ss = String(Math.floor(s % 60)).padStart(2, '0');
      const ff = String(Math.floor((s * 24) % 24)).padStart(2, '0');
      tc.textContent = `TC 00:${mmn}:${ss}:${ff}`;
    },
  });

  /* nav arkaplanı */
  ScrollTrigger.create({
    start: 50,
    end: 'max',
    toggleClass: { targets: '#nav', className: 'is-scrolled' },
  });

  /* tork hissiyle genel reveal */
  qa('.reveal').forEach((el) => {
    gsap.from(el, {
      y: 44,
      rotate: 1.6,
      transformOrigin: '0% 100%',
      autoAlpha: 0,
      duration: 1.05,
      ease: 'power4.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });

  /* final başlık kinetiği */
  gsap.from('.contact .kin-line', {
    yPercent: 122,
    skewY: 4,
    stagger: 0.1,
    duration: 1.1,
    ease: 'power4.out',
    scrollTrigger: { trigger: '.contact__title', start: 'top 80%' },
  });

  /* kapanış jeneriği: scroll'a bağlı akan yazılar */
  gsap.from('.credits__row', {
    y: 72,
    autoAlpha: 0,
    stagger: 0.14,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.credits', start: 'top 80%', end: 'center 55%', scrub: 1 },
  });

  /* mıknatıs butonlar */
  if (finePointer) {
    qa('.btn').forEach((b) => {
      b.addEventListener('mousemove', (e) => {
        const r = b.getBoundingClientRect();
        const me = e as MouseEvent;
        gsap.to(b, {
          x: (me.clientX - r.left - r.width / 2) * 0.22,
          y: (me.clientY - r.top - r.height / 2) * 0.3,
          duration: 0.4,
          ease: 'power3.out',
        });
      });
      b.addEventListener('mouseleave', () =>
        gsap.to(b, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1,0.45)' })
      );
    });
  }
});

/* görseller yüklenince ölçüleri tazele */
window.addEventListener('load', () => ScrollTrigger.refresh());
