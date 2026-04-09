import { motion } from "motion/react";
import { LucideIcon, ArrowRight } from "lucide-react";
import { Card } from "../card";

export interface ProcessStep {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
}

interface ProcessFlowProps {
  steps: ProcessStep[];
  direction?: "horizontal" | "vertical";
}

export function ProcessFlow({
  steps,
  direction = "horizontal",
}: ProcessFlowProps) {
  return (
    <div
      className={`flex ${
        direction === "horizontal"
          ? "flex-col md:flex-row items-center"
          : "flex-col"
      } gap-4`}
    >
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isLast = index === steps.length - 1;

        return (
          <div
            key={index}
            className={`flex ${
              direction === "horizontal"
                ? "flex-col md:flex-row items-center"
                : "flex-col"
            } ${direction === "horizontal" ? "flex-1" : "w-full"}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                delay: index * 0.15,
              }}
              className="w-full"
            >
              <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
                {/* Animated gradient border on hover */}
                <motion.div
                  className="absolute inset-0 bg-brand-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ padding: "2px" }}
                  initial={false}
                  whileHover={{ opacity: 0.1 }}
                />

                <div className="relative bg-card p-6">
                  {/* Step number badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: index * 0.15 + 0.1,
                    }}
                    className="absolute -top-3 -right-3 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-lg"
                  >
                    {index + 1}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Icon className="h-7 w-7 text-primary" />
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.2 }}
                  >
                    <h4 className="mb-2 font-semibold text-lg">
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>

                  {/* Decorative gradient line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                    className="mt-4 h-1 bg-brand-gradient rounded-full origin-left"
                  />
                </div>
              </Card>
            </motion.div>

            {/* Arrow connector */}
            {!isLast && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 + 0.4 }}
                className={`flex items-center justify-center ${
                  direction === "horizontal"
                    ? "mx-4 my-4 md:my-0"
                    : "my-4"
                } text-primary`}
              >
                <motion.div
                  animate={{
                    x: direction === "horizontal" ? [0, 5, 0] : 0,
                    y: direction === "vertical" ? [0, 5, 0] : 0,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRight
                    className={`h-6 w-6 ${
                      direction === "vertical" ? "rotate-90" : ""
                    }`}
                  />
                </motion.div>
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}