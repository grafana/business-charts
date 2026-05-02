# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.59.1-noble

# Set the work directory for the application
WORKDIR /app

# Install dependencies first for better layer caching
COPY package*.json ./
RUN npm ci

# Install browsers
RUN npx playwright install --with-deps chromium

# Copy the rest of the application
COPY . .

# Run tests
CMD ["npm", "run", "test:e2e"]
