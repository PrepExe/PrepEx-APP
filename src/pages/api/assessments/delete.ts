import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/session';
import { deleteAssessmentController } from '../../../api/controllers/assessmentController';

function deleteAssessmentRoute(req: NextApiRequest, res: NextApiResponse) {
  return deleteAssessmentController(req, res);
}

export default withIronSessionApiRoute(deleteAssessmentRoute, sessionOptions);