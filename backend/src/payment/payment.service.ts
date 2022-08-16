import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto } from './dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) { }

  // GET all paymnet methods
  async getAllPaymentMethods() {
    const paymentData = await this.prisma.paymentMethod.findMany()

    return {
      status: 'success',
      data: paymentData
    }
  }

  // Create new payment method
  async createPaymentMethod(dto: CreatePaymentDto) {
    try {
      await this.prisma.paymentMethod.create({
        data: {
          name: dto.name
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }

    return {
      status: 'success',
      message: 'Payment method has been created'
    }
  }

  // Delete a payment method
  async deletePaymentMethod(paymentId: number) {
    try {
      await this.prisma.paymentMethod.delete({
        where: {
          id: paymentId
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }

    return {
      status: 'success',
      message: 'Payment method has been deleted'
    }
  }
}
