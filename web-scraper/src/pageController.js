const pageScraper = require('./pageScraper')

async function scrapeAll (browserInstance) {
  try {
    const browser = await browserInstance
    await pageScraper.scraper(browser)
  } catch (error) {
    console.log('Não foi possível determinar a instâncis do browser', error)
  }
}

module.exports = browserInstance => scrapeAll(browserInstance)
