create table card (
	card_id int not null,
	card_name varch(255) not null,
	rarity varch(255),
	description varch(255),
	mana_cost int not null,
	card_type varch(255) not null,
	primary key (card_id),
	foreign key (card_id) references card_weapon(card_id),
	foreign key (card_id) references card_minion(card_id),
	foreign key (card_id) references card_spell(card_id)
);

create table card_weapon (
	card_id int not null,
	weapon_id int not null,
	primary key (card_id, weapon_id),
	foreign key (card_id) references card(card_id),
	foreign key (weapon_id) references weapon(weapon_id)
);

create table weapon (
	weapon_id int not null,
	ap int not null,
	durability int not null,
	primary key (weapon_id),
	foreign key (weapon_id) references weapon(weapon_id),
	foreign key (weapon_id) references weapon_mechanics(weapon_id)
);

create table weapon_mechanics (
	weapon_id int not null,
	mech_id int not null,
	primary key (weapon_id, mech_id),
	foreign key (weapon_id) references weapon(weapon_id),
	foreign key (weapon_id) references mechanics(mech_id)
);

create table minion (
	minion_id int not null,
	ap int not null,
	hp int not null,
	primary key (minion_id),
	foreign key (minion_id) references card_minion(minion_id),
	foreign key (minion_id) references minion_mechanics(minion_id)
);

create table minion_mechanics (
	minion_id int not null,
	mech_id int not null,
	primary key (minion_id,mech_id),
	foreign key (minion_id) references minion(minion_id),
	foreign key (mech_id) references mechanics(mech_id)
);

create table mechanics (
	mech_id int not null,
	name varch(255),
	primary key (mech_id),
	foreign key (mech_id) references weapon_mechanics(mech_id),
	foreign key (mech_id) references minion_mechanics(mech_id)
);

create table card_spell (
	card_id int not null,
	spell_id int not null,
	primary key (card_id, spell_id),
	foreign key (card_id) references card(card_id),
	foreign key (spell_id) references spell(spell_id)
);

create table spell (
	spell_id int not null,
	primary key (spell_id),
	foreign key (spell_id) references card_spell(card_id)
);

