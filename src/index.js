import { createCanvas } from './draw/canvas';
import { animate, stopAnimate, updateInterval } from './draw/draw';
import './index.scss';

const root = document.getElementById('root');
createCanvas(root, animate, stopAnimate, updateInterval);
