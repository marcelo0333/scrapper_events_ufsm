import axios from "axios";
import * as cheerio from 'cheerio';


const url = `https://www.ufsm.br/busca?page=2&q&area=eventos`

async function getEventData(){
    const text = await axios.get(url).then(r => r.data);

    const productData = [];

    const $ = cheerio.load(text);
    $('main > div > div').each((index, element) => {
        const title = $(element).find('h2').text();
        const description = $(element).find('p').text();

        productData.push({
            title,
            description
        });
    });
    console.log(productData);
}

getEventData();