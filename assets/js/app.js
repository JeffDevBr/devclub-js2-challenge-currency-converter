const selectConvertFrom = document.querySelector('[data-js="convertFrom"]')
const selectTargetCurrency = document.querySelector('[data-js="targetCurrency"]')
const inputValue = document.querySelector('[data-js="input-currency"]')
const convertButton = document.querySelector('[data-js="btn-convert"]')

const valueOfCoins = {
    Real: { value: 1.00, coin: "R$", coinName: "Real Brasileiro", locale: "pt-BR", currency: "BRL" },
    dollar: { value: 5.65, coin: "US$", coinName: "Dólar Americano", locale: "en-US", currency: "USD" },
    Euro: { value: 6.13, coin: "€", coinName: "Euro", locale: "de-DE", currency: "EUR" },
    Libra: { value: 7.26, coin: "£", coinName: "Libra", locale: "en-GB", currency: "GBP" },
    Bitcoin: { value: 383813.30, coin: "BTC", coinName: "Bitcoin", locale: "en-US", currency: "BTC", fractionDigits: 8 }
}

const intlFormat = (element, value, locale, currency, fractionDigits) => {
    element.textContent = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits
    }).format(value)
}

const currencyCalculation = () => {
    const inputCurrencyAmount = inputValue.value
    const convertFrom = selectConvertFrom.value
    const targetCurrency = selectTargetCurrency.value

    const inputCurrencyDisplay = document.querySelector('[data-js="inputCurrencyDisplay"]')
    const outputCurrencyDisplay = document.querySelector('[data-js="outputCurrencyDisplay"]')

    const localeFrom = valueOfCoins[convertFrom].locale
    const currencyFrom = valueOfCoins[convertFrom].currency
    const { locale, currency, fractionDigits = 2 } = valueOfCoins[targetCurrency]


    const convertCurrency = (inputCurrencyAmount) => {
        const inputOne = valueOfCoins[convertFrom].value
        const inputTwo = valueOfCoins[targetCurrency].value
        const amount = Number(inputCurrencyAmount)

        const calc1 = amount * inputOne
        const converted = calc1 / inputTwo

        intlFormat(outputCurrencyDisplay, converted, locale, currency, fractionDigits)
    }

    intlFormat(inputCurrencyDisplay, inputCurrencyAmount, localeFrom, currencyFrom)
    convertCurrency(inputCurrencyAmount)
}

const handleCurrencyChangeOrigin = event => {
    const selectValue = event.target.value
    const targetCurrencyImageOrigin = document.querySelector('#toConvertImg')
    const nameCoinOrigin = document.querySelector('#coinNameOrigin')

    const nameCoin = valueOfCoins[`${selectValue}`].coinName
    const coin = valueOfCoins[`${selectValue}`].coin
    targetCurrencyImageOrigin.src = `assets/img/${selectValue}.png`
    nameCoinOrigin.textContent = nameCoin

    inputValue.placeholder = `${coin} 10.000,00`

    currencyCalculation()
}

const handleCurrencyChange = event => {
    const targetCurrencyImage = document.querySelector('#targetCurrencyImage')
    const coinName = document.querySelector('#coinName')
    const selectValue = event.target.value
    const nameCoin = valueOfCoins[`${selectValue}`].coinName
    targetCurrencyImage.src = `assets/img/${selectValue}.png`
    coinName.textContent = nameCoin

    currencyCalculation()
}

selectConvertFrom.addEventListener('change', handleCurrencyChangeOrigin)
selectTargetCurrency.addEventListener('change', handleCurrencyChange)
convertButton.addEventListener('click', currencyCalculation)
