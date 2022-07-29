export let cards;
export async function readJSON(){
    const response = await fetch("pets.json");
    const json = await response.json();
    cards = json;
}