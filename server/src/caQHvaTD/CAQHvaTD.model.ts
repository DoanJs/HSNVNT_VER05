import { Field, ObjectType } from '@nestjs/graphql';
import { BaoCaoKQGH } from 'src/baocaoKQGHs/BaoCaoKQGH.model';
import { BaoCaoKQXMDiaChi } from 'src/baocaoKQXMDiaChis/BaoCaoKQXMDiaChi.model';
import { BaoCaoKQXMQuanHe } from 'src/baocaoKQXMQuanHes/BaoCaoKQXMQuanHe.model';
import { BaoCaoPHQH } from 'src/baocaoPHQHs/BaoCaoPHQH.model';
import { CATTPvaTD } from 'src/caTTPvaTD/CATTPvaTD.model';
import { CapCA } from 'src/capCAs/CapCA.model';
import { CBCS } from 'src/cbcss/CBCS.model';
import { DeNghiTSNT } from 'src/denghiTSNTs/DeNghiTSNT.model';
import { Doi } from 'src/dois/Doi.model';
import { KeHoachTSNT } from 'src/kehoachTSNTs/KeHoachTSNT.model';
import { KetQuaXMDiaChi } from 'src/ketQuaXMDiaChis/KetQuaXMDiaChi.model';
import { KetQuaXMQuanHe } from 'src/ketQuaXMQuanHes/KetQuaXMQuanHe.model';
import { KetQuaTSNT } from 'src/ketquaTSNTs/KetQuaTSNT.model';
import { QuyetDinhTSNT } from 'src/quyetdinhTSNTs/QuyetDinhTSNT.model';
import { TramCT } from 'src/tramCTs/TramCT.model';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'CAQHvaTDs' })
@ObjectType()
export class CAQHvaTD {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'PK_MaCAQHvaTD' })
  @Field()
  MaCAQHvaTD: number;

  @Column({ type: 'nvarchar', length: 100, nullable: true })
  @Field({ nullable: true })
  CAQHvaTD: string;

  @Column({ type: 'nvarchar', length: 30, nullable: true })
  @Field({ nullable: true })
  KyHieu: string;

  // relation

  @ManyToOne(() => CATTPvaTD, (caTTPvaTD) => caTTPvaTD.CAQHvaTDs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaCATTPvaTD',
    foreignKeyConstraintName: 'FK_MaCATTPvaTD_CAQHvaTD',
  })
  @Field({ nullable: true })
  CATTPvaTD: CATTPvaTD;

  @ManyToOne(() => CapCA, (capCA) => capCA.CAQHvaTDs, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({
    name: 'MaCapCA',
    foreignKeyConstraintName: 'FK_MaCapCA_CAQHvaTD',
  })
  @Field({ nullable: true })
  CapCA: CapCA;
  


  
  // chua duyet lai

  

  @OneToMany(() => DeNghiTSNT, (denghiTSNT) => denghiTSNT.CAQHvaTD)
  DeNghiTSNTs: [DeNghiTSNT];

  @OneToMany(() => Doi, (doi) => doi.CAQHvaTD)
  Dois: [Doi];

}
