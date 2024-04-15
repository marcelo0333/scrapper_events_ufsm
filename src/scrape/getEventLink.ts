import axios from "axios";
import * as cheerio from "cheerio";
import * as url from "url";

export async function getEventLinks(): Promise<any[]> {
    const eventLinks = [];

    for (let page = 1; page <= 1; page++) {
        const url = `https://www.ufsm.br/busca?page=1&q&area=eventos`;
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
