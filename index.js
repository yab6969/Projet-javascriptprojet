
let allMovies = [];
let currentIndex = 0;
const MOVIES_PER_LOAD = 3;

const loading = document.getElementById('loading');
const error = document.getElementById('error');
const moviesDiv = document.getElementById('movies');
const loadMoreBtn = document.getElementById('loadMore');

function createMovieCard(movie) {
  const poster = movie.Poster !== 'N/A' ? movie.Poster : '';
  
  return `
    <div class="movie-card">
      <div class="poster-container">
        ${poster ? 
          `<img src="${poster}" alt="${movie.Title}" class="movie-poster" loading="lazy">` :
          `<div class="no-poster">🎬</div>`
        }
      </div>
      <div class="movie-info">
        <h3 class="movie-title">${movie.Title}</h3>
        <p class="movie-year">${movie.Year}</p>
        <a href="movie.html?id=${movie.imdbID}" class="btn">En savoir plus</a>
      </div>
    </div>
  `;
}

function showError(message) {
  error.textContent = message;
  error.style.display = 'block';
  loading.style.display = 'none';
}

function displayMovies() {
  const nextBatch = allMovies.slice(currentIndex, currentIndex + MOVIES_PER_LOAD);
  
  nextBatch.forEach(movie => {
    moviesDiv.insertAdjacentHTML('beforeend', createMovieCard(movie));
  });
  
  currentIndex += nextBatch.length;
  loadMoreBtn.style.display = 'none';
  
  // Affiche le bouton s'il y a encore des films à charger
  if (currentIndex < allMovies.length) {
    loadMoreBtn.style.display = 'block';
  }
}

async function init() {
  try {
    loading.style.display = 'block';
    allMovies = await getTrendingMovies();
    
    if (allMovies.length === 0) {
      showError('Aucun film disponible.');
      return;
    }
    
    loading.style.display = 'none';
    displayMovies();
    
    if (allMovies.length > currentIndex) {
      loadMoreBtn.style.display = 'block';
    }
  } catch (err) {
    showError('Erreur de chargement. Vérifiez votre clé API.');
    console.error(err);
  }
}

loadMoreBtn.addEventListener('click', displayMovies);
init();
 