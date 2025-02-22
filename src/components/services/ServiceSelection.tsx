
import { motion } from "framer-motion";
import { Microscope, Baby } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";

interface ServiceSelectionProps {
  onServiceSelect: (service: "skin" | "pregnancy") => void;
}

const ServiceSelection = ({ onServiceSelect }: ServiceSelectionProps) => {
  return (
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
        onClick={() => onServiceSelect("skin")}
      />
      <ServiceCard
        icon={<Baby className="w-6 h-6 text-medical-500" />}
        title="Pregnancy Risk Assessment"
        description="Get personalized risk assessment and recommendations"
        onClick={() => onServiceSelect("pregnancy")}
      />
    </motion.div>
  );
};

export default ServiceSelection;
