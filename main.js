const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

var name = [];
var cont = 50;
var permiter = true;

if(permiter){
  request('https://myanimelist.net/topanime.php',(err,res,body)=>{
      if (err) {console.log('Erro' + err)};

      const $ = cheerio.load(body);
      
      $('.ranking-list').each(function(){ 
        name +=  ',' + $(this).find('.di-ib a').html();
        permiter = false;
      });
      //name = name.substr(1)
      //fs.appendFileSync('myanimelist.txt', name + '\n');
      
  });

}

if(cont < 100) {
  request(`https://myanimelist.net/topanime.php?limit=${cont}`,(err,res,body)=>{
      if (err) {console.log('Erro' + err)};

      const $ = cheerio.load(body);
      
      $('.ranking-list').each(function(){ 
        name +=  ',' + $(this).find('.di-ib a').html();
        permiter = false;
      });

      name = name.substr(1)
      fs.appendFileSync('myanimelist.txt', name + '\n');
    });
}

console.log(name);