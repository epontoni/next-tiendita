import { extendTheme, theme } from "@chakra-ui/react";

export default extendTheme({
    colors: {
        nuevoColor: "#ff4500" //theme.colors.purple,
    },
    styles: {
        global: {
            body: {
                backgroundColor: "gray.50",
                color: "gray.800",
            },
        },
    }
})
