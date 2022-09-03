const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string(),
    company: Joi.string(),
    position: Joi.string(),
    phoneNumber: Joi.number().required()
});

const ALLOWED_METHODS = ['PUT', 'POST'];

module.exports = () => {
    return async (ctx, next) => {
        const { method } = ctx;
        const { body } = ctx.request;

        if(ALLOWED_METHODS.includes(method)){ //This ensures that we only validate against POST and PUT requests that contain request body data, and not GET requests, which do not.
            //If a request matches any of these methods, we then validate the request body against a defined schema.
            const { error } = schema.validate(body);
            if(error){
                ctx.status = 422;
                ctx.body = {
                    status: 'error',
                    message: 'validation error',
                    errors: error.details.map(e => e.message)
                };
            }else{
                await next();
            }
        }else{
            await next();
        }
    };
};

/*
Note that we only specify one validation schema in our application, 
as we only have one data model. In more complex applications, 
which possess multiple data models, 
multiple schemas need to be implemented, 
where the correct schema to use for validation can be decided 
based on the route.
*/