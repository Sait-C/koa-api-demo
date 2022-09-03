const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    company: String,
    position: String,
    address: String,
    phoneNumber: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

//Finally, we will create the mongoose model and export it, so that it can be used elsewhere in our application.
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;


/*
In the preceding code block, 
first, we require the mongoose dependency. 
The mongoose reference that is created here 
will be the same as the one that was returned 
when we initially connected to the database. 
This means that we do not need to create any other connections 
for interacting with our database.
*/