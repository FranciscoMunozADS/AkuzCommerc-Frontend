export const formatClp = (price) => {
  const format = price.toLocaleString("es-CL");
  const value = `$ ${format}`;
  return value;
};

export const formatCellNumber = (phone) => {
  let temporal = phone?.toString();

  if (!temporal?.includes("+56 9")) {
    temporal = `+56 9 ${phone}`;
  }

  return temporal;
};

export const formatDate = (date) => {
  if (!/^\d{8}$/.test(date)) return "Fecha inválida";

  const dia = date.slice(0, 2);
  const mes = date.slice(2, 4);
  const año = date.slice(4, 8);

  return `${dia} / ${mes} / ${año}`;
};
