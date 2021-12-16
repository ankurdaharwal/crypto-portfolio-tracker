/* eslint-disable @typescript-eslint/no-explicit-any */
// require json-2-csv module
import converter from 'json-2-csv';
import fs from 'fs';

// convert JSON array to CSV string
export function json2CSV(data: any, fileName: string) {
  try {
    converter?.json2csv(data, (err, csv) => {
      if (err) {
        throw err;
      }

      // print CSV string
      console.log(csv);

      // write CSV to a file
      fs.writeFileSync(`${fileName}.csv`, csv);
    });
  } catch (e) {
    console.error(e);
  }
}
