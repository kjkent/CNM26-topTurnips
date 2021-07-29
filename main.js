const prompts = require("prompts");

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Creates a class for a basic Top Trumps card based on turnips
class card {
    constructor(name, weight, size, gestTime) {
        this._name = name;
        this._weight = weight;
        this._size = size;
        this._gestTime = gestTime;
    }

    get name() {
        return this._name;
    }

    get weight() {
        return this._weight;
    }

    get size () {
        return this._size;
    }

    get gestTime () {
        return this._gestTime;
    }

}

// Empty array for the deck
let deck = [];

deck.push(new card ("Purple-Top", 550, 16.5, 55));
deck.push(new card ("Scarlet Queen", 999, 23.2, 132));
deck.push(new card ("Baby Bunch", 232, 5.55, 99));
deck.push(new card ("White Lady", 721, 18, 73));
deck.push(new card ("Gold Ball", 800, 9.9, 49));
deck.push(new card ("Manchester Market", 420, 12.2, 105));
deck.push(new card ("White Egg", 699, 3.9, 109));
deck.push(new card ("Gilfeather", 238, 15, 125));
deck.push(new card ("Seven Top", 1500, 19.2, 55));
deck.push(new card ("Royal Crown", 590, 8.5, 70));
deck.push(new card ("Hidabeni", 875, 5.5, 78));
deck.push(new card ("Orange Jelly", 930, 12.2, 150));
deck.push(new card ("Top Star", 540, 13.7, 106));
deck.push(new card ("Hinona Kabu", 984, 8.7, 84));
deck.push(new card ("Ruta Burruta", 3864, 6.3, 91));


// Fisher-Yates Shuffle algorithm to randomise deck
const arrayShuffle = (array) => {
    let currentIndex = array.length;
    let randomIndex;

    // While there are elements left to shuffle
    while (currentIndex !== 0) {
        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Swap it with the current element
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    
    return array;
}

arrayShuffle(deck);

// Split the shuffled deck into two hands
const half = Math.ceil(deck.length / 2);
const hand0 = deck.slice(0, half);
const hand1 = deck.slice(-half);

const maxRounds = Math.floor(deck.length / 2);
let currentRound = 0;

const printCard = (hand, round) => {
    
    if (hand == 0) {
        console.log(`Turnip variety: ${hand0[round].name}`);
        console.log(`1. Average weight: ${hand0[round].weight} grams`);
        console.log(`2. Average size: ${hand0[round].size} centimetres`);
        console.log(`3. Gestation time: ${hand0[round].gestTime} days`);
        console.log("");
    } else {
        console.log(`Turnip variety: ${hand1[round].name}`);
        console.log(`1. Average weight: ${hand1[round].weight} grams`);
        console.log(`2. Average size: ${hand1[round].size} centimetres`);
        console.log(`3. Gestation time: ${hand1[round].gestTime} days`);
        console.log("");
    }

}

(async () => {   
        
    while (currentRound < maxRounds) {
        console.clear();

        console.log("TOP TURNIPS V2.00");
        console.log("Now with real, fabricated turnip facts!!");
        console.log("");
    
        console.log("Instructions:");
        console.log("")
        console.log("- Pick a turnip attribute from your card");
        console.log("- Your chosen attribute's value is compared to that on your opponent's card");
        console.log("- Whoever has the highest value wins the round");
        console.log("");
    
        console.log("Your card:");
        console.log("");
        printCard(0, currentRound);
    
        console.log("Pick an attribute (1-3)");
        console.log("");
        
        
        const response = await prompts({
            type: "number",
            name: "attribute",
            message: "Attribute:",
            min: 1,
            max: 3
        })
    
        console.clear();
        console.log(`You chose attribute ${response.attribute}`);
        console.log("");
        console.log("Your card:");
        console.log("");
        printCard(0, currentRound);
        console.log("");
        console.log("Opponent card:");
        console.log("");
        printCard(1, currentRound);
    
        let chosenAttribute = response.attribute;
    
        if (chosenAttribute == 1) {
            if (hand0[currentRound].weight > hand1[currentRound].weight) {
                console.log("YOU WIN");
            } else if (hand0[currentRound].weight < hand1[currentRound].weight) {
                console.log("YOU LOSE");
            } else {
                console.log("DRAW");
            }
        } else if (chosenAttribute == 2) {
            if (hand0[currentRound].size > hand1[currentRound].size) {
                console.log("YOU WIN");
            } else if (hand0[currentRound].size < hand1[currentRound].size) {
                console.log("YOU LOSE");
            } else {
                console.log("DRAW");
            }
        } else {
            if (hand0[currentRound].gestTime > hand1[currentRound].gestTime) {
                console.log("YOU WIN");
            } else if (hand0[currentRound].gestTime < hand1[currentRound].gestTime) {
                console.log("YOU LOSE");
            } else {
                console.log("DRAW");
            }
        }
    
        currentRound++;
        console.log("");
        console.log("wait 10 seconds");
        console.log("");
        await sleep(10000);
    }
})();