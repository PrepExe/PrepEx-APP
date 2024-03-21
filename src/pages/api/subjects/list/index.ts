import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../../lib/session';
import { getSubjectListController } from '../../../../api/controllers/subjectController';

function subjectListRoute(req: NextApiRequest, res: NextApiResponse) {
  return getSubjectListController(req, res);
}

export default withIronSessionApiRoute(subjectListRoute, sessionOptions);