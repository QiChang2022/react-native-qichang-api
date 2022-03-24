export function objectToQueryStr(object?: Object) {
    if (!object) return '';

    const queryStr = `?${Object.keys(object)
        .map((key) => {
            const element = encodeURIComponent((object as any)[key]);
            return key + '=' + element;
        })
        .join('&')}`;

    return queryStr;
}
