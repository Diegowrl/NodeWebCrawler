const request = require('request');
const cheerio = require('cheerio');
const Sequelize = require("sequelize");
const fs = require('fs');

const connection = new Sequelize('myanimelist','root','',{
    host:'localhost',
    dialect : 'mysql',
    timezone : '-03:00'
});

const list = connection.define("topAnimeSeries",{
    title:{
        type : Sequelize.STRING,
        allowNull : false
    },
    score : {
        type : Sequelize.INTEGER,
        allowNull : false
    }
});

//list.sync({force:true});

module.exports = list;