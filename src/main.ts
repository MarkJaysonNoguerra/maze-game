// assets
import './assets/style.css'
import 'normalize.css';
import { Game } from './game/class/game';

window.onload = async () => {
  const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
  new Game(canvas).start();
};