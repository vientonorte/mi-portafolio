// scripts/axe-ci.js
// Ejecuta axe-core sobre http://localhost:5173 y guarda el reporte
const { chromium } = require('playwright');
const fs = require('fs');
const { source: axeSource } = require('axe-core');

(async() => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
    await page.addScriptTag({ content: axeSource });
    const results = await page.evaluate(async() => {
        return await window.axe.run();
    });
    fs.writeFileSync('axe-report.json', JSON.stringify(results, null, 2));
    console.log('axe-core report saved as axe-report.json');
    await browser.close();
})();