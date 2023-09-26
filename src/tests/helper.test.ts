import { SUPPORTED_COUNTRIES } from "./config";
import { shortenPublicHoliday, validateInput } from "./helpers";

describe('helpers', () => {
  describe('validateInput', () => {
    it('should return true for valid input', () => {
      const params = {
        year: 2023,
        country: SUPPORTED_COUNTRIES[0]
      }

      expect(validateInput({ ...params })).toBeTruthy();
    });

    it('should throw error if country is not supported', () => {
      const params = {
        country: 'by'
      }
      const countryError = new Error(`Country provided is not supported, received: ${params.country}`);

      expect(() => validateInput({ ...params })).toThrow(countryError);
    });

    it('should throw error if provided year is not current', () => {
      const params = {
        year: 2021
      }
      const yearError = new Error(`Year provided not the current, received: ${params.year}`);

      expect(() => validateInput({ ...params })).toThrow(yearError);
    });
  });

  describe('shortenPublicHoliday', () => {
    it('should return holiday in short format', () => {
      const publicHolidayParams = {
        date: '2023-01-01',
        localName: 'New Year',
        name: 'New Year',
        countryCode: 'BY',
        fixed: true,
        global: true,
        counties: null,
        launchYear: null,
        types: [],
      }

      const shortenedData = {
        date: '2023-01-01',
        localName: 'New Year',
        name: 'New Year',
      }

      expect(shortenPublicHoliday({ ...publicHolidayParams })).toEqual(shortenedData);
    });
  });
});