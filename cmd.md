npm install
npm uninstall pg
npm install pg

set up .env


psql

create user catoura_user with password 'userpassword' createdb

npx dotenv sequelize db:create
<<OR>> npx dotenv sequelize-cli db:migrate

npx sequelize model:generate --name User --attributes firstName:string,lastName:string,userName:string,email:string,hashedPassword:string,favFood:string

npx sequelize model:generate --name Question --attributes title:string,content:string,userId:integer

npx sequelize model:generate --name Answer --attributes content:string,userId:integer,questionId:integer

npx sequelize model:generate --name Comment --attributes
content:string,userId:integer,answerId:integer

npx sequelize model:generate --name Topic --attributes title:string,userId:integer

npx sequelize model:generate --name Question_Topic --attributes questionId:integer,topicId:integer

npx sequelize model:generate --name Reply --attributes content:string,userId:integer,commentId:integer

npx sequelize model:generate --name Question_Upvote --attributes userId:integer,questionId:integer

npx sequelize model:generate --name Question_Downvote --attributes userId:integer,questionId:integer

npx sequelize model:generate --name Answer_Upvote --attributes userId:integer,answerId:integer

npx sequelize model:generate --name Answer_Downvote --attributes userId:integer,answerId:integer


npx sequelize seed:generate --name usersSeed

npx sequelize seed:generate --name questionsSeed
npx sequelize seed:generate --name answersSeed
npx sequelize seed:generate --name commentsSeed
npx sequelize seed:generate --name topicsSeed
npx sequelize seed:generate --name repliesSeed
npx sequelize seed:generate --name questionUpsSeed
npx sequelize seed:generate --name questionDownsSeed
npx sequelize seed:generate --name answerUpsSeed
npx sequelize seed:generate --name answerDownsSeed




npx dotenv sequelize db:seed:all

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
