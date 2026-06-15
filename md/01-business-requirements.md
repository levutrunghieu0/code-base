# Business Requirements

## 1. Executive Summary

### 1.1 Business Background

Current inventory planning is primarily based on manual judgment and historical sales review.

As a result:

- Overstock occurs frequently.
- Product disposal costs increase.
- Gross Profit decreases.
- Stock-out situations occur for popular products.

Business stakeholders would like to leverage AI technology to forecast future sales demand and improve purchasing accuracy.

### 1.2 Project Objective

The primary objective is:

> Forecast future sales demand based on historical sales data and provide inventory recommendations to optimize purchasing decisions and maximize Gross Profit.

Expected benefits:

- Reduce waste and disposal costs.
- Reduce stock-out risk.
- Improve inventory turnover.
- Improve purchasing accuracy.
- Increase Gross Profit.

## 2. Business Scope

### Phase 1

#### Included

- Historical sales collection.
- Sales demand forecasting.
- Forecast dashboard.
- Forecast accuracy monitoring.
- Purchase recommendation.

#### Excluded

- Automatic purchasing.
- ERP integration.
- Supplier ordering automation.

### Phase 2

#### Included

- Multi-store forecasting.
- Multi-product forecasting.
- Promotion impact analysis.
- AI explanation.

### Phase 3

#### Included

- Automatic replenishment recommendation.
- Inventory optimization.
- Gross Profit optimization.

## 3. Business Requirements

### BR-01 Historical Sales Management

System shall store historical sales information.

#### Input

| Field | Description |
| --- | --- |
| Store | Store Identifier |
| Product | Product Identifier |
| Category | Product Category |
| Date | Sales Date |
| Quantity | Sold Quantity |
| Amount | Sales Amount |
| GP | Gross Profit |

### BR-02 Sales Forecast

System shall forecast future sales demand.

#### Forecast periods

- Next 7 Days.
- Next 30 Days.
- Next 90 Days.

#### Forecast dimensions

- Store.
- Product.
- Category.

### BR-03 Forecast Accuracy

System shall calculate prediction accuracy.

#### Metrics

- MAPE.
- MAE.
- RMSE.

### BR-04 Inventory Recommendation

System shall recommend purchasing quantity.

#### Formula

```text
Recommended Quantity = Forecast Demand + Safety Stock - Current Inventory
```

Recommended Quantity should not be lower than `0`.

### BR-05 Dashboard

System shall provide:

- Historical trend.
- Forecast trend.
- Forecast accuracy.
- Purchase recommendation.
