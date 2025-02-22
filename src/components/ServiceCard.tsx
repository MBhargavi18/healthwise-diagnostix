
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  className?: string;
}

const ServiceCard = ({
  icon,
  title,
  description,
  onClick,
  className,
}: ServiceCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        onClick={onClick}
        className={cn(
          "relative overflow-hidden cursor-pointer transition-all duration-300",
          "hover:shadow-lg hover:bg-medical-50/50 group",
          className
        )}
      >
        <CardHeader className="relative z-10">
          <div className="w-12 h-12 rounded-full bg-medical-100 flex items-center justify-center mb-4 group-hover:bg-medical-200 transition-colors">
            {icon}
          </div>
          <CardTitle className="text-xl font-semibold text-medical-800">{title}</CardTitle>
          <CardDescription className="text-sage-600">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-medical-600 text-sm">Click to learn more</div>
        </CardContent>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-medical-200 to-medical-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
