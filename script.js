// Function to create and shuffle a standard 32-card Baloot deck
function createAndShuffleDeck() {
    // Define the card types and suits in Baloot
    const ranks = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const suits = ['♠️', '♥️', '♦️', '♣️'];
    const deck = [];

    // Create the deck with 32 cards
    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push({ rank, suit });
        }
    }

    // Shuffle the deck using the Fisher-Yates algorithm
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap cards
    }

    return deck;
}

// Function to deal cards to 4 players
function dealCards(deck) {
    const playersHands = [[], [], [], []]; // Array to hold each player's hand
    
    // First deal: 3 cards to each player
    for (let i = 0; i < 4; i++) {
        playersHands[i] = deck.splice(0, 3);
    }
    
    // Second deal: 2 cards to each player
    for (let i = 0; i < 4; i++) {
        playersHands[i] = playersHands[i].concat(deck.splice(0, 2));
    }

    // The rest of the deck, and the "Mushtera" card
    const mushteraCard = deck.shift();
    
    return {
        hands: playersHands,
        mushteraCard: mushteraCard,
        remainingDeck: deck
    };
}

// Create the shuffled deck and deal the cards
const shuffledDeck = createAndShuffleDeck();
const gameData = dealCards(shuffledDeck);

// Print the players' hands and the mushtera card in the console
console.log('أوراق اللاعب الأول:', gameData.hands[0]);
console.log('أوراق اللاعب الثاني:', gameData.hands[1]);
console.log('أوراق اللاعب الثالث:', gameData.hands[2]);
console.log('أوراق اللاعب الرابع:', gameData.hands[3]);
console.log('ورقة المشترى:', gameData.mushteraCard);
