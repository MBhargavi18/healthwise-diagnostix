
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ImageUploader from "@/components/ImageUploader";

interface SkinAnalysisProps {
  isAnalyzing: boolean;
  onAnalyze: () => Promise<void>;
  analysisResult: any;
}

const SkinAnalysis = ({ isAnalyzing, onAnalyze, analysisResult }: SkinAnalysisProps) => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageSelect = (file: File) => {
    setImage(file);
  };

  return (
    <div className="space-y-4">
      <p className="text-sage-600 mb-4">
        Upload a clear image of the affected skin area for AI analysis
      </p>
      <ImageUploader onImageSelect={handleImageSelect} />
      {image && !analysisResult && (
        <Button 
          className="w-full bg-medical-500 hover:bg-medical-600 text-white"
          onClick={onAnalyze}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Image"}
        </Button>
      )}
      
      {analysisResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-medical-50 rounded-lg"
        >
          <h3 className="text-xl font-semibold text-medical-800 mb-3">Analysis Results</h3>
          <div className="grid gap-4">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h4 className="font-semibold text-medical-700 mb-2">Diagnosis</h4>
              <p className="text-sage-700"><strong>Condition:</strong> {analysisResult.condition}</p>
              <p className="text-sage-700"><strong>Type:</strong> {analysisResult.type}</p>
              <p className="text-sage-700"><strong>Severity:</strong> {analysisResult.severity}</p>
              <p className="text-sage-700"><strong>Confidence:</strong> {(analysisResult.confidence * 100).toFixed(1)}%</p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h4 className="font-semibold text-medical-700 mb-2">Clinical Details</h4>
              <ul className="list-disc list-inside text-sage-600 space-y-1">
                {analysisResult.details?.map((detail: string, index: number) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h4 className="font-semibold text-medical-700 mb-2">Recommendations</h4>
              <ul className="list-disc list-inside text-sage-600 space-y-1">
                {analysisResult.recommendations?.map((rec: string, index: number) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm">
              <h4 className="font-semibold text-medical-700 mb-2">Preventive Measures</h4>
              <ul className="list-disc list-inside text-sage-600 space-y-1">
                {analysisResult.preventiveMeasures?.map((measure: string, index: number) => (
                  <li key={index}>{measure}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SkinAnalysis;
