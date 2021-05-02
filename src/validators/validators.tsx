
export const validateUrl = (url: string) => {
    const regex = new RegExp("(https://)(www.)?(filmweb.pl)([\\wóąśłżźćńę.,@?^=%&amp;:/~+#-]*[\\w])");
        if (regex.test(url)) {
            return true
        } 
        return false;
}

export const validateExists = (array: Array<any>, prop:string, item: any) => {
    return array.some(x => x[prop] === item);
}

export const validateIncludes = (array: Array<any>, prop:string, item: any) => {
    return array.some(x => x[prop].includes(item));
} 