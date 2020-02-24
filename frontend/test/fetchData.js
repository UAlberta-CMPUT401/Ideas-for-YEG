import axios from 'axios';

export const fetchData = async (input) => {
  const request = await axios.post('http://localhost:1337/graphql', {
    query: input,
  });
  return request;
};
fetchData();
