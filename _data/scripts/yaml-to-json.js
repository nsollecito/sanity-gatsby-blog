const inputYML = '../../../corp-hugo/site/data/en/offices.yaml';
const outputJSON = 'output.json';
const yaml = require('js-yaml');
const fs = require('fs');
const obj = yaml.load(fs.readFileSync(inputYML, {encoding: 'utf-8'}));
const key = Object.keys(obj)[0];

obj[key].map( e => {
    e._type = 'office';
    e.name = e.city;
    e.post_code = e.post_code.toString();
    if (e.headquarter) {
        e.headquarter.desktop_image = {
            '_type': 'mainImage',
            '_sanityAsset': `image@file:///Users/nick.sollecito/Documents/projects/corp-hugo/site/static/img/contact/${e.headquarter.desktop_image}`
        };
        e.headquarter.mobile_image = {
            '_type': 'image',
            '_sanityAsset': `image@file:///Users/nick.sollecito/Documents/projects/corp-hugo/site/static/img/contact/${e.headquarter.mobile_image}`
        };
        // console.log(e.headquarter);
    }
    for (v in e) {
        e[v] = (e[v] === null) ? "" : e[v];
    }
});

let ndjson = obj[key].map(JSON.stringify).join('\n');

//this code if you want to save file locally
fs.writeFileSync(outputJSON, ndjson);