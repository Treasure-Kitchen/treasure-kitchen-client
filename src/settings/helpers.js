export const shortDateTime = (date) => {
    let dateObject = new Date(date);
    return dateObject.toLocaleDateString();
}

export const shortLocalTime = (date) => {
    let dateObj = new Date(date);
    return dateObj.toLocaleTimeString();
}

export const toISOLikeDatestring = (value) => {
    const dateObj = new Date(value)
    const date = (new Date(dateObj.getTime() - dateObj.getTimezoneOffset()*60000))
                    .toISOString()
                    .split('.')[0];
    //remove the milliseconds and seconds parts of the date string
    return date.substring(0, date.length - 3);
}

export const formatMoneyTo2DP = (amount) => {
    return amount?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
}

export const numberToTime = (number) => {
    const hour = (number / 1) - (number % 1);
    const minutes = (number % 1) * 60;
    const hourText = hour > 1 ? `${hour} Hours` : `${hour} Hour`;
    const minText = minutes > 1 ? `${minutes} Minutes` : `${minutes} Minute`;
    return hourText + " " + minText;
}

export const toEmailLink = (address) => {
    return `mailto:${address}`
}

export const toPhoneLink = (phone, ext) => {
    return `tel:${phone}${ext}`
}