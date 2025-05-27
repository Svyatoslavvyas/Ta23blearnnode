import axios from "axios";
import * as cheerio from 'cheerio';
import fs from 'fs/promises'; 

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function cacheGet(name) {
    try {
        const data = await fs.readFile(`cache/${name}.html`, 'utf8');
        return data;
    } catch {
        return false;
    }
}

async function cacheSet(name, data) {
    await fs.writeFile(`cache/${name}.html`, data);
}

async function main() {
    try {
        await fs.mkdir('cache');  
    } catch {}

    for (let i = 3088; i > 3078; i--) {
        let data = await cacheGet(i);
        if (!data) {
            await sleep(1000);
            console.log(`!!! live data for comic #${i}`);
            const res = await axios.get(`https://xkcd.com/${i}/`);
            data = res.data;
            await cacheSet(i, data);
        }

        const $ = cheerio.load(data);
        const src = $('#comic img').attr('src');
        const title = $('#comic img').attr('alt');
        const text = $('#comic img').attr('title');

        console.log(src, title, text);
    }
}

main();
