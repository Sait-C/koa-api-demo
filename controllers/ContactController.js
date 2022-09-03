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
    },

    async store(ctx){
        // get JSON parameter from request
        const { body } = ctx.request;
        // create a Contact model with coming data(thanks to koa-body body parser)
        let contact = new Contact(body);
        // save to database
        contact = await contact.save();
        // response to user
        ctx.body = {
            status: 'success',
            data: contact
        }
    },

    async show(ctx){
        const { id } = ctx.params;
        const contact = await Contact.findById(id);
        ctx.body = {
            status: 'success',
            data: contact
        };
    },

    async update(ctx){
        const { id } = ctx.params;
        const { body } = ctx.request;
        await Contact.findByIdAndUpdate(id, body);
        const contact = await Contact.findById(id);
        ctx.body = {
            status: 'success',
            message: 'contact successfully updated',
            data: contact
        };
    },

    async destroy(ctx){
        const { id } = ctx.params;
        await Contact.findByIdAndDelete(id);
        ctx.body = {
            status: 'success',
            message: 'contact successfully deleted'
        }
    }
};