--query to insert into

select * from card;
select * from minion;
select * from spell;
select * from weapon;
update card
	set rarity = "rare"
	where name = "Shield Maiden";
delete from card where name = "Dr. Boom";
insert into card (card_id, name, rarity, description, mana_cost, card_type)
values (card_idInput, nameInput, rarityInput, descriptionInput, mana_costInput, card_typeInput);


