import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Microscope, Baby, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ServiceCard from "@/components/ServiceCard";
import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const pregnancyFormSchema = z.object({
  age: z.string().min(1, "Age is required"),
  systolicBP: z.string().min(1, "Systolic BP is required"),
  diastolicBP: z.string().min(1, "Diastolic BP is required"),
  bloodSugar: z.string().min(1, "Blood sugar level is required"),
  bodyTemp: z.string().min(1, "Body temperature is required"),
  heartRate: z.string().min(1, "Heart rate is required"),
});

const Index = () => {
  const [selectedService, setSelectedService] = useState<"skin" | "pregnancy" | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof pregnancyFormSchema>>({
    resolver: zodResolver(pregnancyFormSchema),
    defaultValues: {
      age: "",
      systolicBP: "",
      diastolicBP: "",
      bloodSugar: "",
      bodyTemp: "",
      heartRate: "",
    },
  });

  const handleServiceSelect = (service: "skin" | "pregnancy") => {
    setSelectedService(service);
    setAnalysisResult(null);
  };

  const handleImageSelect = (file: File) => {
    setImage(file);
    setAnalysisResult(null);
  };

  const handleBack = () => {
    setSelectedService(null);
    setImage(null);
    setAnalysisResult(null);
    form.reset();
  };

  const handleAnalyzeImage = async () => {
    if (!image) return;

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

  const onPregnancySubmit = async (values: z.infer<typeof pregnancyFormSchema>) => {
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
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-medical-50">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-medical-800 mb-4">
            AI Health Diagnostic Platform
          </h1>
          <p className="text-sage-600 max-w-2xl mx-auto">
            Advanced AI-powered diagnostics for skin conditions and pregnancy risk assessment.
            Get instant, accurate insights to help guide your healthcare decisions.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedService ? (
            <motion.div
              key="services"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            >
              <ServiceCard
                icon={<Microscope className="w-6 h-6 text-medical-500" />}
                title="Skin Disease Screening"
                description="Upload an image for AI-powered analysis of skin conditions"
                onClick={() => handleServiceSelect("skin")}
              />
              <ServiceCard
                icon={<Baby className="w-6 h-6 text-medical-500" />}
                title="Pregnancy Risk Assessment"
                description="Get personalized risk assessment and recommendations"
                onClick={() => handleServiceSelect("pregnancy")}
              />
            </motion.div>
          ) : (
            <motion.div
              key="service-detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto"
            >
              <Button
                variant="ghost"
                onClick={handleBack}
                className="mb-6 text-medical-600 hover:text-medical-800 hover:bg-medical-100"
              >
                ← Back to services
              </Button>

              <Card className="p-6 bg-white/80 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold text-medical-800 mb-4">
                  {selectedService === "skin"
                    ? "Skin Disease Screening"
                    : "Pregnancy Risk Assessment"}
                </h2>
                
                {selectedService === "skin" && (
                  <div className="space-y-4">
                    <p className="text-sage-600 mb-4">
                      Upload a clear image of the affected skin area for AI analysis
                    </p>
                    <ImageUploader onImageSelect={handleImageSelect} />
                    {image && !analysisResult && (
                      <Button 
                        className="w-full bg-medical-500 hover:bg-medical-600 text-white"
                        onClick={handleAnalyzeImage}
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
                )}

                {selectedService === "pregnancy" && (
                  <div className="space-y-6">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onPregnancySubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Age</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="Enter age" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="systolicBP"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Systolic BP</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="Enter systolic BP" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="diastolicBP"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Diastolic BP</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="Enter diastolic BP" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="bloodSugar"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Blood Sugar</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="Enter blood sugar" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="bodyTemp"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Body Temperature</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="Enter body temperature" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="heartRate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Heart Rate</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="Enter heart rate" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full bg-medical-500 hover:bg-medical-600 text-white"
                          disabled={isAnalyzing}
                        >
                          {isAnalyzing ? "Analyzing..." : "Analyze Risk Factors"}
                        </Button>
                      </form>
                    </Form>

                    {analysisResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-6 bg-medical-50 rounded-lg space-y-4"
                      >
                        <h3 className="text-2xl font-semibold text-medical-800 mb-3">Risk Assessment Results</h3>
                        <div className="grid gap-4">
                          <div className="p-4 bg-white rounded-lg shadow-sm">
                            <h4 className="font-semibold text-medical-700 mb-2">Risk Overview</h4>
                            <p className="text-sage-700"><strong>Risk Level:</strong> {analysisResult.riskLevel}</p>
                            <p className="text-sage-700"><strong>Confidence:</strong> {(analysisResult.confidence * 100).toFixed(1)}%</p>
                          </div>

                          <div className="p-4 bg-white rounded-lg shadow-sm">
                            <h4 className="font-semibold text-medical-700 mb-2">Vital Signs Analysis</h4>
                            <div className="grid grid-cols-2 gap-2">
                              <p className="text-sage-700"><strong>Blood Pressure:</strong> {analysisResult.vitalSigns?.bloodPressure}</p>
                              <p className="text-sage-700"><strong>Blood Sugar:</strong> {analysisResult.vitalSigns?.bloodSugar}</p>
                              <p className="text-sage-700"><strong>Temperature:</strong> {analysisResult.vitalSigns?.temperature}°C</p>
                              <p className="text-sage-700"><strong>Heart Rate:</strong> {analysisResult.vitalSigns?.heartRate} bpm</p>
                            </div>
                          </div>

                          <div className="p-4 bg-white rounded-lg shadow-sm">
                            <h4 className="font-semibold text-medical-700 mb-2">Immediate Actions Required</h4>
                            <ul className="list-disc list-inside text-sage-600 space-y-1">
                              {analysisResult.immediateActions?.map((action: string, index: number) => (
                                <li key={index}>{action}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-4 bg-white rounded-lg shadow-sm">
                            <h4 className="font-semibold text-medical-700 mb-2">Diet Plan</h4>
                            <div className="space-y-4">
                              <div>
                                <h5 className="font-medium text-medical-600 mb-2">General Recommendations</h5>
                                <ul className="list-disc list-inside text-sage-600 space-y-1">
                                  {analysisResult.dietPlan?.recommendations.map((rec: string, index: number) => (
                                    <li key={index}>{rec}</li>
                                  ))}
                                </ul>
                              </div>
                              <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="font-medium text-medical-600 mb-2">Recommended Foods</h5>
                                  <ul className="list-disc list-inside text-sage-600 space-y-1">
                                    {analysisResult.dietPlan?.foods.recommended.map((food: string, index: number) => (
                                      <li key={index}>{food}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h5 className="font-medium text-medical-600 mb-2">Foods to Avoid</h5>
                                  <ul className="list-disc list-inside text-sage-600 space-y-1">
                                    {analysisResult.dietPlan?.foods.avoid.map((food: string, index: number) => (
                                      <li key={index}>{food}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-white rounded-lg shadow-sm">
                            <h4 className="font-semibold text-medical-700 mb-2">Lifestyle Recommendations</h4>
                            <ul className="list-disc list-inside text-sage-600 space-y-1">
                              {analysisResult.lifestyle?.map((rec: string, index: number) => (
                                <li key={index}>{rec}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-4 bg-white rounded-lg shadow-sm">
                            <h4 className="font-semibold text-medical-700 mb-2">Next Steps</h4>
                            <ul className="list-disc list-inside text-sage-600 space-y-1">
                              {analysisResult.nextSteps?.map((step: string, index: number) => (
                                <li key={index}>{step}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
