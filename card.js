module.exports = function(){
	var express = require('express');
	var router = express.Router();

	function getCards(res, mysql, context, complete){
        mysql.pool.query("SELECT * from card", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.card = results;
            complete();
        });
    }

	function getMinions(res, mysql, context, complete){
		mysql.pool.query("select * from card inner join card_minion on card.card_id = card_minion.card_id inner join minion on card_minion.minion_id = minion.minion_id;", function(error, results, fields){
	if(error){
		res.write(JSON.stringify(error));
		res.end();
	}
	context.minion = results;
	complete();

	});
}

	function getWeapons(res, mysql, context, complete){
		mysql.pool.query("select * from card inner join card_weapon on card.card_id = card_weapon.card_id inner join weapon on card_weapon.weapon_id = weapon.weapon_id;", function(error, results, fields){
	if(error){
		res.write(JSON.stringify(error));
		res.end();
	}
	context.weapon = results;
	complete();

	});
}

	function getSpells(res, mysql, context, complete){
		mysql.pool.query("select * from card inner join card_spell on card.card_id = card_spell.card_id inner join spell on card_spell.spell_id = spell.spell_id;", function(error, results, fields){
	if(error){
		res.write(JSON.stringify(error));
		res.end();
	}
	context.spell = results;
	complete();

	});
}

	function getCard(res, mysql, context, id, complete){
		console.log('get Card is being called');
		var sql = "select card_id as id, card_name, rarity, description, mana_cost, card_type from card where card_id = ?";
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
		mysql.pool.query("select * from card inner join card_minion on card.card_id = card_minion.card_id inner join minion on card_minion.minion_id = minion.minion_id inner join minion_mechanics on minion.minion_id = minion_mechanics.minion_id inner join mechanics on minion_mechanics.mech_id = mechanics.mech_id;", function(error, results, fields){
	if(error){
		res.write(JSON.stringify(error));
		res.end();
	}
	context.spell = results;
	complete();

	});
}

	function getWeaponMechanics(res, mysql, context, complete){
		mysql.pool.query("select * from card inner join card_weapon on card.card_id = card_weapon.card_id inner join weapon on card_weapon.weapon_id = weapon.weapon_id inner join weapon_mechanics on weapon.weapon_id = weapon_mechanics.weapon_id inner join mechanics on weapon_mechanics.mech_id = mechanics.mech_id;", function(error, results, fields){
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
	context.jsscripts = ["deletecard.js"];
	var mysql = req.app.get('mysql');
	getCards(res, mysql, context, complete);
	function complete(){
		callbackCount++;
		if(callbackCount >= 1){
			res.render('card', context);
		}
	}
});

router.get('/:id', function(req, res){
	console.log('update function is being called');
	callbackCount = 0;
	var context = {};
	context.jsscripts = ["selectedcard.js", "updatecard.js"];
	var mysql = req.app.get('mysql');
	getCard(res, mysql, context, req.params.id, complete);
	function complete(){
		callbackCount++;
		if(callbackCount >= 1){
			console.log('its trying to render');
			res.render('update-card',context);
		}
	}
});

router.post('/', function(req, res){
	console.log(req.body)
	var mysql = req.app.get('mysql');
	var sql = "insert into card (card_name, rarity, description, mana_cost, card_type) values (?, ?, ?, ?, ?)";
	var inserts = [req.body.card_name, req.body.rarity, req.body.description, req.body.mana_cost, req.body.card_type];
	sql = mysql.pool.query(sql,inserts,function(error,results,fields){
		if(error){
			console.log(JSON.stringify(error))
			res.write(JSON.stringify(error));
			res.end();
		}else{
			res.redirect('/card');
		}

	});
});

router.put('/:id', function(req, res){
	var mysql = req.app.get('mysql');
	console.log(req.body)
	console.log(req.params.id)
	var sql = "UPDATE card SET card_name=?, rarity=?, description=?, mana_cost=?, card_type=? WHERE card_id=?";
	var inserts = [req.body.card_name, req.body.rarity, req.body.description, req.body.mana_cost, req.body.card_type, req.params.id];
	sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		if(error){
			console.log(error)
			res.write(JSON.stringify(error));
			res.end();
		}else{
			res.status(200);
			res.end();
		}
	});
});

router.delete('/:id', function(req, res){
	var mysql = req.app.get('mysql');
	var sql = "delete from card where card_id = ?";
	var inserts = [req.params.id];
	sql = mysql.pool.query(sql, inserts, function(error, results, fields){
		if(error){
		console.log(error)
		res.write(JSON.stringify(error));
		res.status(400);
		res.end();
	}else{
		res.status(202).end();
	}
	})
})
	return router;
}();


