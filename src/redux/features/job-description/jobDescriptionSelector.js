const jobDescriptionSelector = {
  selectChatSessionId: state => state.jobDescription.chatSessionId,
  selectMessage: state => state.jobDescription.message,
  selectChatMessages: state => state.jobDescription.chatMessages,
  selectIsChatLoading: state => state.jobDescription.isChatLoading,
};

export default jobDescriptionSelector;
