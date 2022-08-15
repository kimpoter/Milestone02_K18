import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { async } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    // get all category 
    async getAllCategory(){
        const datacategory = await this.prisma.category.findMany({})
        return {
            status : "success",
            data : datacategory 
        }
    }

    //createcategory
    async createCategory(dto) {
        try {
            await this.prisma.category.create({
                data : {
                    name : dto.name
                }
            })         
        }
        catch(error){
            throw new InternalServerErrorException(error)
        }
        return {
            status : 'success',message : 'category has been created'
        }
    }

    //
    async updateCategory(dto,id){
        try {
            await this.prisma.category.update({
                where : {
                    id
                },
                data : {
                    name : dto.name
                }
            })         
        }
        catch(error){
            throw new InternalServerErrorException(error)
        }
        return {
            status : 'success',message : 'category has been updated'
        }
    }

    //
    async deleteCategory(id){
        try {
            await this.prisma.category.delete({
                where : {
                    id
                }
            })         
        }
        catch(error){
            throw new InternalServerErrorException(error)
        }
        return {
            status : 'success',message : 'category has been deleted'
        }
    }
    }

