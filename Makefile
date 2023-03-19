.PHONY: start dev build test lint clean help

start:
    @echo "Starting production server..."
    NODE_ENV=production node dist/server.js

dev:
    @echo "Starting development server..."
    NODE_ENV=development nodemon src/server.ts

build:
    @echo "Building project..."
    rm -rf dist
    tsc

test:
    @echo "Running tests..."
    jest

lint:
    @echo "Running linter..."
    eslint .

clean:
    @echo "Cleaning up..."
    rm -rf node_modules
    rm -rf dist

help:
    @echo "Available commands:"
    @echo "  start  - start the production server"
    @echo "  dev    - start the development server"
    @echo "  build  - build the project"
    @echo "  test   - run tests"
    @echo "  lint   - run linter"
    @echo "  clean  - clean up project files"
    @echo "  help   - display this help message"
