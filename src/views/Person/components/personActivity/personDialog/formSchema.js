const formSchema = {
  descripcion: {
    label: "Descripcion *",
    type: "text",
  },
  asistio: {
    label: 'Asistio *',
    type: 'select',
    options: [
      { value: 'si', label: 'Si'},
      { value: 'no', label: 'No'},
    ],
    select: true,
  }
};

export default formSchema;