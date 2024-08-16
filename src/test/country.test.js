const request = require('supertest');
const app = require('../app');
const calendarificService = require('../services/calendarificService');

// Mock the calendarificService
jest.mock('../services/calendarificService');

describe('GET /countries', () => {
  it('should return the list of countries', async () => {
    const mockCountries = [
      { id: 'PK', name: 'Pakistan' },
      { id: 'US', name: 'United States' },
    ];

    // Mock the fetchCountries method
    calendarificService.fetchCountries.mockResolvedValue(mockCountries);

    const res = await request(app).get('/countries');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockCountries);
  });

  it('should return a 500 error if fetching countries fails', async () => {
    calendarificService.fetchCountries.mockRejectedValue(
      new Error('Failed to fetch countries')
    );

    const res = await request(app).get('/countries');

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual({ error: 'Failed to fetch countries' });
  });
});
