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

export const formatDate = (isoDate) => {
  const dateObj = new Date(isoDate);

  if (isNaN(dateObj)) return "Fecha inválida";

  const dia = String(dateObj.getDate()).padStart(2, "0");
  const mes = String(dateObj.getMonth() + 1).padStart(2, "0");
  const año = dateObj.getFullYear();

  return `${dia} / ${mes} / ${año}`;
};

export const generateOrderNumber = (fecha_compra, id) => {
  const date = new Date(fecha_compra);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const paddedId = String(id).padStart(5, "0");

  return `ORD-${year}${month}${day}-${paddedId}`;
};

export const titleCase = (string) => {
  string = string.toLowerCase();

  string = string.split(" ");

  for (var i = 0; i < string.length; i++) {
    string[i] = string[i].charAt(0).toUpperCase() + string[i].slice(1);
  }

  return string.join(" ");
};
