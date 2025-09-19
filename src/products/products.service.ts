import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from 'generated/prisma';
import { PaginationDto } from 'src/common/dtos';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit{
  private readonly logger= new Logger(ProductsService.name)
  onModuleInit() {
    this.$connect()
    this.logger.log(`Database connected`);
    
  }
  async create(createProductDto: CreateProductDto) {
    return await  this.product.create({
      data:createProductDto
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const {page=1,limit=10}= paginationDto;
    const totalPages= await this.product.count();
    const products= await this.product.findMany({
      take:limit,
      skip:(limit*(page-1))
    });
    return {data:products,
    totalPages:Math.ceil(totalPages/limit),
    page,
    limit}
  }

  findOne(id: number) {
    return this.product.findUnique({
      where:{id}
    }
  
  ) ;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.product.update({
      where:{id},
      data:updateProductDto
    });
  }

  remove(id: number) {
    return this.product.delete({
      where:{id}
    })  ;
  }
}
