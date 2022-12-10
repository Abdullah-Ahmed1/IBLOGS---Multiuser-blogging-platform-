const puppeteer = require("puppeteer");
const h2p = require("html2plaintext");
const fs = require("fs/promises");
const unirest = require("unirest");
const cheerio = require("cheerio");

module.exports = {
  start: async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://en.wikipedia.org/wiki/Long_short-term_memory");

    // const html = await page.content();

    const data = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("p")).map((x) => x.innerText);
    });

    // console.log(
    //   typeof data[16],
    //   data.map((item) => {
    //     // item.replace("�\n", "")
    //     typeof item;
    //   })
    // );
    await fs.writeFile("scrap.txt", data.join("\r\n"));
    console.log(data);
  },

  getOrganicData: async () => {
    return unirest
      .get("https://www.google.com/search?q=imran+khan+actor&gl=us&hl=en")
      .headers({
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
      })
      .then(async (response) => {
        let $ = cheerio.load(response.body);

        let titles = [];
        let links = [];
        let snippets = [];
        let displayedLinks = [];

        $(".yuRUbf > a > h3").each((i, el) => {
          titles[i] = $(el).text();
        });
        $(".yuRUbf > a").each((i, el) => {
          links[i] = $(el).attr("href");
        });
        $(".g .VwiC3b ").each((i, el) => {
          snippets[i] = $(el).text();
        });
        $(".g .yuRUbf .NJjxre .tjvcx").each((i, el) => {
          displayedLinks[i] = $(el).text();
        });

        const organicResults = [];

        for (let i = 0; i < titles.length; i++) {
          organicResults[i] = {
            title: titles[i],
            links: links[i],
            snippet: snippets[i],
            displayedLink: displayedLinks[i],
          };
        }
        // console.log(organicResults[0], organicResults[1]);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(organicResults[0].links);

        // const html = await page.content();

        const data = await page.evaluate(() => {
          return Array.from(document.querySelectorAll("p")).map(
            (x) => x.innerText
          );
        });

        console.log(data);
      });
  },
};
