import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
    constructor(private menuService: MenuService) { }

    @Public()
    @Get()
    getTempatMakanId() {
        return this.menuService.getTempatMakanId()
    }
}
