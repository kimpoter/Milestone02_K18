import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GetCurrentUserRole, Public } from 'src/common/decorators';
import { CreateMenuDto } from './dto';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
    constructor(private menuService: MenuService) { }

    @Public()
    @Get('/:id')
    getMenu(@Param('id') tempatMakanId: number) {
        return this.menuService.getMenu(+tempatMakanId)
    }

    @Post('/:id')
    createMenu(@Param('id') tempatMakanId: number, @Body() dto: CreateMenuDto, @GetCurrentUserRole() role: string) {
        return this.menuService.createMenu(dto, +tempatMakanId, role)
    }

    @Delete('/:id')
    deleteMenu(@Param('id') menuId: number, @GetCurrentUserRole() role: string) {
        return this.menuService.deleteMenu(+menuId, role)
    }
}
