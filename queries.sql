select * from card;
select * from minion;
select * from spell;
select * from weapon;
update card
		set rarity = "rare"
		where name = "Shield Maiden";
delete from card where name = "Dr. Boom";
insert into card (name, rarity, description, mana_cost, card_type)
values (nameInput, rarityInput, descriptionInput, mana_costInput, card_typeInput);
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
