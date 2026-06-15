import type { LucideIcon } from "lucide-react";

export interface StatCardProps {
  label: string;
  count: number | undefined;
  icon: LucideIcon;
  isLoading: boolean;
  isError: boolean;
}
