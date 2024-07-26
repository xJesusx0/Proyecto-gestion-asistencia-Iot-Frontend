const request = async (method, url, data = null) => {
    const token = localStorage.getItem('access_token');
    //console.log(token)
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    const requestOptions = {
        url: url,
        method: method,
        headers: headers,
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
