const Contact = require('../models/Contact');

/*
The index route will retrieve all of the contacts 
from the database and send them back to the client in a JSON object
*/
//We can use the mongoose .find() method to retrieve all of the entries of a model from the database.
module.exports = {
    async index(ctx) {
        const contacts = await Contact.find();
        ctx.body = {
            status: 'success',
            data: contacts //The data property, which is meant to hold a list of contacts,
        };
    }
};