import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatNumber = (num: number): string => 
  new Intl.NumberFormat().format(Math.round(num));

export const formatDate = (dateString: string): string => 
  new Date(dateString).toLocaleDateString();

export const formatDuration = (seconds: number): string => {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  return `${Math.round(seconds / 3600)}h`;
};

export const formatMessageData = (user_activity: Record<string, UserActivityStats>): MessageData[] => 
  Object.entries(user_activity)
    .map(([name, data]) => ({
      name,
      messages: data.message_count,
      characters: Math.round(data.character_count / 1000)
    }))
    .sort((a, b) => b.messages - a.messages);

export const formatHourlyData = (hourly_activity: Record<string, number>): HourlyData[] => 
  Object.entries(hourly_activity)
    .map(([hour, count]) => ({
      hour: `${hour.padStart(2, '0')}:00`,
      count
    }))
    .sort((a, b) => Number(a.hour.split(':')[0]) - Number(b.hour.split(':')[0]));

export const formatEmojiData = (content_analysis: ContentAnalysis): EmojiData[] => 
  Object.entries(content_analysis.emoji_frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([emoji, count]) => ({
      name: emoji,
      value: count
    }));

export const getSentimentColor = (sentiment: number): string => {
  if (sentiment > 0.1) return 'text-green-600';
  if (sentiment < -0.1) return 'text-red-600';
  return 'text-blue-600';
};