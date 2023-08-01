export const shortDateTime = (date) => {
    let dateObject = new Date(date);
    return dateObject.toLocaleDateString();
}

export const shortLocalTime = (date) => {
    let dateObj = new Date(date);
    return dateObj.toLocaleTimeString();
}

export const formatMoneyTo2DP = (amount) => {
    return amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2});
}