import linkField from './linkFields'

export const getNav = (handle, g) => {
  if (!g[handle]) {
    return []
  }
  const mapped = g[handle].map((item) => {
    return linkField({
      ...item,
      children: item.children.map((child) => linkField(child))
    })
  })

  return mapped
}
