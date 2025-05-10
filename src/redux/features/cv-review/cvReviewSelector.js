const cvReviewSelector = {
  selectMarkdownContent: state => state.cvReview.markdownContent,
  selectFile: state => state.cvReview.file,
  selectSuggestions: state => state.cvReview.suggestions,
  selectIsCVUploaded: state => state.cvReview.isCVUploaded,
};

export default cvReviewSelector;
