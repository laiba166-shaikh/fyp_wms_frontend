import { createTheme } from "@material-ui/core";
import typography from "./typography";

const theme=createTheme({
    palette:{
        primary:{
            main:"#272d3e",
            dark:"#252b3b",
            light:"#2b3244"
        },
        secondary:{
            main:"#1979a9",
            light:"#1b7fb1"
        }
    },
    typography,
    shadows:["none"]
});

export default theme;