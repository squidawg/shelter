import {cards} from "./readJSON.js";
import {createCardTemplate} from "./createCardTemplate.js";
import {randomUniqueNum} from "./randomUniqueNum.js";

export function generateCardAppend(switchedItem, cardQuantity, outputCount = 3) {
    switchedItem.innerHTML = "";
    let numbers = randomUniqueNum(cards.length - 1, outputCount);
    for (let i = 0; i < cardQuantity; i++) {
        let name = cards[numbers[i]].name;
        let img = cards[numbers[i]].img;
        let type =  cards[numbers[i]].type;
        let breed = cards[numbers[i]].breed;
        let description = cards[numbers[i]].description;
        let age = cards[numbers[i]].age;
        let inoculations = cards[numbers[i]].inoculations;
        let diseases = cards[numbers[i]].diseases;
        let parasites = cards[numbers[i]].parasites;

        let card = createCardTemplate(name, img, type, breed, description, age, inoculations, diseases, parasites);
        switchedItem.append(card);
    }
}