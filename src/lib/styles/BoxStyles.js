
    export const basic = (bg, color) => {
        let style = {
            m: 0,
            p: 0,
        }
        if (bg) {
            style.bgc = bg
        }
        if (color) {
            style.color = color
        }
        return style
    }

    export const paper = (bg="#fff", float=1, rounding=2) => {
        let style = {
            flex: "col",
            alignItems: "center",
            m:4
        }
        style.bgc = bg
        style.float = float
        style.rounding = rounding

        return style
    }

    export const bgImage = (src)=>{
        return {
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no repeat",
            backgroundSize: "cover",
            backgroundPosition: "center"
        }
    }

