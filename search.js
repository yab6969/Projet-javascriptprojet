
let currentQuery = '';
let currentPage = 1;
let totalResults = 0;
let searchTimeout = null;

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const noResults = document.getElementById('noResults');
const results = document.getElementById('results');
const searchInfo = document.getElementById('searchInfo');
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
  noResults.style.display = 'none';
}

function hideError() {
  error.style.display = 'none';
}

function clearResults() {
  results.innerHTML = '';
  searchInfo.textContent = '';
  loadMoreBtn.style.display = 'none';
  noResults.style.display = 'none';
  hideError();
}

async function performSearch(query, page = 1) {
  if (!query.trim()) {
    clearResults();
    searchInfo.textContent = 'Saisissez un titre de film...';
    return;
  }
  
  try {
    loading.style.display = 'block';
    hideError();
    noResults.style.display = 'none';
    
    const result = await searchMovies(query, page);
    
    loading.style.display = 'none';
    
    if (page === 1) {
      results.innerHTML = '';
      totalResults = parseInt(result.totalResults);
      searchInfo.innerHTML = `<strong>${totalResults}</strong> résultat${totalResults > 1 ? 's' : ''} trouvé${totalResults > 1 ? 's' : ''}`;
    }
    
    result.Search.forEach(movie => {
      results.insertAdjacentHTML('beforeend', createMovieCard(movie));
    });
    
    const totalPages = Math.ceil(totalResults / 10);
    loadMoreBtn.style.display = page < totalPages ? 'block' : 'none';
    
  } catch (err) {
    loading.style.display = 'none';
    
    if (err.message.includes('not found')) {
      noResults.style.display = 'block';
      searchInfo.textContent = '';
    } else {
      showError(err.message);
    }
    
    loadMoreBtn.style.display = 'none';
  }
}

function handleInput() {
  const query = searchInput.value.trim();
  
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  
  if (!query) {
    clearResults();
    searchInfo.textContent = 'Saisissez un titre de film...';
    return;
  }
  
  searchTimeout = setTimeout(() => {
    currentQuery = query;
    currentPage = 1;
    performSearch(currentQuery, currentPage);
  }, 500);
}

function handleSubmit(e) {
  e.preventDefault();
  
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  
  const query = searchInput.value.trim();
  if (query) {
    currentQuery = query;
    currentPage = 1;
    performSearch(currentQuery, currentPage);
  }
}

function handleLoadMore() {
  currentPage++;
  performSearch(currentQuery, currentPage);
}

searchInput.addEventListener('input', handleInput);
searchForm.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);
