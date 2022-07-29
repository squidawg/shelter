import {createElement} from "./createElement.js";
import {cards} from "./readJSON.js";

export const createModalContent = (...element) => {

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
        list_element.innerText = `${key}: ${element[i]} `
        modal_list.append(list_element)
        i++
    }

    modal_content_text.append(petName, petBreed);
    modal_content_wrapper.append(modal_content_text, petDescription, modal_list);
    modal_content.append(img, modal_content_wrapper);

    return modal_content;
}