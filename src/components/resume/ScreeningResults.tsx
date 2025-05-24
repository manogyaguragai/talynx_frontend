import { useState } from 'react';
import { Download, SortAsc, SortDesc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CandidateCard } from './CandidateCard';
import { Candidate } from '@/types';

interface ScreeningResultsProps {
  candidates: Candidate[];
}

type SortField = 'name' | 'matchProbability' | 'skillSimilarity' | 'fitScore' | 'experience';
type SortDirection = 'asc' | 'desc';

export function ScreeningResults({ candidates }: ScreeningResultsProps) {
  const [sortField, setSortField] = useState<SortField>('fitScore');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, set default to descending for scores, ascending for name
      setSortField(field);
      setSortDirection(field === 'name' ? 'asc' : 'desc');
    }
  };
  
  const sortedCandidates = [...candidates].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'name':
        // Handle possibly missing name fields
        const nameA = a.name || a.id;
        const nameB = b.name || b.id;
        comparison = nameA.localeCompare(nameB);
        break;
      case 'matchProbability':
        comparison = a.matchProbability - b.matchProbability;
        break;
      case 'skillSimilarity':
        comparison = a.skillSimilarity - b.skillSimilarity;
        break;
      case 'fitScore':
        comparison = a.fitScore - b.fitScore;
        break;
      case 'experience':
        comparison = a.yearsOfExperience - b.yearsOfExperience;
        break;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  
  const handleExportResults = () => {
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Add CSV header
    csvContent += "Name,Match Probability,Skill Similarity,Fit Score,Experience,Email,Phone\n";
    
    // Add data rows
    sortedCandidates.forEach(candidate => {
      csvContent += `"${candidate.name || 'Unnamed Candidate'}",`;
      csvContent += `${(candidate.matchProbability * 100).toFixed(0)}%,`;
      csvContent += `${(candidate.skillSimilarity * 100).toFixed(0)}%,`;
      csvContent += `${(candidate.fitScore * 100).toFixed(0)}%,`;
      csvContent += `${candidate.yearsOfExperience} years,`;
      csvContent += `"${candidate.email || ''}",`;
      csvContent += `"${candidate.mobile_number || ''}"\n`;
    });
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "resume_screening_results.csv");
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    document.body.removeChild(link);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' ? (
      <SortAsc className="h-4 w-4" />
    ) : (
      <SortDesc className="h-4 w-4" />
    );
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Screening Results</CardTitle>
            <CardDescription>
              {candidates.length} candidates analyzed
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={handleExportResults}
          >
            <Download className="h-4 w-4" />
            Export Results
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mb-4">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th 
                  className="p-3 font-medium text-sm cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-1">
                    Candidate {getSortIcon('name')}
                  </div>
                </th>
                <th 
                  className="p-3 font-medium text-sm cursor-pointer"
                  onClick={() => handleSort('matchProbability')}
                >
                  <div className="flex items-center gap-1">
                    Match % {getSortIcon('matchProbability')}
                  </div>
                </th>
                <th 
                  className="p-3 font-medium text-sm cursor-pointer"
                  onClick={() => handleSort('skillSimilarity')}
                >
                  <div className="flex items-center gap-1">
                    Skills {getSortIcon('skillSimilarity')}
                  </div>
                </th>
                <th 
                  className="p-3 font-medium text-sm cursor-pointer"
                  onClick={() => handleSort('fitScore')}
                >
                  <div className="flex items-center gap-1">
                    Fit Score {getSortIcon('fitScore')}
                  </div>
                </th>
                <th 
                  className="p-3 font-medium text-sm cursor-pointer"
                  onClick={() => handleSort('experience')}
                >
                  <div className="flex items-center gap-1">
                    Experience {getSortIcon('experience')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {sortedCandidates.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No candidates found
                  </td>
                </tr>
              ) : (
                sortedCandidates.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}