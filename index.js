const deviceID = '500041001951363036373538';
const accessToken = '0d7d759cd135355d20277e9b1ee4a81bca0b3502';
const baseURL = 'https://api.particle.io/v1/devices';
let running = false;

function go() {
  performFetch('go', 50)
    .then(res => {
      console.log(res);
      running = true;
      getSpeed();
    })
    .catch(err => {
      console.error(err);
    });
}

function stop() {
  performFetch('stop')
    .then(res => {
      console.log(res);
      running = false;
    })
    .catch(err => {
      console.error(err);
    });
}

function fire() {
  performFetch('fire')
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    });
}

function getSpeed() {
  performFetch('speed')
    .then(res => {
      console.log(res);
      document.querySelector('.speedDisplay').textContent = res;
    })
    .catch(err => {
      console.error(err);
    });
  if (running) {
    setTimeout(getSpeed, 1000);
  }
}

function performFetch(command, speed = 0) {
  const headers = new Headers({
    'content-type': 'application/x-www-form-urlencoded'
  });

  const data = {
    'access_token': accessToken,
    args: speed
  };

  return fetch(`${baseURL}/${deviceID}/${command}`, {headers, method: 'POST', data});
}
