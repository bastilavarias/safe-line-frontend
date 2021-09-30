const tokenService = {
    save(token) {
        window.localStorage.setItem("access_token", token);
    },

    get() {
        return window.localStorage.getItem("access_token") || null;
    },

    remove() {
        window.localStorage.removeItem("access_token");
    },
};

export default tokenService;
