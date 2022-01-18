npm install
npm uninstall pg
npm install pg

set up .env


psql

create user catoura_user with password 'userpassword' createdb

npx dotenv sequelize db:create

npx dotenv sequelize model:generate --name User --attributes firstName:string,lastName:string,userName:string,email:string,hashedPassword:string,favFood:string