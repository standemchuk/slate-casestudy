import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, State } from '../entities/order.entity';
import { EntityNotFoundException } from '../exceptions/entity-not-found.exception';

@Injectable()
export class OrderService {
  private readonly orders: Order[] = [];

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) {}

  async create() {
    const order = new Order();
    await this.orderRepository.save(order);
  }

  async updateState(id: number, state: State) {
    const order: Order = await this.getOrder(id);
    console.log(order);
    
    order.state = state;
    await this.orderRepository.save(order);
  }

  async getOrder(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne(id);
    if (!order) {
      throw new EntityNotFoundException();
    }
    return order;
  }

  // get(id: number): Order {
  //   return this.findOrder(id);
  // }

  // updateStatus(id: number, status: Status) {
  //   const order = this.findOrder(id);
  //   // order.status = 
  // }

  // protected findOrder(id: number) {
  //   return this.orders.find(order => order.id === id);
  // }
}
