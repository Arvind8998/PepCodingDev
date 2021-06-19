const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

request("https://www.espncricinfo.com/series/the-marsh-cup-2020-21-1244113/victoria-vs-south-australia-14th-match-1244137/full-scorecard",callback);

function callback(err,res,html) {
    if(!err) {
        fs.writeFileSync("playerofMatch.html",html);
        let $ = cheerio.load(html);
        let playerofMatch = $(".best-player-name"); 
        console.log(playerofMatch.text());
    }
}
