import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { CreateMenuDto } from './dto';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
    constructor(private menuService: MenuService) { }

    @Public()
    @Get('/:id')
    getMenu(@Param('id') id : number) {
        return this.menuService.getMenu(+id)
    }

    @Public()
    @Post('/:id')
    createMenu(@Param('id') id : number, @Body() dto : CreateMenuDto) {
        return this.menuService.createMenu(dto, +id)
    }

    @Public()
    @Put('/:id')
    updateMenu(@Param('id') id : number, @Body() dto : CreateMenuDto) {
        return this.menuService.updateMenu(dto, +id)
    }

    @Public()
    @Delete('/:id')
    deleteMenu(@Param('id') id : number) {
        return this.menuService.deleteMenu(+id)
    }
}
