const config = {
    serverIp: '192.168.1.8',  // Poner tu IP
    serverPort: '4000',
    SECRET_TOKEN: '1234'
};

config.baseUrl = `http://${config.serverIp}:${config.serverPort}`;