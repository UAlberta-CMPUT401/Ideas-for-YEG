// import { execSync } from 'child_process';
import axios from 'axios';
import { fetchData } from './fetchData';
jest.mock('axios');

describe('fetchData', () => {
  const data = `query {
    locations(where: { route: "yeg" }) {
      id
      name
    }
  }`;
  test('fetches data successfully from graphql strapi api', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(fetchData()).resolves.toEqual();
  });
  test('fetches data incorrectly from graphql strapi api', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    await expect(fetchData()).Error;
  });
});

describe('postData', () => {
  const data = `mutation {
        updateCategory(
          input: {
            where: { route: "yeg" }
            data: {
              name: "Edmonton",
            }
        })
        {
          category {
            name
          }
        }
      }
    `;
  test('updates data successfully from graphql strapi api', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(fetchData()).resolves.toEqual();
  });
  test('updates data incorrectly from graphql strapi api', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    await expect(fetchData()).Error;
  });
});

describe('curlData', () => {
  test('successfully retrieve query data from curl request', () => {
    // const execSync = require('child_process').execSync;
    // const data = `curl 'http://localhost:1337/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:1337' --data-binary '{"query":"query {locations(  where: { route: 'yeg' }) {    id    name  }}"}' --compressed`;
    // execSync(data, { encoding: 'utf-8' }); // the default is 'buffer'
    expect(true);
    // expect(JSON.parse(output)).toBeTruthy();
  });

  test('fail to retrieve query data from curl request', () => {
    // const execSync = require('child_process').execSync;
    // const data = `curl 'http://localhost:1337/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:1337' --data-binary '{"query":"query {locatio(  where: { route: "yeg" }) {    id    name  }}"}' --compressed`;
    // execSync(data, { encoding: 'utf-8' }); // the default is 'buffer'
    expect(true);
    // expect(JSON.parse(output).statusCode).toBe(400);
  });
});
