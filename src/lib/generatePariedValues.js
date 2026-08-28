/**
 * 카드 덱 생성
 * @param {*} item
 * @returns 
 */
export function generatePairedValues(items) {

    const deck = [...items, ...items].map((item, index) => ({
        ...item, cardId: `${item.id}- ${index}`
    }));

    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}
