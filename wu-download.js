const rp = require('request-promise');
const fs = require("fs");
const async = require('async');
const striptags = require('striptags');
const removeEmptyLines = require("remove-blank-lines");
const makeDir = require('make-dir');

// CMD format "node wu-download stationID YYYY MM D N" where YYY MM D is the start date of data you want, and N is the number of days you want.
// eg. "node wu-download IDRIFF4 2019 12 17 5" gets data for 5 days from Dec 17 2019 from the station IDRIFF4.
// The WU API accepts dates such as 2019-12-40 to be the same as 2020-01-09
var stationID = process.argv[2];
var year = parseInt(process.argv[3]);
var month = parseInt(process.argv[4]);
var dayStart = parseInt(process.argv[5]);
var numberOfDays = parseInt(process.argv[6]);

var file = "WU-Weather " + stationID + " " + year + "-" + month + "-" + dayStart + ".csv";

(async () => {
    const path = await makeDir('results');
})();

function buildURL(day) {
  var sourceURL = "https://www.wunderground.com/weatherstation/WXDailyHistory.asp?ID=" + stationID +"&graphspan=day&month=" + month + "&day=" + day + "&year=" + year + "&format=1"
  return sourceURL;
}

async function saveData(url, day) {
  options = {
      uri: url,
      headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36'
      }
  }
  await rp(options)
      .then(function (htmlString) {
        csvData = removeEmptyLines(striptags(htmlString));
        fs.appendFile('results/' + file, csvData, (err) => {
            if (err) throw err;
            console.log('Added data for day ' + day + ' to file: ' + file);
            return;
        });
      })
      .catch(function (err) {
          console.log('error', err);
      });
}

(async function main(){
  for (var i = dayStart; i < dayStart + numberOfDays; i++) {
    sourceURL = await buildURL(i);
    await saveData(sourceURL, i);
  };
})();
