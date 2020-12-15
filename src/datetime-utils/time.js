export const TimeRange = (start,end) => {
    return {
        start: start,
        end: end,
        contains:(time) => TimeRangeContains({start,end},time) 
    };
}
 
export const extractTimeFromDate = (date,format) => {
    const defaultFormat = "HH:MM";
    if (format === undefined) format = defaultFormat;
    if(format === "HH:MM") {
        return `${date.getHours()}:${date.getMinutes()}`;
    }
    return "00:00";
}

const TimeRangeContains = ({start,end},time,format) => {
    const defaultFormat = "HH:MM";
    if(format === undefined) format = defaultFormat;
    if(format === "HH:MM") {
        let [startToDecimal, endToDecimal, timeToDecimal] = [start,end,time].map(moment =>
            parseInt(moment.split(":")[0] * 60 + parseInt(moment.split(":")[1]))
        )
        if(
            timeToDecimal >= startToDecimal && timeToDecimal <= endToDecimal 
        ) return true;
    }

    return false;

}

export const getStringifedDate = (date, format) => {
    const defaultFormat = "HH:MM";
    if (format === undefined) format = defaultFormat;

    if(format === "HH:MM") {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        if(hours<10) hours = `0${hours}`;
        if (minutes < 10) hours = `0${minutes}`;
        return `${hours}:${minutes}`;
    }

    return "";
}
