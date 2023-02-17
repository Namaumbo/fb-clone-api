const Sequelize = require('sequelize')

const Connection = new Sequelize('fb-clone-db','postgres','spikker6!',{
    dialect:'postgres',
    host:'localhost'
})

module.exports = Connection