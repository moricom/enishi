export const formatDate = (date: Date, format: string): string => {
    /* eslint-disable @typescript-eslint/no-magic-numbers */
    let f = format.replace(/yyyy/gu, String(date.getFullYear()));
    f = f.replace(/MM/gu, `0${date.getMonth() + 1}`.slice(-2));
    f = f.replace(/dd/gu, `0${date.getDate()}`.slice(-2));
    f = f.replace(/HH/gu, `0${date.getHours()}`.slice(-2));
    f = f.replace(/mm/gu, `0${date.getMinutes()}`.slice(-2));
    f = f.replace(/ss/gu, `0${date.getSeconds()}`.slice(-2));
    f = f.replace(/SSS/gu, `00${date.getMilliseconds()}`.slice(-3));
    /* eslint-enable */
    return f;
};
