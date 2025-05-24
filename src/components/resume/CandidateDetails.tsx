import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Candidate } from '@/types';

interface CandidateDetailsProps {
  candidate: Candidate;
}

export function CandidateDetails({ candidate }: CandidateDetailsProps) {
  const getSkillBadgeVariant = (index: number, total: number) => {
    // Simulate skill relevance by position in the array
    const relevance = 1 - (index / (total || 1));
    if (relevance >= 0.8) return 'default';
    if (relevance >= 0.5) return 'secondary';
    return 'outline';
  };

  // Format the education array into a readable string
  const formatEducation = (education: string[]) => {
    if (!education || education.length === 0) {
      return 'No education information available';
    }
    return education.join(' • ');
  };

  return (
    <div className="bg-muted/20 p-4 animate-in fade-in duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2">Contact & Skills</h3>
            <Separator className="mb-3" />
            
            <div className="space-y-3">
              {/* Contact Information */}
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-1">
                  Contact Information
                </h4>
                <p className="text-sm">
                  {candidate.email && (
                    <div>Email: {candidate.email}</div>
                  )}
                  {candidate.mobile_number && (
                    <div>Phone: {candidate.mobile_number}</div>
                  )}
                </p>
              </div>
              
              {/* Skills Section */}
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-1">
                  Skills
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.skills && candidate.skills.length > 0 ? (
                    candidate.skills.map((skill, index) => (
                      <Badge 
                        key={index} 
                        variant={getSkillBadgeVariant(index, candidate.skills.length)}
                        className="text-xs"
                      >
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No specific skills extracted</p>
                  )}
                </div>
              </div>
              
              {/* Education Section */}
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-1">
                  Education
                </h4>
                <p className="text-sm whitespace-pre-line">{formatEducation(candidate.education)}</p>
              </div>
              
              {/* Experience Summary */}
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-1">
                  Experience Summary
                </h4>
                <p className="text-sm line-clamp-6">{candidate.summary || 'No summary available'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2">AI Insights & Interview Questions</h3>
            <Separator className="mb-3" />
            
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-1">
                  Strengths
                </h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {candidate.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-1">
                  Potential Gaps
                </h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {candidate.gaps.map((gap, index) => (
                    <li key={index}>{gap}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-1">
                  Suggested Interview Questions
                </h4>
                <ol className="list-decimal list-inside text-sm space-y-2">
                  {candidate.suggestedQuestions.map((question, index) => (
                    <li key={index} className="pl-1">{question}</li>
                  ))}
                </ol>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}