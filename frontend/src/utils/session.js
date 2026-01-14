// Generate or retrieve session ID for tracking user activity
export const getSessionId = () => {
  let sessionId = localStorage.getItem('sessionId');
  
  if (!sessionId) {
    // Generate a unique session ID
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem('sessionId', sessionId);
  }
  
  return sessionId;
};

// Add session ID to fetch requests
export const fetchWithSession = (url, options = {}) => {
  const sessionId = getSessionId();
  
  const headers = {
    ...options.headers,
    'X-Session-ID': sessionId,
  };
  
  return fetch(url, {
    ...options,
    headers,
  });
};
