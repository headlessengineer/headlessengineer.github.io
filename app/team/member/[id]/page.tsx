import type { JSX } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProfile, getAllProfileIds } from '../../../../lib/profile';
import type {
  Profile,
  FounderProfile,
  EngineerProfile,
  StrategistProfile,
  DeliveryProfile,
} from '../../../../types/profile';
import { FounderTemplate } from '../../../../components/templates/FounderTemplate';
import { EngineerTemplate } from '../../../../components/templates/EngineerTemplate';
import { StrategistTemplate } from '../../../../components/templates/StrategistTemplate';
import { DeliveryTemplate } from '../../../../components/templates/DeliveryTemplate';

export const dynamicParams = false;

export function generateStaticParams(): { id: string }[] {
  return getAllProfileIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const profile = getProfile(id);
  if (!profile) return {};
  return {
    title: `${profile.personal.displayName} — ${profile.personal.role}`,
    description: profile.about.paragraphs[0] ?? '',
  };
}

function renderTemplate(profile: Profile): JSX.Element {
  switch (profile.profileType) {
    case 'founder':
      return <FounderTemplate profile={profile as FounderProfile} />;
    case 'engineer':
      return <EngineerTemplate profile={profile as EngineerProfile} />;
    case 'strategist':
      return <StrategistTemplate profile={profile as StrategistProfile} />;
    case 'delivery':
      return <DeliveryTemplate profile={profile as DeliveryProfile} />;
    default:
      notFound();
  }
}

export default async function MemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<JSX.Element> {
  const { id } = await params;
  const profile = getProfile(id);
  if (!profile) notFound();
  return renderTemplate(profile);
}
