import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { GenerateRecommendationDto } from './dto/generate-recommendation.dto';
import { RecommendationService } from './recommendation.service';

@ApiTags('recommendations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('recommendations')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get()
  @Roles(Role.ADMIN, Role.MANAGER, Role.USER)
  findAll(@Query('storeCode') storeCode?: string, @Query('productCode') productCode?: string) {
    return this.recommendationService.findAll(storeCode, productCode);
  }

  @Post('generate')
  @Roles(Role.ADMIN, Role.MANAGER)
  generate(@Body() dto: GenerateRecommendationDto) {
    return this.recommendationService.generate(dto);
  }
}
