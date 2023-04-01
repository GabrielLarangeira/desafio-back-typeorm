import { hashSync } from "bcryptjs";
import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  OneToMany,
  BeforeUpdate,
  BeforeInsert,
} from "typeorm";
import Contact from "./contact.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  fullName: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ length: 120 })
  password: string;

  @Column({ length: 11 })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Contact, (contact) => contact.user, {
    onDelete: "CASCADE",
  })
  contacts: Contact[];

  @BeforeUpdate()
  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}

export default User;