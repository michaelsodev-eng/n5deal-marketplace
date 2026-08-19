import type { Metadata } from "next";
import { ResourcesView } from "@/components/resources/resources-view";

export const metadata: Metadata = {
  title: "Ресурси",
  description:
    "Матеріали про M&A, придбання бізнесу, due diligence, оцінку та інвестиційну готовність.",
};

export default function ResourcesPage() {
  return <ResourcesView />;
}
