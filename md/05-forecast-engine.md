# Forecast Engine Design

## 1. Responsibilities

- Data Cleaning.
- Feature Engineering.
- Training.
- Prediction.
- Evaluation.

## 2. Feature Engineering

### Time Features

- `day_of_week`.
- `week_of_year`.
- `month`.
- `quarter`.

### Lag Features

- `lag_1`.
- `lag_7`.
- `lag_14`.
- `lag_30`.

### Rolling Features

- `rolling_avg_7`.
- `rolling_avg_30`.
- `rolling_avg_90`.

## 3. Models

### Phase 1

- Moving Average.
- Prophet.

### Phase 2

- XGBoost.
- LightGBM.

### Phase 3

- Vertex AI Forecasting.

## 4. Daily Forecast Flow

```text
Load Historical Sales
          |
          v
Data Cleaning
          |
          v
Feature Engineering
          |
          v
Forecast Model
          |
          v
Generate Prediction
          |
          v
Store Forecast Result
```
