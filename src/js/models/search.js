import axios from 'axios'

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResult() {
        const res = await axios(`https://api.themoviedb.org/3/search/movie?query=${this.query}&api_key=89a5e1f5ea6cf6130b6a5c8fd4cf8605`);
        this.result = res.data.results;
        console.log(res.data.results);
    }
}