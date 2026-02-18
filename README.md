# projetStackMERN
mongosh --port 27017 
use admin
db.auth("mongo_user",passwordPrompt()) 
taper mot de passe
use shop

sortir du mongosh et faire l import : ctrl C

ctrl C
mongoimport --type csv --headerline   --db shop --collection movies   --file /import/datasource/movies_with_price_comma.csv   --username mongo_user --passwor
d example1234   --authenticationDatabase admin

repartir sur mongosh avec les memes etapes: 

mongosh --port 27017 
use admin
db.auth("mongo_user",passwordPrompt()) 
taper mot de passe
use shop
show collections

teste avec des requettes par exemple : 
db.movies.find({"duration":"90 min"})
