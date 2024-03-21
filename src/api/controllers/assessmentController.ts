import { NextApiRequest, NextApiResponse } from 'next';
import connectToDB from '../lib/mongodb';
import { createAssessment, deleteAssessment, editAssessment } from '../services/assessmentService';
import { getUserFromSession, isUserLoggedIn, sendErrorResponse, sendSuccessCreatedResponse, sendSuccessNoContentResponse, sendSuccessResponse } from '../utils/helpers';
import Assessment from '../models/Assessment';

connectToDB();

// @Desc Get all assessments
// @Route /api/assessments
// @Method GET

export const getAllAssessmentsController = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (isUserLoggedIn(req, res)) {
      const user = getUserFromSession(req);
      const assessments = await Assessment.find({ user: user.email });
      sendSuccessResponse(res, 'All assessments fetched', { assessments });
    }
  } catch (err: any) {
    console.error(err);
    sendErrorResponse(res, 'Assessments not fetched', err.message);
  }
};

// @Desc Add new assessment
// @Route /api/assessments/add
// @Method POST

export const addAssessmentController = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (isUserLoggedIn(req, res)) {
      const { subject, date, description } = req.body;
      const user = getUserFromSession(req);
      const newAssessment = await createAssessment(subject, date, description, user.email);
      sendSuccessCreatedResponse(res, 'Assessment added', { newAssessment });
    }
  } catch (err: any) {
    console.error(err);
    sendErrorResponse(res, 'Assessment not added', err.message);
  }
};

// @Desc Edit assessment
// @Route /api/assessments/edit
// @Method PUT

export const editAssessmentController = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (isUserLoggedIn(req, res)) {
      const { assessmentId, date, description } = req.body;
      const updatedAssessment = await editAssessment(assessmentId, date, description);
      sendSuccessResponse(res, 'Assessment updated', { updatedAssessment });
    }
  } catch (err: any) {
    console.error(err);
    sendErrorResponse(res, 'Assessment not updated', err.message);
  }
};

// @Desc Delete assessment
// @Route /api/assessments/delete
// @Method POST

export const deleteAssessmentController = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (isUserLoggedIn(req, res)) {
      const { assessmentId } = req.body;
      await deleteAssessment(assessmentId);
      sendSuccessNoContentResponse(res);
    }
  } catch (err: any) {
    console.error(err);
    sendErrorResponse(res, 'Assessment not deleted', err.message);
  }
};