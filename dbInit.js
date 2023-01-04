var Sequelize  = require('sequelize');
const { databasePassword } = require('./config.json');

var sequelize  = new Sequelize('kawalskiBot', 'root', databasePassword, {
    dialect: 'sqlite',
    storage: './kawalskiBot.sqlite',
    logging: false
});

//Defining models
const Vote = sequelize.define("vote",
{   
    globalId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncriment: true
    },
    voter: {
        type: Sequelize.STRING,
        allowNull: false
    },
    election: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userVote: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const Election = sequelize.define("election",
{   
    globalId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncriment: true
    },
    electionName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstCanidate: {
        type: Sequelize.STRING,
        allowNull: false
    },
    secondCanidate: {
        type: Sequelize.STRING,
        allowNull: false
    },
})

module.exports =  {sequelize, Vote, Election };
