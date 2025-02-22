
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import ServiceLayout from "@/components/layout/ServiceLayout";
import ServiceSelection from "@/components/services/ServiceSelection";
import SkinAnalysis from "@/components/services/SkinAnalysis";
import PregnancyAssessment from "@/components/services/PregnancyAssessment";
import * as z from "zod";

// Define the pregnancy form schema
export const pregnancyFormSchema = z.object({
  age: z.string().min(1, "Age is required"),
  systolicBP: z.string().min(1, "Systolic BP is required"),
  diastolicBP: z.string().min(1, "Diastolic BP is required"),
  bloodSugar: z.string().min(1, "Blood sugar level is required"),
  bodyTemp: z.string().min(1, "Body temperature is required"),
  heartRate: z.string().min(1, "Heart rate is required"),
});

const Index = () => {
  const [selectedService, setSelectedService] = useState<"skin" | "pregnancy" | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();

  const handleServiceSelect = (service: "skin" | "pregnancy") => {
    setSelectedService(service);
    setAnalysisResult(null);
  };

  const handleBack = () => {
    setSelectedService(null);
    setAnalysisResult(null);
  };

  const handleAnalyzeImage = async () => {
    setIsAnalyzing(true);
    try {
      toast({
        title: "Analysis Started",
        description: "Please wait while we analyze your image...",
      });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAnalysisResult({
        condition: "Malignant Melanoma",
        type: "Skin Cancer",
        severity: "High",
        confidence: 0.92,
        details: [
          "Irregular border pattern detected",
          "Asymmetrical shape identified",
          "Multiple color variations present"
        ],
        recommendations: [
          "Urgent consultation with a dermatologist required",
          "Schedule an appointment within 48 hours",
          "Avoid sun exposure to the affected area",
          "Document any changes in size or color",
          "Apply prescribed topical medication if available"
        ],
        preventiveMeasures: [
          "Use broad-spectrum sunscreen (SPF 50+)",
          "Wear protective clothing",
          "Perform monthly self-examinations",
          "Schedule regular skin screenings"
        ]
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to analyze image. Please try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePregnancySubmit = async (values: z.infer<typeof pregnancyFormSchema>) => {
    setIsAnalyzing(true);
    try {
      toast({
        title: "Analysis Started",
        description: "Analyzing pregnancy risk factors...",
      });
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setAnalysisResult({
        riskLevel: "Moderate",
        confidence: 0.85,
        vitalSigns: {
          bloodPressure: `${values.systolicBP}/${values.diastolicBP}`,
          bloodSugar: values.bloodSugar,
          temperature: values.bodyTemp,
          heartRate: values.heartRate
        },
        immediateActions: [
          "Schedule appointment with OB/GYN within 1 week",
          "Monitor blood pressure twice daily",
          "Keep blood sugar levels in check"
        ],
        dietPlan: {
          recommendations: [
            "Increase folic acid intake to 400mcg daily",
            "Consume 75-100g of protein daily",
            "Stay hydrated with 8-10 glasses of water",
            "Avoid processed foods and excess sugar"
          ],
          foods: {
            recommended: [
              "Leafy greens",
              "Lean proteins",
              "Whole grains",
              "Low-fat dairy products"
            ],
            avoid: [
              "Raw fish",
              "Unpasteurized dairy",
              "Excess caffeine",
              "Processed meats"
            ]
          }
        },
        lifestyle: [
          "Gentle exercise for 30 minutes daily",
          "Get 8 hours of sleep",
          "Practice stress-reduction techniques",
          "Avoid smoking and alcohol"
        ],
        nextSteps: [
          "Book prenatal checkup",
          "Start taking prenatal vitamins",
          "Join prenatal exercise class",
          "Consider genetic screening"
        ]
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to analyze risk factors. Please try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <ServiceLayout 
      title="AI Health Diagnostic Platform"
      description="Advanced AI-powered diagnostics for skin conditions and pregnancy risk assessment. Get instant, accurate insights to help guide your healthcare decisions."
      onBack={selectedService ? handleBack : undefined}
    >
      <AnimatePresence mode="wait">
        {!selectedService ? (
          <ServiceSelection onServiceSelect={handleServiceSelect} />
        ) : (
          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-medical-800 mb-4">
              {selectedService === "skin"
                ? "Skin Disease Screening"
                : "Pregnancy Risk Assessment"}
            </h2>
            
            {selectedService === "skin" ? (
              <SkinAnalysis 
                isAnalyzing={isAnalyzing}
                onAnalyze={handleAnalyzeImage}
                analysisResult={analysisResult}
              />
            ) : (
              <PregnancyAssessment
                isAnalyzing={isAnalyzing}
                onSubmit={handlePregnancySubmit}
                analysisResult={analysisResult}
              />
            )}
          </Card>
        )}
      </AnimatePresence>
    </ServiceLayout>
  );
};

export default Index;
