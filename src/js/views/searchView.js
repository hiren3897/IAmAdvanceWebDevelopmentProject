import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResult = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highLightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'))

    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });

    document.querySelector(`.results__link[href="#${id}"]`).classList.toggle('results__link--active');
};

export const limitMovieTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')} ...`;
    }
    return title;
};

const renderMovies = movie => {

    const markUp = `
    <li>
        <a class="results__link" href="#${movie.id}">
            <figure class="results__fig">
                <img src='http://image.tmdb.org/t/p/w500/${movie.poster_path}' alt="${movie.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitMovieTitle(movie.title)}</h4>
                <p class="results__author">${movie.original_language}</p>
            </div>
        </a>
    </li>
    `;
    elements.searchResultList.insertAdjacentHTML('beforeEnd',markUp);

};

const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if(page === 1 && pages > 1) {
        button = createButton(page, 'next');
    }
    else if(page < pages) {
        button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        `;
    }
    else if(page === pages && pages > 1) {
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterBegin', button);

};


export const renderResults = (movies, page = 1, resPerPage = 10) => {

    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    movies.slice(start, end).forEach(renderMovies);
    renderButtons(page, movies.length, resPerPage);
};