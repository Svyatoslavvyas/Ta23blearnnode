import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import md5 from "md5";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

if (!fs.existsSync('cache')) {
    fs.mkdirSync('cache');
}

const cacheGet = name => {
    const path = `cache/${name}.html`;
    if (fs.existsSync(path)) {
        return fs.readFileSync(path, 'utf8');
    }
    return false;
}

const cacheSet = (name, data) => {
    fs.writeFileSync(`cache/${name}.html`, data, 'utf8');
}

async function main() {
    let url = 'https://wumo.com/wumo';
    for (let i = 0; i < 10; i++) {
        const hash = md5(url);
        let data = cacheGet(hash);
        if (!data) {
            console.log(`Fetching ${url}`);
            const res = await axios.get(url);
            data = res.data;
            cacheSet(hash, data);
            await sleep(1000);
        } else {
            console.log(`Using cached data for ${url}`);
        }
        const $ = cheerio.load(data);

        let img = $('article.wumo .box-content img').attr('src');
        let alt = $('article.wumo .box-content img').attr('alt');
        console.log(img, alt);

        let prev = $('a.prev').attr('href');
        if (!prev) break;
        url = 'https://wumo.com' + prev;
    }
}

main();
