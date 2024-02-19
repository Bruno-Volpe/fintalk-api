// module.exports = {
//     /* MySQL / MariaDB */
//     dialect: 'mariadb',
//     host: '34.95.147.194',
//     port: '3306',
//     username: 'root',
//     password: '759236',
//     database: 'api',
//     dialectOptions: {
//         timezone: 'America/Sao_Paulo',
//     },
//     timezone: 'America/Sao_Paulo',

//     define: {
//         timestamps: true,
//         underscored: true,
//         underscoredAll: true,
//         createdAt: 'created_at',
//         updatedAt: 'updated_at',
//     },
// };

module.exports = {
    dialect: 'sqlite',
    storage: './db.sqlite',

    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
}