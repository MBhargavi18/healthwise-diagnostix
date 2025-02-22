
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ServiceLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  onBack?: () => void;
}

const ServiceLayout = ({ children, title, description, onBack }: ServiceLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 to-medical-50">
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-medical-800 mb-4">{title}</h1>
          <p className="text-sage-600 max-w-2xl mx-auto">{description}</p>
        </motion.div>
        {onBack && (
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-6 text-medical-600 hover:text-medical-800 hover:bg-medical-100"
          >
            ← Back to services
          </Button>
        )}
        {children}
      </div>
    </div>
  );
};

export default ServiceLayout;
