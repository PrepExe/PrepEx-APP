import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/session';
import { getAllSubjectBoardsController } from '../../../api/controllers/subjectController';

function subjectBoardsRoute(req: NextApiRequest, res: NextApiResponse) {
  return getAllSubjectBoardsController(req, res);
}

export default withIronSessionApiRoute(subjectBoardsRoute, sessionOptions);