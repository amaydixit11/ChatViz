from fastapi import FastAPI, File, UploadFile

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "WhatsApp Chat Analyzer API"}

@app.post("/upload/")
async def upload_chat(file: UploadFile = File(...)):
    content = await file.read()
    return {"filename": file.filename, "size": len(content)}
