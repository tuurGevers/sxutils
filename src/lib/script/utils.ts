export const container = {
    none: 0,
    sm: 640,
    md: 768,
    lg: 1024
};


export class Styler {
    styling: string;
    sm: string;
    md: string;
    lg: string;
    global: string;

    constructor() {
        this.styling = "";
        this.sm = "";
        this.md = "";
        this.lg = "";
        this.global = " ";
    }

    async createStyle(sx: object, sxClass?: object[]) {
        this.sm = "";
        this.md = "";
        this.lg = "";
        this.global = " ";
        let joined = sx;
        if (sxClass) {
            for (let i = 0; i < sxClass.length; i++) {
                joined = joinSx(joined, sxClass[i]);
            }
        }
        for (const [key, value] of Object.entries(joined)) {
            let special: [string, boolean] | undefined;
            if (typeof value === "object") {
                if (typeof value.sm !== "undefined") {
                    special = this.checkSpecial(key, value.sm);
                    special[1] ? (this.sm += special[0]) : (this.sm += `${key}:${convertNumbers(value.sm)}; `);
                }
                if (typeof value.md !== "undefined") {
                    special = this.checkSpecial(key, value.md);
                    special[1] ? (this.md += special[0]) : (this.md += `${key}:${convertNumbers(value.md)}; `);
                }
                if (typeof value.lg !== "undefined") {
                    special = this.checkSpecial(key, value.lg);
                    special[1] ? (this.lg += special[0]) : (this.lg += `${key}:${convertNumbers(value.lg)}; `);
                }
                if (typeof value.md === "undefined") {
                    special = this.checkSpecial(key, value.lg);
                    special[1] ? (this.md += special[0]) : (this.md += `${key}:${convertNumbers(value.lg)}; `);
                }
            } else {
                special = this.checkSpecial(key, value);
                special[1] ? (this.global += special[0]) : (this.global += `${key}:${value}; `);
            }
        }

        await this.selectStyle();
    }

    containsUppercase(str: string) {
        return /[A-Z]/.test(str);
    }

    selectStyle(width?: number) {
        this.styling = "";
        this.styling += this.global;
        if (width !== undefined) {
            if (width < container.md) {
                this.styling += this.sm;
            } else if (width < container.lg) {
                this.styling += this.md;
            } else {
                this.styling += this.lg;
            }
        }
        return this.styling;
    }


    checkSpecial(key: string, value: any): [string, boolean] {
        let translate = ""
        let valid = false
        switch (key) {
            case "rounding": {
                valid = true
                translate = "border-radius:" + value * 8 + "px;"
                break;
            }
            case "backgroundRepeat": {
                valid = true
                translate  = "background-repeat: " + value + ";"
                break;
            }
            case "backgroundSize": {
                valid = true
                translate  = "background-size: " + value + ";"
                break;
            }
            case "backgroundPosition": {
                valid = true
                translate  = "background-position: " + value + ";"
                break;
            }
            case "float": {
                valid = true
                translate = "box-shadow: 0 5px " + value * 8 + "px 0;"

                break;

            }

            case "flex": {
                switch (value) {
                    case "row": {
                        valid = true
                        translate = "display:flex; flex-direction:row;"
                        break;
                    }
                    case "col": {
                        valid = true
                        translate = "display:flex; flex-direction:column;"
                        break;
                    }
                }
                break;
            }
            case "flexAlign": {
                switch (value) {
                    case "center": {
                        valid = true
                        translate = "align-items:center; justify-content:center;"
                        break;
                    }
                    case "around": {
                        valid = true
                        translate = "align-items:center; justify-content:space-around;"
                        break;
                    }
                }
                break;
            }


            case "m":
            case"margin": {
                valid = true
                translate = "margin: " + convertNumbers(value) + ";";
                break;
            }

            case "mt":
            case"marginTop": {
                valid = true
                translate = "margin-top: " + convertNumbers(value) + ";";
                break;
            }

            case "mr":
            case"marginRight": {
                valid = true
                translate = "margin-right: " + convertNumbers(value) + ";";
                break;
            }

            case "mb":
            case"marginBottom": {
                valid = true
                translate = "margin-bottom: " + convertNumbers(value) + ";";
                break;
            }

            case "ml":
            case"marginLeft": {
                valid = true
                translate = "margin-left: " + convertNumbers(value) + ";";
                break;
            }

            case "p":
            case"padding": {
                valid = true
                translate = "padding: " + convertNumbers(value) + ";";
                break;
            }

            case "pt":
            case"paddingTop": {
                valid = true
                translate = "padding-top: " + convertNumbers(value) + ";";
                break;
            }

            case "pr":
            case"paddingRight": {
                valid = true
                translate = "padding-right: " + convertNumbers(value) + ";";
                break;
            }

            case "pb":
            case"paddingBottom": {
                valid = true
                translate = "padding-bottom: " + convertNumbers(value) + ";";
                break;
            }

            case "pl":
            case"paddingLeft": {
                valid = true
                translate = "padding-left: " + convertNumbers(value) + ";";
                break;
            }

            case "bgc":
            case"bgColor": {
                valid = true
                translate = "background-color: " + convertNumbers(value) + ";";
                break;
            }

            default: {
                if (this.containsUppercase(key)) {
                    valid = true
                    let cssKey = key.split(/(?=[A-Z])/).join('-').toLowerCase()
                    translate = cssKey + ":" + convertNumbers(value) + "; "
                    break;
                } else {
                    valid = true
                    translate = key + ":" + convertNumbers(value) + "; "
                    break;
                }

            }
        }

        return [translate, valid]
    }
}

function joinSx(sx: object, sxClass: object): object {
    let joinedSX = {}
    for (const [key, value] of Object.entries(sxClass)) {
        if (!(key in sx)) {
            joinedSX[key] = value
        }
    }
    joinedSX = Object.assign(joinedSX, sx)
    return joinedSX
}

const convertNumbers = (value) => {
    if (typeof (value) === "string") {
        const numbers = value.split(" ");
        if (numbers.length > 1) {
            const validNumbers = numbers.filter(num => !isNaN(Number(parseInt(num) && !/[^0-9]/.test(num))));
            if (validNumbers.length > 0 && validNumbers.length <= 4) {
                return numbers.map(num => {
                    if (!isNaN(parseInt(num)) && !/[^0-9]/.test(num)) {
                        return parseInt(num) * 8 + "px";
                    } else {
                        return num;
                    }
                }).join(" ");
            }
        } else {
            return value;
        }
    } else {
        return parseInt(value) * 8 + "px";
    }
}

