import { optimizeResumeAndGenerateCoverLetter } from '@/lib/utils/ai';

export async function optimizeResume(resume: string, jobDescription: string) {
  const { optimizedResume } = await optimizeResumeAndGenerateCoverLetter(resume, jobDescription);
  return optimizedResume;
}

export async function optimizeCoverLetter(resume: string, jobDescription: string) {
  const { coverLetter } = await optimizeResumeAndGenerateCoverLetter(resume, jobDescription);
  return coverLetter;
}
  
  
