
async function searchMovies(query, page = 1) {
  const url = `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}`;
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.Response === 'False') {
    throw new Error(data.Error || 'Erreur de recherche');
  }
  
  return data;
}

async function getMovieDetails(imdbID) {
  const url = `${API_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`;
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.Response === 'False') {
    throw new Error(data.Error || 'Film non trouvé');
  }
  
  return data;
}

async function getTrendingMovies() {
  const searches = ['Reze', 'Guardians', 'Inception', 'Shrek', 'ninjago', 'kaizen', 'Jin Roh', 'Spider-Man: Across the Spider-Verse', 'Mr. Plankton', 'Mr Robot', 'jjk', 'Breaking Bad', '800 Heroes'];
  const movies = [];
  
  
  for (const search of searches) {
    try {
      const result = await searchMovies(search, 1);
      if (result.Search && result.Search.length > 0) {
        movies.push(result.Search[0]);
      }
    } catch (error) {
      console.error(`Erreur: ${search}`, error);
    }
  }
  
  return movies;
}

function formatDVDDate(dvdDate) {
  if (!dvdDate || dvdDate === 'N/A') return 'Non disponible';
  
  try {
    const date = new Date(dvdDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return dvdDate;
  }
}
