import validator from "validator";

export function keepOnlyNumber(str: string) {
    let out = "";
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (validator.isNumeric(char)) out += char;
    }
    return out;
}

export * from "./api";
export * from "./storage";
export * from "./navigation";
