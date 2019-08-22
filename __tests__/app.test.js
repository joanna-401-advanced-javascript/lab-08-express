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

  test('Can modify existing category', () => {
    const testCategoryTwo = {
      name: 'sky',
      description: 'blue'
    };

    const updatedCategory = {
      name: 'ocean',
      description: 'wet'
    };

    return mockRequest.post('/api/v1/categories')
      .send(testCategoryTwo)
      .then(response => {
        return mockRequest.put(`/api/v1/categories/${response.body._id}`)
          .send(updatedCategory)
          .then(response => {
            expect(response.status).toEqual(200);
            expect(response.body.name).toEqual('ocean');
          })
      })
  });

  test('Can delete existing category', () => {
    const testCategoryThree = {
      name: 'burgers',
      description: 'buns of delight'
    };

    return mockRequest.post('/api/v1/categories')
      .send(testCategoryThree)
      .then(response => {
        return mockRequest.delete(`/api/v1/categories/${response.body._id}`)
          .then(response => {
            expect(response.status).toEqual(200);
            expect(response.body.name).toEqual('burgers');

            return mockRequest.get('/api/v1/categories')
              .then(response => {
                expect(response.body.results.count).toEqual(2);
              })
          });
      })
  });
});