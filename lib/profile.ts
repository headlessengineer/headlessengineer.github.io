import { readFileSync } from 'fs';
import path from 'path';
import type { Profile } from '../types/profile';

const PROFILE_DIR = path.join(process.cwd(), 'profile');

export function getProfile(id: string): Profile | null {
  try {
    const raw = readFileSync(path.join(PROFILE_DIR, `${id}.json`), 'utf-8');
    return JSON.parse(raw) as Profile;
  } catch {
    return null;
  }
}

export function getAllProfileIds(): string[] {
  try {
    const raw = readFileSync(path.join(PROFILE_DIR, 'index.json'), 'utf-8');
    const index = JSON.parse(raw) as { profiles: { id: string }[] };
    return index.profiles.map((p) => p.id);
  } catch {
    return [];
  }
}
