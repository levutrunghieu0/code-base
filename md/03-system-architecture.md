# System Architecture

## 1. High-Level Architecture

```text
+-------------------+
| React Dashboard   |
+---------+---------+
          |
          v
+-------------------+
| NestJS API        |
+---------+---------+
          |
          +----------------+
          |                |
          v                v
+----------------+  +----------------+
| Cloud SQL      |  | Forecast Engine|
| PostgreSQL     |  | Python Service |
+----------------+  +----------------+
          |
          v
+----------------+
| Vertex AI      |
| Gemini         |
+----------------+
```

## 2. NestJS Backend Design

### Modules

```text
src
├── auth
├── sales
├── inventory
├── forecast
├── recommendation
├── dashboard
├── scheduler
├── gemini
└── common
```

## 3. API List

### Sales

```http
GET /sales/history
POST /sales/import
```

### Forecast

```http
POST /forecast/run
GET /forecast/results
GET /forecast/accuracy
```

### Recommendation

```http
GET /recommendations
```

### Dashboard

```http
GET /dashboard/summary
```

## 4. Forecast Service API

### Generate Forecast

```http
POST /forecast
```

#### Request

```json
{
  "storeCode": "STORE001",
  "productCode": "PRODUCT001",
  "forecastDays": 30
}
```

#### Response

```json
{
  "forecast": [
    {
      "date": "2026-07-01",
      "quantity": 120
    }
  ]
}
```

## 5. Final Business Flow

```text
Sales Data
    |
    v
Cloud SQL
    |
    v
Forecast Engine
    |
    v
Forecast Result
    |
    +------> Dashboard
    |
    +------> Inventory Recommendation
    |
    +------> Gemini Explanation
    |
    v
Business Decision
```
