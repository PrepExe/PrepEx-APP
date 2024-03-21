import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/session';
import { editAssessmentController } from '../../../api/controllers/assessmentController';

function editAssessmentRoute(req: NextApiRequest, res: NextApiResponse) {
  return editAssessmentController(req, res);
}

export default withIronSessionApiRoute(editAssessmentRoute, sessionOptions);