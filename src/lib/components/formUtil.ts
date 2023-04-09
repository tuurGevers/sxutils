import { writable } from "svelte/store";

export class FormUtil {
    tekst: string;
    change: any;

    constructor() {
        this.tekst = "";
        this.change = writable(false);
    }

    updateString(
        mode: string,
        tekst: string,
        selection: { start: number; end: number },
        link = ""
    ) {
        this.change.set(true);
        let tempString = "";
        switch (mode) {
            case "bold": {
                tempString += "<strong>";
                tempString += tekst.slice(selection.start, selection.end);
                tempString += "</strong>";
                break;
            }
            case "underline": {
                tempString += "<u>";
                tempString += tekst.slice(selection.start, selection.end);
                tempString += "</u>";
                break;
            }
            case "italic": {
                tempString += "<i>";
                tempString += tekst.slice(selection.start, selection.end);
                tempString += "</i>";
                break;
            }
            case "strikethrough": {
                tempString += "<s>";
                tempString += tekst.slice(selection.start, selection.end);
                tempString += "</s>";
                break;
            }
            case "sup": {
                tempString += "<sup>";
                tempString += tekst.slice(selection.start, selection.end);
                tempString += "</sup>";
                break;
            }
            case "sub": {
                tempString += "<sub>";
                tempString += tekst.slice(selection.start, selection.end);
                tempString += "</sub>";
                break;
            }
            case "link": {
                tempString += `<a href="${link}">`;
                tempString += tekst.slice(selection.start, selection.end);
                tempString += "</a>";
                break;
            }
        }
        this.alterValue(tempString, tekst, selection);
    }

    alterValue(tempString: string, tekst: string, selection: { start: number; end: number }) {
        let charArr = tekst.split("");

        let strbuilder = "";
        let end = charArr.slice(selection.end);
        let start = charArr.slice(0, selection.start);

        for (let l = 0; l < start.length; l++) {
            strbuilder += start[l];
        }
        strbuilder += tempString;
        for (let l = 0; l < end.length; l++) {
            strbuilder += end[l];
        }
        this.tekst = strbuilder;
    }
}
