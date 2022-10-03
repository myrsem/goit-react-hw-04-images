import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '29225350-3af2603c162c678e18c25e7ab';

const fetchAPI = async (searchQuery, page) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  return data.hits;
};

export default fetchAPI;