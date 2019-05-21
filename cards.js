module.exports = function(){
	var express = require('express');
	var router = express.Router();

	function getCards(res, mysql, context, complete){
        mysql.pool.query("SELECT card_id as id, name FROM card inner join minion on ", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.planets  = results;
            complete();
        });
    }

	function getMinions(res, mysql, context, complete){
		mysql.pool.query("select * from card inner join card_minion on card.card_id = card_minion.card_id inner join minion on card_minion.minion_id = minion.minion_id;", function(error, results, fields){
	if(error){
		res.write(JSON.stringify(error));
		res.end();
	}
	context.minions = results;
	complete();

	});
}

	function getWeapons(res, mysql, context, complete){
		mysql.pool.query("select * from card inner join card_weapon on card.card_id = card_weapon.card_id inner join weapon on card_weapon.weapon_id = weapon.weapon_id;", function(error, results, fields){
	if(error){
		res.write(JSON.stringify(error));
		res.end();
	}
	context.weapons = results;
	complete();

	});
}

	function getSpells(res, mysql, context, complete){
		mysql.pool.query("select * from card inner join card_spell on card.card_id = card_spell.card_id inner join spell on card_spell.spell_id = spell.spell_id;", function(error, results, fields){
	if(error){
		res.write(JSON.stringify(error));
		res.end();
	}
	context.spells = results;
	complete();

	});
}


	function getCard(res, mysql, context, id, complete){
		var sql = mysql.pool.query("select * from card where card_id = ?";
		var inserts = [id];
		mysql.pool.query(sql, inserts, function(error, results, fields){
	if(error){
		res.write(JSON.stringify(error));
		res.end();
	}
	context.card = results[0];
	complete();

	});
}

	function getMinionMechanics(res, mysql, context, complete){
		mysql.pool.query("ENTER QUERY;", function(error, results, fields){
	if(error){
		res.write(JSON.stringify(error));
		res.end();
	}
	context.spells = results;
	complete();

	});
}


	function getWeaponMechanics(res, mysql, context, complete){
		mysql.pool.query("ENTER QUERY;", function(error, results, fields){
	if(error){
		res.write(JSON.stringify(error));
		res.end();
	}
	context.spells = results;
	complete();

	});
}

}();
