# Test Cases, Non-Functional Requirements, and Roadmap

## 1. Test Cases

### Sales Import

#### TC-001: Valid CSV import

Expected: Success.

#### TC-002: Duplicate Data

Expected: Rejected.

### Forecast

#### TC-010: Generate 30-day forecast

Expected: Forecast records created.

### Recommendation

#### TC-020: Current stock lower than forecast

Expected: Purchase recommendation generated.

## 2. Non-Functional Requirements

### Performance

- Forecast API: `< 5 seconds`.
- Dashboard Load: `< 3 seconds`.

### Availability

- 99.9%.

### Scalability

Support:

- 1,000 Stores.
- 100,000 Products.
- Millions of Sales Records.

## 3. Development Roadmap

### Sprint 1

- Cloud SQL.
- Sales Import.
- Forecast PoC.

### Sprint 2

- Forecast Dashboard.
- Recommendation Engine.

### Sprint 3

- Scheduler.
- Accuracy Monitoring.

### Sprint 4

- Vertex AI Integration.
- Gemini Explanation.

## 4. Future Enhancements

- Promotion Effect Forecast.
- Weather Impact Forecast.
- Holiday Impact Forecast.
- Automatic Purchase Order Generation.
- Supplier Recommendation.
- Dynamic Safety Stock.
- Inventory Optimization AI.
- Gross Profit Optimization AI.
