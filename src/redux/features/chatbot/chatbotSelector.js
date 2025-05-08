const chatbotSelector = {
  selectChatSessionId: state => state.chatbot.chatSessionId,
  selectMessage: state => state.chatbot.message,
  selectChatMessages: state => state.chatbot.chatMessages,
  selectIsChatLoading: state => state.chatbot.isChatLoading,
};

export default chatbotSelector;
