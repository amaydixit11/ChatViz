
import { getSentimentColor } from '@/lib/utils';
import { StatsCard } from './StatsCard';

interface OverallSentimentProps {
    overall_sentiment: SentimentStats
}
  
export const OverallSentiment = ({ overall_sentiment }: OverallSentimentProps) => {
    return (
        <StatsCard title="Overall Sentiment">
            <div className="space-y-6">
                <div>
                <dt className="text-sm font-medium text-gray-500">Average Score</dt>
                <dd className={`mt-2 text-4xl font-semibold ${
                    getSentimentColor(overall_sentiment.average)
                }`}>
                    {overall_sentiment.average.toFixed(3)}
                </dd>
                </div>
                <div>
                <dt className="text-sm font-medium text-gray-500">Standard Deviation</dt>
                <dd className="mt-2 text-2xl font-semibold">
                    {overall_sentiment.std.toFixed(3)}
                </dd>
                </div>
            </div>
        </StatsCard>
    );
}


