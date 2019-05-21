module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getCards(res, mysql, context, complete){
        mysql.pool.query("SELECT card_id as id, name FROM bsg_planets", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.planets  = results;
            complete();
        });
    }
