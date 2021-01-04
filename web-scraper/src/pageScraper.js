const scraperObject = {
  url: 'https://amazon.com.br',
  async scraper (browser) {
    const page = await browser.newPage()
    console.log(`Navegando para ${this.url}...`)
    await page.goto(this.url)
  }
}

module.exports = scraperObject
