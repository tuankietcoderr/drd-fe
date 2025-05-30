import authApi from './auth/authQuery';
import authSlice from './auth/authSlice';
import candidateApi from './candidate/candidateQuery';
import candidateSlice from './candidate/candidateSlice';
import chatbotApi from './chatbot/chatbotQuery';
import chatbotSlice from './chatbot/chatbotSlice';
import cvReviewApi from './cv-review/cvReviewQuery';
import cvReviewSlice from './cv-review/cvReviewSlice';
import jobDescriptionApi from './job-description/jobDescriptionQuery';
import jobDescriptionSlice from './job-description/jobDescriptionSlice';
import locationApi from './location/locationQuery';
import locationSlice from './location/locationSlice';
import occupationApi from './occupation/occupationQuery';
import occupationSlice from './occupation/occupationSlice';
import postApi from './post/postQuery';
import recruiterApi from './recruiter/recruiterQuery';
import uploadApi from './upload/uploadQuery';
import uploadSlice from './upload/uploadSlice';

export const allApis = [
  authApi,
  jobDescriptionApi,
  chatbotApi,
  cvReviewApi,
  postApi,
  locationApi,
  occupationApi,
  candidateApi,
  uploadApi,
  recruiterApi,
];

export const allSlices = [
  authSlice,
  jobDescriptionSlice,
  chatbotSlice,
  cvReviewSlice,
  locationSlice,
  occupationSlice,
  candidateSlice,
  uploadSlice,
];
