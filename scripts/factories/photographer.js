import { createThisElement, CreateThisMedia } from "../utils/common.js";

export function getUserCardDOM(photographer) {
    const path = "assets/photographers/";
    const filename = photographer.portrait.split('.')[0];
    const imageType = photographer.portrait.split('.')[1];
    const article = createThisElement('article', 'photographer__card');
    const img = new CreateThisMedia(path, filename, imageType, 'photographer__image');
    const link = createThisElement('a', 'photographer__link');
    link.href = `photographer.html?id=${photographer.id}`;
    link.appendChild(img);
    const textContainer = createThisElement('div', 'photographer__text-container');
    const h2 = document.createElement( 'h2' );
    h2.textContent = photographer.name;
    const place = createThisElement('p', 'photographer__place');
    place.innerText = `${photographer.country, photographer.city}`;
    const tagline = createThisElement('p', 'photographer__text', null, photographer.tagline);
    const price = createThisElement('p', 'photographer__price');
    price.innerText = `${photographer.price}€/jour`;
    textContainer.appendChild(h2);
    textContainer.appendChild(place);
    textContainer.appendChild(tagline);
    textContainer.appendChild(price);
    article.appendChild(link);
    article.appendChild(textContainer);
    return (article);
}


export function createMediaCardDOM(media){

}