const inputRuleMixin = {
    computed: {
        rules() {
            return {
                required: (value) => !!value || "Required Input.",

                counter: (counter, value) => {
                    return (
                        (value || "").length >= counter ||
                        `Minimum of ${counter} characters.`
                    );
                },

                email: (value) => {
                    const pattern =
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || "Invalid e-mail.";
                },

                mobileNumber: (value) => {
                    const pattern = /^(9|\+639)\d{9}$/;
                    return pattern.test(value) || "Invalid mobile number.";
                },

                sameAs: (value1, value2, message) =>
                    value1 === value2 || message,

                youtubeURL: (value) => {
                    const pattern =
                        /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(\?\S*)?$/;
                    return pattern.test(value) || "Invalid YouTube URL";
                },
            };
        },
    },
};

export default inputRuleMixin;
