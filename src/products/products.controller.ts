import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/';
import { PaginationDto } from 'src/common/dtos';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsMessagePatterns } from 'src/common/enums';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @Post()
  @MessagePattern(ProductsMessagePatterns.CREATE)
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern(ProductsMessagePatterns.FIND_ALL)
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.productsService.findAll(paginationDto);
  }

  @MessagePattern(ProductsMessagePatterns.FIND_ONE)
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @MessagePattern(ProductsMessagePatterns.UPDATE)
  update(@Payload('id',ParseIntPipe) id: number, @Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto.id, updateProductDto);
  }

  @MessagePattern(ProductsMessagePatterns.DELETE)
  remove(@Payload('id',ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
