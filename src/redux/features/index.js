import authApi from './auth/authQuery';
import authSlice from './auth/authSlice';
import chatbotApi from './chatbot/chatbotQuery';
import chatbotSlice from './chatbot/chatbotSlice';
import cvReviewApi from './cv-review/cvReviewQuery';
import cvReviewSlice from './cv-review/cvReviewSlice';
import jobDescriptionApi from './job-description/jobDescriptionQuery';
import jobDescriptionSlice from './job-description/jobDescriptionSlice';

export const allApis = [authApi, jobDescriptionApi, chatbotApi, cvReviewApi];

export const allSlices = [
  authSlice,
  jobDescriptionSlice,
  chatbotSlice,
  cvReviewSlice,
];
