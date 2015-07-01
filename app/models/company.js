var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Companies', new Schema({
    ownerId: String,
    name: String,
    logo: String,
    code: String,
    bankAccount: BankAccount,
    adress: Adress,
    emails : Email
}));

var Adress = {
    street: String,
    streetNumber: String,
    zipCode: String,
    cityName: String,
    countryCode: String,
    geoCode: {
        latitude: String,
        longtitude: String
    }
};

var Email = {
    mail: String,
    IsDefault : Boolean
};

var BankAccount = {
    bankName: String,
    branchCode: String,
    location: String,
    accountNumber: String,
    ibanNumber: String,
    swiftCode: String,
    currency: String
};