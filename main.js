// var cardsArray = [
//     {    'name': 'Bleach',    'img': 'https://imgur.com/a/Rb2NaXl',  },
//     {    'name': 'DeathNote',    'img': 'https://imgur.com/a/JASTzx7',  },
//     {    'name': 'DemonSlayer',    'img': 'https://imgur.com/a/rGgQhwR',  },
//     {    'name': 'FireForce',    'img': 'https://imgur.com/a/i89J92z',  },
//     {    'name': 'GoldenBoy',    'img': 'https://imgur.com/a/YJSCeBv',  },
//     {    'name': 'GTO',    'img': 'https://imgur.com/a/asVDbE0',  },
//     {    'name': 'Jujutsu',    'img': 'https://imgur.com/a/ZW6JPOF',  },
//     {    'name': 'MyHero',    'img': 'https://imgur.com/a/V0aOdIB',  },
//     {    'name': 'Naruto',    'img': 'https://imgur.com/a/qhbKwQ5',  },
//     {    'name': 'OnePiece',    'img': 'https://imgur.com/a/UnPZt2t',  },
//     {    'name': 'DailyLife',    'img': 'https://imgur.com/a/GKfaWox',  },
//     {    'name': 'DragonballZ',    'img': 'https://imgur.com/a/rwqQ76d',  },
//   ];

var cardsArray = [
    {    'name': 'CSS',    'img': 'https://github.com/robgmerrill/img/blob/master/css3-logo.png?raw=true',  },
    {    'name': 'HTML',    'img': 'https://github.com/robgmerrill/img/blob/master/html5-logo.png?raw=true',  },
    {    'name': 'jQuery',    'img': 'https://github.com/robgmerrill/img/blob/master/jquery-logo.png?raw=true',  },
    {    'name': 'JS',    'img': 'https://github.com/robgmerrill/img/blob/master/js-logo.png?raw=true',  },
    {    'name': 'Node',    'img': 'https://github.com/robgmerrill/img/blob/master/nodejs-logo.png?raw=true',  },
    {    'name': 'Photo Shop',    'img': 'https://github.com/robgmerrill/img/blob/master/photoshop-logo.png?raw=true',  },
    {    'name': 'PHP',    'img': 'https://github.com/robgmerrill/img/blob/master/php-logo_1.png?raw=true',  },
    {    'name': 'Python',    'img': 'https://github.com/robgmerrill/img/blob/master/python-logo.png?raw=true',  },
    {    'name': 'Ruby',    'img': 'https://github.com/robgmerrill/img/blob/master/rails-logo.png?raw=true',  },
    {    'name': 'Sass',    'img': 'https://github.com/robgmerrill/img/blob/master/sass-logo.png?raw=true',  },
    {    'name': 'Sublime',    'img': 'https://github.com/robgmerrill/img/blob/master/sublime-logo.png?raw=true',  },
    {    'name': 'Wordpress',    'img': 'https://github.com/robgmerrill/img/blob/master/wordpress-logo.png?raw=true',  },
  ];


// Grab the div element we created with an id of game-board and assign it to variable game
var game = document.getElementById('game-board');
// Create a section element and assign it to variable grid
var grid = document.createElement('section');
// Give section element a class of grid
grid.setAttribute('class', 'grid');
// Append the grid section to the game-board div
game.appendChild(grid);

// Duplicate the cards array to create a match for each card

var gameGrid = cardsArray.concat(cardsArray);

gameGrid.sort(function(){
    return 0.5 - Math.random();
})

// Loop through each item in the cards array with a for loop to display the images
for(i=0; i<gameGrid.length;i++){
    // Create a div element and assign to variable card
    var card = document.createElement('div');
    // Apply a card class to that div
    card.classList.add('card');
    // Set the data-set attribute of the div to the gameGrid name
    card.dataset.name = gameGrid[i].name;

    //Create front of card i.e the blank side
    var front = document.createElement('div');
    front.classList.add('front');

    var back = document.createElement('div'); // This will be the card image part
    back.classList.add('back');
    back.style.backgroundImage = `url(${gameGrid[i].img})`;

    // Append the front and back of the card to the grid
    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
    
    // Apply the background image of the div to the gameGrid image
    // card.style.backgroundImage = `url(${gameGrid[i].img})`;
    //Append the div to the grid section
    // grid.appendChild(card);

    /**
     * The above will look like this after inspecting in Chrome
     * <div class="card" data-name="CSS" style="background-image: url(&quot;https://github.com/robgmerrill/img/blob/master/css3-logo.png?raw=true&quot;);"></div>
     */
}

// Set count to 0
var count = 0;

var firstGuess = '';
var secondGuess = '';

var previousTarget = null;
var delay = 1200;

// Add match from CSS to the cards who were clicked and they match i.e they have the same image
var match = function() {
    // set the below to all the cards that have the selected class
    var selected = document.querySelectorAll('.selected')

    // loop through the array like object containing 'selected' class
    for(i=0; i< selected.length; i++){
        selected[i].classList.add('match');
    }
}

// Reset the guesses after two attempts
var resetGuesses = function() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected'); // This will create an array of elements who have the selected class

    // Now loop through the selected class array elements created above and remove the classList 'selected' from them as we want to
    // reset the guesses i.e flip the cards back

    for( var i=0; i< selected.length; i++) {
        selected[i].classList.remove('selected');

    }

}

// Add an event listener to entire Grid
grid.addEventListener('click', function(event) {
    // Declare variable to target our clicked item
    var clicked = event.target;
    // Do not allow the grid section itself to be selected;
    // only select divs inside the grid
    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')) {
      return;
    }
    // We only want to add `selected` class if the current count is less than 2
    if (count < 2) {
      count++;
  
      if (count === 1) {
        // Assign first guess
        firstGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selected');
      } else {
        // Assign second guess
        secondGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selected');
      }
      // If both guesses are not empty
      if (firstGuess !== '' && secondGuess !== '') {
        // And the firstGuess matches secondGuess
        if (firstGuess === secondGuess) {
          // Run the match function
          setTimeout(match, delay);
          setTimeout(resetGuesses, delay);
        } else {
          setTimeout(resetGuesses, delay);
        }
      }
      previousTarget = clicked;
    }
  });

