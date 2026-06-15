import { Injectable } from '@nestjs/common';

@Injectable()
export class SchedulerService {
  dailyJobPlan() {
    return {
      time: '00:00',
      tasks: [
        'Load Sales',
        'Train Model',
        'Generate Forecast',
        'Calculate Accuracy',
        'Generate Recommendations',
      ],
    };
  }
}
