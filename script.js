// Function to create and shuffle a standard 32-card Baloot deck
function createAndShuffleDeck() {
    const ranks = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suits = ['♠️', '♥️', '♦️', '♣️'];
    const deck = [];

    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push({ rank, suit });
        }
    }

    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
}

// Function to deal cards to 4 players
function dealCards(deck) {
    const playersHands = [[], [], [], []];
    for (let i = 0; i < 4; i++) {
        playersHands[i] = deck.splice(0, 3);
    }
    for (let i = 0; i < 4; i++) {
        playersHands[i] = playersHands[i].concat(deck.splice(0, 2));
    }

    const mushteraCard = deck.shift();
    
    return {
        hands: playersHands,
        mushteraCard: mushteraCard,
        remainingDeck: deck
    };
}

// Function to display the cards on the screen
function displayCards(hand, mushteraCard) {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = ''; // Clear previous content

    // Display the player's hand
    const playerHandDiv = document.createElement('div');
    playerHandDiv.className = 'player-hand';
    playerHandDiv.innerHTML = '<h3>أوراقك:</h3>';
    hand.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = `card-display ${card.suit === '♥️' || card.suit === '♦️' ? 'red' : ''}`;
        cardDiv.textContent = `${card.rank}${card.suit}`;
        playerHandDiv.appendChild(cardDiv);
    });
    gameContainer.appendChild(playerHandDiv);

    // Display the mushtera card
    const mushteraDiv = document.createElement('div');
    mushteraDiv.className = 'mushtera-display';
    mushteraDiv.innerHTML = '<h3>ورقة المشترى:</h3>';
    const mushteraCardDiv = document.createElement('div');
    mushteraCardDiv.className = `card-display ${mushteraCard.suit === '♥️' || mushteraCard.suit === '♦️' ? 'red' : ''}`;
    mushteraCardDiv.textContent = `${mushteraCard.rank}${mushteraCard.suit}`;
    mushteraDiv.appendChild(mushteraCardDiv);
    gameContainer.appendChild(mushteraDiv);
    
    // Display the player's choices
    const choicesDiv = document.createElement('div');
    choicesDiv.innerHTML = '<h3>ماذا تود أن تفعل؟</h3>';
    
    const buyButton = document.createElement('button');
    buyButton.className = 'game-button';
    buyButton.textContent = 'شراء';
    choicesDiv.appendChild(buyButton);

    const passButton = document.createElement('button');
    passButton.className = 'game-button';
    passButton.textContent = 'بس';
    choicesDiv.appendChild(passButton);
    
    gameContainer.appendChild(choicesDiv);

    // Add event listeners (we will add the actual logic later)
    buyButton.addEventListener('click', () => {
        console.log('لقد اخترت الشراء!');
    });
    passButton.addEventListener('click', () => {
        console.log('لقد اخترت بس!');
    });
}

// Start the game
const shuffledDeck = createAndShuffleDeck();
const gameData = dealCards(shuffledDeck);
displayCards(gameData.hands[0], gameData.mushteraCard);
