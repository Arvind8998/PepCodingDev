const request = require("request")
const cheerio = require("cheerio")
const fs = require("fs")


let finalData = []
request("https://www.github.com/topics", callback)

function callback(err, res, html) {
  if (!err) {
    fs.writeFileSync("githubTopics.html", html)
    let $ = cheerio.load(html)
    let divs = $(".no-underline.d-flex.flex-column.flex-justify-center")
    for (let i = 0; i < divs.length; i++) {
      let projectName = $($(divs[i]).find("p")[0]).text().split(" ")[8].split("\n")[0];
      let projectUrl = "https://www.github.com" + $(divs[i]).attr("href")
      finalData.push({
        projectName: projectName,
        projectUrl: projectUrl,
        gitRepos: [],
      })
      request(projectUrl, getRepositories.bind(this, i))
    }
  }
}

let repoArray = []
let totalRepos = 0

function getRepositories(finalDataIdx, err, res, html) {
  if (!err) {
    repoArray = []
    let $ = cheerio.load(html)
    let repoLinks = $("a.text-bold")
    totalRepos += repoLinks.length > 0 ? 8 : repoLinks.length
    for (let i = 0; i < repoLinks.length && i < 8; i++) {
      let repoName = $(repoLinks[i]).text()
      let repoUrl = "https://www.github.com" + $(repoLinks[i]).attr("href")
      finalData[finalDataIdx]["gitRepos"].push({
        "repoName": repoName,
        "repoUrl": repoUrl,
        "issues": [],
      })
      request(repoUrl + "/issues", getIssues.bind(this, finalDataIdx, i))
    }
  }
}

let count = 0;
function getIssues(finalDataIdx,repoIdx,err,res,html) {
    if(!err) {
        count++;
        let $ = cheerio.load(html);
        let issueLinks = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
        console.log("Number of issues " + issueLinks.length);
        for(let i = 0; i < issueLinks.length && i < 8; i++) {
            let issueUrl = "https://www.github.com" + $(issueLinks[i]).attr("href");
            let issueName = $(issueLinks[i]).text();
            finalData[finalDataIdx]["gitRepos"][repoIdx]["issues"].push({
                "issueName": issueName,
                "issueUrl": issueUrl
            });
        }
        if(count == totalRepos) {
            fs.writeFileSync("finalGit.json", JSON.stringify(finalData));
        }
    }
}
