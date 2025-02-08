import logging
from fastapi import APIRouter, HTTPException
from typing import List, Dict
from ..utils.analytics import generate_complete_analysis

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/analysis", tags=["analysis"])

@router.post("/complete")
async def analyze_chat(messages: List[Dict]):
    """
    Generate a complete analysis of the chat, including:
    - Basic statistics
    - User activity patterns
    - Time-based patterns
    - Content analysis
    - Sentiment analysis
    - Interaction patterns
    """
    logger.debug(f"Received chat messages for analysis: {len(messages)} messages")

    if not messages:
        logger.warning("No messages received for analysis")
        raise HTTPException(status_code=400, detail="No messages provided")

    try:
        logger.debug("Starting chat analysis...")
        analysis = generate_complete_analysis(messages)
        logger.debug("Chat analysis completed successfully")
        return analysis
    except Exception as e:
        logger.error(f"Error during chat analysis: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal server error during analysis")
