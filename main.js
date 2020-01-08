const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const list = require('./database')

var name = [];
var cont;

for (let index = 0; index < 2; index++) {

  if(index == 0){
    request('https://myanimelist.net/topanime.php',(err,res,body)=>{
        if (err) {console.log('Erro' + err)};
  
        const $ = cheerio.load(body);
        
        $('.ranking-list').each(function(){
          var data = $(this).find('.di-ib a').html();
          var star = $(this).find('.di-ib span').html();
          name.push('{ "Title": "' + data + '","Score":'+ star +'}');
        });
    });
  
  }else{
    cont = index * 50;

    request(`https://myanimelist.net/topanime.php?limit=${cont}`,(err,res,body)=>{
        if (err) {console.log('Erro' + err)};
  
        const $ = cheerio.load(body);
        
        $('.ranking-list').each(function(){ 
          var data = $(this).find('.di-ib a').html();
          var star = $(this).find('.di-ib span').html();
          name.push('{ "Title": "' + data + '","Score":'+ star +'}');
        });
        
        fs.appendFileSync('myanimelist.json', name);
      });
  }
}

list.findAll()
.then((req,res)=>{
  console.log(res)
})
.catch((err)=>{
  console.log(err)
});

//var file = JSON.parse(fs.readFileSync('myanimelist.json', 'utf8'));