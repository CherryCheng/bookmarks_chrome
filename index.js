let fs = require('fs')
let array = require('./array')
let array_html = '';

for (const key of Object.keys(array)) {
    let str = '';
    array[key].forEach(m => {
        str += `\t<a target="_blank" href="${m.HREF}"><img src="${m.ICON}">${m.TITLE}</a>\n`
    })
    array_html += `<fieldset><legend>${key}</legend>\n${str}</fieldset>\n`
}

let html = `

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
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

${array_html}

</body>
</html>

`;
fs.writeFile(`./index.html`, html, { flag: 'w', encoding: 'utf-8', mode: '0666' })