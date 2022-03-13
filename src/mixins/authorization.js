const authorizationMixin = {
    computed: {
        user() {
            const details = this.$store.state.authentication.details;
            return details.user || null;
        },

        isAdmin() {
            return this.user.clinic_member.member_type === "admin";
        },

        isDoctor() {
            return this.user.clinic_member.member_type === "doctor";
        },

        isCsr() {
            return this.user.clinic_member.member_type === "csr";
        },
    },
};

export default authorizationMixin;
