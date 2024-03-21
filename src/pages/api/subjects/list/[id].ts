import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../../lib/session';
import { getSubjectListItemController } from '../../../../api/controllers/subjectController';

function subjectListItemRoute(req: NextApiRequest, res: NextApiResponse) {
  return getSubjectListItemController(req, res);
}

export default withIronSessionApiRoute(subjectListItemRoute, sessionOptions);