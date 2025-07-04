export const formatClp = (price) => {
    const format = price.toLocaleString("es-CL");
    const value = `$ ${format}`
    return value
}

export const formatCellNumber = (phone) => {
  let temporal = phone?.toString();

  if (!temporal?.includes('+56 9')) {
    temporal = `+56 9 ${phone}`;
  }
  
  return temporal;
};