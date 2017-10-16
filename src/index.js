import { createCanvas } from './draw/canvas';
import { animate, updateInterval } from './draw/draw';
import './index.scss';

const root = document.getElementById('root');
createCanvas(root, animate, updateInterval);
