const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const helpers = require('./lib/helpers');

app
    .use(bodyParser.json())
    .get('/data', (req, res) => {
        const data = {};
        let specData = {};
        let mathData = {};
        try {
            specData = fs.readFileSync('./specs/spec.txt');
            specData = specData.toString();
            specData = JSON.parse(specData);
            const freeSpace = helpers.calculateFreeSpace(specData);
            mathData.freeSpace = freeSpace;

            helpers.checkIntersections(specData);

            const hasErrors = helpers.detectIfHasErrors(specData);
            mathData.hasErrors = hasErrors;
        } catch (e) {
            console.log('Error: ' + e.stack);
        }

        data.specData = specData;
        data.mathData = mathData;
        res.json(data);
    });

module.exports = app;
