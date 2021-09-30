const tokenService = {
    save(token) {
        window.localStorage.setItem("token", token);
    },

    get() {
        return window.localStorage.get("token") || null;
    },

    remove() {
        window.localStorage.removeItem("token");
    },
};

export default tokenService;
