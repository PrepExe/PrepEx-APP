import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/session';
import { NextApiRequest, NextApiResponse } from 'next';
import { authRegisterUserController } from '../../../api/controllers/authController';

function registerRoute(req: NextApiRequest, res: NextApiResponse) {
  return authRegisterUserController(req, res);
}

export default withIronSessionApiRoute(registerRoute, sessionOptions);