module.exports = {
    port: process.env.PORT || 8081,
    db: {
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'winner',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || '1235',
        port: process.env.DB_PORT || '5432'
    },
    env: 'development'
}