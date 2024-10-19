import moment from "moment-timezone";

export const formatDate = (date: Date, arg?: { timezone?: string; format: string }): string => {
    // Default timezone: Asia/Jakarta
    // Default format: YYYY-MM-DD HH:mm:ss
    arg = { timezone: "Asia/Jakarta", format: "YYYY-MM-DD HH:mm:ss", ...arg };
    return moment(date).tz(arg.timezone!).format(arg.format);
};
