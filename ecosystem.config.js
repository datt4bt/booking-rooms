module.exports = {
    apps: [
        {
            name: 'server_1',
            script: 'dist/server.js',
            exec_mode: 'cluster',
            instances: '1',
            env: {
                ...process.env,
            },
        },
    ],
};
