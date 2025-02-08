import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";

interface StatsCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  backgroundClassName?: string; // For custom background styles
}

export const StatsCard = ({
  title,
  children,
  className,
  backgroundClassName,
}: StatsCardProps) => (
  <Card
    className={clsx(
      "group relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg",
      className
    )}
  >
    <div
      className={clsx(
        "absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl transition-all duration-300 group-hover:blur-xl",
        backgroundClassName
      )}
    />

    <CardHeader>
      <CardTitle className="text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
        {title}
      </CardTitle>
    </CardHeader>

    <CardContent className="relative z-10 p-2 h-[600px]">
      {children}
    </CardContent>
    <div className="absolute bottom-0 left-0 h-1 w-full scale-x-0 bg-primary/30 transition-transform duration-300 group-hover:scale-x-100" />
  </Card>
);
