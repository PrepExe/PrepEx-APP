import { NextApiRequest, NextApiResponse } from 'next';
import connectToDB from '../lib/mongodb';
import { getUserFromSession, isUserLoggedIn, sendErrorResponse, sendSuccessResponse } from '../utils/helpers';

connectToDB();

// @Desc Get user profile
// @Route /api/user
// @Method GET

export const getUserProfileController = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (isUserLoggedIn(req, res)) {
      const user = getUserFromSession(req);
      sendSuccessResponse(res, 'User profile fetched', { user });
    }
  } catch (err: any) {
    console.error(err);
    sendErrorResponse(res, 'User profile not fetched', err.message);
  }
};