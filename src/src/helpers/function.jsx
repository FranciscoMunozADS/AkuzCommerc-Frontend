export const formatClp = (price) => {
    const format = price.toLocaleString("es-CL");
    const value = `$ ${format}`
    return value
}