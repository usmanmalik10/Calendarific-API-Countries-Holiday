const request = require('supertest');
const app = require('../app');
const calendarificService = require('../services/calendarificService');

// Mock the calendarificService
jest.mock('../services/calendarificService');

describe('GET /holidays', () => {
  it('should return holidays for a valid country and year', async () => {
    const mockHolidays = [
      {
        name: "New Year's Day",
        description:
          'January 1 marks the beginning of the official New Year in Pakistan...',
        date: { iso: '2024-01-01' },
      },
    ];

    // Mock the fetchHolidays method
    calendarificService.fetchHolidays.mockResolvedValue(mockHolidays);

    const res = await request(app)
      .get('/holidays')
      .query({ country: 'PK', year: '2024' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockHolidays);
  });

  it('should return a 400 error if country or year is missing', async () => {
    const res = await request(app).get('/holidays').query({ year: '2024' });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toEqual({
      error: 'Country and year are required parameters.',
    });
  });

  it('should return a 500 error if fetching holidays fails', async () => {
    calendarificService.fetchHolidays.mockRejectedValue(
      new Error('Failed to fetch holidays')
    );

    const res = await request(app)
      .get('/holidays')
      .query({ country: 'PAK', year: '2024' });

    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual({ error: 'Failed to fetch holidays' });
  });
});
