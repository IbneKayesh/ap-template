const API = {
    get(url, success, error, complete) {
        $.ajax({
            url,
            method: "GET",
            success,
            error,
            complete,
        });
    },

    post(url, data, success, error, complete) {
        $.ajax({
            url,
            method: "POST",
            contentType: "application/json",
            data,
            success,
            error,
            complete,
        });
    }
};