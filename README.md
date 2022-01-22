# vk-nft-feed

*Инструмент для создания коллекции NFT из постов сообщества или пользователя Вконтакте*


## Использование:

**1. Получить [сервисный ключ доступа]() и поместить его в .env файл.**

**2. Установить зависимости**
```
$ npm i
```

**3. Запустить**
```
$ node index.js [id]
```
где `id` это `id` пользователя Вконтакте, или `id` 
сообщества. Если используется `id` сообщества, то 
необходимо добавить перед ним `-`.
Например, чтобы создать коллекцию NFT из постов группы 
"ВКонтакте API" (id 1) используем команду:
```
$ node index.js -1
```
