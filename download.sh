#!/bin/sh
read -p "Please input dir name: " dirname
read -p "Please input album url: " url

node index.js $url
mkdir $dirname
wget -i ../ImageUrls -P $dirname