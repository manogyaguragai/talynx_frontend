import { useState } from 'react';
import { FileText, FileUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface JobDescriptionSectionProps {
  jobDescription: string;
  onTextChange: (text: string) => void;
  onFileUpload: (content: string) => void;
  selectedFiles: File[];
  onFilesSelected: (files: File[]) => void;
  onSubmit: () => void; // NEW
}


export function JobDescriptionSection({
  jobDescription,
  onTextChange,
  onFileUpload,
  selectedFiles,
  onFilesSelected,
  onSubmit,
}: JobDescriptionSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('text');
  const { toast } = useToast();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(e.target.value);
  };

  // const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files || e.target.files.length === 0) return;

  //   const file = e.target.files[0];
    
  //   try {
  //     // For the demo, we'll just read the text content of the file
  //     // In a real implementation, you might want to use a library to handle
  //     // different file formats (e.g., PDF, DOCX)
  //     const text = await file.text();
  //     onFileUpload(text);
  //     setActiveTab('text');
      
  //     toast({
  //       title: 'Job description uploaded',
  //       description: `Extracted content from: ${file.name}`,
  //     });
  //   } catch (error) {
  //     toast({
  //       title: 'Error reading file',
  //       description: 'Unable to read the job description file.',
  //       variant: 'destructive',
  //     });
  //   }
  // };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files || e.target.files.length === 0) return;

  const files = Array.from(e.target.files);
  onFilesSelected(files);

  toast({
    title: 'Resumes uploaded',
    description: `${files.length} file(s) selected`,
  });
};


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Job Description
        </CardTitle>
        <CardDescription>
          Enter the job description to match candidates against
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="text" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              Enter Text
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-1">
              <FileUp className="h-4 w-4" />
              Upload File
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="space-y-4">
            <Textarea
              
              placeholder="Enter job description here..."
              className="min-h-[200px] font-mono text-sm"
              value={jobDescription}
              onChange={handleTextChange}
            />
            <button
              onClick={onSubmit}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
            >
              Rank Candidates
            </button>

            
            {!jobDescription && (
              <div className="text-sm text-muted-foreground">
                <p className="font-medium">Example job description format:</p>
                <pre className="bg-muted p-2 rounded-md mt-2 text-xs overflow-auto whitespace-pre-wrap">
                  {`Position: Senior React Developer\n\nResponsibilities:\n- Design and implement React applications\n- Work with API integrations\n- Collaborate with cross-functional teams\n\nRequirements:\n- 5+ years of React.js experience\n- Strong TypeScript skills\n- Experience with state management libraries`}
                </pre>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="upload">
            <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors border-muted-foreground/20 hover:border-primary/50">
              <input
                id="job-description-upload"
                type="file"
                accept=".pdf,.docx,.txt"
                className="hidden"
                onChange={handleFileUpload}
              />
              <div className="flex flex-col items-center gap-2" onClick={() => document.getElementById('job-description-upload')?.click()}>
                <FileUp className="h-10 w-10 text-muted-foreground" />
                <h3 className="font-medium text-lg">Upload job description</h3>
                <p className="text-sm text-muted-foreground">
                  Supported formats: TXT, PDF, DOCX
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}