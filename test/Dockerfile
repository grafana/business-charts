# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:focal@sha256:2286c685f2be91dd3ee482f1a3d382af08c9a1049406c9f7b499aec6ad691a2c

# Set the work directory for the application
WORKDIR app

# COPY the needed files to the app folder in Docker image
COPY .. .

# Install the dependencies in Node environment
RUN npm install --only=dev

# Install browsers
RUN npx playwright install --with-deps chromium

# Run tests
CMD ["npm", "run", "test:e2e"]
