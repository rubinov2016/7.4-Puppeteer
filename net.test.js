const puppeteer = require("puppeteer");
let page;

afterEach(() => {
  page.close();
}, 60000);


describe("Netology.ru tests", () => {

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://netology.ru");
  }, 60000);

  test("The first test'", async () => {
    const title = await page.title();
    console.log("Page title: " + title);
    const firstLink = await page.$("header a + a");
    // const firstLinkText = await page.$eval(
    //   "header a + a",
    //   (link) => link.textContent
    // );
    await firstLink.click();
    await page.waitForNavigation();
    const title2 = await page.title();
    console.log("Page title: " + title2);
    const pageList = await browser.newPage();
    await pageList.goto("https://netology.ru/navigation");
    await pageList.waitForSelector("h1");
  }, 60000);

  test("The first link text 'Медиа Нетологии'", async () => {
    const actual = await page.$eval("header a + a", (link) => link.textContent);
    expect(actual).toContain("Медиа Нетологии");
  },60000);

  test("The first link leads on 'Медиа' page", async () => {
    await page.click("header a + a");
    await page.waitForSelector(".logo__media", {
      visible: true,
    });
    const actual = await page.$eval(".logo__media", (link) => link.textContent);
    expect(actual).toContain("Медиа");
  },60000);
});

test("The second test'", async () => {
  page = await browser.newPage();
  await page.goto("https://netology.ru/job");
  const title = await page.title();
  expect(title).toContain("Вакансии в Нетологии – найти работу");
}, 60000);

test("The third test'", async () => {
  page = await browser.newPage();
  await page.goto("https://netology.ru/experts");
  const title = await page.title();
  expect(title).toContain("Станьте экспертом Нетологии – присоединиться к команде");
}, 60000);

test("The fourth test'", async () => {
  page = await browser.newPage();
  await page.goto("https://netology.ru/partners");
  const title = await page.title();
  expect(title).toContain("Партнерская программа и информационная поддержка");
}, 60000);


