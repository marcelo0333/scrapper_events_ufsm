import axios from "axios";
import * as cheerio from 'cheerio';


async function getNewEventsLink() {
    const eventLinks = [];
    let page = 1;
    let hasEvents = true;

/*     while (hasEvents) {
 */    
        const url = `https://www.ufsm.br/eventos`;
        const text = await axios.get(url).then(r => r.data);
        const $ = cheerio.load(text);
        const events = $('#main-section > article > div > div > div').each((index, element) =>{
            const link = $(element).find('a').attr('href');
            if (link) {
                eventLinks.push(link);
                console.log(link)
            }
        });
        return eventLinks;

    }
/* }
 */


async function getNewEventData() {
    const eventLinks = await getNewEventsLink();
    const eventData = [];


    for (const url of eventLinks) {
        const text = await axios.get(url).then(r => r.data);
        const $ = cheerio.load(text);

        $('#main-section > article > article').each((index, element) => {
            const img = $(element).find('img.w-100').attr('src');
            const title = $(element).find('h1.entry-title').text().trim();
            const tag = $(element).find('span.badge').text().trim();
            const campus = $(element).find('p.m-0').text().trim();
            const data = $(element).find('p.mb-0').text().trim();
            const [dateInitial, dateFinal] = data.split(' - ');
            const imgDesc = $(element).find('img').attr('src');
            const desc = $(element).find('p').text().replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
            const contato = $(element).find('div:nth-child(2) > div.row.contato > div > div > p:nth-child(2)').text().replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
            const local = $(element).find(' div > div.row.localizacao > div > div').eq(0).text().replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();            
            const latitude = $(element).find('div:nth-child(2) > div.row.localizacao > div:nth-child(2) > div > div').attr('data-map-lat');
            const longitude = $(element).find('div:nth-child(2) > div.row.localizacao > div:nth-child(2) > div > div').attr('data-map-lng');

            eventData.push({
                img,
                title,
                tag,
                campus,
                dateInitial,
                dateFinal,
                imgDesc,
                desc,
                contato,
                local,
                latitude,
                longitude
            });
        });
    }
    console.log(eventData);
    return eventData;
}

getNewEventData();