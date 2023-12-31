import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Warehouse } from './warehouse.entity';
import { Delivery } from './delivery.entity';

@Entity('available_drivers')
export class AvailableDriver {
  @PrimaryGeneratedColumn()
  available_driver_id: number;

  @OneToOne(() => Vehicle)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  availableVolume: number;

  @Column()
  availableWeight: number;

  @Column({ default: false })
  archived: boolean;

  @ManyToOne(() => Warehouse)
  @JoinColumn({ name: 'start_warehouse_id' })
  startWarehouse: Warehouse;

  @ManyToOne(() => Warehouse)
  @JoinColumn({ name: 'destination_warehouse_id' })
  destination: Warehouse;

  @ManyToMany(() => Warehouse)
  @JoinTable()
  waypoints: Warehouse[];

  @OneToOne(() => Delivery, (delivery) => delivery.availableDriver, {
    nullable: true,
  })
  @JoinColumn()
  delivery: Delivery | null;
}
