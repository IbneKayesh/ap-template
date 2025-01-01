const loginState = "loginState";

const State = {
    storage: {},
    
    PageSet(key, value) {
        this.storage[key] = value;
    },

    PageGet(key) {
        return this.storage[key];
    },

    PageRemove(key) {
        //need to fix it
    },
    
    GlobalSet(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    GlobalGet(key) {
        return localStorage.getItem(key);
    },

    GlobalRemove(key) {
        localStorage.removeItem(key);
    }
}