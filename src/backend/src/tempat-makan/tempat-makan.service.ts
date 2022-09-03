import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTempatMakanDto, UpdateTempatMakanDto } from './dto';

@Injectable()
export class TempatMakanService {
  constructor(private prisma: PrismaService) { }

  // Get all tempat makan
  async getAllTempatMakan(param, query) {
    // Skip for pagination
    let skip
    try {
      skip = (+param.skip - 1) * 6
    } catch (error) {
      throw new BadRequestException(error)
    }

    // Filter by category
    let categoryArray
    if (query.filter_category) {
      categoryArray = query.filter_category.split(';')
    }

    // Filter by price
    let priceArray = []
    if (query.filter_price) {
      priceArray = query.filter_price.split(';')
    }

    // Filter by platform
    let platformArray
    if (query.filter_platform) {
      platformArray = query.filter_platform.split(';')
    }

    // Filter by transaction
    let paymentArray
    if (query.filter_payment) {
      paymentArray = query.filter_payment.split(';')
    }

    // Search
    const searchString = query.search

    // Campus
    const campus = param.campus
    if (campus !== 'ganesha' && campus !== 'jatinangor') {
      throw new NotFoundException('Not Found')
    }

    // Sort status
    let sortStatus = query.sort_status
    if (sortStatus && sortStatus !== 'asc' && sortStatus !== 'desc') {
      throw new BadRequestException('Bad Request')
    } else if (sortStatus === '' || !sortData) {
      sortStatus = 'desc'
    }

    let sortData = query.sort_data
    if (sortData && sortData !== 'rating' && sortData !== 'distance' && sortData !== 'price') {
      throw new BadRequestException('Bad Request')
    } else if (sortData === '' || !sortData) {
      sortData = 'rating'
    }

    const orderBy = {}
    orderBy[sortData] = sortStatus

    const dataAllTempatMakan = await this.prisma.tempatMakan.findMany({
      orderBy,
      where: {
        campus: campus.toUpperCase(),
        OR: [
          {
            name: {
              contains: searchString ?? '',
              mode: 'insensitive'
            }
          },
          {
            categories: {
              some: {
                name: {
                  contains: searchString ?? '',
                  mode: 'insensitive'
                }
              }
            }
          },
          {
            description: {
              contains: searchString ?? '',
              mode: 'insensitive'
            }
          }
        ],
        AND: [
          {
            categories: {
              [categoryArray ? 'some' : 'every']: {
                name: {
                  in: categoryArray,
                  mode: 'insensitive'
                }
              }
            }
          },
          {
            price: {
              gte: priceArray[0] ? +priceArray[0] : undefined,
              lte: priceArray[1] ? +priceArray[1] : undefined,
            }
          },
          {
            platforms: {
              [platformArray ? 'some' : 'every']: {
                name: {
                  in: platformArray,
                  mode: 'insensitive'
                }
              }
            }
          },
          {
            paymentMethods: {
              [paymentArray ? 'some' : 'every']: {
                name: {
                  in: paymentArray,
                  mode: 'insensitive'
                }
              }
            }
          }
        ],
      },
    })

    const dataFilteredTempatMakan = await this.prisma.tempatMakan.findMany({
      take: 6,
      skip,
      orderBy,
      where: {
        campus: campus.toUpperCase(),
        OR: [
          {
            name: {
              contains: searchString ?? '',
              mode: 'insensitive'
            }
          },
          {
            categories: {
              some: {
                name: {
                  contains: searchString ?? '',
                  mode: 'insensitive'
                }
              }
            }
          },
          {
            description: {
              contains: searchString ?? '',
              mode: 'insensitive'
            }
          }
        ],
        AND: [
          {
            categories: {
              [categoryArray ? 'some' : 'every']: {
                name: {
                  in: categoryArray,
                  mode: 'insensitive'
                }
              }
            }
          },
          {
            price: {
              gte: priceArray[0] ? +priceArray[0] : undefined,
              lte: priceArray[1] ? +priceArray[1] : undefined,
            }
          },
          {
            platforms: {
              [platformArray ? 'some' : 'every']: {
                name: {
                  in: platformArray,
                  mode: 'insensitive'
                }
              }
            }
          },
          {
            paymentMethods: {
              [paymentArray ? 'some' : 'every']: {
                name: {
                  in: paymentArray,
                  mode: 'insensitive'
                }
              }
            }
          }
        ],
      },
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        price: true,
        address: true,
        latitude: true,
        longitude: true,
        timeOpen: true,
        timeClose: true,
        distance: true,
        rating: true,
        campus: true,
        createdAt: true,
        updatedAt: true,
        categories: {
          select: {
            name: true
          }
        },
        paymentMethods: {
          select: {
            name: true,
          }
        },
        platforms: {
          select: {
            name: true
          }
        }
      }
    })

    return {
      status: 'success',
      data: {
        dataTempatMakan: dataFilteredTempatMakan,
        totalPages: Math.ceil(dataAllTempatMakan.length / 6)
      }
    }
  }

  // Get single tempatMakan
  async getSingleTempatmakan(tempatMakanId: number) {
    const dataTempatMakan = await this.prisma.tempatMakan.findUnique({
      where: {
        id: tempatMakanId
      },
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        price: true,
        address: true,
        latitude: true,
        longitude: true,
        timeOpen: true,
        timeClose: true,
        distance: true,
        rating: true,
        campus: true,
        createdAt: true,
        updatedAt: true,
        categories: {
          select: {
            name: true
          }
        },
        paymentMethods: {
          select: {
            name: true,
          }
        },
        platforms: {
          select: {
            name: true
          }
        }
      }
    })

    return {
      status: 'success',
      data: dataTempatMakan
    }
  }

  // Create tempatMakan
  async createTempatMakan(dto: CreateTempatMakanDto, role: string, userId: number) {
    if (role !== 'ADMIN') {
      throw new UnauthorizedException('Unauthorized')
    }

    // Formatting category data
    const categoriesArray = dto.category ? dto.category.split(';') : undefined
    let categoryData
    if (categoriesArray) {
      categoryData = []
      categoriesArray.map((category: string) => {
        categoryData.push({
          name: category.trim().toLowerCase()
        })
      })
    }

    // Formatting platform data
    const platformsArray = dto.platform ? dto.platform.split(';') : undefined
    let platformData
    if (platformsArray) {
      platformData = []
      platformsArray.map((platform: string) => {
        platformData.push({
          name: platform.trim().toLowerCase()
        })
      })
    }

    // Formatting paymentMethod data
    const paymentMethodsArray = dto.paymentMethod ? dto.paymentMethod.split(';') : undefined
    let paymentMethodData
    if (paymentMethodsArray) {
      paymentMethodData = []
      paymentMethodsArray.map((paymentMethod: string) => {
        paymentMethodData.push({
          name: paymentMethod.trim().toLowerCase()
        })
      })
    }

    // Save tmepat makan data to the database
    try {
      await this.prisma.tempatMakan.create({
        data: {
          name: dto.name,
          description: dto.description,
          imageUrl: dto.imageUrl,
          price: dto.price,
          campus: dto.campus,
          address: dto.address,
          latitude: dto.latitude,
          longitude: dto.longitude,
          timeOpen: dto.timeOpen,
          timeClose: dto.timeClose,
          distance: dto.distance,
          rating: 0,
          categories: {
            connect: categoryData
          },
          paymentMethods: {
            connect: paymentMethodData
          },
          platforms: {
            connect: platformData
          },
          userId,
        },
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }

    return {
      status: 'success',
      message: 'Tempat Makan has been created'
    }
  }

  // Update tempatMakan
  async updateTempatMakan(dto: UpdateTempatMakanDto, tempatMakanId: number, role: string) {
    if (role !== 'ADMIN') {
      throw new UnauthorizedException('Unauthorized')
    }
    // Formatting category data
    const categoriesArray = dto.category ? dto.category.split(';') : undefined
    let categoryData
    if (categoriesArray) {
      categoryData = []
      categoriesArray.map((category: string) => {
        categoryData.push({
          name: category.trim().toLowerCase()
        })
      })
    }

    // Formatting platform data
    const platformsArray = dto.platform ? dto.platform.split(';') : undefined
    let platformData
    if (platformsArray) {
      platformData = []
      platformsArray.map((platform: string) => {
        platformData.push({
          name: platform.trim().toLowerCase()
        })
      })
    }

    // Formatting paymentMethod data
    const paymentMethodsArray = dto.paymentMethod ? dto.paymentMethod.split(';') : undefined
    let paymentMethodData
    if (paymentMethodsArray) {
      paymentMethodData = []
      paymentMethodsArray.map((paymentMethod: string) => {
        paymentMethodData.push({
          name: paymentMethod.trim().toLowerCase()
        })
      })
    }

    // Save tmepat makan data to the database
    try {
      await this.prisma.tempatMakan.update({
        where: {
          id: tempatMakanId
        },
        data: {
          name: dto.name,
          description: dto.description,
          imageUrl: dto.imageUrl,
          price: dto.price,
          campus: dto.campus,
          address: dto.address,
          latitude: dto.latitude,
          longitude: dto.longitude,
          timeOpen: dto.timeOpen,
          timeClose: dto.timeClose,
          distance: dto.distance,
          rating: dto.rating,
          categories: {
            connect: categoryData
          },
          paymentMethods: {
            connect: paymentMethodData
          },
          platforms: {
            connect: platformData
          },
        },
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
    return {
      status: 'success',
      message: 'Tempat Makan has been updated'
    }
  }

  // Delete tempatMakan
  async deleteTempatMakan(tempatMakanId: number, role: string) {
    if (role !== 'ADMIN') {
      throw new UnauthorizedException('Unauthorized')
    }
    try {
      await this.prisma.tempatMakan.delete({
        where: {
          id: tempatMakanId
        }
      })
    } catch (error) {
      throw new InternalServerErrorException(error)
    }

    return {
      status: 'success',
      message: 'Tempat Makan has been deleted'
    }
  }
}
