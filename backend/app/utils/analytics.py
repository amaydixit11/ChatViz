import logging
from collections import Counter, defaultdict
from datetime import datetime, timedelta
from textblob import TextBlob
import emoji
import re
import numpy as np
import networkx as nx
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation
from typing import List, Dict

# Configure logging with more detailed format
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(funcName)s - %(message)s'
)
logger = logging.getLogger(__name__)

def compute_basic_stats(messages: List[Dict]) -> Dict:
    logger.info(f"Starting basic stats computation for {len(messages)} messages")
    
    try:
        total_messages = len(messages)
        logger.debug(f"Found {total_messages} total messages")
        
        participants = set(msg["sender"] for msg in messages if msg["sender"])
        logger.debug(f"Identified {len(participants)} unique participants")

        date_range = {
            "start": min(msg["date"] for msg in messages),
            "end": max(msg["date"] for msg in messages)
        }
        logger.debug(f"Date range: {date_range['start']} to {date_range['end']}")

        message_types = Counter(msg["type"] for msg in messages)
        logger.debug(f"Message type distribution: {dict(message_types)}")

        media_count = len([m for m in messages if m["type"] == "media"])
        logger.debug(f"Media messages count: {media_count}")

        deleted_count = len([m for m in messages if m["type"] == "deleted"])
        logger.debug(f"Deleted messages count: {deleted_count}")

        system_count = len([m for m in messages if m["type"] == "system"])
        logger.debug(f"System messages count: {system_count}")

        questions = len([m for m in messages if m["has_question"]])
        logger.debug(f"Questions asked: {questions}")

        exclamations = len([m for m in messages if m["has_exclamation"]])
        logger.debug(f"Exclamations used: {exclamations}")

        caps = len([m for m in messages if m["is_caps"]])
        logger.debug(f"Messages in caps: {caps}")

        urls = sum(len(msg["urls"]) for msg in messages)
        logger.debug(f"Total URLs shared: {urls}")

        emoji_count = sum(msg["emoji_count"] for msg in messages)
        logger.debug(f"Total emojis used: {emoji_count}")

        stats = {
            "total_messages": total_messages,
            "total_participants": len(participants),
            "date_range": date_range,
            "message_types": dict(message_types),
            "media_count": media_count,
            "deleted_messages": deleted_count,
            "system_messages": system_count,
            "questions_asked": questions,
            "exclamations_used": exclamations,
            "caps_messages": caps,
            "urls_shared": urls,
            "total_emojis": emoji_count
        }
        
        logger.info("Basic stats computation completed successfully")
        return stats
        
    except Exception as e:
        logger.error(f"Error computing basic stats: {str(e)}", exc_info=True)
        raise

def analyze_user_activity(messages: List[Dict]) -> Dict:
    logger.info(f"Starting user activity analysis for {len(messages)} messages")
    
    try:
        user_stats = defaultdict(lambda: {
            "message_count": 0,
            "word_count": 0,
            "character_count": 0,
            "emoji_count": 0,
            "media_count": 0,
            "questions_asked": 0,
            "exclamations_used": 0,
            "caps_messages": 0,
            "urls_shared": 0,
            "average_message_length": 0
        })
        
        for idx, msg in enumerate(messages):
            if not msg["sender"] or msg["type"] == "system":
                logger.debug(f"Skipping message {idx}: no sender or system message")
                continue
                
            logger.debug(f"Processing message {idx} from sender: {msg['sender']}")
            stats = user_stats[msg["sender"]]
            stats["message_count"] += 1
            stats["word_count"] += msg["word_count"]
            stats["character_count"] += msg["character_count"]
            stats["emoji_count"] += msg["emoji_count"]
            stats["media_count"] += 1 if msg["type"] == "media" else 0
            stats["questions_asked"] += 1 if msg["has_question"] else 0
            stats["exclamations_used"] += 1 if msg["has_exclamation"] else 0
            stats["caps_messages"] += 1 if msg["is_caps"] else 0
            stats["urls_shared"] += len(msg["urls"])

        for user, stats in user_stats.items():
            logger.debug(f"Calculating averages for user: {user}")
            if stats["message_count"] > 0:
                stats["average_message_length"] = stats["word_count"] / stats["message_count"]
                logger.debug(f"User {user} average message length: {stats['average_message_length']:.2f}")

        logger.info("User activity analysis completed successfully")
        return dict(user_stats)
        
    except Exception as e:
        logger.error(f"Error analyzing user activity: {str(e)}", exc_info=True)
        raise

def analyze_time_patterns(messages: List[Dict]) -> Dict:
    logger.info("Starting time pattern analysis")
    
    try:
        hour_activity = Counter(msg["hour"] for msg in messages)
        logger.debug(f"Hourly activity distribution: {dict(hour_activity)}")
        
        day_activity = Counter(msg["day_of_week"] for msg in messages)
        logger.debug(f"Daily activity distribution: {dict(day_activity)}")
        
        response_times = []
        prev_msg = None
        
        for idx, msg in enumerate(messages):
            if prev_msg and msg["sender"] and prev_msg["sender"]:
                if msg["sender"] != prev_msg["sender"]:
                    time_diff = (datetime.fromisoformat(msg["timestamp"]) - 
                               datetime.fromisoformat(prev_msg["timestamp"]))
                    if time_diff <= timedelta(hours=1):
                        response_times.append(time_diff.total_seconds())
                        logger.debug(f"Response time at message {idx}: {time_diff.total_seconds():.2f} seconds")
            prev_msg = msg
        
        logger.debug(f"Collected {len(response_times)} valid response times")
        
        avg_response_time = np.mean(response_times) if response_times else 0
        logger.debug(f"Average response time: {avg_response_time:.2f} seconds")
        
        result = {
            "hourly_activity": dict(hour_activity),
            "daily_activity": dict(day_activity),
            "peak_hour": hour_activity.most_common(1)[0][0],
            "peak_day": day_activity.most_common(1)[0][0],
            "average_response_time_seconds": avg_response_time,
            "response_time_distribution": {
                "min": min(response_times) if response_times else 0,
                "max": max(response_times) if response_times else 0,
                "median": np.median(response_times) if response_times else 0
            }
        }
        
        logger.info("Time pattern analysis completed successfully")
        return result
        
    except Exception as e:
        logger.error(f"Error analyzing time patterns: {str(e)}", exc_info=True)
        raise

def analyze_content(messages: List[Dict]) -> Dict:
    logger.info("Starting content analysis")
    
    try:
        words = []
        emoji_stats = Counter()
        domains = []
        
        for idx, msg in enumerate(messages):
            logger.debug(f"Processing message {idx} content")
            
            if msg["type"] == "normal":
                msg_words = re.findall(r'\w+', msg["content"].lower())
                words.extend(msg_words)
                logger.debug(f"Added {len(msg_words)} words from message {idx}")
                
            emoji_count = len(msg["emojis"])
            if emoji_count > 0:
                emoji_stats.update(msg["emojis"])
                logger.debug(f"Added {emoji_count} emojis from message {idx}")
                
            for url in msg["urls"]:
                try:
                    domain = re.findall(r'https?://(?:www\.)?([^/]+)', url)[0]
                    domains.append(domain)
                    logger.debug(f"Extracted domain from URL in message {idx}: {domain}")
                except Exception as e:
                    logger.warning(f"Failed to extract domain from URL in message {idx}: {str(e)}")
                    continue
        
        word_freq = Counter(words).most_common(50)
        logger.debug(f"Found {len(word_freq)} most common words")
        
        emoji_freq = emoji_stats.most_common(20)
        logger.debug(f"Found {len(emoji_freq)} most common emojis")
        
        domain_freq = Counter(domains).most_common(10)
        logger.debug(f"Found {len(domain_freq)} most common domains")
        
        result = {
            "word_frequency": dict(word_freq),
            "emoji_frequency": dict(emoji_freq),
            "shared_domains": dict(domain_freq)
        }
        
        logger.info("Content analysis completed successfully")
        return result
        
    except Exception as e:
        logger.error(f"Error analyzing content: {str(e)}", exc_info=True)
        raise

def analyze_sentiment(messages: List[Dict]) -> Dict:
    logger.info("Starting sentiment analysis")
    
    try:
        user_sentiment = defaultdict(list)
        overall_sentiment = []
        
        for idx, msg in enumerate(messages):
            if msg["type"] != "normal" or not msg["content"]:
                logger.debug(f"Skipping message {idx}: not normal type or no content")
                continue
                
            try:
                sentiment = TextBlob(msg["content"]).sentiment.polarity
                logger.debug(f"Message {idx} sentiment: {sentiment:.3f}")
                
                if msg["sender"]:
                    user_sentiment[msg["sender"]].append(sentiment)
                overall_sentiment.append(sentiment)
                
            except Exception as e:
                logger.warning(f"Failed to analyze sentiment for message {idx}: {str(e)}")
                continue
        
        avg_user_sentiment = {}
        for user, sentiments in user_sentiment.items():
            logger.debug(f"Calculating sentiment stats for user: {user}")
            avg_user_sentiment[user] = {
                "average": np.mean(sentiments),
                "std": np.std(sentiments),
                "min": min(sentiments),
                "max": max(sentiments)
            }
            logger.debug(f"User {user} sentiment stats: {avg_user_sentiment[user]}")
        
        result = {
            "overall_sentiment": {
                "average": np.mean(overall_sentiment) if overall_sentiment else 0,
                "std": np.std(overall_sentiment) if overall_sentiment else 0
            },
            "user_sentiment": avg_user_sentiment
        }
        
        logger.info("Sentiment analysis completed successfully")
        return result
        
    except Exception as e:
        logger.error(f"Error analyzing sentiment: {str(e)}", exc_info=True)
        raise


def analyze_burst_silence(messages):
    logger.info("Starting burst and silence analysis")
    
    try:
        burst_periods = []
        silence_periods = []
        prev_time = None
        
        for idx, msg in enumerate(messages):
            if prev_time:
                time_diff = datetime.fromisoformat(msg['timestamp']) - datetime.fromisoformat(prev_time)
                diff_seconds = time_diff.total_seconds()
                
                if time_diff < timedelta(minutes=5):
                    burst_periods.append(diff_seconds)
                    logger.debug(f"Recorded burst period at message {idx}: {diff_seconds:.2f} seconds")
                else:
                    silence_periods.append(diff_seconds)
                    logger.debug(f"Recorded silence period at message {idx}: {diff_seconds:.2f} seconds")
            
            prev_time = msg['timestamp']
        
        logger.debug(f"Found {len(burst_periods)} burst periods and {len(silence_periods)} silence periods")
        
        result = {
            'burst_avg': np.mean(burst_periods) if burst_periods else 0,
            'silence_avg': np.mean(silence_periods) if silence_periods else 0
        }
        
        logger.info("Burst and silence analysis completed successfully")
        return result
        
    except Exception as e:
        logger.error(f"Error analyzing burst and silence patterns: {str(e)}", exc_info=True)
        raise

def analyze_readability(messages):
    logger.info("Starting readability analysis")
    
    try:
        readability_scores = {}
        
        for idx, msg in enumerate(messages):
            if msg['type'] == 'normal' and msg['content']:
                try:
                    words = msg['content'].split()
                    sentences = max(1, msg['content'].count('.'))
                    score = (0.39 * len(words) / sentences) + (11.8 * sum(map(len, words)) / max(1, len(words))) - 15.59
                    
                    readability_scores[msg['sender']] = readability_scores.get(msg['sender'], []) + [score]
                    logger.debug(f"Message {idx} readability score: {score:.2f}")
                    
                except Exception as e:
                    logger.warning(f"Failed to calculate readability for message {idx}: {str(e)}")
                    continue
        
        result = {user: np.mean(scores) for user, scores in readability_scores.items()}
        logger.debug(f"Calculated average readability scores for {len(result)} users")
        
        logger.info("Readability analysis completed successfully")
        return result
        
    except Exception as e:
        logger.error(f"Error analyzing readability: {str(e)}", exc_info=True)
        raise

def analyze_interactions(messages):
    logger.info("Starting interaction analysis")
    
    try:
        interactions = {}  # Changed from defaultdict to regular dict
        prev_sender = None
        
        for idx, msg in enumerate(messages):
            if msg['sender'] and prev_sender and msg['sender'] != prev_sender:
                # Create a string key instead of tuple
                interaction_key = f"{prev_sender}:{msg['sender']}"
                interactions[interaction_key] = interactions.get(interaction_key, 0) + 1
                logger.debug(f"Recorded interaction: {interaction_key}")
            prev_sender = msg['sender']
        
        logger.debug(f"Found {len(interactions)} unique interaction pairs")
        
        # Convert to a format that's JSON-serializable
        result = {
            'interactions': [
                {
                    'source': key.split(':')[0],
                    'target': key.split(':')[1],
                    'count': count
                }
                for key, count in interactions.items()
            ]
        }
        
        logger.info("Interaction analysis completed successfully")
        return result
        
    except Exception as e:
        logger.error(f"Error analyzing interactions: {str(e)}", exc_info=True)
        raise

def analyze_network(messages):
    logger.info("Starting network analysis")
    
    try:
        G = nx.Graph()
        
        for idx, msg in enumerate(messages):
            if msg['sender']:
                for mentioned in msg.get('mentions', []):
                    G.add_edge(msg['sender'], mentioned)
                    logger.debug(f"Added edge: {msg['sender']} -> {mentioned}")
        
        logger.debug(f"Created network with {G.number_of_nodes()} nodes and {G.number_of_edges()} edges")
        
        try:
            degree_cent = nx.degree_centrality(G)
            # Convert to list of objects for better serialization
            degree_centrality = [
                {'user': user, 'centrality': value}
                for user, value in degree_cent.items()
            ]
            logger.debug(f"Calculated degree centrality for {len(degree_centrality)} nodes")
        except Exception as e:
            logger.warning(f"Failed to calculate degree centrality: {str(e)}")
            degree_centrality = []
            
        try:
            between_cent = nx.betweenness_centrality(G)
            # Convert to list of objects for better serialization
            betweenness_centrality = [
                {'user': user, 'centrality': value}
                for user, value in between_cent.items()
            ]
            logger.debug(f"Calculated betweenness centrality for {len(betweenness_centrality)} nodes")
        except Exception as e:
            logger.warning(f"Failed to calculate betweenness centrality: {str(e)}")
            betweenness_centrality = []
        
        result = {
            'degree_centrality': degree_centrality,
            'betweenness_centrality': betweenness_centrality
        }
        
        logger.info("Network analysis completed successfully")
        return result
        
    except Exception as e:
        logger.error(f"Error in network analysis: {str(e)}", exc_info=True)
        raise
def analyze_topics(messages, num_topics=5):
    logger.info(f"Starting topic analysis with {num_topics} topics")
    
    try:
        content_list = [msg['content'] for msg in messages if msg['type'] == 'normal']
        logger.debug(f"Collected {len(content_list)} messages for topic analysis")
        
        try:
            vectorizer = CountVectorizer(stop_words='english')
            X = vectorizer.fit_transform(content_list)
            logger.debug(f"Vectorized content with shape: {X.shape}")
            
            lda = LatentDirichletAllocation(n_components=num_topics, random_state=42)
            lda.fit(X)
            logger.debug("LDA model fitted successfully")
            
            feature_names = vectorizer.get_feature_names_out()
            logger.debug(f"Extracted {len(feature_names)} features")
            
            topics = {}
            for topic_idx, topic in enumerate(lda.components_):
                top_words = [feature_names[i] for i in topic.argsort()[:-11:-1]]
                topics[f'Topic {topic_idx+1}'] = top_words
                logger.debug(f"Topic {topic_idx+1} top words: {', '.join(top_words)}")
            
            logger.info("Topic analysis completed successfully")
            return topics
            
        except Exception as e:
            logger.error(f"Error in topic modeling: {str(e)}")
            return {}
            
    except Exception as e:
        logger.error(f"Error in topic analysis: {str(e)}", exc_info=True)
        raise

def analyze_sleep_patterns(messages):
    logger.info("Starting sleep pattern analysis")
    
    try:
        sleep_patterns = defaultdict(list)
        
        for idx, msg in enumerate(messages):
            if msg['sender']:
                try:
                    hour = datetime.fromisoformat(msg['timestamp']).hour
                    sleep_patterns[msg['sender']].append(hour)
                    logger.debug(f"Recorded activity hour {hour} for user {msg['sender']}")
                except Exception as e:
                    logger.warning(f"Failed to process timestamp for message {idx}: {str(e)}")
                    continue
        
        result = {}
        for user, hours in sleep_patterns.items():
            hour_counts = Counter(hours)
            logger.debug(f"User {user} active hours distribution: {dict(hour_counts)}")
            result[user] = {'active_hours': dict(hour_counts)}
        
        logger.info("Sleep pattern analysis completed successfully")
        return result
        
    except Exception as e:
        logger.error(f"Error analyzing sleep patterns: {str(e)}", exc_info=True)
        raise

def analyze_code_snippets(messages):
    logger.info("Starting code snippet analysis")
    
    try:
        code_snippet_count = defaultdict(int)
        code_indicators = ['```', 'def ', 'class ', '#include', 'import ', 'console.log']
        
        for idx, msg in enumerate(messages):
            if msg['type'] == 'normal':
                if any(token in msg['content'] for token in code_indicators):
                    code_snippet_count[msg['sender']] += 1
                    logger.debug(f"Found code snippet in message {idx} from {msg['sender']}")
        
        logger.debug(f"Found code snippets from {len(code_snippet_count)} users")
        
        logger.info("Code snippet analysis completed successfully")
        return dict(code_snippet_count)
        
    except Exception as e:
        logger.error(f"Error analyzing code snippets: {str(e)}", exc_info=True)
        raise

def analyze_stopwords(messages):
    logger.info("Starting stopword analysis")
    
    try:
        word_counts = Counter()
        
        for idx, msg in enumerate(messages):
            if msg['type'] == 'normal':
                try:
                    words = re.findall(r'\w+', msg['content'].lower())
                    word_counts.update(words)
                    logger.debug(f"Processed {len(words)} words from message {idx}")
                except Exception as e:
                    logger.warning(f"Failed to process words in message {idx}: {str(e)}")
                    continue
        
        most_common = dict(word_counts.most_common(50))
        logger.debug(f"Found {len(most_common)} most common words")
        
        logger.info("Stopword analysis completed successfully")
        return most_common
        
    except Exception as e:
        logger.error(f"Error analyzing stopwords: {str(e)}", exc_info=True)
        raise

def generate_complete_analysis(messages: List[Dict]) -> Dict:
    logger.info(f"Starting complete analysis for {len(messages)} messages")
    
    try:
        result = {}
        
        analysis_functions = {
            "basic_stats": compute_basic_stats,
            "user_activity": analyze_user_activity,
            "time_patterns": analyze_time_patterns,
            "content_analysis": analyze_content,
            "sentiment_analysis": analyze_sentiment,
            'interactions': analyze_interactions,
            'burst_silence': analyze_burst_silence,
            'readability': analyze_readability,
            'network_analysis': analyze_network,
            'topics': analyze_topics,
            'sleep_patterns': analyze_sleep_patterns,
            'code_snippets': analyze_code_snippets,
            'stopwords': analyze_stopwords
        }
        
        for analysis_name, analysis_func in analysis_functions.items():
            try:
                logger.debug(f"Running {analysis_name} analysis")
                result[analysis_name] = analysis_func(messages)
                logger.debug(f"Completed {analysis_name} analysis successfully")
            except Exception as e:
                logger.error(f"Error in {analysis_name} analysis: {str(e)}")
                result[analysis_name] = None
        
        logger.info("Complete analysis generated successfully")
        return result
        
    except Exception as e:
        logger.error(f"Error generating complete analysis: {str(e)}", exc_info=True)
        raise