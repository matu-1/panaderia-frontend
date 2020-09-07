const formSchema = {
  nombre: {
    label: "Nombre *",
    type: "text",
  },
  costo: {
    label: "Costo *",
    //helperText: "texto de ayuda",
    type: "text",
  },
  stock: {
    label: "Stock *",
    type: "text",
  },
  stock_minimo: {
    label: "Stock minimo *",
    type: "text",
  },
  stock_maximo: {
    label: "Stock maximo *",
    type: "text",
  },
};
export default formSchema;
