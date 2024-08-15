const axios = require('axios');
const NodeCache = require('node-cache');
const { fetchHolidays } = require('./calendarificService'); // Adjust path as necessary

// Mocking the cache and axios
jest.mock('axios');
const mockCacheGet = jest.spyOn(NodeCache.prototype, 'get');
const mockCacheSet = jest.spyOn(NodeCache.prototype, 'set');

describe('fetchHolidays', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return cached holidays if available', async () => {
    const cachedHolidays = {
      meta: { code: 200 },
      response: [{ name: 'Holiday' }],
    };
    mockCacheGet.mockReturnValue(cachedHolidays);

    const result = await fetchHolidays('PAK', 2024);

    expect(result).toEqual(cachedHolidays);
    expect(mockCacheGet).toHaveBeenCalledWith('PAK-2024');
    expect(axios.get).not.toHaveBeenCalled(); // Ensure no API call was made
  });

  it('should fetch and cache holidays if not cached', async () => {
    const holidaysData = {
      meta: { code: 200 },
      response: { holidays: [{ name: 'Holiday' }] },
    };
    mockCacheGet.mockReturnValue(undefined);
    axios.get.mockResolvedValue({ data: holidaysData });

    const result = await fetchHolidays('PAK', 2024);

    expect(result).toEqual(holidaysData);
    expect(mockCacheGet).toHaveBeenCalledWith('PAK-2024');
    expect(mockCacheSet).toHaveBeenCalledWith('PAK-2024', holidaysData);
  });

  it('should throw an error if API fails', async () => {
    axios.get.mockRejectedValue(new Error('API Error'));

    await expect(fetchHolidays('PAK', 2024)).rejects.toThrow(
      'Failed to fetch holidays from Calendarific API.'
    );
  });

  it('should throw an error if no holidays are found', async () => {
    const holidaysData = { meta: { code: 200 }, response: { holidays: [] } };
    mockCacheGet.mockReturnValue(undefined);
    axios.get.mockResolvedValue({ data: holidaysData });

    await expect(fetchHolidays('PAK', 2024)).rejects.toThrow(
      'No holidays found for the specified country and year.'
    );
  });
});
