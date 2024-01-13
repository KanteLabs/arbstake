// allow this to be user changeable - https://support.crowdin.com/api/language-codes/
const userLocale = 'en-US'

const currencyOptions: Intl.NumberFormatOptions = {
  currency: 'USD',
  style: 'currency',
  minimumFractionDigits: 2
  // notation: 'compact', //user can choose this
}

const numberOptions: Intl.NumberFormatOptions = {
  style: 'decimal',
  maximumFractionDigits: 2
}

export const numberFormatter = {
  compact: (value?: string | number, digits = 4) => {
    const formatter = new Intl.NumberFormat(userLocale, {
      ...numberOptions,
      notation: 'compact',
      maximumFractionDigits: digits
    })
    return formatter.format(Number(value ?? 0))
  },
  format: (value?: string | number, digits = 2) => {
    const formatter = new Intl.NumberFormat(userLocale, {
      ...numberOptions,
      maximumFractionDigits: digits
    })
    return formatter.format(Number(value ?? 0))
  }
}

export const currencyFormatter = {
  compact: (value?: string | number, digits = 4) => {
    const formatter = new Intl.NumberFormat(userLocale, {
      ...currencyOptions,
      notation: 'compact',
      maximumFractionDigits: digits
    })
    return formatter.format(Number(value ?? 0))
  },
  format: (value?: string | number, digits = 2) => {
    const formatter = new Intl.NumberFormat(userLocale, {
      ...currencyOptions,
      minimumFractionDigits: digits
    })
    return formatter.format(Number(value ?? 0))
  }
}
