const { isValidPhoneNumber, parsePhoneNumberFromString } = require('libphonenumber-js');

module.exports = {
    isValidEmail : ( data ) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(data);
    },
    isValidString : ( data ) => {
        const emailRegex = /^[a-zA-Z0-9@_.-]+$/;

        return emailRegex.test(data);
    },
    isValidPhoneNumber : ( countryCode, phone ) => {
        const fullPhoneNumber = `${countryCode}${phone}`;

        const phoneNumberObj = parsePhoneNumberFromString(fullPhoneNumber);

        return phoneNumberObj ? phoneNumberObj.isValid() : false;
    },
    isValidStringOnly : ( data ) => {
        const emailRegex = /^[a-zA-Z]+$/;

        return emailRegex.test(data);
    },
}