const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

request("https://github.com/topics",callback);

function callback(err,res,html) {
    if(!err) {
        fs.writeFileSync("githubTopics.html",html);
        let $ = cheerio.load(html);
        let topics = $(".no-underline.d-flex.flex-column.flex-justify-center"); 
        for(let i=0; i<topics.length; i++){
            let topicUrl = $(topics[i]).attr("href");
            console.log("https://github.com"+topicUrl)
        }

    }
}
