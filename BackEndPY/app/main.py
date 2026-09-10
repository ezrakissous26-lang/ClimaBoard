from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def checkServerRunning():
    return 'Server running...'