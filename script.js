const wordElement = document.getElementById('word');
const wrongLettersElement = document.getElementById('wrong-letters');
const palyAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const fianlMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const word = ['application', 'programming', 'interface', 'wozard'];

let selectedWord = word[Math.floor(Math.random() * word.length)];

const correctLetters = [];
const wrongLetters = [];

function displayWord(){
  wordElement.innerHTML = `
    ${selectedWord.
      split('')
      .map(letter => `
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `).join('')}
  `;

  const innerWord = wordElement.innerText.replace(/\n/g, '');

  if(innerWord === selectedWord) {
    fianlMessage.innerText = 'Congratulations! You Won!';
    popup.style.display = 'flex';
  }
}


function updateWrongLetterElement(){
  wrongLettersElement.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  //Displat parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if(index < errors){
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  //Check if lost

  if(wrongLetters.length === figureParts.length){
    fianlMessage.innerText = 'Unfortunately you lost.'
    popup.style.display = 'flex';
  }
}

function showNotification(){
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
};


// Keydown letter press

window.addEventListener('keydown', e => {
  if(e.keyCode >= 65 && e.keyCode <= 90){
    const letter = e.key;

    if(selectedWord.includes(letter)){
      if(!correctLetters.includes(letter)){
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if(!wrongLetters.includes(letter)){
        wrongLetters.push(letter);
        updateWrongLetterElement();
      } else {
        showNotification();
      }
    }
  }
});

//restart game and play Again

palyAgainBtn.addEventListener('click', () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = word[Math.floor(Math.random() * word.length)];

  displayWord();
  updateWrongLetterElement();

  popup.style.display = 'none';

});

displayWord();
