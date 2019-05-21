module.exports = function(){
	var express = require('express');
	var router = express.Router();
	
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
			context.spells = results;
			res.render('spell', context)
		}
		//executes mysql query
		mysql.pool.query(query, handleRenderingOfSpells)

	}

	function serveOneSpell(req,res){
		console.log(req.params.spellID);
		console.log(req.params);
		spellID = req.params.spellID

		var queryStr = "select spell_id, spell_type from spells where spell_id = ?"

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
		var queryStr = mysql.poo.query(queryStr, spellID, handleRenderingOfOneSpell);
	}

	router.get('/', serveSpells);
	router.get('/:spellID', serveOneSpell);
	return router;

}();
