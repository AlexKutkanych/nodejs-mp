import fs from 'fs';
import { pipeline } from 'stream';
import csv from 'csvtojson';

const readFilePath = 'csv/HW1-file.csv';
const writeFilePath = 'HW1/books.txt';

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