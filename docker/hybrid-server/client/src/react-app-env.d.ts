/// <reference types="react-scripts" />
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_ENDPOINT: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}
export { }