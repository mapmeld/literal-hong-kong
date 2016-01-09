var fs = require('fs');

var literalKanji = require('literal-kanji');
var cheerio = require('cheerio');

var svg = fs.readFileSync('original.svg', 'utf8');
var $ = cheerio.load(svg);

var stationNames = $("text, tspan");
for (var s = 0; s < stationNames.length; s++) {
  var literal = literalKanji($(stationNames[s]).text());
  svg = svg.replace($(stationNames[s]).text(), literal);
}

fs.writeFile('literal.svg', svg, function (err) {
  if (err) {
    throw err;
  }

  console.log('saved literal map');
});
