import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/session';
import { NextApiRequest, NextApiResponse } from 'next';
import { authLoginUserController } from '../../../api/controllers/authController';

function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  return authLoginUserController(req, res);
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);