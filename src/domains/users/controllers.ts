import { Request, Response } from 'express';
import { createUserSchema } from './validators';
import preconditionFailedError from '../../errors/precondition-failed-exception';
import User from './model';
import usersErrors from './errors';

async function createUser(request: Request, response: Response) {
  try {
    const {body} = request;

    const { error } = createUserSchema.validate(body);
    
    if (error) return preconditionFailedError(response, error.details[0].message);

    const user = await User.query().insertAndFetch(body);
    
    response.status(200)
      .json(user);
  } catch (error: any) {
    response.status(412).send(usersErrors.duplicatedEmail);
  }
}

export default {
  createUser
};