import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface TypewriterProps {
  words: string[];
  className?: string;
  loop?: boolean;
  delayBetweenWords?: number;
  typingSpeed?: number;
}

export const Typewriter = ({ 
  words, 
  className = "", 
  loop = true, 
  delayBetweenWords = 2000,
  typingSpeed = 100 
}: TypewriterProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText !== word) {
          setCurrentText(word.substring(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), delayBetweenWords);
        }
      } else {
        if (currentText !== "") {
          setCurrentText(word.substring(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => {
            if (loop) {
              return (prev + 1) % words.length;
            }
            return Math.min(prev + 1, words.length - 1);
          });
        }
      }
    }, isDeleting ? typingSpeed / 2 : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, loop, delayBetweenWords, typingSpeed]);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="border-r-2 border-primary ml-1"
      />
    </span>
  );
};