#!/bin/sh
read -p "Please input dir name: " dirname
read -p "Please input album url: " url

node index.js $url
mkdir $dirname
cd $dirname
wget -i ../ImageUrls