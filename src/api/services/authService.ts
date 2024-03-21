import { NextApiRequest } from 'next';
import User from '../models/User';
import { createSession, validateEmail } from '../utils/helpers';

export const validateUserCreationFields = async (name: string, email: string, password: string, cpassword: string) => {
  const doesAccountExist = await User.findOne({ email });

  if (!name || !email || !password || !cpassword) {
    return 'All fields are required.';
  }

  if (!validateEmail(email)) {
    return 'That email address is not valid.';
  }

  if (doesAccountExist) {
    return 'An account with that email already exists.';
  }

  if (password.length < 8) {
    return 'Passwords must be at least 8 characters long.';
  }

  if (password !== cpassword) {
    return 'Passwords do not match.';
  }

  return true;
};

export const createUserAndSession = async (req: NextApiRequest, name: string, email: string, password: string) => {
  const user = await User.create({
    name,
    email,
    password,
  });

  await createSession(req, user.name, user.email);
};

export const validateUserCrendetialFieldsAndCreateSession = async (req: NextApiRequest, email: string, password: string) => {
  if (!email || !password) {
    return 'All fields are required.';
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return 'Email or password is incorrect.';
  }

  await createSession(req, user.name, user.email);

  return true;
};
