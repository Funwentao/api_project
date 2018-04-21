import Client from 'mysql-pro';

const client = new Client({
    mysql: {
        user: 'uzpeng',
        password: 'sz150281',
        database: 'sign_system',
        host: '172.29.108.89',
        port: 3306
    }
});

export default client;