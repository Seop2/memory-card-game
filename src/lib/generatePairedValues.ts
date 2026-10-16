/**
 * 카드 배열을 두 배로 복제한 뒤 섞어서 짝 카드 덱을 만든다
 */
export function generatePairedAnimalDeck<T>(items: T[]): T[] {

    const deck = [...items, ...items];

    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}