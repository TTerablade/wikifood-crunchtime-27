import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "./ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const HeroSection = () => {
  const [activeText, setActiveText] = useState("Talk");
  const textOptions = ["Talk", "Cook", "Look"];
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const textRotationTimer = setInterval(() => {
      setActiveText(currentText => {
        const idx = textOptions.indexOf(currentText);
        return textOptions[(idx + 1) % textOptions.length];
      });
    }, 2000);

    return () => clearInterval(textRotationTimer);
  }, []);

  function openTrailer() {
    window.open('https://www.youtube.com/watch?v=GnvUB3K-n1E', '_blank');
    toast({
      title: "Trailer",
      description: "Opening video trailer...",
    });
  };

  const scrollToRecipeFilter = () => {
    const recipeFilterSection = document.getElementById('recipe-filter-section');
    if (recipeFilterSection) {
      recipeFilterSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100
      }
    }
  };

  const bulbVariants = {
    initial: { opacity: 0.7, scale: 1 },
    animate: { 
      opacity: [0.7, 1, 0.7], 
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as "reverse"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { 
        duration: 0.2 
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          className="w-full h-full"
        >
          <img 
            src="/lovable-uploads/0fddfe61-51f7-4f97-bba5-555b7789c0ff.png"
            alt="Chef cooking with flames"
            className="w-full h-full object-cover brightness-75"
          />
        </motion.div>
      </div>

      <div className="absolute top-0 w-full overflow-hidden">
        <div className="flex justify-between px-4 py-2">
          {[...Array(20)].map((_, i) => (
            <motion.span
              key={i}
              variants={bulbVariants}
              initial="initial"
              animate="animate"
              custom={i}
              transition={{ delay: i * 0.1 }}
              className={`w-3 h-3 rounded-full ${
                i % 5 === 0 ? 'bg-red-500' : 
                i % 5 === 1 ? 'bg-blue-500' : 
                i % 5 === 2 ? 'bg-green-500' : 
                i % 5 === 3 ? 'bg-yellow-500' : 'bg-purple-500'
              }`}
            />
          ))}
        </div>
      </div>

      <motion.div 
        className="container mx-auto px-4 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <motion.button 
          className="mb-8 px-6 py-2 bg-black/50 text-white rounded-full flex items-center gap-2 mx-auto hover:bg-black/70 transition-colors"
          onClick={openTrailer}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatType: "reverse"
            }}
          >
            <Play size={16} />
          </motion.div>
          Watch Trailer
        </motion.button>

        <motion.h1 
          className="text-6xl md:text-7xl font-bold mb-6 text-white"
          variants={itemVariants}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeText}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="text-yellow-400 inline-block"
            >
              {activeText}
            </motion.span>
          </AnimatePresence> Like A
          <br />
          Chef
        </motion.h1>
        
        <motion.p 
          className="text-xl text-white/90 mb-8"
          variants={itemVariants}
        >
          Master the art of cooking. Learn techniques and recipes from expert chefs around the world!
        </motion.p>

        <motion.div variants={itemVariants}>
          <Button 
            variant="default"
            onClick={scrollToRecipeFilter}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-lg px-8 py-6"
          >
            Find your perfect recipe
          </Button>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ 
            y: [0, 10, 0],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        >
          <ChevronDown className="text-white h-8 w-8 cursor-pointer" onClick={scrollToRecipeFilter} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
