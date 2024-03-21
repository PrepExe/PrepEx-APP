import { NextApiRequest, NextApiResponse } from 'next';
import connectToDB from '../lib/mongodb';
import { updateSubjectForUser, createStudyTrackerAndAddToUser, deleteStudyTrackerAndRemoveFromUser } from '../services/subjectService';
import { getUserFromSession, isUserLoggedIn, sendErrorResponse, sendSuccessCreatedResponse, sendSuccessNoContentResponse, sendSuccessResponse } from '../utils/helpers';
import User from '../models/User';
import CambridgeSubject from '../models/CambridgeSubject';
import ExamBoard from '../models/ExamBoard';

connectToDB();

// @Desc Get all subjects
// @Route /api/subjects
// @Method GET

export const getAllSubjectsController = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (isUserLoggedIn(req, res)) {
      const user = await User.findOne({ email: req.session.user.email });
      const subjects = await CambridgeSubject.find({ subject_id: { $in: user.subjects } });
      sendSuccessResponse(res, 'All subjects fetched', { subjects });
    }
  } catch (err: any) {
    console.error(err);
    sendErrorResponse(res, 'Subjects not fetched', err.message);
  }
};

// @Desc Add new subject to user
// @Route /api/subjects/add
// @Method POST

export const addSubjectController = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (isUserLoggedIn(req, res)) {
      const { id } = req.body;
      const user = getUserFromSession(req);
      const addedSubject = await updateSubjectForUser(id, user.email, 'add');
      await createStudyTrackerAndAddToUser(id, user.email);
      sendSuccessCreatedResponse(res, 'Subject added', { addedSubject });
    }
  } catch (err: any) {
    console.error(err);
    sendErrorResponse(res, 'Subject not added', err.message);
  }
};

// @Desc Remove subject from user
// @Route /api/subjects/remove
// @Method POST

export const removeSubjectController = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (isUserLoggedIn(req, res)) {
      const { id } = req.body;
      const user = getUserFromSession(req);
      await updateSubjectForUser(id, user.email, 'remove');
      await deleteStudyTrackerAndRemoveFromUser(id, user.email);
      sendSuccessNoContentResponse(res);
    }
  } catch (err: any) {
    console.error(err);
    sendErrorResponse(res, 'Subject not removed', err.message);
  }
};

// @Desc Get all subject exam boards
// @Route /api/subjects/boards
// @Method GET

export const getAllSubjectBoardsController = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (isUserLoggedIn(req, res)) {
      const examBoards = await ExamBoard.find();
      sendSuccessResponse(res, 'All exam boards fetched', { examBoards });
    }
  } catch (err: any) {
    console.error(err);
    sendErrorResponse(res, 'Exam boards not fetched', err.message);
  }
};

// @Desc Get all subjects from subject list
// @Route /api/subjects/list
// @Method GET

export const getSubjectListController = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (isUserLoggedIn(req, res)) {
      const subjects = await CambridgeSubject.find();
      sendSuccessResponse(res, 'Subject list fetched', { subjects });
    }
  } catch (err: any) {
    console.error(err);
    sendErrorResponse(res, 'Subject list not fetched', err.message);
  }
};

// @Desc Get subject from subjects list
// @Route /api/subjects/list/:id
// @Method GET

export const getSubjectListItemController = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (isUserLoggedIn(req, res)) {
      const { id } = req.query;
      const subject = await CambridgeSubject.findOne({ subject_id: id });
      sendSuccessResponse(res, 'Subject fetched', { subject });
    }
  } catch (err: any) {
    console.error(err);
    sendErrorResponse(res, 'Subject not fetched', err.message);
  }
};