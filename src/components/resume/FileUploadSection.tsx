import { useState } from 'react';
import { FileUp, X, FileText, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { ResumeFile } from '@/types';

interface FileUploadSectionProps {
  resumes: ResumeFile[];
  onUpload: (files: ResumeFile[]) => void;
}

export function FileUploadSection({ resumes, onUpload }: FileUploadSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const newFiles = Array.from(e.dataTransfer.files);
    processFiles(newFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      processFiles(newFiles);
    }
  };

  const processFiles = async (newFiles: File[]) => {
    const validFileTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    
    const validFiles = newFiles.filter(file => 
      validFileTypes.includes(file.type)
    );
    
    if (validFiles.length !== newFiles.length) {
      toast({
        title: 'Invalid file type',
        description: 'Only PDF and DOCX files are supported.',
        variant: 'destructive',
      });
    }
    
    if (validFiles.length === 0) return;
    
    const resumeFiles: ResumeFile[] = [...resumes];
    
    for (const file of validFiles) {
      // Check if file already exists by name
      if (!resumeFiles.some(existingFile => existingFile.name === file.name)) {
        resumeFiles.push({
          file,
          name: file.name,
          size: file.size,
          type: file.type,
        });
      }
    }
    
    onUpload(resumeFiles);
  };

  const removeFile = (fileName: string) => {
    const updatedFiles = resumes.filter(file => file.name !== fileName);
    onUpload(updatedFiles);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileUp className="h-5 w-5" />
          Upload Resumes
        </CardTitle>
        <CardDescription>
          Upload candidate resumes in PDF or DOCX format
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('resume-upload')?.click()}
        >
          <input
            id="resume-upload"
            type="file"
            multiple
            accept=".pdf,.docx"
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="flex flex-col items-center gap-2">
            <FileUp className="h-10 w-10 text-muted-foreground" />
            <h3 className="font-medium text-lg">Drag & drop resumes here</h3>
            <p className="text-sm text-muted-foreground">
              or click to browse files (PDF, DOCX)
            </p>
          </div>
        </div>
        
        {resumes.length > 0 && (
          <div className="border rounded-md divide-y">
            <div className="p-3 bg-muted/50 font-medium flex items-center justify-between">
              <span>Uploaded Files ({resumes.length})</span>
            </div>
            {resumes.map((file) => (
              <div key={file.name} className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium truncate max-w-[200px] md:max-w-md">
                    {file.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  onClick={() => removeFile(file.name)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {resumes.length === 0 && (
          <div className="flex items-center justify-center gap-2 p-4 bg-muted/30 rounded-md text-muted-foreground">
            <AlertCircle className="h-5 w-5" />
            <span>No resumes uploaded yet</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}