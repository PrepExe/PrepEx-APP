import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../../lib/session';
import { getAllUserStudyTrackerSessions } from '../../../../api/controllers/study/sessionController';

function studySessionsRoute(req: NextApiRequest, res: NextApiResponse) {
  return getAllUserStudyTrackerSessions(req, res);
}

export default withIronSessionApiRoute(studySessionsRoute, sessionOptions);