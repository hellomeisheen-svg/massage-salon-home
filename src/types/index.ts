export type Service = {
  id: string;
  title: string;
  category: string;
  description: string;
  duration: string;
  price: string;
  badge?: string;
  features?: string[];
  sessionInfo?: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};
