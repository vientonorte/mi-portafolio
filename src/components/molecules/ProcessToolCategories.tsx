import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import type { ProcessToolCategory } from "../../data/processes-data";

interface ProcessToolCategoriesProps {
  categories: ProcessToolCategory[];
  language: "es" | "en";
}

export function ProcessToolCategories({ categories, language }: ProcessToolCategoriesProps) {
  return (
    <div className="grid gap-8">
      {categories.map((category, categoryIndex) => {
        const name = language === "es" ? category.name : category.nameEN;
        const description =
          language === "es" ? category.description : category.descriptionEN;

        return (
          <motion.section
            key={category.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: categoryIndex * 0.06 }}
            aria-labelledby={`tool-category-${category.id}`}
          >
            <Card className="border-2 border-border/80">
              <CardContent className="p-6 md:p-8">
                <div className="mb-6">
                  <h3
                    id={`tool-category-${category.id}`}
                    className="text-xl font-bold text-foreground md:text-2xl"
                  >
                    {name}
                  </h3>
                  {description && (
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                      {description}
                    </p>
                  )}
                </div>

                <ul className="grid gap-4 md:grid-cols-2 list-none p-0 m-0">
                  {category.subcategories.map((sub) => {
                    const subName = language === "es" ? sub.name : sub.nameEN;
                    const subDescription =
                      language === "es" ? sub.description : sub.descriptionEN;

                    return (
                      <li key={sub.id}>
                        <article className="h-full rounded-xl border border-border bg-muted/20 p-4 md:p-5">
                          <h4 className="text-base font-semibold text-foreground">
                            {subName}
                          </h4>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {subDescription}
                          </p>
                          {sub.tools && sub.tools.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {sub.tools.map((tool) => (
                                <Badge key={tool} variant="secondary" className="text-xs">
                                  {tool}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </article>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          </motion.section>
        );
      })}
    </div>
  );
}