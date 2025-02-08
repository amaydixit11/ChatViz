
import { getSentimentColor } from '@/lib/utils';
import { StatsCard } from './StatsCard';


interface UserSentimentProps {
    userSentiment: Record<string, SentimentStats>
}
  
export const UserSentiment = ({ userSentiment }: UserSentimentProps) => {
    return (
        <StatsCard title="Sentiment By User">
            <div className="space-y-4">
                {Object.entries(userSentiment)
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
        </StatsCard>
    );
}


