const round = (nbr: number, precision: number) => Math.round(nbr * precision) / precision

export const cleanFloat = (nbr: number) => {
  const stringifiedNbr = nbr.toString()
  const decimals = stringifiedNbr.split('.')[1]

  if (!decimals) {
    return nbr
  }

  const match = decimals.match(/(\d)\1{2,}/)

  if (!match) {
    return nbr
  }

  const threshold = match.index || 0
  const exp = decimals.match(/e[+-][0-9]+$/)
  const rest = decimals.slice(threshold + match[0].length).replace(exp?.[0] || '', '')

  if (rest.length > 1 || threshold < 0) {
    return nbr
  }

  const roundPrecision = Math.pow(10, threshold)
  const powIndex = stringifiedNbr.indexOf('e')

  if (powIndex >= 0) {
    const pow = stringifiedNbr.slice(powIndex)
    const normalized = round(parseFloat(stringifiedNbr.slice(0, powIndex)), roundPrecision)
    return parseFloat(`${normalized}${pow}`)
  }

  return round(nbr, roundPrecision)
}
