import re
from datetime import datetime
from typing import List, Dict
import emoji
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

class MessageType:
    NORMAL = "normal"
    MEDIA = "media"
    SYSTEM = "system"
    DELETED = "deleted"

def parse_chat_file(file_content) -> List[Dict]:
    messages = []
    
    # Enhanced pattern to catch system messages and media
    pattern = r'(\d{1,2}/\d{1,2}/\d{2,4},\s*\d{1,2}:\d{2}(?::\d{2})?(?:\s*[AaPp][Mm])?)\s*-\s*(?:([^:]+):\s*)?(.+)'
    
    for line_number, line in enumerate(file_content, start=1):
        line = line.strip()
        if not line:
            continue

        match = re.match(pattern, line)
        if match:
            timestamp_str, sender, content = match.groups()
            logger.debug(f"Line {line_number}: Matched regex - Timestamp: {timestamp_str}, Sender: {sender}, Content: {content[:50]}")

            # Parse timestamp with multiple formats
            timestamp = None
            for fmt in ["%d/%m/%y, %I:%M %p", "%d/%m/%y, %H:%M", 
                        "%d/%m/%Y, %I:%M %p", "%d/%m/%Y, %H:%M"]:
                try:
                    timestamp = datetime.strptime(timestamp_str.strip(), fmt)
                    break
                except ValueError:
                    continue
            
            if not timestamp:
                logger.warning(f"Line {line_number}: Failed to parse timestamp '{timestamp_str}'")
                continue

            # Determine message type
            msg_type = MessageType.NORMAL
            if not sender:
                msg_type = MessageType.SYSTEM
            elif "<Media omitted>" in content:
                msg_type = MessageType.MEDIA
            elif "This message was deleted" in content:
                msg_type = MessageType.DELETED

            # Extract emojis
            emojis_list = [c for c in content if c in emoji.EMOJI_DATA]

            # Extract mentions (assuming they start with @)
            mentions = re.findall(r'@\w+', content)

            # Extract URLs
            urls = re.findall(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', content)

            message = {
                "timestamp": timestamp.isoformat(),
                "date": timestamp.date().isoformat(),
                "time": timestamp.time().isoformat(),
                "hour": timestamp.hour,
                "minute": timestamp.minute,
                "day_of_week": timestamp.weekday(),
                "sender": sender.strip() if sender else None,
                "content": content.strip(),
                "type": msg_type,
                "word_count": len(content.split()) if msg_type == MessageType.NORMAL else 0,
                "character_count": len(content),
                "emojis": emojis_list,
                "emoji_count": len(emojis_list),
                "mentions": mentions,
                "urls": urls,
                "has_question": "?" in content,
                "has_exclamation": "!" in content,
                "is_caps": content.isupper() if len(content) > 3 else False
            }

            logger.debug(f"Line {line_number}: Parsed message - {message}")

            messages.append(message)
        else:
            logger.warning(f"Line {line_number}: No match found - {line[:50]}")

    logger.info(f"Parsing complete: {len(messages)} messages extracted.")
    return messages
