import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    //1
    @Public()
    @Get()
    getAllCategory(){
        return this.categoryService.getAllCategory()
      }
    
    //2
    @Public()
    @Post()
    createCategory(@Body() dto :CreateCategoryDto ,){
        return this.categoryService.createCategory(dto)
    }

    //3
    @Public()
    @Put('/:id')
    updateCategory(@Body() dto : UpdateCategoryDto,@Param('id') id : number){
        return this.categoryService.updateCategory(dto,+id)
    }

    //4
    @Public()
    @Delete('/:id')
    deleteCategory(@Param('id') id :number){
        return this.categoryService.deleteCategory(+id)
    }
}

