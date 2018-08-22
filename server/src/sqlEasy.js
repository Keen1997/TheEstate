const sqlEasy = function () {

    let sql = ''
    let errors = []

    let createTable = function(table) {
        sql += 'CREATE TABLE (' + table 
        return this
    }

    let createTableIfNotExist = function(table) {
        sql += 'CREATE TABLE IF NOT EXISTS ' + table + ' ('
        return this
    }

    let addColumnFirst = function(column, columnType) {
        sql += column + ' ' + columnType 
        return this
    }

    let addColumn = function(column, columnType) {
        sql += ', ' + column + ' ' + columnType 
        return this
    }

    let notNull = function() {
        sql += ' NOT NULL' 
        return this
    } 

    let primaryKey = function() {
        sql += ' PRIMARY KEY' 
        return this
    } 

    let endAddColumn = function() {
        sql += ')' 
        return this
    } 

    let insertTo = function(table) {
        sql += 'INSERT INTO ' + table 
        return this
    }
    
    let select = function(select) {
        sql += ' SELECT '
        if (typeof select === 'string') {
            sql += select
        }
        else if (typeof select === 'object') {
            sql += '('
            select.forEach(element => {
                sql += element + ', '
            })
            sql = sql.slice(0, -2)
            sql += ')'
        }
        else {
            errors.push('select function: parameter is only array or string')
        }
        
        return this
    }

    let updateTo = function(table) {
        sql += 'UPDATE ' + table 
        return this
    } 

    let deleteFrom = function(table) {
        sql += 'DELETE FROM ' + table 
        return this
    } 

    let columns = function(column) {
        sql += ' ('
        column.forEach(element => {
            sql += element + ', '
        })
        sql = sql.slice(0, -2)
        sql += ')'
        return this
    }

    let values = function(values) {
        sql += ' VALUES ('
        values.forEach(element => {
            if (typeof element === 'string') sql += '"' + element + '"' + ', '
            else sql += element + ', '
        })
        sql = sql.slice(0, -2)
        sql += ')'
        return this
    }

    let set = function(condition) {
        sql += ' SET ' + condition
        return this
    }

    let from = function(table) {
        sql += ' FROM ' + table 
        return this
    }

    let where = function(condition) {
        sql += ' WHERE ' + condition
        return this
    }

    let and = function(condition) {
        sql += ' AND ' + condition
        return this
    }

    let or = function(condition) {
        sql += ' OR ' + condition
        return this
    }

    let equal = function(val) {
        if (typeof val === 'string') sql += ' = "' + val + '"'
        else sql += '=' + val 
        return this
    }

    let end = function() {
        if (errors.length == 0) {
            sql = sql.trim()
            return sql
        }
        else {
            errors.forEach(element => {
                console.log(element)
            })
        }
    }

    return {

        createTable,
        createTableIfNotExist,
        addColumnFirst,
        addColumn,
        notNull,
        primaryKey,
        endAddColumn,

        insertTo,
        select,
        updateTo,
        deleteFrom,

        columns,
        values,
        set,
        from,
        where,
        and,
        or,
        equal,

        end
    }
}

module.exports = sqlEasy

// test

// let userID = 'testname'
// let  password = 'testpassword'

// let a = sqlEasy()
//         .insertTo('users')
//         .columns(['user_id', 'user_password', 'user_vertified', 'user_post'])
//         .values([userID, password, false, 0])
//         .end()

// console.log(a)

// let b = sqlEasy()
//         .select('*')
//         .from('Address')
//         .where('Country="Thailand"').and('City="Bangkok"')
//         .end()

// console.log(b)

// let id = 123123

// let c = sqlEasy()
//         .select('*')
//         .from('users')
//         .where('UserId').equal(id)  //.where('user_id = "' + id + '"') 
//         .end()

// console.log(c)

// let d = sqlEasy()
//         .updateTo('Users')
//         .set('UserPassword').equal(1234)
//         .where('UserId=123123')
//         .end()

// console.log(d)

// let e = sqlEasy()
//         .deleteFrom('Users')
//         .where('UserId=123123')
//         .end()

// console.log(e)

// let f = sqlEasy()
//         .createTableIfNotExist('estates')
//         .addColumnFirst('EstateId', 'integer').notNull().primaryKey()
//         .addColumn('EstateType', 'VARCHAR').notNull()
//         .addColumn('SellType', 'VARCHAR').notNull()
//         .addColumn('Title', 'VARCHAR').notNull()
//         .addColumn('ProjectName', 'VARCHAR')
//         .addColumn('Location_Province', 'VARCHAR').notNull()
//         .addColumn('Location_District', 'VARCHAR').notNull()
//         .addColumn('Location_SubDistrict', 'VARCHAR')
//         .addColumn('Location_Road', 'VARCHAR')
//         .addColumn('Location_Lane', 'VARCHAR')
//         .addColumn('Location_PostalCode', 'VARCHAR')
//         .addColumn('Price', 'VARCHAR').notNull()
//         .addColumn('OwnerDetail', 'VARCHAR').notNull()
//         .endAddColumn()
//         .end()

// console.log(f)