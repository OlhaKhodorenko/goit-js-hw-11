import './css/styles.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix, { Notify } from 'notiflix';
import apiService from './js/apiService';


const form = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const moreBtn = document.querySelector('.load-more');
const galleryLigthbox = new SimpleLightbox(".gallery a");
const alertPopup = document.querySelector(".alert");
const sentinel = document.querySelector(".sentinel");
 

let isAlertVisible = false;

  form.addEventListener("submit",  onSearch);
  moreBtn.addEventListener("click", loadMore);

  moreBtn.classList.add("is-hidden");
  let pages;

  function onSearch(e) {
    e.preventDefault();
    clearContainer();
    apiService.resetPage();
    moreBtn.classList.add("is-hidden");
    apiService.query = e.currentTarget.elements.searchQuery.value
    if (apiService.query.trim() === '') {
      Notiflix.Notify.failure('Please enter your request');
      return;
    }
    
   apiService.fetchPictures()
    .then(({ totalHits, hits }) => {
      pages = Math.ceil(totalHits / hits.length);
      if (hits.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again');
        return;
      };
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images!`);
      renderGallery(hits);
      moreBtn.classList.remove('is-hidden');
      if (pages === apiService.activePage()) {
        moreBtn.classList.add('is-hidden');
        }

    })
    .catch(error => console.log(error));
}
  
function renderGallery(picturesArr) {
  const markup = picturesArr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
    return `<div class="photo-card">
<a class="gallery__item" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" height="190px"/>
</a>
<div class="info">
  <p class="info-item">
    <b>Likes: <br>${likes}</b>
  </p>
  <p class="info-item">
    <b>Views: <br>${views}</b>
  </p>
  <p class="info-item">
    <b>Comments: <br>${comments}</b>
  </p>
  <p class="info-item">
    <b>Downloads: <br>${downloads}</b>
  </p>
</div>
</div>`;
  }).join(''); 
galleryContainer.insertAdjacentHTML("beforeend", markup);
galleryLigthbox.refresh();
}

function clearContainer() {
  galleryContainer.innerHTML = '';
}
function loadMore(){
  apiService.fetchPictures().then(({ hits }) => {
    if (pages === apiService.activePage()) {
      moreBtn.classList.add('is-hidden');
      toggleAlertPopup();
    }
    renderGallery(hits);
  });
}


function toggleAlertPopup() {
  if (isAlertVisible) {
    return;
  }
  isAlertVisible = true;
  alertPopup.classList.add("is-visible");
  setTimeout(() => {
    alertPopup.classList.remove("is-visible");
    isAlertVisible = false;
  }, 10000);
}



// ----------------------Infinity scroll-----------------------------------------

// const onEntry = entries => {
//   entries.forEach(entry => {
//     if(entry.isIntersecting && apiService.query !==''){
//       apiService.fetchPictures().then(({ hits }) => {
//         if (pages === apiService.activePage()) {
//           toggleAlertPopup();
//         }
//         renderGallery(hits);
//       });
//       console.log(entry);
//     }
//   });  
// }
// const options ={
//  rootMargin: '150px',
// };
// const observer = new IntersectionObserver(onEntry, options);
// observer.observe(sentinel);

