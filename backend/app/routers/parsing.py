from fastapi import APIRouter, UploadFile, File
from ..utils.parser import parse_chat_file
from typing import List
import io
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/parse", tags=["parsing"])

@router.post("/chat")
async def parse_chat(file: UploadFile = File(...)):
    try:
        # Read file content
        content = await file.read()
        text = content.decode("utf-8")

        # Debugging: Log file size and preview content
        logger.debug(f"Received file: {file.filename}, Size: {len(content)} bytes")
        logger.debug(f"File content preview: {text[:500]}")  # Log first 500 characters

        # Parse chat messages
        messages = parse_chat_file(io.StringIO(text))

        # Debugging: Log parsed messages count and sample
        logger.debug(f"Parsed {len(messages)} messages.")
        if messages:
            logger.debug(f"First 3 messages: {messages[:3]}")

        return {"messages": messages}

    except Exception as e:
        logger.error(f"Error parsing chat: {e}", exc_info=True)
        return {"error": "Failed to parse chat"}
