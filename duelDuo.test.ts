
import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://localhost:4000/')
})

afterAll(async () => {
    driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    expect(displayed).toBe(true)
})

test('Clicking the Draw button displays the div with id = “choices”', async () => {
    const drawBtn = await driver.findElement(By.id('draw-btn'))
    drawBtn.click()
    await driver.sleep(500)
    const choicesDiv = await driver.findElement(By.id('choices'))
    const displayed = await choicesDiv.isDisplayed()
    expect(displayed).toBe(true)
})

test('Clicking an “Add to Duo” button displays the div with id = “player-duo”', async () => {
    const addToDuoBtn = await driver.findElement(By.id('choices')).findElement(By.className('add-to-duo'))
    addToDuoBtn.click()
    await driver.sleep(500)
    const playerDuoDiv = await driver.findElement(By.id('player-duo'))
    const displayed = await playerDuoDiv.isDisplayed()
    expect(displayed).toBe(true)
})
