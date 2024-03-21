import { NextApiRequest, NextApiResponse } from 'next';
import connectToDB from '../lib/mongodb';
import { createUserAndSession, validateUserCreationFields, validateUserCrendetialFieldsAndCreateSession } from '../services/authService';
import { sendSuccessCreatedResponse, sendErrorResponse, sendSuccessNoContentResponse } from '../utils/helpers';

connectToDB();

// @Desc Register new user
// @Route /api/auth/register
// @Method POST

export const authRegisterUserController = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, email, password, cpassword } = req.body;

    const userCreationFieldsValidation = await validateUserCreationFields(name, email, password, cpassword);

    if (userCreationFieldsValidation === true) {
      await createUserAndSession(req, name, email, password);
      sendSuccessCreatedResponse(res, 'Account created');
    } else {
      sendErrorResponse(res, 'Account not created', userCreationFieldsValidation);
    }
  } catch (err: any) {
    console.error(err);
    sendErrorResponse(res, 'Account not created', err.message);
  }
};

// @Desc Login user
// @Route /api/auth/login
// @Method POST

export const authLoginUserController = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body;

    const userCrendetialFieldsValidation = await validateUserCrendetialFieldsAndCreateSession(req, email, password);

    if (userCrendetialFieldsValidation === true) {
      sendSuccessNoContentResponse(res);
    } else {
      sendErrorResponse(res, 'Authentication failed', userCrendetialFieldsValidation);
    }
  } catch (err: any) {
    console.error(err);
    sendErrorResponse(res, 'Authentication failed', err.message);
  }
};

// @Desc Logout user
// @Route /api/auth/logout
// @Method POST

export const authLogoutUserController = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    req.session.destroy();
    sendSuccessNoContentResponse(res);
  } catch (err: any) {
    console.error(err);
    sendErrorResponse(res, 'Logout failed', err.message);
  }
};