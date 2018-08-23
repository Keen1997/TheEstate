const sqlEasy = require('../sqlEasy')

let sql = sqlEasy()
            .createTableIfNotExist('estates')
            .addColumnFirst('EstateId', 'SERIAL').notNull().primaryKey()
            .addColumn('EstateType', 'VARCHAR').notNull()
            .addColumn('SellType', 'VARCHAR').notNull()
            .addColumn('Title', 'VARCHAR').notNull()
            .addColumn('BuildingName', 'VARCHAR')
            .addColumn('Location_Province', 'VARCHAR').notNull()
            .addColumn('Location_District', 'VARCHAR').notNull()
            .addColumn('Location_SubDistrict', 'VARCHAR')
            .addColumn('Location_Road', 'VARCHAR')
            .addColumn('Location_Lane', 'VARCHAR')
            .addColumn('Location_houseNo', 'VARCHAR')
            .addColumn('Location_PostalCode', 'VARCHAR')
            .addColumn('Price', 'VARCHAR').notNull()
            .addColumn('OwnerDetail', 'VARCHAR').notNull()
            .addColumn('Created', 'timestamp with time zone').notNull()
            .addColumn('Rai', 'VARCHAR')
            .addColumn('Ngan', 'VARCHAR')
            .addColumn('SquareWa', 'VARCHAR')
            .addColumn('AllArea', 'VARCHAR')
            .addColumn('UseArea', 'VARCHAR')
            .addColumn('Width', 'VARCHAR')
            .addColumn('Heigth', 'VARCHAR')
            .addColumn('AllFloor', 'VARCHAR')
            .addColumn('FloorNo', 'VARCHAR')
            .addColumn('Bedrooms', 'VARCHAR')
            .addColumn('Bathrooms', 'VARCHAR')
            .addColumn('Furniture', 'VARCHAR')
            .addColumn('Direction', 'VARCHAR')
            .addColumn('Options', 'VARCHAR')
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