// A complete Baloot game in one file (client-side)
// This code includes all logic that can be run on a browser

// --- Part 1: Game Data and Logic ---

// A simple dictionary to store player data and scores
const gameState = {
    players: [
        { name: 'أنت', score: 0, hand: [] },
        { name: 'اللاعب 2', score: 0, hand: [] },
        { name: 'اللاعب 3', score: 0, hand: [] },
        { name: 'اللاعب 4', score: 0, hand: [] }
    ],
    deck: [],
    mushteraCard: null,
    activePlayer: 0, // The player who is supposed to make a choice
    roundPhase: 'buy_phase' // buy_phase or play_phase
};

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

// Function to deal cards to all players
function dealCards() {
    const deck = createAndShuffleDeck();
    gameState.deck = deck.slice(); // Copy the shuffled deck

    // Deal 3 then 2 cards to each player
    for (let i = 0; i < 4; i++) {
        gameState.players[i].hand = deck.splice(0, 3);
    }
    for (let i = 0; i < 4; i++) {
        gameState.players[i].hand = gameState.players[i].hand.concat(deck.splice(0, 2));
    }

    gameState.mushteraCard = deck.shift();
    gameState.activePlayer = 0; // Set the active player to player 1 (You)
}

// Simple AI logic for the buying phase
function aiMakeDecision() {
    // This is a simplified AI, it will always pass
    // You can program it to be smarter later
    return 'pass';
}

// --- Part 2: User Interface and Interaction ---

function displayGame() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';

    // Display mushtera card
    const mushteraDiv = document.createElement('div');
    mushteraDiv.className = 'mushtera-display';
    mushteraDiv.innerHTML = '<h3>ورقة المشترى:</h3>';
    const mushteraCardDiv = document.createElement('div');
    mushteraCardDiv.className = `card-display ${gameState.mushteraCard.suit === '♥️' || gameState.mushteraCard.suit === '♦️' ? 'red' : ''}`;
    mushteraCardDiv.textContent = `${gameState.mushteraCard.rank}${gameState.mushteraCard.suit}`;
    mushteraDiv.appendChild(mushteraCardDiv);
    gameContainer.appendChild(mushteraDiv);

    // Display player's hand
    const playerHandDiv = document.createElement('div');
    playerHandDiv.className = 'player-hand';
    playerHandDiv.innerHTML = '<h3>أوراقك:</h3>';
    gameState.players[0].hand.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = `card-display ${card.suit === '♥️' || card.suit === '♦️' ? 'red' : ''}`;
        cardDiv.textContent = `${card.rank}${card.suit}`;
        playerHandDiv.appendChild(cardDiv);
    });
    gameContainer.appendChild(playerHandDiv);

    // Display buttons for the current phase
    if (gameState.roundPhase === 'buy_phase') {
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

        buyButton.addEventListener('click', () => handlePlayerChoice('buy'));
        passButton.addEventListener('click', () => handlePlayerChoice('pass'));
    }
}

// Function to handle player's choice in the buying phase
function handlePlayerChoice(choice) {
    if (choice === 'buy') {
        alert('لقد اخترت الشراء! الآن عليك اختيار صن أو حكم.');
    } else if (choice === 'pass') {
        alert('لقد اخترت "بس"! الدور الآن للمراة "والا".');
    }
    // We will add more logic here later for AI choices and the next phase
}

// --- Part 3: Features ---

// Code Redemption System
const redemptionCode = '0559480446';
let redemptionCount = 0; // For a single user session

function redeemCode(code) {
    if (code === redemptionCode && redemptionCount < 5) {
        // Special card distribution as requested
        const specialHand = [
            { rank: 'A', suit: '♠️' }, { rank: 'A', suit: '♥️' },
            { rank: 'A', suit: '♦️' }, { rank: 'A', suit: '♣️' },
            { rank: '10', suit: '♠️' }, { rank: 'J', suit: '♠️' },
            { rank: 'Q', suit: '♠️' }, { rank: 'K', suit: '♠️' }
        ];
        gameState.players[0].hand = specialHand.slice(0, 5); // Give the player 5 cards from the special hand
        gameState.players[0].bonusCards = specialHand.slice(5); // Store the bonus cards for later

        redemptionCount++;
        alert(`تم تفعيل الكود بنجاح! لقد حصلت على أوراق خاصة!`);
        displayGame(); // Refresh the display to show the new hand
        return true;
    } else if (redemptionCount >= 5) {
        alert('لقد استخدمت هذا الكود 5 مرات. لا يمكنك استخدامه مرة أخرى.');
    } else {
        alert('الكود غير صحيح.');
    }
    return false;
}

// --- Part 4: Game Initialization ---

// To test the code redemption system, uncomment the line below:
// redeemCode('0559480446');

// Start the game by dealing cards and displaying the UI
dealCards();
displayGame();
