const request = async (method, url, data = null) => {
    const token = config.SECRET_TOKEN;
    const headers = {
        'Content-Type': 'application/json',
        'token': token
    };

    const requestOptions = {
        url: url,
        method: method,
        headers: headers,
        withCredentials: true
    };

    if (method !== 'GET' && data) {
        requestOptions.data = data;
    }

    try {
        const response = await axios(requestOptions);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(error.response.data)
            throw new Error(`Error ${error.response.status}`);
        } else if (error.request) {
            throw new Error('No response received from server');
        } else {
            throw new Error(`Request failed: ${error.message}`);
        }
    }
};
