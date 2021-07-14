# Create abstract model
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

# running migrations
npx sequelize-cli db:migrate


# Undoing Migrations
npx sequelize-cli db:migrate:undo

# Creating the first Seed
npx sequelize-cli seed:generate --name demo-user
npx sequelize db:seed --seed 20210714184115-chats

# Running Seeds
npx sequelize-cli db:seed:all
