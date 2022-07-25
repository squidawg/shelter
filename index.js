import {Modal} from "./Modal.js";
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
    await readJSON();
    cardGenerator();
}

const generateToolsModal = (...element) => {
    renderModalWindow(createModalContent(...element));
}

const renderModalWindow = (content) => {
    let modal = new Modal('tools-modal');
    modal.buildModal(content);
}


function cardGenerator() {
    let clientWidth = document.querySelector('.carousel').clientWidth;
    cardQuantity = clientWidth === 990 ? 3 : clientWidth === 580 ? 2 : 1;
    let arr = [ITEM_LEFT, ITEM_RIGHT, ITEM_ACTIVE];
    arr.forEach((element) =>{
        generateCardAppend(element, cardQuantity);
    });
}

function createElement(tag, ...classList) {
    const element = document.createElement(tag);
    element.classList.add(...classList);
    return element;
}

const createCardTemplate = (...element) => {
     const card = createElement("div", "carousel_card");
     const promoButton = createElement("div", "promo__button");
     const img = createElement("img", "carousel_image");
     img.src = element[1];
     img.alt = "carousel_image";

     const title = createElement("p", "carousel_title");
     title.innerText = element[0];

     const btn = createElement("button", "button", "button_bordered");
     btn.innerText = "Learn more";
     btn.addEventListener("click", () =>
        generateToolsModal(...element));

     promoButton.append(btn);
     card.append(img, title, promoButton);

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
        document.querySelector("#active_cards").append(switchedItem.childNodes[0]);
    }

    generateCardAppend(switchedItem, cardQuantity);


    BTN_LEFT.addEventListener("click", moveLeft);
    BTN_RIGHT.addEventListener("click", moveRight);
});

const createModalContent = (...element) => {

    const modal_content = createElement("div", 'modal_content_inner');
    const modal_content_text = createElement('div', "modal_content-text");
    const modal_list = createElement('ul',"modal_content-list" )
    const modal_content_wrapper = createElement("div", 'modal_content_wrapper');

    const img = document.createElement("img");
    img.src =  element[1];
    img.classList.add("modal_content-pet-image");

    const petName = createElement('h3', "modal_content-name");
    petName.innerText = element[0];
    const petBreed = createElement('h4', "modal_content-breed");
    petBreed.innerText = `${element[2]} - ${element[3]}`;
    const petDescription = createElement('h5', "modal_content-description");
    petDescription.innerText = element[4];

    let i = 5;
    while (i <= 8){
        let key = Object.keys(cards[0])[i];
        let list_element = createElement('li', "list_element" )
        list_element.innerText = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${element[i]} `
        modal_list.append(list_element)
        i++
    }

    modal_content_text.append(petName, petBreed);
    modal_content_wrapper.append(modal_content_text, petDescription, modal_list);
    modal_content.append(img, modal_content_wrapper);

    return modal_content;
}

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

init();