set foreign_key_checks = 0;




DROP TABLE IF EXISTS card; 
create table card (
	card_id int not null,
	card_name varchar(255) not null,
	rarity varchar(255),
	description varchar(255),
	mana_cost int not null,
	card_type varchar(255) not null,
	primary key (card_id)
);

INSERT INTO card(card_id, card_name, mana_cost, rarity, description, card_type) VALUES (1, 'Abomination', 5, 'Rare', 'Deal 2 damage to ALL characters.', 'Neutral');

INSERT INTO card(card_id, card_name, mana_cost, rarity, description, card_type) VALUES (2, 'Ancestral Spirit', 2, 'Rare', 'Give a minion "Deathrattle: Resummon this minion."', 'Shaman');

INSERT INTO card(card_id, card_name, mana_cost, rarity, description, card_type) VALUES (3, 'DOOMHAMMER', 5, 'Epic', '', 'Shaman');

DROP TABLE IF EXISTS card_weapon; 
create table card_weapon (
	card_id int not null,
	weapon_id int not null,
	primary key (card_id, weapon_id),
	constraint fk_card_weapon_card foreign key (card_id) 
	references card(card_id),
	constraint fk_card_weapon_weapon foreign key (weapon_id) 
	references weapon(weapon_id)
);
INSERT INTO card_weapon (card_id, weapon_id) VALUES (3, 1);

DROP TABLE IF EXISTS weapon; 
create table weapon (
	weapon_id int not null,
	ap int not null,
	durability int not null,
	primary key (weapon_id)
);
INSERT INTO weapon (weapon_id, ap, durability) VALUES (1, 2, 8);

DROP TABLE IF EXISTS weapon_mechanics; 
create table weapon_mechanics (
	weapon_id int not null,
	mech_id int not null,
	primary key (weapon_id, mech_id),
	foreign key (weapon_id) references weapon(weapon_id),
	foreign key (weapon_id) references mechanics(mech_id)
);
INSERT INTO weapon_mechanics (weapon_id, mech_id) VALUES (1, 3);
INSERT INTO weapon_mechanics (weapon_id, mech_id) VALUES (1, 4);

DROP TABLE IF EXISTS card_minion; 
create table card_minion (
	card_id int not null,
	minion_id int not null,
	primary key (card_id, minion_id),
	foreign key (card_id) references card(card_id),
	foreign key (minion_id) references minion(minion_id)
);
INSERT INTO card_minion (card_id, minion_id) VALUES (1, 1);

DROP TABLE IF EXISTS minion; 
create table minion (
	minion_id int not null,
	ap int not null,
	hp int not null,
	primary key (minion_id)
);

INSERT INTO minion (minion_id, ap, hp) VALUES (1, 4, 4);

DROP TABLE IF EXISTS minion_mechanics; 
create table minion_mechanics (
	minion_id int not null,
	mech_id int not null,
	primary key (minion_id,mech_id),
	foreign key (minion_id) references minion(minion_id),
	foreign key (mech_id) references mechanics(mech_id)
);

INSERT INTO minion_mechanics (minion_id, mech_id) VALUES (1, 1);
INSERT INTO minion_mechanics (minion_id, mech_id) VALUES (1, 2);

DROP TABLE IF EXISTS mechanics; 
create table mechanics (
	mech_id int not null,
	name varchar(255),
	primary key (mech_id)
);
INSERT INTO mechanics (mech_id, name) VALUES (1, 'TAUNT');
INSERT INTO mechanics (mech_id, name) VALUES (2, 'DEATHRATTLE');
INSERT INTO mechanics (mech_id, name) VALUES (3, 'WINDFURY');
INSERT INTO mechanics (mech_id, name) VALUES (4, 'OVERLOAD');

DROP TABLE IF EXISTS card_spell; 
create table card_spell (
	card_id int not null,
	spell_id int not null,
	primary key (card_id, spell_id),
	foreign key (card_id) references card(card_id),
	foreign key (spell_id) references spell(spell_id)
);
INSERT INTO card_spell (card_id, spell_id) VALUES (2, 1);

DROP TABLE IF EXISTS spell; 
create table spell (
	spell_id int not null,
	primary key (spell_id)
);
INSERT INTO spell (spell_id) VALUES (1);

set foreign_key_checks = 1;
