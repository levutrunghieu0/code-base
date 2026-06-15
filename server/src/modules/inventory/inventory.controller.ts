import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { InventoryService } from './inventory.service';

@ApiTags('inventory')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @Roles(Role.ADMIN, Role.MANAGER, Role.USER)
  findAll(@Query('storeCode') storeCode?: string, @Query('productCode') productCode?: string) {
    return this.inventoryService.findAll(storeCode, productCode);
  }

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  upsert(@Body() body: { storeCode: string; productCode: string; currentStock: number }) {
    return this.inventoryService.upsert(body);
  }
}
