// Load portfolio-data.js functions into window object for Next.js to use
// This allows Next.js to access the existing portfolio-data.js functions

if (typeof window !== 'undefined') {
  // This will be loaded as a script tag in the layout
  // The actual portfolio-data.js will be loaded separately
  window.loadPortfolioDataFromJS = function(memberName) {
    // This function will be overridden when portfolio-data.js loads
    if (window.loadPortfolioData) {
      return window.loadPortfolioData(memberName);
    }
    return null;
  };
}
