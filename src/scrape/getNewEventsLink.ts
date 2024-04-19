import axios from "axios";
import * as cheerio from 'cheerio';
import {getEventLinks} from "./getEventLink";


export async function getNewEventsLink() {
    const eventLinks = [];
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

