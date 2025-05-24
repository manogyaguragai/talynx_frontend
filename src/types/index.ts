// types.ts
export interface ResumeFile {
  file: File;
  name: string;
  size: number;
  type: string;
}

export interface Skill {
  name: string;
  match: number;
}

export interface Candidate {
  id: string;
  name: string;
  fitScore: number;
  total_experience: number;
  skills: string[];
  education: string[];
  email: string;
  mobile_number: string;
  summary: string;
  
  // These are derived properties we'll calculate in our components
  yearsOfExperience: number;
  roleRelevance: number;
  matchProbability: number;
  skillSimilarity: number;
  experienceSummary: string;
  strengths: string[];
  gaps: string[];
  suggestedQuestions: string[];
}