import authApi from './auth/authQuery';
import jobDescriptionApi from './job-description/jobDescriptionQuery';

import authSlice from './auth/authSlice';
import chatbotApi from './chatbot/chatbotQuery';
import chatbotSlice from './chatbot/chatbotSlice';
import jobDescriptionSlice from './job-description/jobDescriptionSlice';

export const allApis = [authApi, jobDescriptionApi, chatbotApi];

export const allSlices = [authSlice, jobDescriptionSlice, chatbotSlice];
