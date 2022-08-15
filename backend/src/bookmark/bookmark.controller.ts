import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto';


@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) { }
    
  // Get all Bookmark
  @Public()
  @Get('/:id')
  getAllBookmark(@Param("id") id : number) {
    return this.bookmarkService.getAllBookmark(+id)
  }

  // Create Bookmark
  @Public()
  @Post('/:id')
  createBookmark(@Param("id") id : number) {
    return this.bookmarkService.createBookmark(+id)
  }

  // Delete Bookmark
  @Public()
  @Delete(':id')
  deleteBookmark(@Param('id') id: number) {
    return this.bookmarkService.deleteBookmark(+id)
  }
}