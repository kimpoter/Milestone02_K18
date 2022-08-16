import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GetCurrentUserRole, Public } from 'src/common/decorators';
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
  @Post()
  async createPaymentMethod(@Body() dto: CreatePaymentDto, @GetCurrentUserRole() role: string) {
    return await this.paymentService.createPaymentMethod(dto, role)
  }

  // Delete a paymnet menthod
  @Delete('/:id')
  async deletePaymentMethod(@Param('id') paymentId: number, @GetCurrentUserRole() role: string) {
    return await this.paymentService.deletePaymentMethod(+paymentId, role)
  }
}
