import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { ForecastService } from './forecast.service';
import { RunForecastDto } from './dto/run-forecast.dto';

@ApiTags('forecast')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('forecast')
export class ForecastController {
  constructor(private readonly forecastService: ForecastService) {}

  @Post('run')
  @Roles(Role.ADMIN, Role.MANAGER)
  run(@Body() dto: RunForecastDto) {
    return this.forecastService.run(dto);
  }

  @Get('results')
  @Roles(Role.ADMIN, Role.MANAGER, Role.USER)
  results(@Query('storeCode') storeCode?: string, @Query('productCode') productCode?: string) {
    return this.forecastService.findResults(storeCode, productCode);
  }

  @Get('accuracy')
  @Roles(Role.ADMIN, Role.MANAGER, Role.USER)
  accuracy(@Query('storeCode') storeCode?: string, @Query('productCode') productCode?: string) {
    return this.forecastService.accuracy(storeCode, productCode);
  }
}
