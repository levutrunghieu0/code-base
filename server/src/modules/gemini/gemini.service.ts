import { Injectable } from '@nestjs/common';

@Injectable()
export class GeminiService {
  explain(productCode: string, trend: 'up' | 'down' | 'stable' = 'stable') {
    const message =
      trend === 'up'
        ? 'Sales increased continuously during the previous four weeks and seasonal demand is expected to rise.'
        : trend === 'down'
          ? 'Recent sales are declining, so purchasing should be conservative until demand recovers.'
          : 'Demand is stable based on recent sales patterns and rolling averages.';

    return { productCode, trend, explanation: message, model: 'gemini-explanation-placeholder' };
  }
}
