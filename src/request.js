const request = {
  fetchTrending: `trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`,
  fetchTvSeries: `discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
  fetchMovies: `discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,
};

export default request;
