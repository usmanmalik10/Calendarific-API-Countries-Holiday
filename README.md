# Calendarific API Node.js Backend

## Overview

This project is a Node.js back-end service that provides RESTful API endpoints to fetch holiday and country data from the Calendarific API. The service uses Express.js for routing, Axios for HTTP requests, and NodeCache for in-memory caching.

## API Endpoints

### 1. Get Holidays

**Endpoint:** `GET /holidays`

**Query Parameters:**

- `country` (required): Country code (e.g., `PAK`)
- `year` (required): Year (e.g., `2024`)

**Description:** Fetches holidays for the specified country and year. The response is cached for future requests.

**Response:**

```json
{
  "meta": {
    "code": 200
  },
  "response": {
    "holidays": [
      {
        "name": "New Year's Day",
        "description": "Description of the holiday",
        "country": {
          "id": "pk",
          "name": "Pakistan"
        },
        "date": {
          "iso": "2024-01-01",
          "datetime": {
            "year": 2024,
            "month": 1,
            "day": 1
          }
        },
        "type": ["Optional holiday"],
        "primary_type": "Optional Holiday",
        "canonical_url": "https://calendarific.com/holiday/pakistan/new-year-day",
        "urlid": "pakistan/new-year-day",
        "locations": "All",
        "states": "All"
      }
    ]
  }
}
```

# Calendarific API Node.js Backend

## Overview

This project is a Node.js back-end service that provides RESTful API endpoints to fetch holiday and country data from the Calendarific API. The service uses Express.js for routing, Axios for HTTP requests, and NodeCache for in-memory caching.

## Features

- **Fetch Holidays:** Retrieve holidays for a specific country and year.
- **Fetch Countries:** Retrieve a list of supported countries.
- **Caching:** Data is cached to improve performance and reduce API calls.

## Prerequisites

- **Node.js:** Ensure Node.js is installed on your machine. You can download it from [Node.js official website](https://nodejs.org/).
- **npm:** Node.js comes with npm, but you can also update it to the latest version using `npm install -g npm`.

## Setup Instructions

### 1. Clone the Repository

First, you need to clone the repository from GitHub to your local machine. Open your terminal or command prompt and run:

```sh
git clone <repository-url>
```

- **Create File:** create .env file at root of project.
- **Rename File:** OR Rename the file from example.env to .env
- **API-Key:** create your api key by signing up on Calendarific.

```sh
CALENDARIFIC_API_KEY= your-api-key
PORT = 3000
TTL = 86400 #24 hours
BASE_URL = https://calendarific.com/api/v2
```

Run following command to setup

```sh
cd calendar-api
npm install
cd src
npm start
```

For auto running server install nodemon

```sh

npm install nodemone
npm run dev
```
