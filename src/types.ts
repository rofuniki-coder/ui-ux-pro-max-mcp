export interface UIPattern {
  id: string;
  title: string;
  category: string;
  description: string;
  principles: string[];
  examples: {
    good?: string;
    bad?: string;
    code_good?: string;
    code_bad?: string;
  };
  metadata: Record<string, any>;
  tags: string[];
}
