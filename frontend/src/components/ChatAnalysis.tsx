import React, { JSX } from 'react';
import { RefreshCw } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// Types
interface DateRange {
  start: string;
  end: string;
}

interface MessageTypes {
  normal: number;
  media: number;
  deleted: number;
}

interface BasicStats {
  total_messages: number;
  total_participants: number;
  date_range: DateRange;
  message_types: MessageTypes;
  media_count: number;
  deleted_messages: number;
  system_messages: number;
  questions_asked: number;
  exclamations_used: number;
  caps_messages: number;
  urls_shared: number;
  total_emojis: number;
}

interface UserActivityStats {
  message_count: number;
  word_count: number;
  character_count: number;
  emoji_count: number;
  media_count: number;
  questions_asked: number;
  exclamations_used: number;
  caps_messages: number;
  urls_shared: number;
  average_message_length: number;
}

interface TimePatterns {
  hourly_activity: Record<string, number>;
  daily_activity: Record<string, number>;
  peak_hour: number;
  peak_day: number;
  average_response_time_seconds: number;
  response_time_distribution: {
    min: number;
    max: number;
    median: number;
  };
}

interface ContentAnalysis {
  word_frequency: Record<string, number>;
  emoji_frequency: Record<string, number>;
  shared_domains: Record<string, number>;
}

interface SentimentStats {
  average: number;
  std: number;
  min: number;
  max: number;
}

interface SentimentAnalysis {
  overall_sentiment: SentimentStats;
  user_sentiment: Record<string, SentimentStats>;
}

interface ChatAnalysis {
  basic_stats: BasicStats;
  user_activity: Record<string, UserActivityStats>;
  time_patterns: TimePatterns;
  content_analysis: ContentAnalysis;
  sentiment_analysis: SentimentAnalysis;
}

interface ChatAnalysisProps {
  analysis: ChatAnalysis;
  onReset: () => void;
}

// Types for chart data
interface MessageData {
  name: string;
  messages: number;
  characters: number;
}

interface HourlyData {
  hour: string;
  count: number;
}

interface EmojiData {
  name: string;
  value: number;
}

// Constants
const CHART_COLORS = [
  '#2563eb', '#7c3aed', '#db2777', '#ea580c',
  '#65a30d', '#0891b2', '#6366f1', '#d946ef'
];

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Helper Functions
const formatNumber = (num: number): string => 
  new Intl.NumberFormat().format(Math.round(num));

const formatDate = (dateString: string): string => 
  new Date(dateString).toLocaleDateString();

const formatDuration = (seconds: number): string => {
  if (seconds < 60) return `${Math.round(seconds)}s`;
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
  return `${Math.round(seconds / 3600)}h`;
};

export default function ChatAnalysis({ analysis, onReset }: ChatAnalysisProps): JSX.Element {
  // Data Formatting Functions
  const formatMessageData = (): MessageData[] => 
    Object.entries(analysis.user_activity)
      .map(([name, data]) => ({
        name,
        messages: data.message_count,
        characters: Math.round(data.character_count / 1000)
      }))
      .sort((a, b) => b.messages - a.messages);

  const formatHourlyData = (): HourlyData[] => 
    Object.entries(analysis.time_patterns.hourly_activity)
      .map(([hour, count]) => ({
        hour: `${hour.padStart(2, '0')}:00`,
        count
      }))
      .sort((a, b) => Number(a.hour.split(':')[0]) - Number(b.hour.split(':')[0]));

  const formatEmojiData = (): EmojiData[] => 
    Object.entries(analysis.content_analysis.emoji_frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([emoji, count]) => ({
        name: emoji,
        value: count
      }));

  const getSentimentColor = (sentiment: number): string => {
    if (sentiment > 0.1) return 'text-green-600';
    if (sentiment < -0.1) return 'text-red-600';
    return 'text-blue-600';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Chat Analysis Results</h2>
          <p className="text-gray-500 mt-2">
            {formatDate(analysis.basic_stats.date_range.start)} - {formatDate(analysis.basic_stats.date_range.end)}
          </p>
        </div>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors rounded-lg border border-blue-200 hover:border-blue-300 bg-white"
        >
          <RefreshCw className="h-4 w-4" />
          New Analysis
        </button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-6">
                  <div className="space-y-1">
                    <dt className="text-sm font-medium text-gray-500">Total Messages</dt>
                    <dd className="text-3xl font-semibold">
                      {formatNumber(analysis.basic_stats.total_messages)}
                    </dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-sm font-medium text-gray-500">Participants</dt>
                    <dd className="text-3xl font-semibold">
                      {analysis.basic_stats.total_participants}
                    </dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-sm font-medium text-gray-500">Media Shared</dt>
                    <dd className="text-3xl font-semibold">
                      {formatNumber(analysis.basic_stats.media_count)}
                    </dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-sm font-medium text-gray-500">Total Emojis</dt>
                    <dd className="text-3xl font-semibold">
                      {formatNumber(analysis.basic_stats.total_emojis)}
                    </dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-sm font-medium text-gray-500">URLs Shared</dt>
                    <dd className="text-3xl font-semibold">
                      {formatNumber(analysis.basic_stats.urls_shared)}
                    </dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-sm font-medium text-gray-500">Avg Response Time</dt>
                    <dd className="text-3xl font-semibold">
                      {formatDuration(analysis.time_patterns.average_response_time_seconds)}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Messages by User</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={formatMessageData()} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="messages" name="Messages" fill="#2563eb" />
                    <Bar dataKey="characters" name="Characters (K)" fill="#7c3aed" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hourly Activity</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={formatHourlyData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      stroke="#2563eb" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Peak Activity</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Peak Hour</span>
                        <span className="font-medium">{analysis.time_patterns.peak_hour}:00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Peak Day</span>
                        <span className="font-medium">
                          {DAYS_OF_WEEK[analysis.time_patterns.peak_day]}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Response Time</h4>
                    <p className="text-2xl font-semibold">
                      {formatDuration(analysis.time_patterns.average_response_time_seconds)}
                    </p>
                    <div className="mt-2 text-sm text-gray-500">
                      <div>Min: {formatDuration(analysis.time_patterns.response_time_distribution.min)}</div>
                      <div>Max: {formatDuration(analysis.time_patterns.response_time_distribution.max)}</div>
                      <div>Median: {formatDuration(analysis.time_patterns.response_time_distribution.median)}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Most Used Emojis</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={formatEmojiData()}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      label={({ name, value }: EmojiData) => `${name} (${value})`}
                    >
                      {formatEmojiData().map((_, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={CHART_COLORS[index % CHART_COLORS.length]} 
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Words & URLs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Top Words</h4>
                    <div className="space-y-2">
                      {Object.entries(analysis.content_analysis.word_frequency)
                        .slice(0, 8)
                        .map(([word, count]) => (
                          <div key={word} className="flex justify-between items-center">
                            <span className="text-gray-700">{word}</span>
                            <span className="font-medium">{count}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">Top Domains</h4>
                    <div className="space-y-2">
                      {Object.entries(analysis.content_analysis.shared_domains)
                        .slice(0, 8)
                        .map(([domain, count]) => (
                          <div key={domain} className="flex justify-between items-center">
                            <span className="text-gray-700">{domain}</span>
                            <span className="font-medium">{count}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sentiment" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Overall Sentiment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Average Score</dt>
                    <dd className={`mt-2 text-4xl font-semibold ${
                      getSentimentColor(analysis.sentiment_analysis.overall_sentiment.average)
                    }`}>
                      {analysis.sentiment_analysis.overall_sentiment.average.toFixed(3)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Standard Deviation</dt>
                    <dd className="mt-2 text-2xl font-semibold">
                      {analysis.sentiment_analysis.overall_sentiment.std.toFixed(3)}
                    </dd>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sentiment by User</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(analysis.sentiment_analysis.user_sentiment)
                    .map(([user, data]) => (
                      <div key={user} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="font-medium">{user}</p>
                          <span className={`text-xl font-semibold ${getSentimentColor(data.average)}`}>
                            {data.average.toFixed(3)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Standard Deviation: {data.std.toFixed(3)}
                        </div>
                        <div className="text-sm">
                          Range: [{data.min.toFixed(2)}, {data.max.toFixed(2)}]
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}