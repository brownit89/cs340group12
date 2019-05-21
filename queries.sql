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
