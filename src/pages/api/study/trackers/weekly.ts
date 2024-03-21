import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../../lib/session';
import { getAllSetupWeeklyTrackersController } from '../../../../api/controllers/study/trackerController';

function weeklyTrackersProgressRoute(req: NextApiRequest, res: NextApiResponse) {
  return getAllSetupWeeklyTrackersController(req, res);
}

export default withIronSessionApiRoute(weeklyTrackersProgressRoute, sessionOptions);