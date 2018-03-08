const deviceID = '500041001951363036373538';
const accessToken = '0d7d759cd135355d20277e9b1ee4a81bca0b3502';
const baseURL = 'https://api.particle.io/v1/devices';
let running = false;

function go() {
  const speed = document.querySelector('.throttle').value;
  performFetch('go', speed)
    .then(res => {
      running = true;
      if (document.querySelector('.autoCheckbox').checked) {
        setTimeout(() => {
          fire();
        }, Number(document.querySelector('.bombTime').value) * 1000);
      }
      setTimeout(() => {
        stop();
      }, Number(document.querySelector('.stopTime').value) * 1000);
    })
    .catch(err => {
      console.error(err);
    });
}

function stop() {
  performFetch('stop')
    .then(res => {
      running = false;
    })
    .catch(err => {
      console.error(err);
    });
}

function fire(bombTime = 0) {
  performFetch('fire', bombTime)
    .then(res => {
      console.log('BOMB DROPPED!');
    })
    .catch(err => {
      console.error(err);
    });
}

function performFetch(command, speed = 0) {
  return fetch(`${baseURL}/${deviceID}/${command}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    },
    body: `access_token=${accessToken}&args=${speed}`
  });
}
