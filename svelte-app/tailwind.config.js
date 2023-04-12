/** @type {import("tailwindcss").Config} */
export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        blockquote: {
                            borderColor: theme("colors.orange.500"),
                        },
                        a: {
                            color: theme("colors.white"),
                            "&:hover": {
                                color: theme("colors.neutral.100"),
                            },
                            background: theme("colors.orange.500"),
                            borderRadius: theme("borderRadius.lg"),
                            padding: theme("spacing.1"),
                            paddingLeft: theme("spacing.2"),
                            paddingRight: theme("spacing.2"),
                            textDecoration: "none",
                        },
                        pre: {
                            background: theme("colors.neutral.800"),
                            borderRadius: theme("borderRadius.2xl"),
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
    ],
}
