export const convertIsoToLocaleString = (isoDate: string) => {
    const newDate = new Date(isoDate)
    return newDate.toLocaleTimeString()
};