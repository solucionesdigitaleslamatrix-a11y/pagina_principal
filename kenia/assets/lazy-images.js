(() => {
  'use strict';
  const images = document.querySelectorAll('.img.lazy-bg[data-bg-var]');
  if (!images.length) return;

  const load = element => {
    const token = element.getAttribute('data-bg-var');
    if (!token || !/^--img-[a-z-]+$/.test(token)) return;
    const image = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
    if (image) element.style.backgroundImage = image;
    element.classList.remove('lazy-bg');
  };

  if (!('IntersectionObserver' in window)) {
    images.forEach(load);
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      load(entry.target);
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '240px 0px' });

  images.forEach(image => observer.observe(image));
})();
