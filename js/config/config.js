const config = {
    serverIp: '192.168.1.9',  // Poner tu IP
    serverPort: '4000',
    SECRET_TOKEN: '1234'
};

config.baseUrl = `http://${config.serverIp}:${config.serverPort}`;
//config.baseUrl = 'https://proyecto-gestion-asistencia-iot-backend.vercel.app'
//https://proyecto-gestion-asistencia-iot-backend.vercel.app/auth/validate-login