const sqlEasy = require('../sqlEasy')

let sql = sqlEasy()
            .createTableIfNotExist('estates')
            .addColumnFirst('EstateId', 'integer').notNull().primaryKey()
            .addColumn('EstateType', 'VARCHAR').notNull()
            .addColumn('SellType', 'VARCHAR').notNull()
            .addColumn('Title', 'VARCHAR').notNull()
            .addColumn('ProjectName', 'VARCHAR')
            .addColumn('Location_Province', 'VARCHAR').notNull()
            .addColumn('Location_District', 'VARCHAR').notNull()
            .addColumn('Location_SubDistrict', 'VARCHAR')
            .addColumn('Location_Road', 'VARCHAR')
            .addColumn('Location_Lane', 'VARCHAR')
            .addColumn('Location_PostalCode', 'VARCHAR')
            .addColumn('Price', 'VARCHAR').notNull()
            .addColumn('OwnerDetail', 'VARCHAR').notNull()
            .endAddColumn()
            .end()

module.exports = (con) => {

    con.query(sql, function(error, result) {
        if (error) {
            console.log('create table estates error !!!')
            console.log(error)
        }
    })

}