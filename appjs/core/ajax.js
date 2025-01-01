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

        const authToken = State.GlobalGet(API_AUTH_TOKEN);
        const headers = authToken ? {
            'Authorization': `Bearer ${authToken}`,
            'ap-user-id': 'HeaderValue',
            'ap-user-key': 'HeaderValue',
        } : {
            'ap-user-id': 'user-kayesh',
            'ap-user-key': 'asp.net programmer',
        };
        try {
            await $.ajax({
                url,
                method: "POST",
                contentType: "application/json",
                data,
                success,
                error,
                complete,
                headers,
            });
        } catch (err) {
            console.error('Error during POST request:', err);
        }
    }
};