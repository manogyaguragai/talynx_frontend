import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Candidate } from '@/types';
import { CandidateDetails } from './CandidateDetails';
import { cn } from '@/lib/utils';

interface CandidateCardProps {
  candidate: Candidate;
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getScoreColor = (score: number) => {
    if (score >= 0.7) return 'bg-green-500';
    if (score >= 0.5) return 'bg-amber-500';
    if (score >= 0.3) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  const getBadgeVariant = (score: number) => {
    if (score >= 0.7) return 'success';
    if (score >= 0.5) return 'warning';
    if (score >= 0.3) return 'default';
    return 'destructive';
  };
  
  const getExperienceText = (years: number, relevance: number) => {
    const relevanceText = relevance >= 0.7 
      ? 'Highly Relevant' 
      : relevance >= 0.4 
      ? 'Relevant' 
      : 'Less Relevant';
      
    return `${years} years (${relevanceText})`;
  };
  
  const formatScore = (score: number) => {
    return (score * 100).toFixed(0) + '%';
  };

  // Ensure we have a valid candidate name for display
  const displayName = candidate.name || candidate.id.split('.')[0] || 'Unnamed Candidate';

  return (
    <>
      <tr 
        className={cn(
          "hover:bg-muted/50 transition-colors cursor-pointer",
          isExpanded && "bg-muted/30"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <td className="p-3">
          <div className="flex items-center gap-2">
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
            <div className="font-medium">{displayName}</div>
          </div>
        </td>
        <td className="p-3">
          <div className="flex items-center gap-2">
            <Progress 
              value={candidate.matchProbability * 100} 
              className="h-2 w-20" 
              indicatorClassName={getScoreColor(candidate.matchProbability)}
            />
            <span>{formatScore(candidate.matchProbability)}</span>
          </div>
        </td>
        <td className="p-3">
          <div className="flex items-center gap-2">
            <Progress 
              value={candidate.skillSimilarity * 100} 
              className="h-2 w-20" 
              indicatorClassName={getScoreColor(candidate.skillSimilarity)}
            />
            <span>{formatScore(candidate.skillSimilarity)}</span>
          </div>
        </td>
        <td className="p-3">
          <Badge variant={getBadgeVariant(candidate.fitScore)}>
            {formatScore(candidate.fitScore)}
          </Badge>
        </td>
        <td className="p-3">
          {getExperienceText(candidate.yearsOfExperience, candidate.roleRelevance)}
        </td>
      </tr>
      
      {isExpanded && (
        <tr>
          <td colSpan={5} className="p-0">
            <CandidateDetails candidate={candidate} />
          </td>
        </tr>
      )}
    </>
  );
}