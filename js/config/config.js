const config = {
    serverIp: 'https://proyecto-gestion-asistencia-iot-backend.vercel.app',  // Poner tu IP
    serverPort: '',
    SECRET_TOKEN: '418a5069c96fffdcf3d8c60736eb50ef5223d64ae16918010088d883168fbe5f'
};

config.baseUrl = `http://${config.serverIp}${config.serverPort}`;
//config.baseUrl = 'https://proyecto-gestion-asistencia-iot-backend.vercel.app'
//https://proyecto-gestion-asistencia-iot-backend.vercel.app/auth/validate-login