const BTN_LEFT = document.querySelector("#btn_left");
const BTN_RIGHT = document.querySelector("#btn_right");
const CAROUSEL = document.querySelector(".carousel");
const ITEM_LEFT = document.querySelector(".left_cards");
const ITEM_RIGHT = document.querySelector(".right_cards");
const ITEM_ACTIVE = document.querySelector(".active_cards");
let cards ;
let cardQuantity;

async function readJSON() {
    const response = await fetch("pets.json");
    const json = await response.json();
    cards = json;
}

async function init(){
    await readJSON()
    cardGenerator();
}

function cardGenerator() {
    let clientWidth = document.querySelector('body').clientWidth;
    cardQuantity = clientWidth > 1201 ? 3 : clientWidth < 1200 && clientWidth > 768 ? 2 : 1;
    let arr = [ITEM_LEFT, ITEM_RIGHT, ITEM_ACTIVE];
    for (let i = 0; i < arr.length; i++) {
        let switchedItem = arr[i];
        generateCardAppend(switchedItem, cardQuantity);
    }
}

document.addEventListener('DOMContentLoaded', init, false);


function createElement(tag, ...classList) {
    const element = document.createElement(tag);
    element.classList.add(...classList);
    return element;
}

const createCardTemplate = (...element) => {
     const card = createElement("div", "carousel_card");
     const promoButton = createElement("div", "promo__button")
     const img = createElement("img", "carousel_image");
     img.src = element[1];
     img.alt = "carousel_image"

     const title = createElement("p", "carousel_title");
     title.innerText = element[0];

     const btn = createElement("button", "button", "button_bordered");
     btn.innerText = "Learn more"

     promoButton.append(btn);
     card.append(img, title, promoButton)

     return card;
}


const moveLeft = () => {
     CAROUSEL.classList.add("transition-left");
     BTN_LEFT.removeEventListener("click", moveLeft);
     BTN_RIGHT.removeEventListener("click", moveRight);
};

const moveRight = () => {
     CAROUSEL.classList.add("transition-right");
     BTN_RIGHT.removeEventListener("click", moveRight);
     BTN_LEFT.removeEventListener("click", moveLeft);
};

BTN_LEFT.addEventListener("click", moveLeft);
BTN_RIGHT.addEventListener("click", moveRight);

function generateCardAppend(switchedItem, cardQuantity) {
     switchedItem.innerHTML = "";
     let numbers = randomUniqueNum(cards.length - 1, 3);
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

CAROUSEL.addEventListener('animationend', (animationEvent) => {
    let switchedItem;
    if (animationEvent.animationName === "move-left") {
        CAROUSEL.classList.remove("transition-left");
        switchedItem = ITEM_LEFT;

    }
    else {
        CAROUSEL.classList.remove("transition-right");
        switchedItem = ITEM_RIGHT;
    }

    document.querySelector("#active_cards").innerHTML = "";
    while (switchedItem.childNodes.length > 0) {
        document.querySelector("#active_cards").appendChild(switchedItem.childNodes[0]);
    }

    generateCardAppend(switchedItem, cardQuantity);


    BTN_LEFT.addEventListener("click", moveLeft);
    BTN_RIGHT.addEventListener("click", moveRight);
});

function randomUniqueNum(range, outputCount){
    let arr = []
    for (let i = 0; i <= range; i++) {
        arr.push(i)
    }

    let result = [];

    for (let i = 1; i <= outputCount; i++) {
        const random = Math.floor(Math.random() * (range - i));
        result.push(arr[random]);
        arr[random] = arr[range - i];
    }

    return result;
}