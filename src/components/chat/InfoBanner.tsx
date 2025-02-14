
import { Info } from "lucide-react";

export const InfoBanner = () => {
  return (
    <div className="mb-6 bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-blue-100 flex items-start gap-3 backdrop-blur-sm">
      <Info className="w-5 h-5 mt-1 flex-shrink-0" />
      <div className="text-sm">
        <p className="mb-2">
          Upload TXT files to provide context for the AI assistant. The assistant will use the content of these files to provide more relevant and accurate responses.
        </p>
        <p>
          You can ask questions about the uploaded documents, and the AI will reference their content in its responses.
        </p>
      </div>
    </div>
  );
};
