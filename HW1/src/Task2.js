var fs = require('fs');
var { pipeline } = require('stream');
var csv = require('csvtojson');

var readFilePath = 'csv/HW1-file.csv';
var writeFilePath = 'src/books.txt';

pipeline(
  fs.createReadStream(readFilePath, 'utf-8'),
  csv({ignoreColumns: /amount/ig}),
  fs.createWriteStream(writeFilePath),
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
)