# ContactList_Search

Simple static contact-list web application (HTML, CSS, JS) with search, add and delete features.

## Features
- Search contacts as you type
- Add new contact (name + number)
- Delete contact by name
- Single-page static app (no server required)

## Project structure
- index.html — main UI
- styles.css — styles
- tries.js — app logic (search/insert/delete)
- Dockerfile — container image (nginx)
- Jenkinsfile — example CI pipeline
- .dockerignore

## Prerequisites
- Docker (for container build/run)
- Optional: Jenkins (for CI)

## Run locally (quick)
Open `index.html` in your browser or serve with a simple local server.

PowerShell (from project root):
```powershell
# using Python 3
python -m http.server 8000
# then open http://localhost:8000 in browser
```

## Build and run with Docker
From project root (PowerShell):
```powershell
# build image
docker build -t contactlistsearch:1.0 .

# run container (maps host 8082 -> container 80)
docker run -d --name contactlistsearch -p 8082:80 contactlistsearch:1.0

# stop & remove container
docker stop contactlistsearch
docker rm contactlistsearch
```
Open http://localhost:8082

## Jenkins pipeline
The included `Jenkinsfile` checks out the repo, builds the Docker image and can optionally push to a registry. Update `DOCKER_REGISTRY_CREDENTIALS` and image name if pushing to Docker Hub.

## Notes
- The app is static — persistent storage is not provided; data resets on page reload.
- Update `.dockerignore` to exclude files you don't want in the image.
- For production, consider adding HTTPS, input validation improvements and persistent storage.
