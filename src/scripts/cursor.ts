/* Teknik imleç: nokta + gecikmeli halka; linklerde büyür, basınca sıkışır */
import gsap from 'gsap';

export function initCursor() {
  if (!matchMedia('(pointer: fine)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const root = document.documentElement;
  root.classList.add('has-cursor');

  const ring = document.createElement('div');
  ring.className = 'cur-ring';
  const dot = document.createElement('div');
  dot.className = 'cur-dot';
  document.body.append(ring, dot);

  gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: innerWidth / 2, y: innerHeight / 2 });

  const pos = { x: innerWidth / 2, y: innerHeight / 2 };
  const rp = { ...pos };

  window.addEventListener('mousemove', (e) => {
    pos.x = e.clientX;
    pos.y = e.clientY;
    gsap.set(dot, { x: pos.x, y: pos.y });
  });

  gsap.ticker.add(() => {
    rp.x += (pos.x - rp.x) * 0.16;
    rp.y += (pos.y - rp.y) * 0.16;
    gsap.set(ring, { x: rp.x, y: rp.y });
  });

  const hoverables = 'a, button, .btn, input, textarea, select, [data-cursor]';
  document.addEventListener('mouseover', (e) => {
    if ((e.target as HTMLElement).closest?.(hoverables)) root.classList.add('cur-hover');
  });
  document.addEventListener('mouseout', (e) => {
    if ((e.target as HTMLElement).closest?.(hoverables)) root.classList.remove('cur-hover');
  });
  window.addEventListener('mousedown', () => root.classList.add('cur-down'));
  window.addEventListener('mouseup', () => root.classList.remove('cur-down'));
  document.addEventListener('mouseleave', () => gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2 }));
  document.addEventListener('mouseenter', () => gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2 }));
}
