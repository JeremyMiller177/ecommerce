export const API_URL = process.env.REACT_APP_API_URL;
export const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

if (!API_URL) {
  throw new Error(
    "Please define the REACT_APP_API_URL environment variable inside .env"
  );
}

if (!RECAPTCHA_SITE_KEY) {
  throw new Error(
    "Please define the REACT_APP_RECAPTCHA_SITE_KEY environment variable inside .env"
  );
}
