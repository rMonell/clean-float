const round = (nbr: number, precision: number) => Math.round(nbr * precision) / precision

/**
 * Corrects floating-point precision errors in JavaScript numbers.
 *
 * The `cleanFloat` function rounds a floating-point number to remove artifacts caused
 * by binary floating-point representation errors.
 *
 * It identifies repeating sequences in the decimal part (e.g., "0.30000000000000004" or "1.1111111")
 * and rounds to the last consistent decimal digit. This function is also capable of handling
 * numbers in exponential notation.
 *
 * @example
 * smoothFloat(0.2 + 0.1) // 0.3
 * smoothFloat(5555.549999999999) // 5555.55
 * smoothFloat(1.23e-10 + 1.1e-10) // 2.33e-10
 *
 * @param {number} nbr - The floating-point number to correct.
 * @param {Object} options - Configuration options.
 * @param {number} [options.minPrecision] - The minimum number of decimal places to retain, defaults to the threshold where repeating decimals are detected.
 * @returns {number} The corrected floating-point number, with artifacts removed.
 */
export const cleanFloat = (nbr: number, options: { minPrecision?: number } = {}) => {
  const stringifiedNbr = nbr.toString()
  const decimals = stringifiedNbr.split('.')[1]

  if (!decimals) {
    return nbr
  }

  const match = decimals.match(/(\d)\1{2,}/)

  if (!match) {
    return nbr
  }

  const threshold = (match.index || 0) + 1
  const exp = decimals.match(/e[+-][0-9]+$/)
  const rest = decimals.slice(threshold + match[0].length).replace(exp?.[0] || '', '')

  if (rest.length > 1 || threshold < 0) {
    return nbr
  }

  const roundPrecision = Math.pow(
    10,
    options.minPrecision && options.minPrecision >= threshold ? options.minPrecision : threshold
  )
  const powIndex = stringifiedNbr.indexOf('e')

  if (roundPrecision.toString().length === decimals.length) {
    return nbr
  }

  if (powIndex >= 0) {
    const pow = stringifiedNbr.slice(powIndex)
    const normalized = round(parseFloat(stringifiedNbr.slice(0, powIndex)), roundPrecision)
    return parseFloat(`${normalized}${pow}`)
  }

  return round(nbr, roundPrecision)
}
