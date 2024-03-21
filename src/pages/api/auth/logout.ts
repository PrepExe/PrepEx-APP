import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/session';
import { NextApiRequest, NextApiResponse } from 'next';
import { authLogoutUserController } from '../../../api/controllers/authController';

function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  return authLogoutUserController(req, res);
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);