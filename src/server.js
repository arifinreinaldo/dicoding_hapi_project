const happy = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = happy.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });
    server.route(routes);
    await server.start();
    // eslint-disable-next-line no-console
    console.log(`jalan ${server.info.uri}`);
};
init();
