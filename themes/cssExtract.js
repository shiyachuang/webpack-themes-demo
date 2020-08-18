

const DISTPATH = './build/index.html'
const cheerio = require('cheerio')
const fs = require('fs')
const chalk = require('chalk')
const prefix = ['defaultTheme', 'redTheme', 'purpleTheme', 'yellowTheme', 'orangeTheme', 'blueTheme','cyanTheme', 
'blueGreyTheme','greenTheme' , 'lightGreenTheme', 'skyTheme', 'wineRedTheme']

async function extractCss(fn) {
    fs.readdir('./build/css/', {}, (err, data) => {
        if (err) {
            throw err
        }
        const cssUrls = {}
        prefix.forEach(theme => {
            cssUrls[theme] = data.filter(i => i.includes(theme))[0]
        });
        console.log(cssUrls);
        fs.readFile(DISTPATH, 'utf8', (err, data) => {
            if (err) {
                throw err
            }
            const $ = cheerio.load(data)
            $('head').append(`<script>window.cssUrls=${JSON.stringify(cssUrls)}</script>`)
            fs.writeFile(DISTPATH, $.html(), err => {
                if (err) {
                    throw err
                }
                console.log(chalk.cyan('extract css url complete.\n'))
                fn && fn()
            })
        })
    })
}
extractCss()

// module.exports = extractCss



