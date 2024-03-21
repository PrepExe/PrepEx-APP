import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/session';
import { getAllSubjectsController } from '../../../api/controllers/subjectController';

function subjectsRoute(req: NextApiRequest, res: NextApiResponse) {
  return getAllSubjectsController(req, res);
}

export default withIronSessionApiRoute(subjectsRoute, sessionOptions);