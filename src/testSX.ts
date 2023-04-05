import type {cssClass} from "./script/classing/types";
import {size} from "./script/classing/types";

export default [
    {
        name: "app",
        css: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
        },
        width: size.medium,
    }
];
