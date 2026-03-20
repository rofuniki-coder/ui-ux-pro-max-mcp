import { UIPattern } from '../types';

export function getPattern(patterns: UIPattern[], id: string): UIPattern | undefined {
  return patterns.find(p => p.id === id);
}

export function listCategories(patterns: UIPattern[]): string[] {
  const categories = new Set(patterns.map(p => p.category));
  return Array.from(categories).sort();
}
