import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { ImportSalesDto } from './dto/import-sales.dto';
import { SalesService } from './sales.service';

@ApiTags('sales')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get('history')
  @Roles(Role.ADMIN, Role.MANAGER, Role.USER)
  history(
    @Query('storeCode') storeCode?: string,
    @Query('productCode') productCode?: string,
    @Query('categoryCode') categoryCode?: string,
  ) {
    return this.salesService.findHistory({ storeCode, productCode, categoryCode });
  }

  @Post('import')
  @Roles(Role.ADMIN, Role.MANAGER)
  import(@Body() dto: ImportSalesDto) {
    return this.salesService.import(dto);
  }
}
