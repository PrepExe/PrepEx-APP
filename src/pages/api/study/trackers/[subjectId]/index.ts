import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../../../lib/session';
import { getSubjectTrackerItemController } from '../../../../../api/controllers/study/trackerController';

function subjectTrackerItemRoute(req: NextApiRequest, res: NextApiResponse) {
  return getSubjectTrackerItemController(req, res);
}

export default withIronSessionApiRoute(subjectTrackerItemRoute, sessionOptions);