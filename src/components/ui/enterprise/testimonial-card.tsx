import { motion } from "motion/react";
import { Card, CardContent } from "../card";
import { Quote } from "lucide-react";
import { ImageWithFallback } from "../../figma/ImageWithFallback";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
  delay?: number;
}

export function TestimonialCard({
  quote,
  author,
  role,
  company,
  avatar,
  delay = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
    >
      <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 h-full border-2 hover:border-primary/20">
        {/* Quote icon background */}
        <div className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <Quote className="h-32 w-32 text-primary" />
        </div>

        <CardContent className="p-6 md:p-8 relative">
          {/* Quote icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: delay + 0.2,
            }}
            className="mb-4"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Quote className="h-5 w-5 text-primary" />
            </div>
          </motion.div>

          {/* Quote text */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.3 }}
            className="mb-6 text-base leading-relaxed italic"
          >
            "{quote}"
          </motion.blockquote>

          {/* Author info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.4 }}
            className="flex items-center gap-4"
          >
            {avatar ? (
              <div className="h-12 w-12 rounded-full overflow-hidden ring-2 ring-primary/20">
                <ImageWithFallback
                  src={avatar}
                  alt={author}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="h-12 w-12 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold">
                {author.charAt(0)}
              </div>
            )}

            <div>
              <p className="font-semibold">{author}</p>
              <p className="text-sm text-muted-foreground">
                {role} · {company}
              </p>
            </div>
          </motion.div>

          {/* Decorative gradient line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.5, duration: 0.5 }}
            className="mt-6 h-1 bg-brand-gradient rounded-full origin-left"
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}