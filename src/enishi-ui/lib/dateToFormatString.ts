type Locale = "en-US" | "ja-JP";

const padding = (n: number, d: number, p?: string) => {
    const x = p ?? "0";
    return (x.repeat(d) + String(n)).slice(-d);
};

const getDataByLocale = <T extends string[]>(locale: Locale, obj: { [key in Locale]: T }, param: number): string | undefined => {
    const array = obj[locale];
    return array[param];
};

/* eslint-disable @typescript-eslint/no-magic-numbers */
const generateFormat = (date: Date, pad?: string) => ({
    A: (_: "en-US" | "ja-JP") => (date.getHours() < 12 ? "AM" : "PM"),
    D: (_: "en-US" | "ja-JP") => date.getDate(),
    DD: (_: "en-US" | "ja-JP") => padding(date.getDate(), 2, pad),
    H: (_: "en-US" | "ja-JP") => date.getHours(),
    HH: (_: "en-US" | "ja-JP") => padding(date.getHours(), 2, pad),
    M: (_: "en-US" | "ja-JP") => date.getMonth() + 1,
    MM: (_: "en-US" | "ja-JP") => padding(date.getMonth() + 1, 2, pad),
    MMM: (l: "en-US" | "ja-JP") =>
        getDataByLocale(
            l,
            {
                "en-US": ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."],
                "ja-JP": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
            },
            date.getMonth()
        ),
    MMMM: (l: "en-US" | "ja-JP") =>
        getDataByLocale(
            l,
            {
                "en-US": [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December"
                ],
                "ja-JP": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
            },
            date.getMonth()
        ),
    W: (l: "en-US" | "ja-JP") =>
        getDataByLocale(
            l,
            {
                "en-US": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "ja-JP": ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"]
            },
            date.getDay()
        ),
    YY: (_: "en-US" | "ja-JP") => padding(date.getFullYear() % 100, 2, pad),
    YYYY: (_: "en-US" | "ja-JP") => padding(date.getFullYear(), 4, pad),
    a: (l: "en-US" | "ja-JP") =>
        getDataByLocale(
            l,
            {
                "en-US": ["am", "pm"],
                "ja-JP": ["午前", "午後"]
            },
            date.getHours() < 12 ? 0 : 1
        ),
    h: (_: "en-US" | "ja-JP") => date.getHours() % 12,
    hh: (_: "en-US" | "ja-JP") => padding(date.getHours() % 12, 2, pad),
    m: (_: "en-US" | "ja-JP") => date.getMinutes(),
    mm: (_: "en-US" | "ja-JP") => padding(date.getMinutes(), 2, pad),
    s: (_: "en-US" | "ja-JP") => date.getSeconds(),
    ss: (_: "en-US" | "ja-JP") => padding(date.getSeconds(), 2, pad),
    w: (l: "en-US" | "ja-JP") =>
        getDataByLocale(
            l,
            {
                "en-US": ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
                "ja-JP": ["日", "月", "火", "水", "木", "金", "土"]
            },
            date.getDay()
        )
});
/* eslint-enable */

const generateReplacer =
    (format: ReturnType<typeof generateFormat>, locale: Locale) =>
    (
        match: string,
        fmt:
            | ""
            | "A"
            | "a"
            | "D"
            | "DD"
            | "H"
            | "h"
            | "HH"
            | "hh"
            | "M"
            | "m"
            | "MM"
            | "mm"
            | "MMM"
            | "MMMM"
            | "s"
            | "ss"
            | "W"
            | "w"
            | "YY"
            | "YYYY"
    ) => {
        if (fmt === "") return "%";
        const func = format[fmt];

        if (func === undefined) return match;

        return String(func(locale));
    };

type DateToFormatStringParameter = {
    date: Date;
    format: string;
    locale?: Locale;
    pad?: string;
};
export const dateToFormatString = ({ date, format: fmt, locale = "ja-JP", pad }: DateToFormatStringParameter): string => {
    const format = generateFormat(date, pad);
    const formatString = [""];
    Object.keys(format).forEach((key) => formatString.push(key));
    const re = new RegExp(`%(${formatString.join("|")})%`, "gu");

    return fmt.replace(re, generateReplacer(format, locale));
};
