const puppeteer = require('puppeteer')

async function startBrowser () {
  try {
    console.log('Abrindo o navegador ......')
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--disable-setuid-sandbox'],
      ignoreHTTPSErrors: false
    })
    return browser
  } catch (error) {
    console.log('Não foi possível instanciar o browser.', error)
  }
}

module.exports = {
  startBrowser
}
