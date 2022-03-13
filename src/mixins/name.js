const nameMixin = {
    methods: {
        extractMembersName({ appointment_members = [] }, type) {
            const index = type === "doctor" ? 0 : 1;
            const { first_name, last_name } =
                appointment_members[index].user.profile;
            return `${first_name} ${last_name}`;
        },
    },
};

export default nameMixin;
