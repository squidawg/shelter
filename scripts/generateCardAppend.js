import {cards} from "./readJSON.js";
import {createCardTemplate} from "./createCardTemplate.js";
import {randomUniqueNum} from "./randomUniqueNum.js";

export function generateCardAppend(switchedItem, cardQuantity, outputCount = 3) {
    switchedItem.innerHTML = "";
    let numbers = randomUniqueNum(cards.length - 1, outputCount);
    for (let i = 0; i < cardQuantity; i++) {
        const card = createCardTemplate(cards[numbers[i]]);
        switchedItem.append(card);
    }
}