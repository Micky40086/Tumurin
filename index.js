const puppeteer = require('puppeteer');
const fs = require('fs');
const albumUrl = process.argv[2];

(async () => {
  // const browser = await puppeteer.launch({headless: false, slowMo: 1000, defaultViewport: null})
  const browser = await puppeteer.launch({slowMo: 1000, defaultViewport: null})
  const page = await browser.newPage()

  // process.on("unhandledRejection", (reason, p) => {
  //   console.error("Unhandled Rejection at: Promise", p, "reason:", reason)
  //   browser.close()
  // })

  // page.on('console', consoleObj => console.log(consoleObj.text()))
  
  await page.goto(albumUrl)

  await page.evaluate(_ => {
    let tmpHeight = window.innerHeight
    window.scrollBy(0, tmpHeight)
  })

  await page.evaluate(_ => {
    const feedbackElement = document.getElementById("album_feedback_pagelet")
    feedbackElement && feedbackElement.remove()
  })

  let resultArr = []
  const imgs = await page.$$('#content_container a > img')

  await imgs[0].click()

  for (let i = 0; i < imgs.length; i++) {
    const elUrl = await page.evaluate(_ => {
      return document.querySelector(".spotlight").getAttribute("src")
    })
    resultArr.push(elUrl)

    await page.evaluate(_ => {
      document.querySelector("a.next").click()
    })
  }

  await browser.close()

  const outputStr = resultArr.map(function(x) {
    return x + `\n`
  }).join("")

  fs.writeFile('ImageUrls', outputStr, function(err) {
    console.log(err)
  })
})()
