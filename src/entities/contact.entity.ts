import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import User from "./user.entity";

@Entity("contacts")
class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 200 })
  fullName: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 11 })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.contacts, {
    nullable: true,
  })
  @JoinColumn()
  user: User;
  client: any;
}

export default Contact;