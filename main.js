const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

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
        
        //obj = JSON.parse(name);
        fs.appendFileSync('myanimelist.json', name);
        
        //console.log(obj)
      });
  }
}











//console.log(name);
// if(permiter){
//   request('https://myanimelist.net/topanime.php',(err,res,body)=>{
//       if (err) {console.log('Erro' + err)};

//       const $ = cheerio.load(body);
      
//       $('.ranking-list').each(function(){ 
//         name +=  ',' + $(this).find('.di-ib a').html();
//         permiter = false;
//       });
//       //name = name.substr(1)
//       //fs.appendFileSync('myanimelist.txt', name + '\n');
      
//   });

// }

// if(cont < 100) {
//   request(`https://myanimelist.net/topanime.php?limit=${cont}`,(err,res,body)=>{
//       if (err) {console.log('Erro' + err)};

//       const $ = cheerio.load(body);
      
//       $('.ranking-list').each(function(){ 
//         name +=  ',' + $(this).find('.di-ib a').html();
//         permiter = false;
//       });

//       name = name.substr(1)
//       fs.appendFileSync('myanimelist.txt', name + '\n');
//     });
// }

// console.log(name);