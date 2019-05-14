select * from card;
select * from minion;
select * from spell;
select * from weapon;
--update card
update card
	set rarity = "rare"
	where name = "Shield Maiden";
--delete card
delete from card where name = "Dr. Boom";
--insert card
insert into card (card_id, name, rarity, description, mana_cost, card_type)
values (card_idInput, nameInput, rarityInput, descriptionInput, mana_costInput, card_typeInput);


