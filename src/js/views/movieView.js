import { elements } from './base';


export const clearMovie = () => {
    elements.movie.innerHTML = '';
};

export const getRating = () => elements.ratings.value;
export const getUserRatingTitle = () => elements.commentTitle.value;
export const getUserRathingContent = () => elements.commentContent.value;

export const renderMovie = (movie, isLiked) => {
    const markUp = `
    <figure class="movie__fig">
        <img src="http://image.tmdb.org/t/p/w500${movie.image}" alt="${movie.title}" class="movie__img">
            <h1 class="movie__title">
                <span>${movie.title}</span>
            </h1>
    </figure>

    <div class="movie__details">
        <div class="movie__info">
            <svg class="movie__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="movie__info-text">Release Date: </span>
            <span class="movie__info-data movie__info-data--minutes">&nbsp;${movie.release_date}</span>
            
        </div>
        <div class="movie__info">
            <svg class="movie__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="movie__info-text">Generes: </span>
            <span class="movie__info-data movie__info-data--people">&nbsp;${movie.genres}</span>

    </div>
    <button class="movie__love">
        <svg class="header__likes">
            <use href="img/icons.svg#icon-heart${isLiked ? '' : '-outlined'}"></use>
        </svg>
    </button>
</div>



<div class="movie__ingredients">

    <ul class="movie__ingredient-list">

        ${movie.desc}

    </ul>
</div>

<div class="movie__directions">
    <h2 class="heading-2">Know More about Movie!</h2>
    <p class="movie__directions-text">
        This Movie was Produced by
        <span class="movie__by">${movie.company}</span>. Please check out directions at their website.
    </p>
    <a class="btn-small movie__btn" href="${movie.url}" target="_blank">
        <span>Directions</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-right"></use>
        </svg>

    </a>
</div>


    `;

    elements.movie.insertAdjacentHTML('afterBegin', markUp);
};
