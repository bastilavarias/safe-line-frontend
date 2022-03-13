const authorizationMixin = {
    computed: {
        user() {
            const details = this.$store.state.authentication.details;
            return details.user || null;
        },

        isAdmin() {
            if (!this.user.clinic_member) return false;
            return this.user.clinic_member.member_type === "admin";
        },

        isDoctor() {
            if (!this.user.clinic_member) return false;
            return this.user.clinic_member.member_type === "doctor";
        },

        isCsr() {
            if (!this.user.clinic_member) return false;
            return this.user.clinic_member.member_type === "csr";
        },
    },
};

export default authorizationMixin;
