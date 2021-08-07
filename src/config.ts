export type Config = {
  separator: string;
  delimiter: string;
  next: string;
  start: string;
  error: string;
  complete: string;
};
const config: Config = {
  separator: '||',
  delimiter: '.',
  next: 'next',
  start: 'start',
  error: 'error',
  complete: 'complete',
};
export default config;
