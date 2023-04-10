import { createThisElement, CreateThisMedia } from "../utils/common.js";

/**
 *  This function creates the DOM for the photographer's card
 * @param {Object} photographer - photographer object
 * @returns {Object} - DOM for the photographer's card
 * exemple of HTML generated :
 * <article class="photographer__card">
 *     <a href="photographer.html?id=1" class="photographer__link">
 *        <img src="assets/photographers/ID/ID.webp" alt="ID" class="photographer__image">
 *    </a>
 *    <div class="photographer__text-container">
 *        <h2 class="photographer__name">Mimi Keel</h2>
 *        <p class="photographer__place">France, Paris</p>
 *        <p class="photographer__text">Voir le monde tel qu'il est</p>
 *        <p class="photographer__price">500€/jour</p>
 *    </div>
 * </article>
 */
export function getPhotographerCardDOM(photographer) {
    const path = "assets/photographers/";
    const filename = photographer.portrait.split('.')[0];
    const imageType = photographer.portrait.split('.')[1];
    const article = createThisElement('article', 'photographer__card');
    article.tabIndex = photographer.index;
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

/**
 * This function creates the DOM for the media card
 * @param {Object} media - media object
 * @returns {Object} - DOM for the media card
 * exemple of HTML generated :
 * <article class="media__card">
 *   <a href="photographer.html?id=1" class="media__link">
 *      <img src="assets/images/ID/ID.webp" alt="ID" class="media__image">
 *         or
 *      <video src="assets/images/ID/ID.mp4" alt="ID" class="media__video"></video>
 *  </a>
 *  <div class="media__text-container">
 *     <h2 class="media__title">ID</h2>
 *    <p class="media__likes">
 *        <span class="media_like°number" >ID</span>
 *        <span class="media__likes__icon">
 *           <img src="assets/icons/heart_like.webp" alt="heart" class="media__likes__icon__heart">
 *        </span>
 *    </p>
 *  </div>
 * </article>
 */ 
export function createMediaCardDOM(media){
    console.log(media);
    const mediaPath = media.image ? media.image : media.video;
    const photographer = mediaPath.split('.')[0].split('/')[2];
    const path = `assets/images/${photographer}/`;
    const filename = mediaPath.split(`${photographer}`)[1].split('.')[0];
    const extension = mediaPath.split('.')[1];
    const article = createThisElement('article', 'media__card');
    const link = createThisElement('a', 'media__card__link', media.id);
    link.href = `#`;
    link.alt = media.title;
    const mediaDOM = new CreateThisMedia(path, filename, extension, 'media__card__media');
    mediaDOM.setAttribute('tabindex', media.index)
    link.appendChild(mediaDOM);
    const textContainer = createThisElement('div', 'media__text-container');
    const title = createThisElement('h2', 'media__card__title', null, media.title);
    const likes = createThisElement('p', 'media__likes', null, "");
    const likesNumber = createThisElement('span', 'media__likes__number', null, media.likes);
    const likesIcon = createThisElement('span', 'media__likes__icon', null, "");
    const heartIcon = new CreateThisMedia('assets/icons/', 'heart_likes_A', 'webp', 'media__likes__icon__heart heart', media.id);
    heartIcon.setAttribute('tabindex', media.index+1)
    textContainer.appendChild(title);
    textContainer.appendChild(likes);
    likes.appendChild(likesNumber);
    likes.appendChild(likesIcon);
    likesIcon.appendChild(heartIcon);
    article.appendChild(link);
    article.appendChild(textContainer);
    return (article);
}