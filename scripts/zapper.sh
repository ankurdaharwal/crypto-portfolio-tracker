#!/bin/bash

while getopts a: option
do
 case "${option}"
 in
 a) ADDRESS=${OPTARG};;
 esac
done

echo "Generating Portfolio for:"$ADDRESS

curl --location -g --request GET 'https://api.zapper.fi/v1/balances?addresses[]='$ADDRESS'&api_key=96e0cc51-a62e-42ca-acee-910ea7d2a241' | sed -e 's/event: start//g' | sed -e 's/data: /,/g' | sed -e 's/event: balance//g' | sed -e 's/,start//g' | sed -e 's/event: end//g' | sed -e 's/,end/]/g' | tr -d '\n' | sed '1s/^./[/' > $ADDRESS.json