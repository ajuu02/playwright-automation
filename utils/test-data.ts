import fs from 'node:fs';
import path from 'node:path';

function readJsonFile<T>(relativePath: string): T {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const data = fs.readFileSync(absolutePath, 'utf-8');
  return JSON.parse(data) as T;
}

export const users = readJsonFile<Record<string, any>>('test-data/users.json');
export const products = readJsonFile<Record<string, any>>('test-data/products.json');
export const orders = readJsonFile<Record<string, any>>('test-data/orders.json');
