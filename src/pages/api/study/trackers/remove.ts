import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../../lib/session';
import { removeStudyTrackerController } from '../../../../api/controllers/study/trackerController';

function removeStudyTrackerRoute(req: NextApiRequest, res: NextApiResponse) {
  return removeStudyTrackerController(req, res);
}

export default withIronSessionApiRoute(removeStudyTrackerRoute, sessionOptions);