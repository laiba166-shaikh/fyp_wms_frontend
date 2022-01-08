import { createTheme } from "@material-ui/core";
import typography from "./typography";

const theme=createTheme({
    palette:{
        primary:{
            main:"#252b3b",
            light:"#3b445e"
        },
        secondary:{
            main:"#2b3a53",
            light:"#8b96a8"
        }
    },
    typography,
    shadows:["none"]
});

export default theme;