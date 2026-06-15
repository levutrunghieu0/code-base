# Operations, Security, and Monitoring

## 1. Scheduler Design

### Daily Job Time

```text
00:00
```

### Tasks

1. Load Sales.
2. Train Model.
3. Generate Forecast.
4. Calculate Accuracy.
5. Generate Recommendations.

## 2. Vertex AI Integration

### Forecasting

Generate demand prediction.

### Gemini

Explain prediction results.

#### Example

Question:

> Why will Product A increase next month?

Answer:

> Sales increased continuously during the previous four weeks and seasonal demand is expected to rise.

## 3. Security Design

### Authentication

JWT.

### Authorization Roles

- Admin.
- Manager.
- Buyer.
- Viewer.

### Audit Log

Track:

- Forecast generation.
- Data import.
- Recommendation changes.

## 4. Monitoring

### System Monitoring

- API Response Time.
- Error Rate.
- Forecast Job Duration.

### Business Monitoring

- Forecast Accuracy.
- Inventory Turnover.
- Disposal Rate.
- Gross Profit.
