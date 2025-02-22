
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Microscope, Baby } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [selectedService, setSelectedService] = useState<"skin" | "pregnancy" | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const handleServiceSelect = (service: "skin" | "pregnancy") => {
    setSelectedService(service);
  };

  const handleImageSelect = (file: File) => {
    setImage(file);
  };

  const handleBack = () => {
    setSelectedService(null);
    setImage(null);
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
                    {image && (
                      <Button className="w-full bg-medical-500 hover:bg-medical-600 text-white">
                        Analyze Image
                      </Button>
                    )}
                  </div>
                )}
                {selectedService === "pregnancy" && (
                  <div className="text-center py-12">
                    <p className="text-sage-600">
                      Pregnancy risk assessment feature coming soon...
                    </p>
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
