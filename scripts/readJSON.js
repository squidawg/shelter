export let cards;
export async function readJSON(){
    const response = await fetch("../pets.json");
    cards = await response.json();
}