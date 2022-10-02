import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const STORAGE_KEY = 'videoplayer-current-time';

const playerRef = document.querySelector('#vimeo-player');
const player = new Player(playerRef);

const onPlay = function (data) {
  save(STORAGE_KEY, Math.floor(data.seconds));
};

const onTimeUpdate = throttle(onPlay, 1000);
player.on('timeupdate', onTimeUpdate);

function save(key, value) {
  try {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
  } catch {
    console.log(error);
  }
}

function load(key) {
  try {
    const stringValue = localStorage.getItem(key);
    return stringValue === null ? undefined : JSON.parse(stringValue);
  } catch {
    console.log(error);
  }
}

let loadingTime = localStorage.load(STORAGE_KEY);

if (loadingTime) {
  player.setCurrentTime(loadingTime);
}
