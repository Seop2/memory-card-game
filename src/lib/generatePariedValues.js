export function generatePairedValues(count) {
    const values = Array.from({ length: count }, (_, i) => i + 1);
    const deck = [...values, ...values];
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}
