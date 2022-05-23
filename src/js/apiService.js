import axios from 'axios';

const url = 'https://pixabay.com/api/';
const key = '27545789-efa6a9552ac2720fa0dadb520';

export default {
    searchQuery: '',
  page: 1,
  perPage: 40, 
  async fetchPictures(){
      const {data} =await axios.get(`${url}?key=${key}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.perPage}`);
      this.incrementPage();
        return data;
  },
  incrementPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },
  activePage() {
    return this.page - 1;
  },
  get query() {
    return this.searchQuery;
  },

  set query(value) {
    this.searchQuery = value;
  },
};
