import logging
from collections import Counter, defaultdict
from datetime import datetime, timedelta
from typing import List, Dict
from textblob import TextBlob
import emoji
import re
import numpy as np

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def compute_basic_stats(messages: List[Dict]) -> Dict:
    logger.debug(f"Computing basic stats for {len(messages)} messages")
    
    total_messages = len(messages)
    participants = set(msg["sender"] for msg in messages if msg["sender"])

    stats = {
        "total_messages": total_messages,
        "total_participants": len(participants),
        "date_range": {
            "start": min(msg["date"] for msg in messages),
            "end": max(msg["date"] for msg in messages)
        },
        "message_types": Counter(msg["type"] for msg in messages),
        "media_count": len([m for m in messages if m["type"] == "media"]),
        "deleted_messages": len([m for m in messages if m["type"] == "deleted"]),
        "system_messages": len([m for m in messages if m["type"] == "system"]),
        "questions_asked": len([m for m in messages if m["has_question"]]),
        "exclamations_used": len([m for m in messages if m["has_exclamation"]]),
        "caps_messages": len([m for m in messages if m["is_caps"]]),
        "urls_shared": sum(len(msg["urls"]) for msg in messages),
        "total_emojis": sum(msg["emoji_count"] for msg in messages)
    }

    logger.debug(f"Basic stats computed: {stats}")
    return stats

def analyze_user_activity(messages: List[Dict]) -> Dict:
    logger.debug("Analyzing user activity...")
    
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
    
    for msg in messages:
        if not msg["sender"] or msg["type"] == "system":
            continue
            
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
        if stats["message_count"] > 0:
            stats["average_message_length"] = stats["word_count"] / stats["message_count"]
    
    logger.debug("User activity analysis completed")
    return dict(user_stats)

def analyze_time_patterns(messages: List[Dict]) -> Dict:
    logger.debug("Analyzing time patterns...")
    
    hour_activity = Counter(msg["hour"] for msg in messages)
    day_activity = Counter(msg["day_of_week"] for msg in messages)
    
    response_times = []
    prev_msg = None
    
    for msg in messages:
        if prev_msg and msg["sender"] and prev_msg["sender"]:
            if msg["sender"] != prev_msg["sender"]:
                time_diff = (datetime.fromisoformat(msg["timestamp"]) - 
                           datetime.fromisoformat(prev_msg["timestamp"]))
                if time_diff <= timedelta(hours=1):
                    response_times.append(time_diff.total_seconds())
        prev_msg = msg
    
    avg_response_time = np.mean(response_times) if response_times else 0
    
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
    
    logger.debug("Time pattern analysis completed")
    return result

def analyze_content(messages: List[Dict]) -> Dict:
    logger.debug("Analyzing content...")
    
    words = []
    emoji_stats = Counter()
    domains = []
    
    for msg in messages:
        if msg["type"] == "normal":
            words.extend(re.findall(r'\w+', msg["content"].lower()))
        emoji_stats.update(msg["emojis"])
        for url in msg["urls"]:
            try:
                domain = re.findall(r'https?://(?:www\.)?([^/]+)', url)[0]
                domains.append(domain)
            except:
                continue
    
    result = {
        "word_frequency": dict(Counter(words).most_common(50)),
        "emoji_frequency": dict(emoji_stats.most_common(20)),
        "shared_domains": dict(Counter(domains).most_common(10))
    }
    
    logger.debug("Content analysis completed")
    return result

def analyze_sentiment(messages: List[Dict]) -> Dict:
    logger.debug("Analyzing sentiment...")
    
    user_sentiment = defaultdict(list)
    overall_sentiment = []
    
    for msg in messages:
        if msg["type"] != "normal" or not msg["content"]:
            continue
            
        sentiment = TextBlob(msg["content"]).sentiment.polarity
        if msg["sender"]:
            user_sentiment[msg["sender"]].append(sentiment)
        overall_sentiment.append(sentiment)
    
    avg_user_sentiment = {
        user: {
            "average": np.mean(sentiments),
            "std": np.std(sentiments),
            "min": min(sentiments),
            "max": max(sentiments)
        }
        for user, sentiments in user_sentiment.items()
    }
    
    logger.debug("Sentiment analysis completed")
    return {
        "overall_sentiment": {
            "average": np.mean(overall_sentiment) if overall_sentiment else 0,
            "std": np.std(overall_sentiment) if overall_sentiment else 0
        },
        "user_sentiment": avg_user_sentiment
    }

def analyze_interaction_patterns(messages: List[Dict]) -> Dict:
    logger.debug("Analyzing interaction patterns...")
    
    interactions = defaultdict(int)
    prev_sender = None
    
    for msg in messages:
        if not msg["sender"] or msg["type"] == "system":
            continue
            
        for other_sender in set(m["sender"] for m in messages if m["sender"]):
            if other_sender != msg["sender"] and other_sender in msg["content"]:
                interactions[(msg["sender"], other_sender)] += 1
        
        prev_sender = msg["sender"]
    
    logger.debug("Interaction analysis completed")
    return {"interactions": dict(interactions)}

def generate_complete_analysis(messages: List[Dict]) -> Dict:
    logger.debug("Starting full chat analysis...")
    
    result = {
        "basic_stats": compute_basic_stats(messages),
        "user_activity": analyze_user_activity(messages),
        "time_patterns": analyze_time_patterns(messages),
        "content_analysis": analyze_content(messages),
        "sentiment_analysis": analyze_sentiment(messages),
        # "interaction_patterns": analyze_interaction_patterns(messages)
    }
    
    logger.debug("Complete analysis generated")
    return result
