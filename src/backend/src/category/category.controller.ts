import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GetCurrentUserRole, Public } from 'src/common/decorators';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) { }

  //1
  @Public()
  @Get()
  getAllCategory() {
    return this.categoryService.getAllCategory()
  }

  //2
  @Post()
  createCategory(@Body() dto: CreateCategoryDto, @GetCurrentUserRole() role: string) {
    return this.categoryService.createCategory(dto, role)
  }

  //4
  @Delete('/:id')
  deleteCategory(@Param('id') categoryId: number, @GetCurrentUserRole() role: string) {
    return this.categoryService.deleteCategory(+categoryId, role)
  }
}

