import Joi from 'joi';

export enum UserType {
    ADMINISTRATOR = 'ADMINISTRATOR',
    CLIENT = 'CLIENT',
    ARTISAN = 'ARTISAN',
}

const createUserSchema = Joi.object({
  name: Joi.string()
    .max(200)
    .required(),
  email: Joi.string()
    .max(256)
    .email({ 
      minDomainSegments: 2,
      tlds: { allow: false }
    })
    .required(),
  password: Joi.string()
    .min(6)
    .max(100)
    .required(),
  user_type: Joi.string()
    .valid(...Object.values(UserType))
    .required(),
});

export {
  createUserSchema
};
