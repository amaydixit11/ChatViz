from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.routers import parsing, analysis

app = FastAPI(title="WhatsApp Chat Analyzer")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(parsing.router)
app.include_router(analysis.router)
    
@app.get("/")
async def root():
    return {"message": "WhatsApp Chat Analyzer API"}