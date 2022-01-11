const puppeteer = require('puppeteer');
const config = require("./config.json");
var player = require('play-sound')(opts = {})



const base_url = "https://scaligera.myprenota.it/tamponi";
const calculateButtonForTheLocation = () => { 
    if(config.luogo == "San Camillo")
        return 4;
    if(config.luogo == "Legnago")
        return 5;
    if(config.luogo == "San Bonifacio")
        return 9;
}
const luogoSelezionato = calculateButtonForTheLocation();


const main = async () => {
    console.table(config);
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
    // await page.goto(base_url);
    // await page.setViewport({
    //     width: 1920,
    //     height: 1800,
    // });

    loopFetch(page,false);

    
    
    
    
    

    

}

const loopFetch = async (page,sleep) => {
    await page.goto(base_url);
    if(sleep)
        await page.waitForTimeout(10000);
    while(true){
        await page.waitForXPath(`/html/body/div/form/div[2]/button[${luogoSelezionato}]`);
        await page.click(`#corpo1 > button:nth-child(${luogoSelezionato+1})`);
        await page.waitForSelector(`td[data-date="2022-${config.dataPrenotazione}"]`)
        await page.waitForTimeout(5000)
        
        const result = await page.evaluate((config) => {
            
            let data = document.querySelector(`td[data-date="2022-${config.dataPrenotazione}"]`).querySelector(".fc-daygrid-day-events").innerText;
            if(data != ''){
                console.log(data);
                return true;
            }
            return false;
        }, config)
        
        if(result){
            dateAvailable(page);
            break;
        }
        await page.goBack();
        await page.goForward();
    }
}

const dateAvailable = async (page) => {
    //Date available
    await page.click(`td[data-date="2022-${config.dataPrenotazione}"]`);
    await page.waitForTimeout(1000)

    const availableSlotPerHours = await page.evaluateHandle((config) => {
        let startHourFromConfig = config.fasciaOrariaInizio;
        let endHourFromConfig = config.fasciaOrariaFine;
                    
        let data = document.querySelectorAll('button[onclick^="act_step(4"]');
        if(data != null){
            for(hourSlot of data){
                let startHour = parseInt(hourSlot.innerText.split("-")[0].substring(0,2));
                if(startHour >= startHourFromConfig && startHour <= endHourFromConfig){
                    return hourSlot;
                }
            }
            
        }
        return false;
    }, config)

    if(availableSlotPerHours){
        const elementToClick = await page.evaluate(els => els.innerHTML, availableSlotPerHours);
        // console.log(elementToClick); // it will log the string 'Example Domain'
        const [button] = await page.$x(`//button[contains(., '${elementToClick}')]`);
        if (button) {
            await button.click();
            await page.waitForTimeout(1000);
            await page.$eval('input[name=cod_fiscale]', (el, value) => el.value = value, config.CF);
            await page.$eval('input[name=cognome]', (el, value) => el.value = value, config.cognome);
            await page.$eval('input[name=nome]', (el, value) => el.value = value, config.nome);
            await page.$eval('input[name=email]', (el, value) => el.value = value, config.email);
            await page.$eval('input[name=c_email]', (el, value) => el.value = value, config.email);
            await page.$eval('input[name=cellulare]', (el, value) => el.value = value, config.telefono);
            if(config.autoConfirm){
                //Conferma la richiesta
                await page.click(`#bottoneconferma`);
                player.play('alarm.mp3', function(err){
                    if (err) throw err
                  })
            } else {
                //Avvia audio
                player.play('alarm2.mp3', function(err){
                    if (err) throw err
                  })
            }
        } else {
            console.log("Slot orario richiesto non disponibile");
            loopFetch(page,true);
        }
    }
}




main();
