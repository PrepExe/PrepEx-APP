import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../../lib/session';
import { editStudyTrackerTimeController } from '../../../../api/controllers/study/trackerController';

function editStudyTrackerTimeRoute(req: NextApiRequest, res: NextApiResponse) {
  return editStudyTrackerTimeController(req, res);
}

export default withIronSessionApiRoute(editStudyTrackerTimeRoute, sessionOptions);