// JavaScript Document

//API url
const URL = 'https://acnhapi.com/v1a/art';

//haal de lijst 'ul' op uit de html
const list = document.querySelector('main ul');

/****************/
/* VUL DE LIJST */
/****************/
function getArt() {
  getData(URL).then((data) => {
    console.log(data);
    const art = data;
    art.forEach((aArt) => {
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

      const buttonSlide = list.querySelector('li:last-of-type');
      const button = buttonSlide.querySelector('section > button');
      button.addEventListener('click', draaiOm);

      const cards = document.querySelectorAll('li');

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

      var alleVoegToeKnopjes = document.querySelectorAll(
        'li  section button:last-of-type'
      );
      alleVoegToeKnopjes.forEach((eenKnopje) => {
        // elk knopje in de array luistert naar kliks

        eenKnopje.addEventListener('click', voegFotoToeAlsFavo);
      });
      //messagebol
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

getArt();

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
  }

  function closeNav() {
    document.querySelector('form').style.width = '2em';
    document.querySelector('main > section').style.marginLeft = '2.5em';
    document.querySelector('form button').style.marginLeft = '0';
    document.querySelector('form button:last-of-type').style.marginLeft = '0';
  }
} else {
  function openNav() {
    document.querySelector('form').style.width = '40em';
    document.querySelector('main > section').style.marginLeft = '43.3em';
    document.querySelector('form button').style.marginLeft = '49em';
    document.querySelector('form button:last-of-type').style.marginLeft =
      '49em';
  }

  function closeNav() {
    document.querySelector('form').style.width = '2em';
    document.querySelector('main > section').style.marginLeft = '2.5em';
    document.querySelector('form button').style.marginLeft = '0';
    document.querySelector('form button:last-of-type').style.marginLeft = '0';
  }
}

var favoLijst = document.querySelector('main section ul');
var allesLijst = document.querySelector('form ul');

/**********************/
/* DRAGGEN EN DROPPEN */
/**********************/
new Sortable(allesLijst, {
  group: 'shared', // set both lists to same group
  animation: 150,
});

new Sortable(favoLijst, {
  group: 'shared',
  animation: 150,

  onAdd: (e) => {
    // als een foto naar de favo lijst wordt gesleept

    // de orginele foto - de button weer naar kliks laten luisteren
    e.clone.addEventListener('click', voegFotoToeAlsFavo);

    // nieuwe foto - de button wisselen naar verwijderen
    vanVoegToeNaarVerwijderButton(e.item);
  },
});

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

// dit is een array
var alleVoegToeKnopjes = document.querySelectorAll(
  'li  section button:last-of-type'
);

const buttonPlek = document.querySelector('li > section button:last-of-type');
alleVoegToeKnopjes.forEach((eenKnopje) => {
  // elk knopje in de array luistert naar kliks

  eenKnopje.addEventListener('click', voegFotoToeAlsFavo);
});
// console.log(alleVoegToeKnopjes);
function voegFotoToeAlsFavo(event) {
  var deButtonWaaropGekliktIs = this;
  // opzoeken welke li bij de button hoort
  var deLiWaarDeButtonInZit = deButtonWaaropGekliktIs.closest('li');

  // de li klonen en achteraan toevoegen aan de favo lijst
  var fotoKloon = deLiWaarDeButtonInZit.cloneNode(true);
  favoLijst.appendChild(fotoKloon);
  // nog wat dingetjes met de toegevoegde li/foto doen
  vanVoegToeNaarVerwijderButton(fotoKloon);
}

function vanVoegToeNaarVerwijderButton(deFoto) {
  // zorgen dat de nieuwe foto in beeld scrollt
  // deFoto.scrollIntoView({ behavior: 'smooth', inline: 'center' });

  // button wijzigen naar verwijderen
  // de voegToe button verwijderen
  var deButtonBijDeFoto = deFoto.querySelector(
    'main li section:first-of-type button:last-of-type'
  );
  deButtonBijDeFoto.remove();

  // een nieuwe button aanmaken
  var deVerwijderButton = document.createElement('button');
  // die button laten luisteren naar kliks
  deVerwijderButton.addEventListener('click', verwijderFoto);
  // die button toevoegen aan de li
  deFoto.appendChild(deVerwijderButton);
}

function verwijderFoto() {
  var deButtonWaaropGekliktIs = this;
  // opzoeken welke li bij de button hoort
  var deLiWaarDeButtonInZit = deButtonWaaropGekliktIs.closest('li');
  // weg der mee - hatseflats
  deLiWaarDeButtonInZit.remove();
}

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
