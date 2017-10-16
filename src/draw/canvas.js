import { debounce } from './util';

/**
 * Create a canvas element
 * @param {HTMLElement} root - Root element to insert canvas element in
 * @param {any} draw - Draw method
 */
export const createCanvas = (root, animate, stopAnimate, updateInterval) => {
  root.innerHTML = ''; // eslint-disable-line no-param-reassign

  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.background = '#1C1D22';
  root.appendChild(canvas);

  const slider = document.createElement("input");
  slider.type = 'range';
  slider.min = 0;
  slider.max = 80;
  slider.value = slider.max / 8;
  slider.className = 'slider';
  slider.addEventListener('input', () => {
    updateInterval(slider.value / 1000);
  });
  root.appendChild(slider);

  const ctx = canvas.getContext('2d');

  window.addEventListener('resize', debounce(() => {
    stopAnimate();
    createCanvas(root, animate, stopAnimate, updateInterval);
  }, 200));

  animate(ctx);
};
