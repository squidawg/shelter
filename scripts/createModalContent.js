import {createElement} from "./createElement.js";
import {cards} from "./readJSON.js";
import {Modal} from "./Modal.js";

export function createModalContent({
                                       name,
                                       img,
                                       type,
                                       breed,
                                       description,
                                       age,
                                       inoculations,
                                       diseases,
                                       parasites
                                   }) {
    const modal_content = createElement("div", 'modal_content_inner');
    const modal_content_text = createElement('div', "modal_content-text");
    const modal_list = createElement('ul',"modal_content-list" )
    const modal_content_wrapper = createElement("div", 'modal_content_wrapper');
    const modal = new Modal('tools-modal');

    const image = document.createElement("img");
    image.src =  img;
    image.classList.add("modal_content-pet-image");

    const petName = createElement('h3', "modal_content-name");
    petName.innerText = name;
    const petBreed = createElement('h4', "modal_content-breed");
    petBreed.innerText = `${type} - ${breed}`;
    const petDescription = createElement('h5', "modal_content-description");
    petDescription.innerText = description;

    let i = 5;
    while (i <= 8){
        let key = Object.keys(cards[0])[i];
        let list_element = createElement('li', "list_element" )
        list_element.innerText = `${key}:  ${arguments[0][key]}`
        modal_list.append(list_element)
        i++
    }

    modal_content_text.append(petName, petBreed);
    modal_content_wrapper.append(modal_content_text, petDescription, modal_list);
    modal_content.append(image, modal_content_wrapper);
    modal.buildModal(modal_content);
}