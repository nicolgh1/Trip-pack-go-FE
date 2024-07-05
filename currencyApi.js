import Freecurrencyapi from '@everapi/freecurrencyapi-js';
import currencyCodes from './currencyCodes.json';

const API_KEY = 'fca_live_IropyDFdmtx6LGLRrwMt76lfEgT2pRcVC0XswPXa';
const freecurrencyapi = new Freecurrencyapi(API_KEY);

export const fetchExchangeRate = async (tripLocation) => {
    const baseCountry = 'UK'; // for testing only
    let tripCountry = '';

   if (tripLocation.terms) {
        tripCountry = tripLocation.terms[tripLocation.terms.length - 1].value;
    }

    const baseCurrencyCode = currencyCodes[baseCountry];
    const exchangeCurrencyCode = currencyCodes[tripCountry];

    if (!baseCurrencyCode || !exchangeCurrencyCode) {
        console.error('Error: Invalid currency code');
        return null;
    }

    if(baseCountry === tripCountry){
        return null;
    }

    try {
        const response = await freecurrencyapi.latest({
            base_currency: baseCurrencyCode,
            currencies: exchangeCurrencyCode
        });
        const rate = response.data[exchangeCurrencyCode].toFixed(2);
        return `1 ${baseCurrencyCode} = ${rate} ${exchangeCurrencyCode}`
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        throw error;
    }
};
