export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResultList: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
    movie: document.querySelector('.movie'),
    shopping: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList:document.querySelector('.likes__list'),
    ratings: document.querySelector('.user_rating'),
    commentTitle: document.querySelector('.ComT'),
    commentContent: document.querySelector('.ComC'),
    postRating: document.querySelector('.xyz')
};

export const elementStrings = {
    loader: 'loader'
};

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterBegin', loader);
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
}
