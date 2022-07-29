import {Modal} from "./Modal.js";
import {createModalContent} from "./createModalContent.js";

export const generateToolsModal = (...element) =>{
    renderModalWindow(createModalContent(...element));
}

const renderModalWindow = (content) => {
    let modal = new Modal('tools-modal');
    modal.buildModal(content);
}