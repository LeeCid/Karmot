/* Alt sayfa motion dili: Lenis + RPM + reveal + mıknatıs (hafif kurulum) */
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initCursor } from './cursor';

gsap.registerPlugin(ScrollTrigger);
initCursor();

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
let velocity = 0;

if (!reduced) {
  const lenis = new Lenis({ autoRaf: false });
  (window as unknown as { lenis: Lenis }).lenis = lenis;
  lenis.on('scroll', (e: { velocity: number }) => {
    velocity = e.velocity;
    ScrollTrigger.update();
  });
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* RPM göstergesi — ibre SVG attribute ile döner (CSS origin sorunlarına karşı) */
const needle = document.getElementById('rpmNeedle');
const readout = document.getElementById('rpmReadout');
let shown = 0;
gsap.ticker.add(() => {
  if (!needle) return;
  const target = Math.min(Math.abs(velocity) / 28, 1);
  shown += (target - shown) * (target > shown ? 0.16 : 0.05);
  velocity *= 0.9;
  needle.setAttribute('transform', `rotate(${-120 + shown * 240} 60 60)`);
  if (readout) readout.textContent = String(Math.round(shown * 1450)).padStart(4, '0');
});

if (!reduced) {
  ScrollTrigger.create({
    start: 50,
    end: 'max',
    toggleClass: { targets: '#nav', className: 'is-scrolled' },
  });

  gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
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

  gsap.from('.kin-line', {
    yPercent: 118,
    skewY: 5,
    duration: 1.15,
    ease: 'power4.out',
    stagger: 0.1,
    delay: 0.1,
  });

  /* sayaçlar */
  gsap.utils.toArray<HTMLElement>('.counter').forEach((c) => {
    gsap.fromTo(
      c,
      { innerText: 0 },
      {
        innerText: Number(c.dataset.count ?? 0),
        duration: 1.6,
        snap: { innerText: 1 },
        ease: 'power2.out',
        scrollTrigger: { trigger: c, start: 'top 88%' },
      }
    );
  });

  /* sayfa içi çapalar lenis ile yumuşak */
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]').forEach((a) => {
    a.addEventListener('click', (ev) => {
      const href = a.getAttribute('href') ?? '';
      const id = href.replace('/', '');
      if (!id.startsWith('#') || location.pathname !== '/') return;
      const target = document.querySelector(id);
      if (target) {
        ev.preventDefault();
        (window as unknown as { lenis?: { scrollTo: (t: Element, o?: object) => void } }).lenis?.scrollTo(
          target,
          { duration: 1.2 }
        );
      }
    });
  });

  if (matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll<HTMLElement>('.btn').forEach((b) => {
      b.addEventListener('mousemove', (e) => {
        const r = b.getBoundingClientRect();
        gsap.to(b, {
          x: (e.clientX - r.left - r.width / 2) * 0.22,
          y: (e.clientY - r.top - r.height / 2) * 0.3,
          duration: 0.4,
          ease: 'power3.out',
        });
      });
      b.addEventListener('mouseleave', () =>
        gsap.to(b, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1,0.45)' })
      );
    });
  }
}
