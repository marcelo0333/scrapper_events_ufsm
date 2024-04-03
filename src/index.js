import axios from "axios";
import * as cheerio from 'cheerio';

async function getEventLinks() {
    const eventLinks = [];

    for (let page = 1; page <= 1; page++) {
        const url = `https://www.ufsm.br/busca?page=${page}&q&area=eventos`;
        const text = await axios.get(url).then(r => r.data);
        const $ = cheerio.load(text);
        
        $('#arch-main-section > div:nth-child(5) > ul > li > div > div.col-lg-10.info-busca-lista').each((index, element) =>{
            const link = $(element).find('a').attr('href');
            if (link) {
                eventLinks.push(link);
                console.log(link)
            }
        });
    }
        
    return eventLinks;
}

async function getEventData() {
    const eventLinks = await getEventLinks();
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

            eventData.push({
                img,
                title,
                tag,
                campus,
                data
            });
        });
    }

    console.log(eventData); 
}

getEventData();
