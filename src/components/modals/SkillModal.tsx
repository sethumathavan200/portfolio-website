import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalTitle, 
  ModalDescription 
} from "@/components/ui/modal";
import { Award, BarChart3, BookOpen, TrendingUp } from "lucide-react";

interface Skill {
  id: number;
  name: string;
  level: number;
  category: string;
  description: string;
  projects: string[];
  yearsOfExperience: number;
  certifications?: string[];
  icon: any;
}

interface SkillModalProps {
  skill: Skill | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SkillModal = ({ skill, isOpen, onClose }: SkillModalProps) => {
  if (!skill) return null;

  const getSkillLevelText = (level: number) => {
    if (level >= 90) return "Expert";
    if (level >= 75) return "Advanced";
    if (level >= 50) return "Intermediate";
    return "Beginner";
  };

  const getSkillLevelColor = (level: number) => {
    if (level >= 90) return "text-emerald-500";
    if (level >= 75) return "text-blue-500";
    if (level >= 50) return "text-yellow-500";
    return "text-orange-500";
  };

  return (
    <Modal open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <ModalContent className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <ModalHeader>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <skill.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <ModalTitle className="text-2xl gradient-text">
                  {skill.name}
                </ModalTitle>
                <ModalDescription className="text-base">
                  {skill.category} • {skill.yearsOfExperience} years experience
                </ModalDescription>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${getSkillLevelColor(skill.level)}`}>
                  {getSkillLevelText(skill.level)}
                </div>
                <div className="text-sm text-muted-foreground">{skill.level}%</div>
              </div>
            </div>
          </ModalHeader>

          <div className="space-y-6">
            {/* Skill Progress */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Proficiency Level</span>
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <Progress value={skill.level} className="h-2" />
              </motion.div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {skill.description}
              </p>
            </div>

            {/* Experience Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card border-border/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="font-medium">Experience</span>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {skill.yearsOfExperience}
                </div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
              <div className="glass-card border-border/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="font-medium">Projects</span>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {skill.projects.length}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </div>

            {/* Related Projects */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Related Projects</h3>
              <div className="flex flex-wrap gap-2">
                {skill.projects.map((project, index) => (
                  <motion.div
                    key={project}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Badge variant="outline">{project}</Badge>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            {skill.certifications && skill.certifications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Certifications
                </h3>
                <div className="space-y-2">
                  {skill.certifications.map((cert, index) => (
                    <motion.div
                      key={cert}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 p-2 glass-card border-border/50 rounded"
                    >
                      <Award className="w-4 h-4 text-primary" />
                      <span className="text-sm">{cert}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </ModalContent>
    </Modal>
  );
};