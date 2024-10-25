const buildInitialValues = (entity, initialEntityValues) => {
  const initialValues = { ...initialEntityValues }
  Object.keys(initialEntityValues).forEach(key => {
    if (key in entity && key !== 'password') {
      initialValues[key] = entity[key]
    }
  })
  return initialValues
}

export { buildInitialValues }
