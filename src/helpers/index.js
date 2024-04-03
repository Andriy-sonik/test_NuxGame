export const getUserIdFromUrl = (url) => {
  const matches = url.match(/\/user\/(\d+)$/)
  if (matches && matches.length > 1) {
    return matches[1]
  } else {
    return null
  }
}
