--CS340 sql data definition query statements for final project

--sets foreign key checks to 0
set foreign_key_checks = 0;



--deletes table card if exists, then creates table card
drop table if exists card; 
create table card (
	card_id int not null auto_increment,
	card_name varchar(255) not null,
	rarity varchar(255),
	description varchar(255),
	mana_cost int not null,
	card_type varchar(255),
	primary key (card_id),
	unique (card_name)
);

--inserts the cards that we will be starting with in our database
insert into card(card_name, mana_cost, rarity, description, card_type) values ('Abomination', 5, 'Rare', 'Deal 2 damage to all characters.', 'Neutral');

insert into card(card_name, mana_cost, rarity, description, card_type) values ('Ancestral spirit', 2, 'Rare', 'Give a minion "Deathrattle: resummon this minion."', 'Shaman');

insert into card(card_name, mana_cost, rarity, description, card_type) values ('Doomhammer', 5, 'Epic', '', 'Shaman');

--This creates the relationships (many to many) between card table and weapon table
drop table if exists card_weapon; 
create table card_weapon (
	card_id int not null,
	weapon_id int not null,
	primary key (card_id, weapon_id),
	constraint fk_card_weapon_card foreign key (card_id) 
	references card(card_id),
	constraint fk_card_weapon_weapon foreign key (weapon_id) 
	references weapon(weapon_id)
);
--This assigns a relationship between the card Doomhammer and also being a weapon
insert into card_weapon (card_id, weapon_id) values (3, 1);

--Creates the table weapon that will be connected to every card that is classified as weapon
drop table if exists weapon; 
create table weapon (
	weapon_id int not null auto_increment,
	attack_power int not null,
	durability int not null,
	primary key (weapon_id)
);

--Makes the first weapon insertion that will give attack_power and durability to weapon cards it is assigned to
insert into weapon (attack_power, durability) values (2, 8);

--This makes a table that will keep trach of many to many relationship between the tables weapon and mechanics
drop table if exists weapon_mechanics; 
create table weapon_mechanics (
	weapon_id int not null,
	mech_id int not null,
	primary key (weapon_id, mech_id),
	foreign key (weapon_id) references weapon(weapon_id),
	foreign key (weapon_id) references mechanics(mech_id)
);

--These give relationships betweeen the weapon Doomhammer and its mechanics
insert into weapon_mechanics (weapon_id, mech_id) values (3, 3);
insert into weapon_mechanics (weapon_id, mech_id) values (3, 4);

--This table keeps trach of the many to many realtionships between card table and minion table
drop table if exists card_minion; 
create table card_minion (
	card_id int not null,
	minion_id int not null,
	primary key (card_id, minion_id),
	foreign key (card_id) references card(card_id),
	foreign key (minion_id) references minion(minion_id)
);
-- This makes a realation ship between card Abomination and it being a minion card
insert into card_minion (card_id, minion_id) values (1, 1);

-- This is the table that will give minion cards their attack_power and their health_power
drop table if exists minion; 
create table minion (
	minion_id int not null auto_increment,
	attack_power int not null,
	health_power int not null,
	primary key (minion_id)
);

--This inserts the first instance of minion stats into the minion table
insert into minion (attack_power, health_power) values (4, 4);

--This makes a table that will keep track of the many to many relationships between minion and mechanics
drop table if exists minion_mechanics; 
create table minion_mechanics (
	minion_id int not null,
	mech_id int not null,
	primary key (minion_id,mech_id),
	foreign key (minion_id) references minion(minion_id),
	foreign key (mech_id) references mechanics(mech_id)
);

-- These statements create relationshps between minon and mechanics
insert into minion_mechanics (minion_id, mech_id) values (1, 1);
insert into minion_mechanics (minion_id, mech_id) values (1, 2);

-- This makes the mechanics table that will keep trach of mechanics which are only used my weapon and minon cards
drop table if exists mechanics; 
create table mechanics (
	mech_id int not null auto_increment,
	name varchar(255),
	primary key (mech_id)
);

--inserts the mechanics that will be used for weapon and minon cards
insert into mechanics (name) values ('Taunt');
insert into mechanics (name) values ('Deathrattle');
insert into mechanics (name) values ('Windfury');
insert into mechanics (name) values ('Overload');

--makes the table that will keep track of the many to many relationships between card and spell
drop table if exists card_spell; 
create table card_spell (
	card_id int not null,
	spell_id int not null,
	primary key (card_id, spell_id),
	foreign key (card_id) references card(card_id),
	foreign key (spell_id) references spell(spell_id)
);
--insert the first relationship between a card Ancestorial spirit and the spell table
insert into card_spell (card_id, spell_id) values (2, 1);

--creates the spell table
drop table if exists spell; 
create table spell (
	spell_id int not null auto_increment,
	spell_type varchar(255) not null,
	primary key (spell_id)
	
);
-- inserts into spell table the spell type
insert into spell (spell_type) values ("Single Target");

--sets foreign key checks back to 1
set foreign_key_checks = 1;

