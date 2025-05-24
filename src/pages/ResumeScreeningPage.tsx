import { useEffect, useRef } from 'react';
import { Container } from '@/components/layout/Container';
import { Header } from '@/components/layout/Header';
import { FileUploadSection } from '@/components/resume/FileUploadSection';
import { JobDescriptionSection } from '@/components/resume/JobDescriptionSection';
import { ScreeningResults } from '@/components/resume/ScreeningResults';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Candidate, ResumeFile } from '@/types';
import { useState } from 'react';

const ResumeScreeningPage = () => {
  const [resumes, setResumes] = useState<ResumeFile[]>([]);
  const [jobDescription, setJobDescription] = useState('');
  const [isScreening, setIsScreening] = useState(false);
  const [results, setResults] = useState<Candidate[] | null>(null);
  const [jobFiles, setJobFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleResumeUpload = (files: ResumeFile[]) => {
    setResumes(files);
  };

  const handleJobDescriptionChange = (text: string) => {
    setJobDescription(text);
  };

  const handleJobDescriptionFileUpload = (content: string) => {
    setJobDescription(content);
  };

  const handleJobFilesSelected = (files: File[]) => {
    setJobFiles(files);
  };

  useEffect(() => {
    if (results && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [results]);

  const handleScreenCandidates = async () => {
    if (resumes.length === 0) {
      toast({
        title: 'No resumes uploaded',
        description: 'Please upload at least one resume to screen.',
        variant: 'destructive',
      });
      return;
    }

    if (!jobDescription.trim()) {
      toast({
        title: 'Job description missing',
        description: 'Please provide a job description to match candidates against.',
        variant: 'destructive',
      });
      return;
    }

    setIsScreening(true);

    try {
      const formData = new FormData();
      formData.append("job_desc", jobDescription);

      resumes.forEach((resume) => {
        formData.append("files", resume.file);
      });

      const response = await fetch("http://127.0.0.1:8000/rank/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const apiData = await response.json();
      
      // Transform API data to match our frontend component expectations
      const processedData: Candidate[] = apiData.map((candidate: any) => {
        // Calculate normalized scores (fitting to our UI expectations)
        // Our UI expects scores between 0-1, while the API provides negative scores
        const normalizedFitScore = Math.min(Math.max((candidate.fitScore + 10) / 10, 0), 1);
        
        return {
          ...candidate,
          // Convert fit score from negative to 0-1 range
          fitScore: normalizedFitScore,
          // Set default values for fields not present in API
          yearsOfExperience: candidate.total_experience || 0,
          roleRelevance: 0.5, // Default value
          matchProbability: normalizedFitScore, // Use fit score as match probability too
          skillSimilarity: Math.min(Math.max((candidate.fitScore + 9.5) / 10, 0), 1), // Slight variation for UI
          experienceSummary: candidate.summary || 'No experience summary available',
          // Generate placeholder data for missing fields
          strengths: [
            "Based on resume analysis",
            candidate.skills.length > 0 ? `Has ${candidate.skills.length} relevant skills` : "Skills information limited",
            candidate.education.length > 0 ? "Has formal education credentials" : "Education information limited"
          ],
          gaps: [
            "Limited information available from resume scan",
            "Experience details need verification"
          ],
          suggestedQuestions: [
            "Can you elaborate on your professional experience?",
            "What specific skills do you have that match this position?",
            "How do your past roles relate to this job opportunity?"
          ]
        };
      });
      
      setResults(processedData);

      toast({
        title: 'Screening complete',
        description: `${processedData.length} candidates analyzed.`,
      });
    } catch (error) {
      console.error("Screening error:", error);
      toast({
        title: 'Screening failed',
        description: 'An error occurred while screening candidates.',
        variant: 'destructive',
      });
    } finally {
      setIsScreening(false);
    }
  };

  const handleReset = () => {
    setResumes([]);
    setJobDescription('');
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Container>
        <div className="py-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FileUploadSection 
              resumes={resumes} 
              onUpload={handleResumeUpload} 
            />
            <JobDescriptionSection 
              jobDescription={jobDescription}
              onTextChange={handleJobDescriptionChange}
              onFileUpload={handleJobDescriptionFileUpload}
              selectedFiles={jobFiles}
              onFilesSelected={handleJobFilesSelected}
              onSubmit={handleScreenCandidates}
            />
          </div>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              onClick={handleScreenCandidates}
              disabled={isScreening || resumes.length === 0 || !jobDescription.trim()}
              className="w-48"
            >
              {isScreening ? 'Screening...' : 'Screen Candidates'}
            </Button>
            {(resumes.length > 0 || jobDescription) && (
              <Button
                variant="outline"
                size="lg"
                onClick={handleReset}
                disabled={isScreening}
                className="w-48"
              >
                Reset
              </Button>
            )}
          </div>
          {(results && !isScreening) && (
            <div ref={resultsRef}>
              <ScreeningResults candidates={results} />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ResumeScreeningPage;