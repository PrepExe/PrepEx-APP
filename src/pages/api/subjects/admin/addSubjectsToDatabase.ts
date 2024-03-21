import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../../lib/session';
import CambridgeSubject from '../../../../api/models/CambridgeSubject';
import connectToDB from '../../../../api/lib/mongodb';
import { subjects } from '../../../../utils/subjects';

async function addSubjectsDevRoute(req: NextApiRequest, res: NextApiResponse) {

  connectToDB();

  try {
    subjects.forEach((subject) => CambridgeSubject.create(subject));
  } catch (err) {
    console.error(err);
  }

  res.send('Created!');
}

export default withIronSessionApiRoute(addSubjectsDevRoute, sessionOptions);