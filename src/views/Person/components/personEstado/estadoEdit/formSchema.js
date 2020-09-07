const formSchema = {
  descripcion: {
    label: "Descripcion (opcional)",
    type: "text",
  },
  estado: {
    label: 'Estado *',
    type: 'select',
    options: [
      { value: '1', label: 'Activo'},
      { value: '2', label: 'Inactivo'},
      { value: '3', label: 'Retiro'},
    ],
    select: true,
  }
};

export default formSchema;