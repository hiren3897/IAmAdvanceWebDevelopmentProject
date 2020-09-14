import Search from './models/Search'
import Movie from './models/Movie'
import User from './models/user'
import Likes from './models/likes'


import * as searchView from './views/searchView'
import * as movieView from './views/movieView'
import * as likesView from './views/likeView'

import { elements , renderLoader, clearLoader } from './views/base'
const state = {};

/**
 * Search Controler
 */

 const controlSearch = async () => {
    const query = searchView.getInput();

    if (query) {

      searchView.clearInput();
      searchView.clearResult();
      state.search = new Search(query);

  
      searchView.clearInput();
      searchView.clearResult();
      renderLoader(elements.searchRes);
      
      await state.search.getResult();
      clearLoader();
      searchView.renderResults(state.search.result);

    }

 };

 elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


/**
 *  Movie Controler
 */

 const controlMovie = async () => {

   const id =  window.location.hash.replace('#', '');

   if(id) {

      // Prepare the UI for changes 
      movieView.clearMovie();
      renderLoader(elements.movie);

      //higlight
      if(state.search){
          searchView.highLightSelected(id);
      }

      //Create new Movie objects
      state.movie = new Movie(id);

      try {

          // Get Movie data
          await state.movie.getMovie();
            

          // Render the Movie
          clearLoader();

          movieView.renderMovie(state.movie);

          
      } catch (error) {
          alert('something went wrong'+ error);
          
      }

  }

 };

 ['load', 'hashchange'].forEach(e => window.addEventListener(e, controlMovie));

 const getUserRatings = async () => {

    var rat = parseInt(movieView.getRating());
    var title = movieView.getUserRatingTitle();
    var content = movieView.getUserRathingContent();
    state.rating = new Movie();

    state.user.ratings = await state.rating.getUserRatings(rat,title,content);

 }

 elements.postRating.addEventListener('click', e => {
    getUserRatings();
});

/**
 * LIKES CONTROLLER
 */

const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentID = state.movie.id;

    // User has NOT yet liked current Movie
    if (!state.likes.isLiked(currentID)) {
        // Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.movie.title,
            state.movie.company,
            state.movie.image
        );

        // Toggle the like button
        likesView.toggleLikeBtn(true);

        // Add like to UI list
        likesView.renderLike(newLike);

    // User HAS liked current Movie
    } else {
        // Remove like from the state
        state.likes.deleteLike(currentID);

        // Toggle the like button
        likesView.toggleLikeBtn(false);

        // Remove like from UI list
        likesView.deleteLike(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};


// Restore liked Movies on page load
window.addEventListener('load', () => {
    state.likes = new Likes();
    
    // Restore likes
    state.likes.readStorage();

    // Toggle like menu button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));
});


elements.movie.addEventListener('click', e => {
    if(e.target.matches('.movie__love, .movie__love *')) {
       // call like controll
       controlLike();
   }
});
 
