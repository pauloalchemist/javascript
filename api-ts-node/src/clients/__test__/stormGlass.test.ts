import { StormGlass } from '@src/clients/stormglass'

describe('StormGlass client', () => {
  it('Should return the normalized forecast from the StormGlass service', async () => {
    const lat = -12.255232
    const lng = -38.9545984

    const stormGlass = new StormGlass()
    const response = await stormGlass.fetchPoints(lat, lng)
    expect(response).toEqual({})
  })
})
