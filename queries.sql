select card_id, card_name, rarity, description, mana_cost, card_type from card;
select minion_id, attack_power, health_power from minion;
select spell_id, spell_typeInput from spell;
select weapon_id, attack_power, durability from weapon;
UPDATE card SET card_name=?, rarity=?, description=?, mana_cost=?, card_type=? WHERE card_id=?;
delete from card where card_id = ?;
insert into card (card_name, rarity, description, mana_cost, card_type) values (?, ?, ?, ?, ?);
insert into minion (attack_power, health_power)
values (attack_powerInput, health_powerInput);
insert into weapon (attack_power, durability)
values (attack_powerInput, durabilityInput);
insert into spell (spell_type)
values (spell_typeInput);
insert into mechanics (name)
values (nameInput);

-- shows all minion cards
select * from card
inner join card_minion on card.card_id = card_minion.card_id
inner join minion on card_minion.minion_id = minion.minion_id;

-- shows all weapon cards
select * from card
inner join card_weapon on card.card_id = card_weapon.card_id
inner join weapon on card_weapon.weapon_id = weapon.weapon_id;

-- shows all spell cards
select * from card
inner join card_spell on card.card_id = card_spell.card_id
inner join spell on card_spell.spell_id = spell.spell_id;

select * from card
inner join card_minion on card.card_id = card_minion.card_id
inner join minion on card_minion.minion_id = minion.minion_id
inner join minion_mechanics on minion.minion_id = minion_mechanics.minion_id
inner join mechanics on minion_mechanics.mech_id = mechanics.mech_id;

select * from card
inner join card_weapon on card.card_id = card_weapon.card_id
inner join weapon on card_weapon.weapon_id = weapon.weapon_id
inner join weapon_mechanics on weapon.weapon_id = weapon_mechanics.weapon_id
inner join mechanics on weapon_mechanics.mech_id = mechanics.mech_id;
