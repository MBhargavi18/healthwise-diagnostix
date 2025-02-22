
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const pregnancyFormSchema = z.object({
  age: z.string().min(1, "Age is required"),
  systolicBP: z.string().min(1, "Systolic BP is required"),
  diastolicBP: z.string().min(1, "Diastolic BP is required"),
  bloodSugar: z.string().min(1, "Blood sugar level is required"),
  bodyTemp: z.string().min(1, "Body temperature is required"),
  heartRate: z.string().min(1, "Heart rate is required"),
});

interface PregnancyAssessmentProps {
  isAnalyzing: boolean;
  onSubmit: (values: z.infer<typeof pregnancyFormSchema>) => Promise<void>;
  analysisResult: any;
}

const PregnancyAssessment = ({ isAnalyzing, onSubmit, analysisResult }: PregnancyAssessmentProps) => {
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

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
  );
};

export default PregnancyAssessment;
