import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // MANY orders TO ONE customer
  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' }) // Pra evitar criar coluna 'customer_id'
  customer: Customer;

  // MANY orders TO MANY products com tabela pivô
  @OneToMany(() => OrdersProducts, orders_products => orders_products.order, {
    cascade: true,
  })
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
