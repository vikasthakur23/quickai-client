import {
  Eraser,
  FileText,
  Hash,
  Image as ImageIcon,
  ScanSearch,
  Sparkles,
} from "lucide-react";

export const AiToolsList = [
  {
    title: "Article Generator",
    description: "Give a title and target length, get a full article drafted by AI.",
    Icon: FileText,
    path: "/ai/write-article",
    accent: "signal",
  },
  {
    title: "Blog Title Generator",
    description: "Turn a keyword and category into five scroll-stopping blog titles.",
    Icon: Hash,
    path: "/ai/blog-titles",
    accent: "circuit",
  },
  {
    title: "Image Generator",
    description: "Describe a scene in words, get an original AI-generated image.",
    Icon: ImageIcon,
    path: "/ai/generate-images",
    accent: "pro",
  },
  {
    title: "Background Remover",
    description: "Upload any photo and get back a clean, transparent cutout.",
    Icon: Eraser,
    path: "/ai/remove-background",
    accent: "signal",
  },
  {
    title: "Object Remover",
    description: "Describe an unwanted object and AI erases it from your photo.",
    Icon: ScanSearch,
    path: "/ai/remove-object",
    accent: "circuit",
  },
  {
    title: "Resume Analyzer",
    description: "Upload your resume and get an honest, actionable AI review.",
    Icon: Sparkles,
    path: "/ai/review-resume",
    accent: "pro",
  },
];
