const lamp = document.querySelector('.lamp');
const light = document.querySelector('.light');
const switchButton = document.querySelector('.switch');
const colorButtons = document.querySelectorAll('.color-btn');
const background = document.querySelector('.background');

const sounds = {
    yellow: document.getElementById('sound-yellow'),
    red: document.getElementById('sound-red'),
    green: document.getElementById('sound-green'),
    blue: document.getElementById('sound-blue'),
    night: document.getElementById('sound-night')
};

Object.values(sounds).forEach(sound => {
    sound.loop = true;
    sound.volume = 0.5; 
});

let currentColor = 'night';
let lightOn = false;

function stopAllSounds() {
    Object.values(sounds).forEach(sound => sound.pause());
    Object.values(sounds).forEach(sound => (sound.currentTime = 0));
}

switchButton.addEventListener('click', () => {
    stopAllSounds();
    if (!lightOn) {
        light.style.display = 'block';
        switchButton.textContent = 'Apagar';
        sounds[currentColor].play();
        lightOn = true;

        background.style.backgroundImage = currentColor === 'yellow' ? 'url("fondo_verano.jpg")' :
                                           currentColor === 'red' ? 'url("fondo_paisaje.jpg")' :
                                           currentColor === 'green' ? 'url("fondo_naturaleza.jpg")' :
                                           'url("fondo_nieve.jpg")';
    } else {
        light.style.display = 'none';
        switchButton.textContent = 'Prender';
        background.style.backgroundImage = 'url("fondo_noche.jpg")';
        sounds['night'].play();
        lightOn = false;
    }
});

colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const color = button.getAttribute('data-color');
        light.style.backgroundColor = color;
        currentColor = color === '#ff0' ? 'yellow' : color === '#f00' ? 'red' : color === '#0f0' ? 'green' : 'blue';

        if (lightOn) {
            stopAllSounds();
            sounds[currentColor].play();
            background.style.backgroundImage = currentColor === 'yellow' ? 'url("fondo_verano.jpg")' :
                                               currentColor === 'red' ? 'url("fondo_paisaje.jpg")' :
                                               currentColor === 'green' ? 'url("fondo_naturaleza.jpg")' :
                                               'url("fondo_nieve.jpg")';
        }
    });
});
