const puppeteer = require("puppeteer");
const axios = require("axios");

describe("Ayanfe Bot E2E Tests", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:5000/frontend/src/login.html");
  });

  afterAll(async () => {
    await browser.close();
  });

  test("User can login and chat", async () => {
    // Login test
    await page.type("#email", "testuser@example.com");
    await page.type("#password", "securepassword");
    await page.click("button[type='submit']");

    // Wait for chat interface
    await page.waitForNavigation();
    expect(await page.url()).toContain("chat.html");

    // Chat test
    const chatInput = await page.$("#chatInput");
    await chatInput.type("What time is it?");
    const sendButton = await page.$("button[type='submit']");
    await sendButton.click();

    const response = await page.waitForSelector("#chatWindow div:nth-child(2)");
    const textContent = await response.evaluate((el) => el.textContent);
    expect(textContent).toContain("The current date and time is");
  });

  test("API responds correctly", async () => {
    const response = await axios.post("http://localhost:5000/chat/respond", {
      message: "What time is it?",
      userId: "example_user_id",
    });
    expect(response.data.reply).toContain("The current date and time is");
  });
});
