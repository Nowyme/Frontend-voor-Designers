// JavaScript Document
const buttonLoader = document.querySelector('main > button');
//haal de loader op uit de html
const loader = document.querySelector('form > div');

//API url
const URL = 'https://acnhapi.com/v1a/art';

//haal de lijst 'ul' op uit de html
const list = document.querySelector('main ul');

/****************/
/* VUL DE LIJST */
/****************/
function getArt() {
  loader.classList.add('loading');
  getData(URL).then((data) => {
    console.log(data);
    const art = data;

    setTimeout(() => {
      art.forEach((aArt) => {
        loader.classList.remove('loading');

        const name = aArt.name['name-EUen'];

        const img = aArt.image_uri;
        const artDesc = aArt['museum-desc'];
        const artPrice = aArt['buy-price'];
        const aArtHTML = `<li>
					
                    
                    <section>
                  <button type="button" >i</button>
							<h2>${name}</h2>
                            <img src="${img}" alt="${name}">
                            <img src="images/bells.png" alt="bells"><p>${artPrice}</p>
                            <button aria-labe="maak favoriet" type="button"></button>
					</section>
                    <section>
                    
                    <h3>Description</h3>
						<p>${artDesc}</p>
                    </section>
                    
					

        </li>`;

        list.insertAdjacentHTML('beforeend', aArtHTML);

        // Flip kaartjes
        const buttonSlide = list.querySelector('li:last-of-type');
        const button = buttonSlide.querySelector('section > button');
        const cardBack = buttonSlide.querySelector('section:last-of-type ');
        button.addEventListener('click', draaiOm);
        cardBack.addEventListener('click', draaiOm);
        const cards = document.querySelectorAll('li');

        // Intersection Observer
        const options = {
          root: null,
          threshold: 0.4,
          rootMargin: '0px',
        };

        const observer = new IntersectionObserver(function (entries, observer) {
          entries.forEach((entry) => {
            entry.target.classList.toggle('slide-top', entry.isIntersecting);
          });
        }, options);

        cards.forEach((card) => {
          observer.observe(card);
          card.classList.add('hide');
        });

        // Add button kaartjes
        var alleVoegToeKnopjes = document.querySelectorAll(
          'li  section button:last-of-type'
        );
        alleVoegToeKnopjes.forEach((eenKnopje) => {
          eenKnopje.addEventListener('click', voegFotoToeAlsFavo);
        });

        // Messagebol
        cards.forEach((card) => {
          card.addEventListener('mouseover', (e) => {
            ballMessage.innerHTML = 'Sleep mij';
            ball.style.width = '4em';
          });

          card.addEventListener('mouseout', (e) => {
            ballMessage.innerHTML = '';
            ball.style.width = '1em';
          });
        });
      });
    }, 3000); // timeout tijd
  });
}

/****************/
/* FETCH DATA   */
/* RETURNS JSON */
/****************/
async function getData(URL) {
  return fetch(URL)
    .then((response) => response.json())
    .then((jsonData) => jsonData);
}

/****************/
/* DRAAI OM FUNCTIE */
/****************/
function draaiOm() {
  this.closest('li').classList.toggle('erIsOpMijGeklikt');
}

/****************/
/* SIDEBAR ANIMATIE */
/****************/
const openButton = document.querySelector('button');
const form = document.querySelector('form');

function slideLeft() {
  this.classList.toggle('slide');
}

openButton.addEventListener('click', slideLeft);

function openNav() {
  document.querySelector('form').style.width = '400px';
  document.querySelector('body').style.marginLeft = '400px';
  document.body.style.backgroundColor = 'rgba(0,0,0,0.4)';
}

/****************/
/* SIDEBAR SLIDEIN/ SLIDEOUT */
/****************/
const mediaQuery = window.matchMedia('(max-width: 600px)');

if (mediaQuery.matches) {
  function openNav() {
    document.querySelector('form').style.width = '40em';
    document.querySelector('main > section').style.marginLeft = '43.3em';
    document.querySelector('form button').style.marginLeft = '31.5em';
    document.querySelector('form button:last-of-type').style.marginLeft =
      '31.5em';
    document.querySelector('main > button').style.display = 'block';
  }

  function closeNav() {
    document.querySelector('form').style.width = '2em';
    document.querySelector('main > section').style.marginLeft = '2.5em';
    document.querySelector('form button').style.marginLeft = '0';
    document.querySelector('form button:last-of-type').style.marginLeft = '0';
    document.querySelector('main > button').style.display = 'none';
  }
} else {
  function openNav() {
    document.querySelector('form').style.width = '40em';
    document.querySelector('main > section').style.marginLeft = '43.3em';
    document.querySelector('form button').style.marginLeft = '49em';
    document.querySelector('form button:last-of-type').style.marginLeft =
      '49em';
    document.querySelector('main > button').style.display = 'block';
  }

  function closeNav() {
    document.querySelector('form').style.width = '2em';
    document.querySelector('main > section').style.marginLeft = '2.5em';
    document.querySelector('form button').style.marginLeft = '0';
    document.querySelector('form button:last-of-type').style.marginLeft = '0';
    document.querySelector('main > button').style.display = 'none';
  }
}

/**********************/
/* DRAGGEN EN DROPPEN JS LIBRARY */
/**********************/
const favoLijst = document.querySelector('main section ul');
const allesLijst = document.querySelector('form ul');

new Sortable(allesLijst, {
  group: 'shared', // set both lists to same group
  animation: 150,
});

new Sortable(favoLijst, {
  group: 'shared',
  animation: 150,

  onAdd: (e) => {
    // de orginele foto - de button weer naar kliks laten luisteren
    e.clone.addEventListener('click', voegFotoToeAlsFavo);

    vanVoegToeNaarVerwijderButton(e.item);
  },
});

/**********************/
/* ADD / DELETE BUTTON*/
/**********************/
const alleVoegToeKnopjes = document.querySelectorAll(
  'li > section:first-of-type button:last-of-type'
);

const buttonPlek = document.querySelector('li > section button:last-of-type');
alleVoegToeKnopjes.forEach((eenKnopje) => {
  eenKnopje.addEventListener('click', voegFotoToeAlsFavo);
});

function voegFotoToeAlsFavo(event) {
  const deButtonWaaropGekliktIs = this;

  const deLiWaarDeButtonInZit = deButtonWaaropGekliktIs.closest('li');

  const fotoKloon = deLiWaarDeButtonInZit.cloneNode(true);
  favoLijst.appendChild(fotoKloon);

  vanVoegToeNaarVerwijderButton(fotoKloon);
}

// add button verwijderen & delete button toevoegen
function vanVoegToeNaarVerwijderButton(deFoto) {
  const deButtonBijDeFoto = deFoto.querySelector(
    'li > section:first-of-type button:last-of-type'
  );
  deButtonBijDeFoto.remove();

  const deVerwijderButton = document.createElement('button');

  deVerwijderButton.addEventListener('click', verwijderFoto);

  deFoto.appendChild(deVerwijderButton);
}

// Verwijder list
function verwijderFoto() {
  const deButtonWaaropGekliktIs = this;

  const deLiWaarDeButtonInZit = deButtonWaaropGekliktIs.closest('li');

  deLiWaarDeButtonInZit.remove();
}

/**********************/
/* ARROWKEY NAVIGATIE */
/**********************/
window.addEventListener(
  'keydown',
  function (event) {
    switch (event.code) {
      case 'ArrowRight':
        document.querySelector('form button:first-of-type').click();
        break;
      case 'ArrowLeft':
        document.querySelector('form button:last-of-type').click();
        break;
    }
  },
  true
);

/**********************/
/* CURSOR FOLLOW */
/**********************/
const cursorTag = document.querySelector('div.cursors');

const ball = cursorTag.querySelector('div');

let currentX = 0;
let currentY = 0;
let aimX = 0;
let aimY = 0;
let speed = 0.1;
const animate = (e) => {
  currentX += (aimX - currentX) * speed;
  currentY += (aimY - currentY) * speed;

  ball.style.left = currentX + 'px';
  ball.style.top = currentY + 'px';
  requestAnimationFrame(animate);
};

animate();

document.addEventListener('mousemove', (e) => {
  aimX = e.pageX;
  aimY = e.pageY;
});

const ballMessage = cursorTag.querySelector('div span');

buttonLoader.addEventListener('click', getArt);

/**********************/
/* DARKMODE BUTTON */
/**********************/
const darkLightBtn = document.querySelector('header button');

darkLightBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
