import { gql } from "@apollo/client";

export const QUERY_quyetdinhTSNTs = gql`
  query QUERY_quyetdinhTSNTs($utilsParams: UtilsParamsInput!) {
    quyetdinhTSNTs(utilsParams: $utilsParams) {
      MaQD
      So
      Ngay
      BiDanh
      ThoiGianBD
      ThoiGianKT
      DoiTuong {
        MaDoiTuong
        TenDT
        TinhChatDT {
          TinhChat
        }
      }
      DeNghiTSNT {
        MaDN
        DonViDN {
          MaCAQHvaTD
          CAQHvaTD
        }
      }
    }
  }
`;
export const QUERY_doituongs = gql`
  query QUERY_doituongs($utilsParams: UtilsParamsInput!) {
    doituongs(utilsParams: $utilsParams) {
      MaDoiTuong
      TenDT
      NgaySinh
      NoiO
      TinhChatDT {
        TinhChat
      }
      GioiTinh
      QuyetDinhTSNTs {
        MaQD
      }
    }
  }
`;
export const QUERY_doituong = gql`
  query QUERY_doituong($id: Float!) {
    doituong(id: $id) {
      MaDoiTuong
      TenDT
      TenKhac
      AnhDD
      NgaySinh
      GioiTinh
      NoiSinh
      QuocTich {
        TenQT
      }
      DanToc {
        TenDT
      }
      TonGiao {
        TenTG
      }
      QueQuan
      HKTT
      CCCD
      CMND
      SHC
      NoiO
      NgheNghiep
      NoiLamViec
      SDT
      PhuongTien
      BienPhapDTs {
        BienPhapDT
      }
      LoaiDT {
        LoaiDT
      }
      TinhChatDT {
        TinhChat
      }
      QuyetDinhTSNTs {
        MaQD
        BiDanh
        NhiemVuCT
        KetQuaTSNT {
          MaKQ
          ThoiGianBD
          ThoiGianKT
          BaoCaoKTDN {
            MaBCKTDN
            TinhHinhDT
            VanDeRKN
          }
          DanhGiaTSTHs {
            MaDanhGiaTSTH
            VaiTro
            DanhGia
            LyDo
            CBCS {
              MaCBCS
              HoTen
              ChucVu {
                ChucVu
              }
            }
          }
          BaoCaoPHQHs {
            MaBCPHQH
            BiDanh
          }
          PhuongTienNVs {
            MaPT
            BKS
          }
          BaoCaoKQGHs {
            MaBCKQGH
            MucDich
          }
          DiaChiNVs {
            MaDC
            DiaChi
          }
        }
        KeHoachTSNT {
          MaKH
          VanDeChuY
          TramCT {
            MaTramCT
            DiaDiem
            VanDeChuY
            QuyDinh
          }
        }
      }
    }
  }
`;
export const QUERY_chuyenans = gql`
  query QUERY_chuyenans($utilsParams: UtilsParamsInput!) {
    chuyenans(utilsParams: $utilsParams) {
      MaCA
      TenCA
      BiSo
      TinhChat {
        MaTCDT
        TinhChat
      }
      ThoiGianBD
    }
  }
`;
export const QUERY_chuyenan = gql`
  query QUERY_chuyenan($id: Float!) {
    chuyenan(id: $id) {
      MaCA
      TenCA
      BiSo
      ThoiGianBD
      NoiDung
      DoiTuongCAs {
        MaDTCA
        ViTri
        BiSo
        DoiTuong {
          MaDoiTuong
          TenDT
          NgaySinh
          NoiO
          CMND
          CCCD
          SHC
        }
      }
    }
  }
`;
export const QUERY_cbcss = gql`
  query QUERY_cbcss($utilsParams: UtilsParamsInput!) {
    cbcss(utilsParams: $utilsParams) {
      MaCBCS
      HoTen
      TenKhac
      NgaySinh
      Doi {
        MaDoi
        TenDoi
      }
      DanhGiaTSTHs {
        MaDanhGiaTSTH
        VaiTro
        DanhGia
        LyDo
        KetQuaTSNT {
          MaKQ
          ThoiGianBD
          ThoiGianKT
          KeHoachTSNT {
            MaKH
            DoiTuong {
              MaDoiTuong
              TenDT
            }
            QuyetDinhTSNT {
              MaQD
              BiDanh
              ThoiGianBD
              ThoiGianKT
            }
          }
        }
      }
    }
  }
`;
export const QUERY_account = gql`
  query QUERY_account($id: Float!) {
    account(accountID: $id) {
      AccountID
      Username
      Role
      Position
    }
  }
`;
export const QUERY_denghiTSNTs = gql`
  query QUERY_denghiTSNTs($utilsParams: UtilsParamsInput!) {
    denghiTSNTs(utilsParams: $utilsParams) {
      MaDN
      So
      Ngay
      ThoiGianBD
      ThoiGianKT
      DoiTuong {
        MaDoiTuong
        TenDT
      }
      CATTPvaTD {
        MaCATTPvaTD
        CATTPvaTD
      }
      CAQHvaTD {
        MaCAQHvaTD
        CAQHvaTD
      }
    }
  }
`;
export const QUERY_baocaoPHQHs = gql`
  query QUERY_baocaoPHQHs($utilsParams: UtilsParamsInput!) {
    baocaoPHQHs(utilsParams: $utilsParams) {
      MaBCPHQH
      ThoiGianPH
      DiaChiCC
      DiaDiemPH
      HinhAnh
      TSThucHiens {
        MaCBCS
        HoTen
      }
      DoiTuong {
        MaDoiTuong
        TenDT
      }
      KetQuaTSNT {
        QuyetDinhTSNT {
          BiDanh
        }
      }
    }
  }
`;
export const QUERY_baocaoPHQH = gql`
  query QUERY_baocaoPHQH($id: Float!) {
    baocaoPHQH(id: $id) {
      MaBCPHQH
      Ngay
      BiDanh
      ThoiGianPH
      DDNhanDang
      DiaChiCC
      DiaDiemPH
      HinhAnh
      TSNhanXet
      TSThucHiens {
        MaCBCS
        HoTen
      }
      DoiTuong {
        MaDoiTuong
        TenDT
      }
      KetQuaTSNT {
        QuyetDinhTSNT {
          BiDanh
        }
      }
      BaoCaoKQXMQuanHe {
        MaBCKQXMQH
        HoTen
        TenKhac
        GioiTinh
        NamSinh
        QueQuan
        HKTT
        NoiO
        NoiLamViec
        ChucVu
        NgheNghiep
        QuanHeGDXH
        BienPhapXM
        TSXacMinh {
          MaCBCS
          HoTen
        }
      }
    }
  }
`;
export const QUERY_diachiNVs = gql`
  query QUERY_diachiNVs($utilsParams: UtilsParamsInput!) {
    diachiNVs(utilsParams: $utilsParams) {
      MaDC
      DiaChi
      ThoiGianPH
      HinhAnh
      KetQuaTSNT {
        QuyetDinhTSNT {
          BiDanh
          DoiTuong {
            MaDoiTuong
            TenDT
          }
        }
      }
      TSThucHiens {
        MaCBCS
        HoTen
      }
    }
  }
`;
export const QUERY_diachiNV = gql`
  query QUERY_diachiNV($id: Float!) {
    diachiNV(id: $id) {
      MaDC
      DiaChi
      ThoiGianPH
      HinhAnh
      KetQuaTSNT {
        QuyetDinhTSNT {
          DoiTuong {
            MaDoiTuong
            TenDT
          }
        }
      }
      TSThucHiens {
        MaCBCS
        HoTen
      }
      BaoCaoKQXMDiaChi {
        HoTenChuHo
        TenKhac
        NamSinh
        GioiTinh
        QueQuan
        HKTT
        NoiO
        NgheNghiep
        NoiLamViec
        QuanHeGiaDinh
        HoKhacCungDC
        BienPhapXM
        TSXacMinh {
          MaCBCS
          HoTen
        }
      }
    }
  }
`;
export const QUERY_phuongtienNVs = gql`
  query QUERY_phuongtienNVs($utilsParams: UtilsParamsInput!) {
    phuongtienNVs(utilsParams: $utilsParams) {
      MaPT
      BKS
      ThoiGianPH
      DiaDiemPH
      HinhAnh
      KetQuaTSNT {
        QuyetDinhTSNT {
          BiDanh
          DoiTuong {
            MaDoiTuong
            TenDT
          }
        }
      }
      TSThucHiens {
        MaCBCS
        HoTen
      }
    }
  }
`;
export const QUERY_phuongtienNV = gql`
  query QUERY_phuongtienNV($id: Float!) {
    phuongtienNV(id: $id) {
      MaPT
      BKS
      ThoiGianPH
      DiaDiemPH
      HinhAnh
      KetQuaTSNT {
        QuyetDinhTSNT {
          BiDanh
          DoiTuong {
            MaDoiTuong
            TenDT
          }
        }
      }
      TSThucHiens {
        MaCBCS
        HoTen
      }
    }
  }
`;
export const QUERY_baocaoKQGHs = gql`
  query QUERY_baocaoKQGHs($utilsParams: UtilsParamsInput!) {
    baocaoKQGHs(utilsParams: $utilsParams) {
      MaBCKQGH
      ThoiGian
      DiaDiem
      HinhAnh
      KetQuaTSNT {
        QuyetDinhTSNT {
          BiDanh
        }
      }
      DoiTuong {
        MaDoiTuong
        TenDT
      }
      TSThucHiens {
        MaCBCS
        HoTen
      }
    }
  }
`;
export const QUERY_baocaoKQGH = gql`
  query QUERY_baocaoKQGH($id: Float!) {
    baocaoKQGH(id: $id) {
      MaBCKQGH
      Ngay
      ThoiGian
      DiaDiem
      HinhAnh
      PhuongTienSD
      VaiNguyTrang
      NoiDung
      MucDich
      DoiTuong {
        MaDoiTuong
        TenDT
      }
      TSThucHiens {
        MaCBCS
        HoTen
      }
    }
  }
`;
export const QUERY_cbcs = gql`
  query QUERY_cbcs($id: Float!) {
    cbcs(id: $id) {
      MaCBCS
      HoTen
      TenKhac
      NgaySinh
      GioiTinh
      Doi {
        TenDoi
      }
      ChucVu {
        ChucVu
      }
      DanhGiaTSTHs {
        MaDanhGiaTSTH
        DanhGia
        KetQuaTSNT {
          QuyetDinhTSNT {
            BiDanh
            DoiTuong {
              MaDoiTuong
              TenDT
            }
          }
          ThoiGianBD
          ThoiGianKT
        }
      }
      TSThucHien_BaoCaoPHQHs {
        MaBCPHQH
        Ngay
        BiDanh
        KetQuaTSNT {
          QuyetDinhTSNT {
            BiDanh
            DoiTuong {
              MaDoiTuong
              TenDT
            }
          }
        }
        TSThucHiens {
          MaCBCS
          HoTen
        }
      }
      TSThucHien_BaoCaoKQGHs {
        MaBCKQGH
        Ngay
        KetQuaTSNT {
          QuyetDinhTSNT {
            BiDanh
            DoiTuong {
              MaDoiTuong
              TenDT
            }
          }
        }
        TSThucHiens {
          MaCBCS
          HoTen
        }
      }
      TSThucHien_PhuongTienNVs {
        MaPT
        BKS
        ThoiGianPH
        DiaDiemPH
        KetQuaTSNT {
          QuyetDinhTSNT {
            BiDanh
            DoiTuong {
              MaDoiTuong
              TenDT
            }
          }
        }
        TSThucHiens {
          MaCBCS
          HoTen
        }
      }
      TSThucHien_DiaChiNVs {
        MaDC
        ThoiGianPH
        DiaChi
        HinhAnh
        KetQuaTSNT {
          QuyetDinhTSNT {
            BiDanh
            DoiTuong {
              MaDoiTuong
              TenDT
            }
          }
        }
        TSThucHiens {
          MaCBCS
          HoTen
        }
      }
    }
  }
`;
export const QUERY_caTTPvaTDs = gql`
  query QUERY_caTTPvaTDs($utilsParams: UtilsParamsInput!) {
    caTTPvaTDs(utilsParams: $utilsParams) {
      MaCATTPvaTD
      CATTPvaTD
      CapCA {
        MaCapCA
        CapCA
      }
    }
  }
`;
export const QUERY_caQHvaTDs = gql`
  query QUERY_caQHvaTDs($utilsParams: UtilsParamsInput!) {
    caQHvaTDs(utilsParams: $utilsParams) {
      MaCAQHvaTD
      CAQHvaTD
      KyHieu
      CATTPvaTD {
        MaCATTPvaTD
        CATTPvaTD
      }
    }
  }
`;
export const QUERY_capCAs = gql`
  query QUERY_capCAs($utilsParams: UtilsParamsInput!) {
    capCAs(utilsParams: $utilsParams) {
      MaCapCA
      CapCA
    }
  }
`;
export const QUERY_chucvus = gql`
  query QUERY_chucvus($utilsParams: UtilsParamsInput!) {
    chucvus(utilsParams: $utilsParams) {
      MaCV
      ChucVu
    }
  }
`;
export const QUERY_bienPhapDTs = gql`
  query QUERY_bienPhapDTs($utilsParams: UtilsParamsInput!) {
    bienPhapDTs(utilsParams: $utilsParams) {
      MaBPDT
      BienPhapDT
    }
  }
`;
export const QUERY_capbacs = gql`
  query QUERY_capbacs($utilsParams: UtilsParamsInput!) {
    capbacs(utilsParams: $utilsParams) {
      MaCB
      CapBac
    }
  }
`;
export const QUERY_dantocs = gql`
  query QUERY_dantocs($utilsParams: UtilsParamsInput!) {
    dantocs(utilsParams: $utilsParams) {
      MaDT
      TenDT
      QuocTich {
        MaQT
        TenQT
      }
    }
  }
`;
export const QUERY_quocTichs = gql`
  query QUERY_quocTichs($utilsParams: UtilsParamsInput!) {
    quocTichs(utilsParams: $utilsParams) {
      MaQT  
      TenQT
    }
  }
`;

// ---------------
export const MUTATION_getData_searchFast = gql`
  mutation MUTATION_getData_searchFast($keySearch: String!) {
    getData_searchFast(keySearch: $keySearch) {
      TieuDe
      LienKet
    }
  }
`;
export const MUTATION_editAccount = gql`
  mutation MUTATION_editAccount(
    $id: Float!
    $accountExtendInput: AccountExtendInput!
  ) {
    editAccount(id: $id, accountExtendInput: $accountExtendInput) {
      Username
    }
  }
`;
export const MUTATION_createCATTPvaTD = gql`
  mutation MUTATION_createCATTPvaTD($caTTPvaTDInput: CATTPvaTDInput!) {
    createCATTPvaTD(caTTPvaTDInput: $caTTPvaTDInput) {
      MaCATTPvaTD
      CATTPvaTD
    }
  }
`;
export const MUTATION_editCATTPvaTD = gql`
  mutation MUTATION_editCATTPvaTD(
    $caTTPvaTDInput: CATTPvaTDInput!
    $id: Float!
  ) {
    editCATTPvaTD(caTTPvaTDInput: $caTTPvaTDInput, id: $id) {
      MaCATTPvaTD
      CATTPvaTD
    }
  }
`;
export const MUTATION_deleteCATTPvaTD = gql`
  mutation MUTATION_deleteCATTPvaTD($id: Float!) {
    deleteCATTPvaTD(id: $id) {
      MaCATTPvaTD
      CATTPvaTD
    }
  }
`;
export const MUTATION_createCAQHvaTD = gql`
  mutation MUTATION_createCAQHvaTD($caQHvaTDInput: CAQHvaTDInput!) {
    createCAQHvaTD(caQHvaTDInput: $caQHvaTDInput) {
      MaCAQHvaTD
      CAQHvaTD
    }
  }
`;
export const MUTATION_editCAQHvaTD = gql`
  mutation MUTATION_editCAQHvaTD($caQHvaTDInput: CAQHvaTDInput!, $id: Float!) {
    editCAQHvaTD(caQHvaTDInput: $caQHvaTDInput, id: $id) {
      MaCAQHvaTD
      CAQHvaTD
    }
  }
`;
export const MUTATION_deleteCAQHvaTD = gql`
  mutation MUTATION_deleteCAQHvaTD($id: Float!) {
    deleteCAQHvaTD(id: $id) {
      MaCAQHvaTD
      CAQHvaTD
    }
  }
`;
export const MUTATION_createChucVu = gql`
  mutation MUTATION_createChucVu($chucVu: String!) {
    createChucVu(chucVu: $chucVu) {
      MaCV
      ChucVu
    }
  }
`;
export const MUTATION_editChucVu = gql`
  mutation MUTATION_editChucVu($chucVu: String!, $id: Float!) {
    editChucVu(chucVu: $chucVu, id: $id) {
      MaCV
      ChucVu
    }
  }
`;
export const MUTATION_deleteChucVu = gql`
  mutation MUTATION_deleteChucVu($id: Float!) {
    deleteChucVu(id: $id) {
      MaCV
      ChucVu
    }
  }
`;
export const MUTATION_createBienPhapDT = gql`
  mutation MUTATION_createBienPhapDT($bienPhapDT: String!) {
    createBienPhapDT(bienPhapDT: $bienPhapDT) {
      MaBPDT
      BienPhapDT
    }
  }
`;
export const MUTATION_editBienPhapDT = gql`
  mutation MUTATION_editBienPhapDT($bienPhapDT: String!, $id: Float!) {
    editBienPhapDT(bienPhapDT: $bienPhapDT, id: $id) {
      MaBPDT
      BienPhapDT
    }
  }
`;
export const MUTATION_deleteBienPhapDT = gql`
  mutation MUTATION_deleteBienPhapDT($id: Float!) {
    deleteBienPhapDT(id: $id) {
      MaBPDT
      BienPhapDT
    }
  }
`;
export const MUTATION_createCapBac = gql`
  mutation MUTATION_createCapBac($capBac: String!) {
    createCapBac(capBac: $capBac) {
      MaCB
      CapBac
    }
  }
`;
export const MUTATION_editCapBac = gql`
  mutation MUTATION_editCapBac($capBac: String!, $id: Float!) {
    editCapBac(capBac: $capBac, id: $id) {
      MaCB
      CapBac
    }
  }
`;
export const MUTATION_deleteCapBac = gql`
  mutation MUTATION_deleteCapBac($id: Float!) {
    deleteCapBac(id: $id) {
      MaCB
      CapBac
    }
  }
`;
export const MUTATION_createCapCA = gql`
  mutation MUTATION_createCapCA($capCA: String!) {
    createCapCA(capCA: $capCA) {
      MaCapCA
      CapCA
    }
  }
`;
export const MUTATION_editCapCA = gql`
  mutation MUTATION_editCapCA($capCA: String!, $id: Float!) {
    editCapCA(capCA: $capCA, id: $id) {
      MaCapCA
      CapCA
    }
  }
`;
export const MUTATION_deleteCapCA = gql`
  mutation MUTATION_deleteCapCA($id: Float!) {
    deleteCapCA(id: $id) {
      MaCapCA
      CapCA
    }
  }
`;
export const MUTATION_createDanToc = gql`
  mutation MUTATION_createDanToc($danTocInput: DanTocInput!) {
    createDanToc(danTocInput: $danTocInput) {
      MaDT
      TenDT
    }
  }
`;
export const MUTATION_editDanToc = gql`
  mutation MUTATION_editDanToc($danTocInput: DanTocInput!, $id: Float!) {
    editDanToc(danTocInput: $danTocInput, id: $id) {
      MaDT
      TenDT
    }
  }
`;
export const MUTATION_deleteDanToc = gql`
  mutation MUTATION_deleteDanToc($id: Float!) {
    deleteDanToc(id: $id) {
      MaDT
      TenDT
    }
  }
`;

export const QUERY_doituongCAsOpen = gql`
  query QUERY_doituongCAsOpen($conditionCol: String!, $value: String!) {
    doituongCAsOpen(conditionCol: $conditionCol, value: $value) {
      MaDTCA
      ChuyenAn {
        MaCA
        BiSo
        TenCA
      }
    }
  }
`;
