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

export interface ProfileSummary {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  statement: string;
  photo: string | null;
  github: string | null;
  linkedin: string | null;
}

export function getAllProfiles(): ProfileSummary[] {
  const ids = getAllProfileIds();
  return ids
    .map((id) => {
      const profile = getProfile(id);
      if (!profile) return null;
      return {
        id: profile.id,
        firstName: profile.personal.firstName,
        lastName: profile.personal.lastName,
        role: profile.personal.role,
        statement: profile.about.callout ?? '',
        photo: profile.personal.photo,
        github: profile.personal.github,
        linkedin: profile.personal.linkedin,
      };
    })
    .filter((p): p is ProfileSummary => p !== null);
}
