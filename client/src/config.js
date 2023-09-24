const CONFIG = {
  NODE_ENV: process.env.NODE_ENV,
  FACEBOOK_APP_ID: process.env.REACT_APP_FB_APP_ID || '',
  FACEBOOK_PAGE_ID: process.env.REACT_APP_FB_PAGE_ID || '',
  API_URL: process.env.API_URL || 'http://localhost:80/api/',
  SOCKET_URL: process.env.SOCKET_URL || 'http://localhost:80'
};

export default CONFIG;
