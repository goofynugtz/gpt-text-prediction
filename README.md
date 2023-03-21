1. Create a virtual environment.
```bash
pip install -r requirements.txt
```
2. To deploy the project  
Make sure to have docker setup and running first
This will pull docker image of 4~5GB for pytorch-cuda.
```bash
docker compose build && docker compose up
```
3. Set up front-end
```bash
cd frontend/
yarn
yarn dev
```

