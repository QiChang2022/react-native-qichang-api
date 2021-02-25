export function objectToQueryStr(object: Object) {
    const queryStr = `?${Object.keys(object)
        .map((key) => {
            const element = encodeURIComponent((object as any)[key]);
            return key + '=' + element;
        })
        .join('&')}`;

    return queryStr;
}
