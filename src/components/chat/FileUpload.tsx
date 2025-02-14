
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileText, Trash2, Upload } from "lucide-react";

type UploadedFile = {
  name: string;
  path: string;
};

type FileUploadProps = {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploadedFiles: UploadedFile[];
  onFileRemove: (index: number) => void;
};

export const FileUpload = ({ onFileUpload, uploadedFiles, onFileRemove }: FileUploadProps) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-4 mb-4">
        <Input
          type="file"
          accept=".txt"
          onChange={onFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md text-white cursor-pointer hover:opacity-90 transition-all duration-300 shadow-lg"
        >
          <Upload className="w-4 h-4" />
          Upload Document
        </label>
      </div>
      {uploadedFiles.length > 0 && (
        <div className="space-y-2 bg-white/5 rounded-lg p-3">
          <h3 className="text-white text-sm font-medium mb-2">Uploaded Files:</h3>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-300 text-sm bg-white/5 rounded-md p-2">
              <FileText className="w-4 h-4" />
              <span>{file.name}</span>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto h-6 w-6 hover:text-red-400 transition-colors"
                onClick={() => onFileRemove(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
