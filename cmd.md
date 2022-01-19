npm install
npm uninstall pg
npm install pg

set up .env


psql

create user catoura_user with password 'userpassword' createdb

npx dotenv sequelize db:create
<<OR>> npx dotenv sequelize-cli db:migrate

npx dotenv sequelize model:generate --name User --attributes firstName:string,lastName:string,userName:string,email:string,hashedPassword:string,favFood:string


npm install csurf
npm install express-validator
npm install bcryptjs


Creates a branch
git branch user-auth-setup

Moves to branch
git checkout user-auth-setup

OR

Creates and moves to branch
git checkout -b user-auth-setup

Pulling changes to branch
git pull origin user-auth-setup

Merge changes of main into this branch
git merge main

WorkFlow

Make a branch
Do work
Push Branch
Make pull request
Approve pull request (someone else)
Merge to main on github (someone else)
if you are already working on another branch, git add . then git commit
(you  can also git stash the branch instead of the above line)
then Checkout to main (locally)
Git pull
Switch to working branch
Git merge main
