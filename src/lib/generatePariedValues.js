/**
 * Generate the card deck
 * @param {*} item
 * @returns
 */
export function generatePairedAnimalDeck(items) {

    const deck = [...items, ...items].map((item, index) => ({
        ...item, cardId: `${item.id}- ${index}`
    }));

    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}


export const dateFmt = new Intl.DateTimeFormat("en-US", {
    month: "short", // Jan, Feb, …
    day: "numeric", // 5
    year: "numeric", // 2025
});