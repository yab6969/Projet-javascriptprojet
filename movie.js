
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const movieDetails = document.getElementById('movieDetails');

function getMovieId() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function showError(message) {
  error.textContent = message;
  error.style.display = 'block';
  loading.style.display = 'none';
}

function displayMovie(movie) {
  document.title = `${movie.Title} - Cinéma du Village`;
  
  const poster = movie.Poster !== 'N/A' ? movie.Poster : '';
  
  let ratingsHTML = '';
  if (movie.imdbRating && movie.imdbRating !== 'N/A') {
    ratingsHTML += `<div class="rating-badge">⭐ IMDb: ${movie.imdbRating}/10</div>`;
  }
  if (movie.Metascore && movie.Metascore !== 'N/A') {
    ratingsHTML += `<div class="rating-badge">📊 Metascore: ${movie.Metascore}/100</div>`;
  }
  
  const genres = movie.Genre && movie.Genre !== 'N/A' 
    ? movie.Genre.split(',').map(g => `<span class="genre-tag">${g.trim()}</span>`).join('')
    : '';
  
  let allRatingsHTML = '';
  if (movie.Ratings && movie.Ratings.length > 0) {
    allRatingsHTML = `
      <div class="section">
        <h2>Notes</h2>
        <div class="info-grid">
          ${movie.Ratings.map(r => `
            <div class="info-item">
              <span class="info-label">${r.Source}:</span>
              <span>${r.Value}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  movieDetails.innerHTML = `
    <div class="movie-header">
      <div>
        ${poster ? 
          `<img src="${poster}" alt="${movie.Title}" class="poster-large">` :
          `<div class="poster-large no-poster">🎬</div>`
        }
      </div>
      <div class="movie-main-info">
        <h1>${movie.Title}</h1>
        <div class="meta">
          <span>📅 ${movie.Year}</span>
          ${movie.Runtime !== 'N/A' ? `<span>⏱️ ${movie.Runtime}</span>` : ''}
          ${movie.Rated !== 'N/A' ? `<span>🔞 ${movie.Rated}</span>` : ''}
        </div>
        ${ratingsHTML ? `<div class="ratings">${ratingsHTML}</div>` : ''}
        ${genres ? `<div class="genres">${genres}</div>` : ''}
      </div>
    </div>
    
    <div class="movie-content">
      <div class="section">
        <h2>Synopsis</h2>
        <p>${movie.Plot !== 'N/A' ? movie.Plot : 'Synopsis non disponible.'}</p>
      </div>
      
      <div class="section">
        <h2>Distribution & Équipe</h2>
        <div class="info-grid">
          ${movie.Director !== 'N/A' ? `
            <div class="info-item">
              <span class="info-label">Réalisateur:</span>
              <span>${movie.Director}</span>
            </div>
          ` : ''}
          ${movie.Actors !== 'N/A' ? `
            <div class="info-item">
              <span class="info-label">Acteurs:</span>
              <span>${movie.Actors}</span>
            </div>
          ` : ''}
          ${movie.Writer !== 'N/A' ? `
            <div class="info-item">
              <span class="info-label">Scénariste:</span>
              <span>${movie.Writer}</span>
            </div>
          ` : ''}
        </div>
      </div>
      
      <div class="section">
        <h2>Informations</h2>
        <div class="info-grid">
          ${movie.Released !== 'N/A' ? `
            <div class="info-item">
              <span class="info-label">Sortie:</span>
              <span>${movie.Released}</span>
            </div>
          ` : ''}
          ${movie.DVD !== 'N/A' ? `
            <div class="info-item">
              <span class="info-label">DVD:</span>
              <span>${formatDVDDate(movie.DVD)}</span>
            </div>
          ` : ''}
          ${movie.Language !== 'N/A' ? `
            <div class="info-item">
              <span class="info-label">Langue:</span>
              <span>${movie.Language}</span>
            </div>
          ` : ''}
          ${movie.Country !== 'N/A' ? `
            <div class="info-item">
              <span class="info-label">Pays:</span>
              <span>${movie.Country}</span>
            </div>
          ` : ''}
          ${movie.BoxOffice !== 'N/A' ? `
            <div class="info-item">
              <span class="info-label">Box Office:</span>
              <span>${movie.BoxOffice}</span>
            </div>
          ` : ''}
          ${movie.Awards !== 'N/A' ? `
            <div class="info-item">
              <span class="info-label">Récompenses:</span>
              <span>${movie.Awards}</span>
            </div>
          ` : ''}
        </div>
      </div>
      
      ${allRatingsHTML}
    </div>
  `;
  
  loading.style.display = 'none';
  movieDetails.style.display = 'block';
}

async function init() {
  const movieId = getMovieId();
  
  if (!movieId) {
    showError('Aucun film spécifié.');
    return;
  }
  
  try {
    loading.style.display = 'block';
    const movie = await getMovieDetails(movieId);
    displayMovie(movie);
  } catch (err) {
    showError(err.message || 'Erreur de chargement.');
    console.error(err);
  }
}

init();
