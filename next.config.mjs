// next.config.mjs
const nextConfig = {
    env: {
        'MYSQL_HOST': '127.0.0.1',
        'MYSQL_PORT': '3306',
        'MYSQL_DATABASE': 'adminemployeedb',
        'MYSQL_USER': 'root',
        'MYSQL_PASSWORD': '',
    }
};

export { nextConfig as default };

