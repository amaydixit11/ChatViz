import { StatsCard } from "./StatsCard";
import { formatMessageData } from "@/lib/utils";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "../ThemeProvider";
import { ThemeConfig } from "@/themes";

interface UserMessagesProps {
  user_activity: Record<string, UserActivityStats>;
}

export const UserMessages = ({ user_activity }: UserMessagesProps) => {
  const { currentTheme } = useTheme(); // Get current currentTheme config

  const data = formatMessageData(user_activity);

  // Convert HSL colors to HEX for compatibility
  const colors = {
    primary: currentTheme.colors.primary.default,
    secondary: currentTheme.colors.secondary.default,
    foreground: currentTheme.colors.foreground,
    background: currentTheme.colors.background,
    border: currentTheme.colors.border,
  };
  console.log(colors)
  // Fallback UI if no data is available
  if (!data || data.length === 0) {
    return (
      <StatsCard title="Messages by User">
        <div className="flex h-full items-center justify-center text-muted-foreground">
          No data available
        </div>
      </StatsCard>
    );
  }

  return (
    <StatsCard title="Messages by User">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />

          <XAxis
            type="number"
            tickFormatter={(value) => value.toLocaleString()}
            stroke={colors.foreground}
          />
          <YAxis
            dataKey="name"
            type="category"
            width={120}
            tick={{ fontSize: 12, fill: colors.foreground }}
          />

          <Tooltip
            formatter={(value: number, name: string) =>
              name === "Characters (K)"
                ? `${(value as number).toLocaleString()}K`
                : (value as number).toLocaleString()
            }
            contentStyle={{
              backgroundColor: colors.background,
              color: colors.foreground,
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
            }}
          />

          <Legend wrapperStyle={{ fontSize: "12px", color: colors.foreground }} />

          <Bar
            dataKey="messages"
            name="Messages"
            fill={colors.primary}
            radius={[0, 8, 8, 0]}
          />
          <Bar
            dataKey="characters"
            name="Characters (K)"
            fill={colors.secondary}
            radius={[0, 8, 8, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </StatsCard>
  );
};
