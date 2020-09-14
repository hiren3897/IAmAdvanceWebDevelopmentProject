import { elements } from './base';
import { limitMovieTitle } from './searchView';

export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.movie__love use').setAttribute('href', `img/icons.svg#${iconString}`);
    // icons.svg#icon-heart-outlined
};

export const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const renderLike = like => {
    const markup = `
        <li>
            <a class="likes__link" href="#${like.id}">
                <figure class="likes__fig">
                    <img src="http://image.tmdb.org/t/p/w500${like.image}" alt="${like.title}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${limitMovieTitle(like.title)}</h4>
                    <p class="likes__author">${like.company}</p>
                </div>
            </a>
        </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeEnd', markup);
};

export const deleteLike = id => {
    const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
}

