// npm install --save base64-to-image

let base64ToImage = require('base64-to-image');
let fs = require('fs');

let export_array = require('./export_array');
let array = require('./array');

let path = './icon/';
let imgType = 'png';

let strArr = [];


export_array.forEach(m => strArr.push({
    icon: m.ICON,
    name: m.NAME,
    href: m.HREF,
    title: m.TITLE,
    klass: m.KLASS
}))

strArr.forEach(o => {
    try {
        base64ToImage(o.icon, path, {
            type: imgType,
            fileName: o.name
        });
        o.icon = path + o.name + "." + imgType;
    } catch (error) {
        o.icon = path + "link." + imgType;
    }
});

strArr = strArr.concat(array);


const sortFrom = ["smzc", "github", "gitbook", "ng", "rxjs", "vue", "miniprogram", "git", "tool", "lib", "other"];

strArr.sort((a, b) => sortFrom.indexOf(a.klass) - sortFrom.indexOf(b.klass));


fs.writeFile(`./array.js`, 'module.exports = array = ' + JSON.stringify(strArr), {
    flag: 'w',
    encoding: 'utf-8',
    mode: '0666'
})

let groupHtml = '';

const groupBy = require('./groupBy');

const groupObj = groupBy(strArr, 'klass');

for (const klass in groupObj) {
    if (groupObj.hasOwnProperty(klass)) {
        let nodeHtml = '';
        groupObj[klass].forEach(o => {
            nodeHtml += `\t<a target="_blank" href="${o.href}"><img src="${o.icon}">${o.title}</a>\n`
        })
        groupHtml += `<fieldset><legend>${klass}</legend>\n${nodeHtml}</fieldset>\n`;
    }
}

let document = `

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="shortcut icon" href="./s.png" type="image/x-icon"/>
    <title> book_marker </title>
    <style>
        body {
            padding: 20px
        }
        a {
            padding: 5px;
            display: inline-flex;
            color: #666;
            font-size: 14px;
            align-items: center;
            width: 20em;
        }

        a img {
            margin-right: 5px;
            height: 16px;
            width: 16px
        }

        fieldset {
            border: 1px dashed #79a5e8;
            opacity: 0.4;
            transition: ease all 0.2s;
            margin-bottom: 10px
        }

        fieldset:hover {
            opacity: 1;
            transform: scale(1.01);
            box-shadow: 5px 5px 5px #bbb;
        }
        legend {font-weight: bold;}
    </style>
</head>
<body>

${groupHtml}

</body>
</html>
`;
fs.writeFile(`./index.html`, document, {
    flag: 'w',
    encoding: 'utf-8',
    mode: '0666'
})