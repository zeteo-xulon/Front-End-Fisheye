import { createThisElement, createThisImage } from "../utils/common.js";

export function getUserCardDOM(photographer) {
    const picture = `assets/photographers/${photographer.portrait}`;
    const article = createThisElement('article', 'photographer__card');
    const img = createThisImage({src: picture, alt: photographer.name});
    const link = createThisElement('a', 'photographer__link');
    link.href = `photographer.html?name=${photographer.name}`;
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