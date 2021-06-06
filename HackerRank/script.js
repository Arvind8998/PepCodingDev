const puppy = require("puppeteer");

const id = "jiwocey357@0pppp.com";
const password = "temp@123";

async function main(){
    let browser = await puppy.launch({
        headless: false,
        defaultViewport: false
    });

    let tabs = await browser.pages();
    let tab = tabs[0];
    await tab.goto('https://www.hackerrank.com/auth/login');
    await tab.type('#input-1',id);
    await tab.type('#input-2',password);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    // await tab.waitFor()
    // await tab.click
    // await tab.waitFor()
    // await tab.click
}

main()


