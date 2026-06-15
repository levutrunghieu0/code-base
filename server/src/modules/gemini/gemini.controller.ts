import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { GeminiService } from './gemini.service';

@ApiTags('gemini')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Get('explain')
  @Roles(Role.ADMIN, Role.MANAGER, Role.USER)
  explain(
    @Query('productCode') productCode = 'PRODUCT001',
    @Query('trend') trend: 'up' | 'down' | 'stable' = 'stable',
  ) {
    return this.geminiService.explain(productCode, trend);
  }
}
