import dotenv from 'dotenv';

dotenv.config();

type Env = {
  environment: string;
  baseUrl: string;
  e2eUser: string;
  e2ePass: string;
};

function readRequired(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getEnv(): Env {
  return {
    environment: readRequired('ENV'),
    baseUrl: readRequired('BASE_URL'),
    e2eUser: readRequired('E2E_USER'),
    e2ePass: readRequired('E2E_PASS')
  };
}
