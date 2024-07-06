import { Field, ObjectType } from '@nestjs/graphql';
import { BaoCaoKQXMDiaChi } from 'src/baocaoKQXMDiaChis/BaoCaoKQXMDiaChi.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { KetQuaXMDiaChi } from 'src/ketQuaXMDiaChis/KetQuaXMDiaChi.model';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'BaoCaoPHDCs' })
@ObjectType()
export class BaoCaoPHDC {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MaBCPHDC' })
  @Field()
  MaBCPHDC: number;

  @Column({ type: 'varbinary', length: 'max', nullable: true }) //encrypt
  @Field({ nullable: true })
  DiaChi: string;

  @Column({ type: 'varbinary', length: 'max', nullable: true }) //encrypt
  @Field({ nullable: true })
  HinhAnh: string;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  ThoiGianPH: Date;

  // relation
  @ManyToOne(() => KetQuaTSNT, (ketquaTSNT) => ketquaTSNT.BaoCaoPHDCs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaKQ',
    foreignKeyConstraintName: 'FK_MaKQ_BaoCaoPHDC',
  })
  @Field({ nullable: true })
  KetQuaTSNT: KetQuaTSNT;

  @OneToOne(
    () => BaoCaoKQXMDiaChi,
    (baocaoKQXMDiaChi) => baocaoKQXMDiaChi.BaoCaoPHDC,
  )
  BaoCaoKQXMDiaChi: BaoCaoKQXMDiaChi;

  @OneToOne(() => KetQuaXMDiaChi, (ketquaXMDiaChi) => ketquaXMDiaChi.BaoCaoPHDC)
  KetQuaXMDiaChi: KetQuaXMDiaChi;

  @ManyToMany(() => CBCS, (cbcs) => cbcs.TSThucHien_BaoCaoPHDCs, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'BaoCaoPHDCs_CBCSs',
    joinColumn: {
      name: 'MaBCPHDC',
      foreignKeyConstraintName: 'FK_MaBCPHDC_BaoCaoPHDCs_CBCSs',
    },
    inverseJoinColumn: {
      name: 'MaCBCS',
      foreignKeyConstraintName: 'FK_MaCBCS_BaoCaoPHDCs_CBCSs',
    },
  })
  TSThucHiens: [CBCS];
}
