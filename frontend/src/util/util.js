export const convertDate = (date) => {
    let convertedDate = new Date(date).toLocaleDateString('fr-FR')
    let convertedTime = new Date(date).toLocaleTimeString('fr-FR')
    let dateTime = `Le ${convertedDate} à ${convertedTime}`
    return dateTime
}
