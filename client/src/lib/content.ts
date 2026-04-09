import fm from "front-matter";

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
  stars: number;
  forks: number;
  image: string;
  screenshot: string;
  date: string;
  highlights: string[];
  body?: string;
}

export interface Education {
  title: string;
  date: string;
  institution: string;
  grade: string;
  order: number;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  driveId: string;
  url: string;
  order: number;
}

export const getProjects = (): Project[] => {
  const files = import.meta.glob('../contents/projects/*.mdx', { query: '?raw', import: 'default', eager: true });
  return Object.values(files).map((content: any) => {
    const { attributes, body } = fm<any>(content);
    return {
      ...attributes,
      body,
      stars: attributes.stars || 0,
      forks: attributes.forks || 0,
      highlights: attributes.highlights || [],
      tech: attributes.tech || [],
    } as Project;
  }).sort((a, b) => parseInt(a.id || "99") - parseInt(b.id || "99"));
};

export const getEducation = (): Education[] => {
  const files = import.meta.glob('../contents/education/*.mdx', { query: '?raw', import: 'default', eager: true });
  return Object.values(files).map((content: any) => {
    const { attributes } = fm<any>(content);
    return attributes as Education;
  }).sort((a, b) => (a.order || 99) - (b.order || 99));
};

export const getSkills = (): any => {
  const files = import.meta.glob('../contents/skills/*.mdx', { query: '?raw', import: 'default', eager: true });
  const raw = Object.values(files)[0] as string;
  if (!raw) return null;
  return fm<any>(raw);
};

export const getAbout = (): any => {
  const files = import.meta.glob('../contents/about/*.mdx', { query: '?raw', import: 'default', eager: true });
  const raw = Object.values(files)[0] as string;
  if (!raw) return null;
  return fm<any>(raw);
};

export const getCertifications = (): Certification[] => {
  const files = import.meta.glob('../contents/certifications/*.mdx', { query: '?raw', import: 'default', eager: true });
  return Object.values(files).map((content: any) => {
    const { attributes } = fm<any>(content);
    return attributes as Certification;
  }).sort((a, b) => (a.order || 99) - (b.order || 99));
};
