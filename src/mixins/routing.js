const routingMixin = {
    methods: {
        redirectTo(userType) {
            let routeName = "patient-dashboard";
            if (userType === "clinic_member")
                routeName = "clinic-member-dashboard";
            if (userType === "super_admin") routeName = "super-admin-dashboard";
            return routeName;
        },
    },
};

export default routingMixin;
