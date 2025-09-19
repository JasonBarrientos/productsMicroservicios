import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
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
    const totalPages= await this.product.count({where:{available:true}});
    const products= await this.product.findMany({
      take:limit,
      skip:(limit*(page-1)),
      where:{available:true}
    });
    return {data:products,
    totalPages:Math.ceil(totalPages/limit),
    page,
    limit}
  }

  async findOne(id: number) {
  
    const product=await  this.product.findUnique({
      where:{id,available:true},
      
    });

    if(!product) {
      this.logger.error(`Product with id ${id} not found`);
      throw new NotFoundException(`Product with id ${id} not found`);
    }   
    return product; 
   ;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    return this.product.update({
      where:{id},
      data:updateProductDto
    });
  }

async remove(id: number) {
      await this.findOne(id);
    // return this.product.delete({
    //   where:{id}
    // })  ;
  const product= await this.product.update({
      where:{id},
      data:{available:false}
    });
    return product;

  }
}
