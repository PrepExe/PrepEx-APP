import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/session';
import { addSubjectController } from '../../../api/controllers/subjectController';

function addSubjectRoute(req: NextApiRequest, res: NextApiResponse) {
  return addSubjectController(req, res);
}

export default withIronSessionApiRoute(addSubjectRoute, sessionOptions);