import { Field, ObjectType } from '@nestjs/graphql';
import { BaoCaoPHDC } from 'src/baocaoPHDCs/BaoCaoPHDC.model';
import { CAQHvaTD } from 'src/caQHvaTD/CAQHvaTD.model';
import { CATTPvaTD } from 'src/caTTPvaTD/CATTPvaTD.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DeNghiTSNT } from 'src/denghiTSNTs/DeNghiTSNT.model';
import { DoiTuong } from 'src/doituongs/DoiTuong.model';
import { QuyetDinhTSNT } from 'src/quyetdinhTSNTs/QuyetDinhTSNT.model';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'KetQuaXMDiaChis' })
@ObjectType()
export class KetQuaXMDiaChi {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MaKQXMDC' })
  @Field()
  MaKQXMDC: number;

  @Column({ type: 'nvarchar', length: 30, nullable: true })
  @Field({ nullable: true })
  So: string;

  @Column({ type: 'date', nullable: true })
  @Field({ nullable: true })
  Ngay: string;

  // relation

  @OneToOne(() => BaoCaoPHDC, baocaoPHDC => baocaoPHDC.KetQuaXMDiaChi, {cascade: true, eager: true})
  @JoinColumn({
    name:"MaBCPHDC",
    foreignKeyConstraintName: "FK_MaBCPHDC_KetQuaXMDiaChi"
  })
  BaoCaoPHDC: BaoCaoPHDC

  @ManyToOne(() => CBCS, cbcs => cbcs.KetQuaXMDiaChis, {cascade: true, eager: true})
  @JoinColumn({
    name: "MaLanhDaoPD",
    foreignKeyConstraintName: "FK_MaLanhDaoPD_KetQuaXMDiaChi"
  })
  LanhDaoPD: CBCS



  // chua duyet lai
}
