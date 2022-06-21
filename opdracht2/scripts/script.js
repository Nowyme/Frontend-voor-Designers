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
					</section>
                    <section>
                    <h3>Description</h3>
						<p>${artDesc}</p>
                    </section>
                    
					

        </li>`;

      list.insertAdjacentHTML('beforeend', aArtHTML);

      const buttonSlide = list.querySelector('li:last-of-type');

      buttonSlide.addEventListener('click', draaiOm);

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
  this.classList.toggle('erIsOpMijGeklikt');
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

function openNav() {
  document.querySelector('form').style.width = '40em';
  document.querySelector('main > section').style.marginLeft = '43.3em';
  document.querySelector('form button').style.marginLeft = '49em';
  document.querySelector('form button:last-of-type').style.marginLeft = '49em';
}

function closeNav() {
  document.querySelector('form').style.width = '2em';
  document.querySelector('main > section').style.marginLeft = '2.5em';
  document.querySelector('form button').style.marginLeft = '0';
  document.querySelector('form button:last-of-type').style.marginLeft = '0';
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
