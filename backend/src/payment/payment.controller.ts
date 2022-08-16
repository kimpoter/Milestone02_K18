import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { CreatePaymentDto } from './dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  // GET all payment methods
  @Public()
  @Get()
  async getAllPaymentMethods() {
    return await this.paymentService.getAllPaymentMethods()
  }

  // Create new payment method
  @Public()
  @Post()
  async createPaymentMethod(@Body() dto: CreatePaymentDto) {
    return await this.paymentService.createPaymentMethod(dto)
  }

  // Delete a paymnet menthod
  @Public()
  @Delete('/:id')
  async deletePaymentMethod(@Param('id') paymentId: number) {
    return await this.paymentService.deletePaymentMethod(+paymentId)
  }
}
