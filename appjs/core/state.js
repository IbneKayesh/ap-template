const State = {
    GlobalSet(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    },

    GlobalGet(key){
        return localStorage.getItem(key);
    },
}