module.exports = function(){
	var express = require('express');
	var router = express.Router();
/*	
	function serveSpells(req,res){
		console.log("You asked me for some spells?")
		var query = 'select spell_id, spell_type from spell';
		var mysql = req.app.get('mysql');
		var context = {};
		
		function handleRenderingOfSpells(error, results, fields){
			console.log(error)
			console.log(results)
			console.log(fields)
			//stores results of query inside context
			context.spell = results;
			res.render('spell', context)
		}
		//executes mysql query
		mysql.pool.query(query, handleRenderingOfSpells)

	}
	*/
	function getSpells(res, mysql, context, complete){
		console.log('minions are called');
		mysql.pool.query("select * from card inner join card_spell on card.card_id = card_spell.card_id inner join spell on card_spell.spell_id = spell.spell_id", function(error, results, fields){
	if(error){
		res.write(JSON.stringify(error));
		res.end();
	}
	context.spell = results;
	complete();

	});
}
router.get('/', function(req, res){
	var callbackCount = 0;
	var context = {};
	context.jsscripts = ["deleteMinion.js"];
	var mysql = req.app.get('mysql');
	getSpells(res, mysql, context, complete);
	function complete(){
		callbackCount++;
		if(callbackCount >= 1){
			res.render('spell', context);
		}
	}
});
/*
	function serveOneSpell(req,res){
		console.log(req.params.spellID);
		console.log(req.params);
		spellID = req.params.spellID

		var queryStr = "select spell_id, spell_type from spell where spell_id = ?"

		var mysql = res.app.get('mysql')
		var context = {};

		function handleRenderingOfOneSpell(error, results, fields){
			console.log("results are " + results)
			context.spell = results[0]
			console.log(context)

		if(error){
			console.log(error)
			res.write(error)
			res.end();
		}else{
			res.render('serverSpell', context);
		}
		}
		var queryStr = mysql.pool.query(queryStr, spellID, handleRenderingOfOneSpell);
	}

	router.get('/', serveSpells);
	router.get('/:spellID', serveOneSpell);
	*/
	return router;

}();

