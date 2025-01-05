const API = {
    async get(url, success, error, complete) {
        await $.ajax({
            url,
            method: "GET",
            success,
            error,
            complete,
        });
    },

    async post(url, data, success, error, complete) {
        const appToken = State.GlobalGet(API_AUTH_APP_TOKEN);
        const headersData = appToken ? {
            'app-token': `${appToken}`,
        } : {
            //default keys
        };
        console.log(headersData)
        try {
            await $.ajax({
                url,
                method: "POST",
                contentType: "application/json",
                headers : headersData,
                data : JSON.stringify(data),
                success,
                error,
                complete,
            });
        } catch (err) {
            console.error('Error during POST request:', err);
        }
    },
    async postFormData(url, formData, success, error, complete) {
        const authToken = State.GlobalGet(API_AUTH_TOKEN);
        const headers = authToken ? {
            //'Authorization': `${authToken}`,
            //'ap-user-id': State.GlobalGet(KEY_USER_ID),
            //'ap-user-key': State.GlobalGet(KEY_USER_KEY),
        } : {
            //'ap-user-id': State.GlobalGet(KEY_USER_ID),
            //'ap-user-key': State.GlobalGet(KEY_USER_KEY),
        };
        try {
            await $.ajax({
                url,
                method: "POST",
                timeout: 0,
                contentType: false,
                headers,
                processData: false,
                mimeType:"multipart/form-data",
                data: formData,
                success,
                error,
                complete,
            });
        } catch (err) {
            console.error('Error during POST formData request:', err);
        }
    }
};