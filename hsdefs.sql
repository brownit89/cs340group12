set foreign_key_checks = 0;




drop table if exists card; 
create table card (
	card_id int not null auto_increment,
	card_name varchar(255) not null,
	rarity varchar(255),
	description varchar(255),
	mana_cost int not null,
	card_type varchar(255),
	primary key (card_id)
);

insert into card(card_name, mana_cost, rarity, description, card_type) values ('Abomination', 5, 'Rare', 'Deal 2 damage to all characters.', 'Neutral');

insert into card(card_name, mana_cost, rarity, description, card_type) values ('Ancestral spirit', 2, 'Rare', 'Give a minion "Deathrattle: resummon this minion."', 'Shaman');

insert into card(card_name, mana_cost, rarity, description, card_type) values ('Doomhammer', 5, 'Epic', '', 'Shaman');

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
insert into card_weapon (card_id, weapon_id) values (2, 1);

drop table if exists weapon; 
create table weapon (
	weapon_id int not null auto_increment,
	ap int not null,
	durability int not null,
	primary key (weapon_id)
);
insert into weapon (ap, durability) values (2, 8);

drop table if exists weapon_mechanics; 
create table weapon_mechanics (
	weapon_id int not null,
	mech_id int not null,
	primary key (weapon_id, mech_id),
	foreign key (weapon_id) references weapon(weapon_id),
	foreign key (weapon_id) references mechanics(mech_id)
);
insert into weapon_mechanics (weapon_id, mech_id) values (1, 3);
insert into weapon_mechanics (weapon_id, mech_id) values (1, 4);

drop table if exists card_minion; 
create table card_minion (
	card_id int not null,
	minion_id int not null,
	primary key (card_id, minion_id),
	foreign key (card_id) references card(card_id),
	foreign key (minion_id) references minion(minion_id)
);
insert into card_minion (card_id, minion_id) values (1, 1);

drop table if exists minion; 
create table minion (
	minion_id int not null auto_increment,
	ap int not null,
	hp int not null,
	primary key (minion_id)
);

insert into minion (ap, hp) values (4, 4);

drop table if exists minion_mechanics; 
create table minion_mechanics (
	minion_id int not null,
	mech_id int not null,
	primary key (minion_id,mech_id),
	foreign key (minion_id) references minion(minion_id),
	foreign key (mech_id) references mechanics(mech_id)
);

insert into minion_mechanics (minion_id, mech_id) values (1, 1);
insert into minion_mechanics (minion_id, mech_id) values (1, 2);

drop table if exists mechanics; 
create table mechanics (
	mech_id int not null auto_increment,
	name varchar(255),
	primary key (mech_id)
);
insert into mechanics (name) values ('Taunt');
insert into mechanics (name) values ('Deathrattle');
insert into mechanics (name) values ('Windfury');
insert into mechanics (name) values ('Overload');

drop table if exists card_spell; 
create table card_spell (
	card_id int not null,
	spell_id int not null,
	primary key (card_id, spell_id),
	foreign key (card_id) references card(card_id),
	foreign key (spell_id) references spell(spell_id)
);
insert into card_spell (card_id, spell_id) values (2, 1);

drop table if exists spell; 
create table spell (
	spell_id int not null auto_increment,
	spell_type varchar(255) not null,
	primary key (spell_id)
	
);
insert into spell (spell_type) values ("Single Target");

set foreign_key_checks = 1;
