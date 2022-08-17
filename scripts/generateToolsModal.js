import {createModalContent} from "./createModalContent.js";

export const generateToolsModal = ({
                                       name,
                                       img,
                                       type,
                                       breed,
                                       description,
                                       age,
                                       inoculations,
                                       diseases,
                                       parasites
                                   }) =>{
    createModalContent({
        name,
        img,
        type,
        breed,
        description,
        age,
        inoculations,
        diseases,
        parasites
    });
}
