import Fuse from 'fuse.js';
import { UIPattern } from '../types';

export function searchPatterns(patterns: UIPattern[], query: string): UIPattern[] {
  const fuse = new Fuse(patterns, {
    keys: ['title', 'category', 'description', 'tags'],
    threshold: 0.3,
    ignoreLocation: true
  });

  return fuse.search(query).map(result => result.item).slice(0, 10);
}
