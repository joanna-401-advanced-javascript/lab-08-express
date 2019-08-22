'use strict';

const {server} = require('../src/app');
const supergoose = require('./supergoose');
const mockRequest = supergoose(server);

describe('Categories API', () => {
  test('Can post a new category, returns saved category', () => {
    const testCategory = {
      name: 'vacation',
      description: 'time away'
    };

    return mockRequest.post('/api/v1/categories')
      .send(testCategory)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('vacation');
      });
  });

  test('Can get existing categories', () => {
    return mockRequest.get('/api/v1/categories')
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.results.count).toEqual(1);
        expect(response.body.results.results[0].name).toEqual('vacation');
      });
  });
});