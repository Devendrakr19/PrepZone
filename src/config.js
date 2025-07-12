const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://127.0.0.1:8000/'
  : "https://dev.oats-backend.otomashen.com/"
  
export default baseUrl;