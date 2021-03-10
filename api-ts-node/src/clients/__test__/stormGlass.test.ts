import { StormGlass } from '@src/clients/stormglass'
import axios from 'axios'
import * as stormGlassWeatherPointFixture from '@test/fixtures/stormglass_weather_3_hours.json'
import stormGlassNormalized3HoursFixture from '@test/fixtures/stormglass_normalized_response_3_hours.json'

jest.mock('axios')

describe('StormGlass client', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  it('Should return the normalized forecast from the StormGlass service', async () => {
    const lat = -12.9249836
    const lng = -38.345232

    mockedAxios.get.mockResolvedValue({ data: stormGlassWeatherPointFixture })

    const stormGlass = new StormGlass(mockedAxios)
    const response = await stormGlass.fetchPoints(lat, lng)
    expect(response).toEqual(stormGlassNormalized3HoursFixture)
  })
})
