export const formatClp = (price) => {
  const number = Number(price);
  const format = number.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  });
  return format;
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

export const titleCase = (string) => {
  string = string.toLowerCase();

  string = string.split(" ");

  for (var i = 0; i < string.length; i++) {
    string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1);
  }

  return string.join(" ");
};
