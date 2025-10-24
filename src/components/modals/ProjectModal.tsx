import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalTitle, 
  ModalDescription 
} from "@/components/ui/modal";
import { ExternalLink, Github, Calendar, Tag, Star } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  image: string;
  demoUrl: string;
  repoUrl: string;
  featured: boolean;
  status: string;
  year: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Modal open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <ModalContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <ModalHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <ModalTitle className="text-2xl gradient-text flex items-center gap-2">
                  {project.title}
                  {project.featured && (
                    <Star className="w-5 h-5 text-primary fill-current" />
                  )}
                </ModalTitle>
                <ModalDescription className="text-base mt-2">
                  {project.description}
                </ModalDescription>
              </div>
              <div className="flex flex-col gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {project.year}
                </Badge>
                <Badge 
                  variant={project.status === 'Completed' ? 'default' : 'secondary'}
                >
                  {project.status}
                </Badge>
              </div>
            </div>
          </ModalHeader>

          <div className="space-y-6">
            {/* Project Image */}
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-primary/50">
                {project.title.charAt(0)}
              </div>
            </div>

            {/* Detailed Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Project Details
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      {tech}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Category & Links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center pt-4 border-t border-border/50">
              <Badge variant="outline" className="text-sm">
                {project.category}
              </Badge>
              <div className="flex gap-3">
                <Button className="btn-glow" asChild>
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Demo
                  </a>
                </Button>
                <Button variant="outline" className="glass-card border-border/50" asChild>
                  <a 
                    href={project.repoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </ModalContent>
    </Modal>
  );
};