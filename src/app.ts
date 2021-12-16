/* eslint-disable @typescript-eslint/no-explicit-any */
import https = require('https');
import * as dotenv from 'dotenv';

dotenv.config();

export function getBalances(address: any) {
  const url = `https://api.zapper.fi/v1/balances?api_key=${process.env.ZAPPER_API}&addresses[]=${address}`;
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        const reg = /event: balance\ndata: /gi;
        const resJson = body
          .toString()
          .trim()
          .replace('event: start\ndata: start\n\nevent: balance\ndata: ', '[')
          .replace(reg, ',')
          .replace('event: end\ndata: end', ']');
        if (resJson.length > 0) {
          resolve(JSON.parse(resJson));
        } else {
          reject(resJson);
        }
      });
    });
  });
}

export function createGoogleSpreadsheet(
  rangeStart: any,
  rangeEnd: any,
  balances: any,
) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/${rangeStart}}%3A${rangeEnd}?includeValuesInResponse=true&valueInputOption=RAW&key=${process.env.GOOGLE_API}`;
  return new Promise((resolve, reject) => {
    https.request(url, balances, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        resolve(body);
      });
      res.on('error', (err) => reject(err));
    });
  });
}
