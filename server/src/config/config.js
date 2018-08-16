module.exports = {
    port: process.env.PORT || 8081,
    db: {
        host: process.env.HOST || 'localhost',
        database: process.env.DB_NAME || 'winner',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || '1235',
        dialect: 'postgres',
    },
    env: 'development'
}