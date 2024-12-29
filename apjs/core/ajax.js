const API = {
  async  get(url, success, error, complete) {
     await   $.ajax({
            url,
            method: "GET",
            success,
            error,
            complete,
        });
    },

 async   post(url, data, success, error, complete) {
     await   $.ajax({
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
