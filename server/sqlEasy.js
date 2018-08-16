const sqlEasy = function () {

    let sql = ''
    let errors = []

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
        sql += ' = "' + val + '"'
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
        insertTo,
        select,
        columns,
        values,
        from,
        where,
        and,
        or,
        equal,
        end
    }
}

// test

let a = sqlEasy()
        .insertTo('users')
        .columns(['name','age'])
        .values(['Keen', 20])
        .end()

console.log(a)

let b = sqlEasy()
        .select('*')
        .from('Address')
        .where('Country="Thailand"').and('City="Bangkok"')
        .end()

console.log(b)

let id = 123123

let c = sqlEasy()
        .select('*')
        .from('users')
        .where('user_id').equal(id)  //.where('user_id = "' + id + '"') 
        .end()

console.log(c)

let userID = 'testname'
let  password = 'testpassword'

let d = sqlEasy()
        .insertTo('users')
        .columns(['user_id', 'user_password', 'user_vertified', 'user_items'])
        .values([userID, password, false, 0])
        .end()

console.log(d)