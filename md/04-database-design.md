# Database Design

## sales_history

```sql
CREATE TABLE sales_history (
    id BIGSERIAL PRIMARY KEY,
    store_code VARCHAR(50) NOT NULL,
    product_code VARCHAR(50) NOT NULL,
    category_code VARCHAR(50),
    sale_date DATE NOT NULL,
    quantity NUMERIC(12,2) NOT NULL,
    sales_amount NUMERIC(12,2),
    gross_profit NUMERIC(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## inventory

```sql
CREATE TABLE inventory (
    id BIGSERIAL PRIMARY KEY,
    store_code VARCHAR(50),
    product_code VARCHAR(50),
    current_stock NUMERIC(12,2),
    updated_at TIMESTAMP
);
```

## sales_forecast

```sql
CREATE TABLE sales_forecast (
    id BIGSERIAL PRIMARY KEY,
    store_code VARCHAR(50),
    product_code VARCHAR(50),
    forecast_date DATE,
    forecast_quantity NUMERIC(12,2),
    forecast_sales_amount NUMERIC(12,2),
    model_name VARCHAR(100),
    mape NUMERIC(10,4),
    created_at TIMESTAMP
);
```

## purchase_recommendation

```sql
CREATE TABLE purchase_recommendation (
    id BIGSERIAL PRIMARY KEY,
    store_code VARCHAR(50),
    product_code VARCHAR(50),
    recommendation_date DATE,
    recommended_quantity NUMERIC(12,2),
    safety_stock NUMERIC(12,2),
    current_inventory NUMERIC(12,2),
    created_at TIMESTAMP
);
```
