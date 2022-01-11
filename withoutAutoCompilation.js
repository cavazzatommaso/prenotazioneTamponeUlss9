const puppeteer = require('puppeteer');
var player = require('play-sound')(opts = {})



const base_url = "https://scaligera.myprenota.it/tamponi";


const fetchSoccerBets = async () => {
    console.log("Opening Browser");
    const browser = await puppeteer.launch({
        defaultViewport: null,
        executablePath: process.env.chrome,
        headless: false,
        ignoreDefaultArgs: ["--disable-extensions", "--enable-automation"]
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36');
    console.log("Loading " + base_url + " website");
    await page.goto(base_url);
    await page.setViewport({
        width: 1920,
        height: 1800,
    });

    // /html/body/div/form/div[2]/button[5]
    await page.waitForXPath('/html/body/div/form/div[2]/button[9]');
    



    while(true){
        await page.waitForTimeout(2000)
        //#corpo1 > button:nth-child(6)
        await page.click('#corpo1 > button:nth-child(10)');
        await page.waitForTimeout(2000)
        
        const result = await page.evaluate(() => {
            
            let data = document.querySelector(`td[data-date="2022-01-11"]`).querySelector(".fc-daygrid-day-events").innerText;
            if(data != ''){
                console.log(data);
                return true;
            }
            return false;
        })
        
        console.log(result);
        if(result)
        break;
        await page.goBack();
        await page.goForward();
    }

    player.play('alarm2.mp3', function(err){
        if (err) throw err
      })

    // console.log("Closing the browser");
    // await browser.close();
}



fetchSoccerBets();
