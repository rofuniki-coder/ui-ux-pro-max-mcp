import { UIPattern } from '../types';
import { searchPatterns } from './search';

export function generateUISuggestions(patterns: UIPattern[], context: string): UIPattern[] {
  // Simple suggestion logic: search for keywords in context
  // In a real scenario, this could be more complex (e.g. NLP or specific keyword mapping)
  return searchPatterns(patterns, context).slice(0, 5);
}
