import {createElement} from "./createElement.js";
import {generateToolsModal} from "./generateToolsModal.js";

export const createCardTemplate = (...element) => {
    const card = createElement("div", "carousel_card");
    const promoButton = createElement("div", "promo__button");
    const img_wrapper = createElement("img", "carousel_image");
    const title = createElement("p", "carousel_title");
    const btn = createElement("button", "button", "button_bordered");

    img_wrapper.src = element[1];
    img_wrapper.alt = "carousel_image";

    title.innerText = element[0];
    btn.innerText = "Learn more";
    btn.addEventListener("click", () =>
        generateToolsModal(...element));

    promoButton.append(btn);
    card.append(img_wrapper, title, promoButton);

    return card;
}