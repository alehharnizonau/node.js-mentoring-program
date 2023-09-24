import axios from "axios";
import request from 'supertest';
import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from "./public-holidays.service";
import { PUBLIC_HOLIDAYS_API_URL, SUPPORTED_COUNTRIES } from "../config";

describe('Public Holidays API', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const mockPublicHolidays = [
    {
      date: '2023-01-01',
      localName: 'New Year',
      name: 'New Year',
      countryCode: SUPPORTED_COUNTRIES[0],
      fixed: true,
      global: true,
      counties: null,
      launchYear: null,
      types: [],
    },
  ];

  const { date, localName, name, countryCode: country } = mockPublicHolidays[0];
  const year = 2023;

  describe('public-holidays.service unit tests', () => {
    describe('getListOfPublicHolidays', () => {
      it('should fetch public holidays in shortened format correctly', async () => {
        const mockShortenedData = [
          {
            date,
            localName,
            name,
          },
        ]
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: mockPublicHolidays }));

        const response = await getListOfPublicHolidays(year, country);

        expect(response).toEqual(mockShortenedData);
      });

      it('should return an empty array if there is some api error', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('API error')));

        const response = await getListOfPublicHolidays(year, country);

        expect(response).toEqual([]);
      });
    });

    describe('checkIfTodayIsPublicHoliday', () => {
      it('should return true for successfully fetched data', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 200 }));

        const response = await checkIfTodayIsPublicHoliday(country);

        expect(response).toBeTruthy();
      });

      it('should return false for some api error', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('API error')));

        const response = await checkIfTodayIsPublicHoliday(country);

        expect(response).toBeFalsy();
      });
    });

    describe('getNextPublicHolidays', () => {
      it('should fetch next public holidays in shortened format correctly', async () => {
        const mockNextPublicHolidays = [
          {
            ...mockPublicHolidays[0], date: '2023-11-30', localName: 'Saint Andrew\'s Day', name: 'Saint Andrew\'s Day'
          }
        ]
        const { date, localName, name } = mockNextPublicHolidays[0];
        const mockShortenedData = [
          {
            date,
            localName,
            name,
          },
        ];
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: mockNextPublicHolidays }));

        const response = await getNextPublicHolidays(country);

        expect(response).toEqual(mockShortenedData);
      });

      it('should return an empty array if there is some api error', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject(new Error('API error')));

        const response = await getNextPublicHolidays(country);

        expect(response).toEqual([]);
      });
    });
  });

  describe('public-holidays.service integration tests', () => {
    describe("getListOfPublicHolidays", () => {
      it("should return the array of public holidays for current year and concrete supported country", async () => {
        const result = await getListOfPublicHolidays(year, country);
        expect(result).toEqual(expect.any(Array));
      });
    });

    describe("checkIfTodayIsPublicHoliday", () => {
      it("should return boolean value if today is the holiday for concrete country", async () => {
        const result = await checkIfTodayIsPublicHoliday(country);
        expect(result).toEqual(expect.any(Boolean));
      });
    });

    describe("getNextPublicHolidays", () => {
      it("should return the array of next public holidays for current year and concrete supported country", async () => {
        const result = await getNextPublicHolidays(country);
        expect(result).toEqual(expect.any(Array));
      });
    });
  });

  describe('public-holidays.service e2e tests', () => {
    describe('getListOfPublicHolidays', () => {
      it('should fetch data correctly', async () => {
        const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(`/PublicHolidays/${year}/${country}`);

        expect(status).toEqual(200);
        body.forEach((holiday: any) => {
          expect(holiday).toEqual(expect.objectContaining({
            name: expect.any(String),
            localName: expect.any(String),
            date: expect.any(String),
            countryCode: expect.any(String),
            fixed: expect.any(Boolean),
            global: expect.any(Boolean),
            counties: expect.any(Object),
            types: expect.any(Array)
          }));
        });
      })
    });

    describe('checkIfTodayIsPublicHoliday', () => {
      it('should return true if today is a public holiday', async () => {
        const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(`/IsTodayPublicHoliday/${country}`);

        expect(status).toEqual(204);
      });
    })
  });
});