/* eslint-disable @typescript-eslint/no-explicit-any */
import { Command } from 'commander';
import { getBalances } from './app';
// import { json2CSV } from './utils';
// import { createGoogleSpreadsheet } from './app';

let balances: any;

try {
  const program = new Command();
  program.option(
    '-a, --address',
    'Enter an account address',
    '0xfd352a65f6b7e0f4e16bb76e2a97f3a565445d99',
  );

  program.parse(process.argv);

  const options = program.opts();
  if (!options.address) process.exit(0);

  getBalances(options.address).then((result: any) => {
    balances = JSON.stringify(result);
    console.log({ balances });
  });

  // Create CSV file
  // .then(() => {
  //   console.log({ balances, address: options.address });
  //   json2CSV(balances, options.address);
  // });

  // Create a Google Spreadsheet
  //   createGoogleSpreadsheet('A2', 'A3', balances).then((gsResult: any) => {
  //     console.log(gsResult);
  //   });
} catch (e) {
  console.error(e);
}
