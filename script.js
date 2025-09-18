// --- Baloot Game - Final Client-Side Code ---

// Game State: All game data will be stored here
const gameState = {
    players: [
        { name: 'أنت', score: 0, hand: [], isAI: false },
        { name: 'اللاعب 2', score: 0, hand: [], isAI: true },
        { name: 'اللاعب 3', score: 0, hand: [], isAI: true },
        { name: 'اللاعب 4', score: 0, hand: [], isAI: true }
    ],
    deck: [],
    mushteraCard: null,
    roundPhase: 'buy_phase' // buy_phase, muraa_phase, play_phase
};

// --- Part 1: Core Game Logic ---

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

    // Fisher-Yates shuffle algorithm
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
}

// Function to deal cards to all players
function dealCards() {
    const deck = createAndShuffleDeck();
    gameState.deck = deck.slice();

    // Deal 3 then 2 cards
    for (let i = 0; i < 4; i++) {
        gameState.players[i].hand = deck.splice(0, 3);
    }
    for (let i = 0; i < 4; i++) {
        gameState.players[i].hand = gameState.players[i].hand.concat(deck.splice(0, 2));
    }

    gameState.mushteraCard = deck.shift();
    gameState.roundPhase = 'buy_phase';
    
    // Simulate AI decisions right away for simplicity
    simulateAIPlayers();
}

// --- Part 2: AI Logic (Professional Style) ---

function simulateAIPlayers() {
    let bought = false;
    let buyerIndex = -1;
    
    // Simple professional AI logic for buying
    for(let i = 1; i < 4; i++) { // Start from the second player (index 1)
        const player = gameState.players[i];
        if (player.isAI) {
            // AI decision logic: a simple check for a strong hand
            const tensCount = player.hand.filter(card => card.rank === '10').length;
            const kingsCount = player.hand.filter(card => card.rank === 'K').length;
            
            if (tensCount >= 2 || kingsCount >= 2) {
                bought = true;
                buyerIndex = i;
                alert(`اللاعب ${i+1} قام بالشراء!`);
                break; // An AI bought, so the round starts
            }
        }
    }
    
    if (bought) {
        // A player bought, proceed to the playing phase
        alert(`اللاعب ${buyerIndex + 1} هو المشتري. هيا بنا نلعب!`);
    } else {
        // No one bought in the first round, proceed to the muraa phase
        alert('لا أحد اشترى. الآن "والا" (المراة).');
    }
}

// --- Part 3: UI and Interaction ---

function displayGame() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = ''; // Clear previous content

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
    
    // Display player's choices only in the buying phase
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
}

// --- Part 4: Special Features ---

// Code Redemption System
const redemptionCode = '0559480446';
let redemptionCount = 0;

function redeemCode(code) {
    if (code === redemptionCode && redemptionCount < 5) {
        const specialHand = [
            { rank: 'A', suit: '♠️' }, { rank: 'A', suit: '♥️' },
            { rank: 'A', suit: '♦️' }, { rank: 'A', suit: '♣️' },
            { rank: '10', suit: '♠️' }, { rank: 'J', suit: '♠️' },
            { rank: 'Q', suit: '♠️' }, { rank: 'K', suit: '♠️' }
        ];
        gameState.players[0].hand = specialHand.slice(0, 5); 
        redemptionCount++;
        alert(`تم تفعيل الكود بنجاح!`);
        displayGame();
    } else if (redemptionCount >= 5) {
        alert('لقد استخدمت هذا الكود 5 مرات. لا يمكنك استخدامه مرة أخرى.');
    } else {
        alert('الكود غير صحيح.');
    }
}

// --- Part 5: Game Initialization ---

// To start a new game, just call dealCards()
dealCards();
displayGame();

// You can test the redemption code by typing this in your browser console:
// redeemCode('0559480446');
