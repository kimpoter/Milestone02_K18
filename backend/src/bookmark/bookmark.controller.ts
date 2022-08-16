import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto';

@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) { }

  // Get all Bookmark
  @Get()
  getAllBookmark(@GetCurrentUserId() userId: number) {
    return this.bookmarkService.getAllBookmark(+userId)
  }

  // Create Bookmark
  @Post()
  createBookmark(@GetCurrentUserId() userId: number, @Body() dto: CreateBookmarkDto) {
    return this.bookmarkService.createBookmark(dto, +userId)
  }

  // Delete Bookmark
  @Public()
  @Delete(':id')
  deleteBookmark(@Param('id') bookmarkId: number) {
    return this.bookmarkService.deleteBookmark(+bookmarkId)
  }
}