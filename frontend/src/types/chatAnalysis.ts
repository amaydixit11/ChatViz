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