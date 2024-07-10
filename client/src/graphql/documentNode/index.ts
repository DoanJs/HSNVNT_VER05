import { gql } from "@apollo/client";

export const QUERY_cbcss = gql`
  query QUERY_cbcss($utilsParams: UtilsParamsInput!) {
    cbcss(utilsParams: $utilsParams) {
      MaCBCS
      HoTen
      TenKhac
      NgaySinh
      GioiTinh
      NoiO
      QueQuan
      HKTT
      SDT
      CMCCHC
      DanToc {
        MaDT
        TenDT
      }
      TonGiao {
        MaTG
        TenTG
      }
      CapBac {
        MaCB
        CapBac
      }
      ChucVu {
        MaCV
        ChucVu
      }
      Doi {
        MaDoi
        TenDoi
        CAQHvaTD {
          MaCAQHvaTD
          CAQHvaTD
          CATTPvaTD {
            MaCATTPvaTD
            CATTPvaTD
          }
        }
      }
      DanhGiaTSTHs {
        MaDanhGiaTSTH
        KetQuaTSNT {
          MaKQ
          KeHoachTSNT {
            MaKH
            QuyetDinhTSNT {
              MaQD
              BiDanh
              DeNghiTSNT {
                MaDN
                DoiTuong {
                  MaDoiTuong
                  TenDT
                }
              }
            }
          }
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
      TenKhac
      GioiTinh
      NgaySinh
      NoiSinh
      CMCCHC
      AnhDD
      QueQuan
      HKTT
      NoiO
      NgheNghiep
      ChucVu
      NoiLamViec
      PhuongTien
      SDT
      ThongTinKhac
      DanToc {
        MaDT
        TenDT
      }
      TonGiao {
        MaTG
        TenTG
      }
      TinhChatDT {
        MaTCDT
        TinhChat
      }
      LoaiDT {
        MaLoaiDT
        LoaiDT
      }
      DeNghiTSNTs {
        MaDN
      }
      BienPhapDTs {
        MaBPDT
        BienPhapDT
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
      QueQuan
      HKTT
      CMCCHC
      NoiO
      NgheNghiep
      ChucVu
      NoiLamViec
      SDT
      PhuongTien
      ThongTinKhac
      DanToc {
        MaDT
        TenDT
        QuocTich {
          MaQT
          TenQT
        }
      }
      TonGiao {
        MaTG
        TenTG
      }
      LoaiDT {
        MaLoaiDT
        LoaiDT
      }
      TinhChatDT {
        MaTCDT
        TinhChat
      }
      DeNghiTSNTs {
        MaDN
        QuyetDinhTSNT {
          MaQD
          BiDanh
          ThoiGianBD
          ThoiGianKT
          NhiemVuCT
          KeHoachTSNT {
            MaKH
            VanDeChuY
            TramCT {
              MaTramCT
              DiaDiem
              VanDeChuY
              QuyDinh
            }
            KetQuaTSNT {
              MaKQ
              BaoCaoKTDN {
                MaBCKTDN
                TinhHinhDT
                VanDeRKN
              }
              BaoCaoPHQHs {
                MaBCPHQH
                BiDanh
              }
              BaoCaoPHPTs {
                MaBCPHPT
                BKS
              }
              BaoCaoKQGHs {
                MaBCKQGH
                HinhAnh
              }
              BaoCaoPHDCs {
                MaBCPHDC
                DiaChi
              }
              DanhGiaTSTHs {
                MaDanhGiaTSTH
                CBCS {
                  MaCBCS
                  HoTen
                }
                VaiTro
                DanhGia
                LyDo
              }
            }
          }
        }
      }
      BienPhapDTs {
        MaBPDT
        BienPhapDT
      }
      DoiTuongCAs {
        MaDTCA
        ChuyenAn {
          MaCA
          BiSo
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
      ThoiGianBD
      NoiDung
      TinhChatDT {
        MaTCDT
        TinhChat
      }
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
          CMCCHC
        }
      }
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
      NoiDungDN
      NoiDungTN
      HinhThucHD {
        MaHTHD
        HinhThuc
      }
      DoiTuong {
        MaDoiTuong
        TenDT
      }
      CAQHvaTD {
        MaCAQHvaTD
        CAQHvaTD
        CATTPvaTD {
          MaCATTPvaTD
          CATTPvaTD
        }
      }
      DiaBanDNs {
        MaTinhTP
        TinhTP
      }
    }
  }
`;
export const QUERY_quyetdinhTSNTs = gql`
  query QUERY_quyetdinhTSNTs($utilsParams: UtilsParamsInput!) {
    quyetdinhTSNTs(utilsParams: $utilsParams) {
      MaQD
      So
      Ngay
      BiDanh
      ThoiGianBD
      ThoiGianKT
      NhiemVuCT
      DeNghiTSNT {
        MaDN
        So
        DoiTuong {
          MaDoiTuong
          TenDT
        }
      }
      LanhDaoPD {
        MaCBCS
        HoTen
      }
      Doi {
        MaDoi
        TenDoi
      }
      PhamViTSs {
        MaTinhTP
        TinhTP
      }
    }
  }
`;
export const QUERY_baocaoPHQHs = gql`
  query QUERY_baocaoPHQHs($utilsParams: UtilsParamsInput!) {
    baocaoPHQHs(utilsParams: $utilsParams) {
      MaBCPHQH
      ThoiGianPH
      DiaDiemPH
      DiaChiCC
      HinhAnh
      Ngay
      BiDanh
      DDNhanDang
      TSNhanXet
      TSThucHiens {
        MaCBCS
        HoTen
      }
      KetQuaTSNT {
        MaKQ
        KeHoachTSNT {
          MaKH
          QuyetDinhTSNT {
            MaQD
            BiDanh
            DeNghiTSNT {
              MaDN
              DoiTuong {
                MaDoiTuong
                TenDT
              }
            }
          }
        }
      }
    }
  }
`;
export const QUERY_baocaoPHDCs = gql`
  query QUERY_baocaoPHDCs($utilsParams: UtilsParamsInput!) {
    baocaoPHDCs(utilsParams: $utilsParams) {
      MaBCPHDC
      HinhAnh
      DiaChi
      ThoiGianPH
      KetQuaTSNT {
        MaKQ
        KeHoachTSNT {
          MaKH
          QuyetDinhTSNT {
            MaQD
            BiDanh
            DeNghiTSNT {
              MaDN
              DoiTuong {
                MaDoiTuong
                TenDT
              }
            }
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
export const QUERY_baocaoPHDCs_cbcss = gql`
  query QUERY_baocaoPHDCs_cbcss($utilsParams: UtilsParamsInput!) {
    baocaoPHDCs_cbcss(utilsParams: $utilsParams) {
      MaBCPHDC
      MaCBCS
    }
  }
`;
export const QUERY_baocaoPHPTs = gql`
  query QUERY_baocaoPHPTs($utilsParams: UtilsParamsInput!) {
    baocaoPHPTs(utilsParams: $utilsParams) {
      MaBCPHPT
      BKS
      ThoiGianPH
      DiaDiemPH
      HinhAnh
      KetQuaTSNT {
        MaKQ
        KeHoachTSNT {
          MaKH
          QuyetDinhTSNT {
            MaQD
            BiDanh
            DeNghiTSNT {
              MaDN
              DoiTuong {
                MaDoiTuong
                TenDT
              }
            }
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
      Ngay
      ThoiGian
      DiaDiem
      MucDich
      HinhAnh
      KetQuaTSNT {
        MaKQ
        KeHoachTSNT {
          MaKH
          QuyetDinhTSNT {
            MaQD
            BiDanh
            DeNghiTSNT {
              MaDN
              DoiTuong {
                MaDoiTuong
                TenDT
              }
            }
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
export const QUERY_tonGiaos = gql`
  query QUERY_tonGiaos($utilsParams: UtilsParamsInput!) {
    tonGiaos(utilsParams: $utilsParams) {
      MaTG
      TenTG
    }
  }
`;
export const QUERY_dois = gql`
  query QUERY_dois($utilsParams: UtilsParamsInput!) {
    dois(utilsParams: $utilsParams) {
      MaDoi
      TenDoi
      CAQHvaTD {
        MaCAQHvaTD
        CAQHvaTD
        CATTPvaTD {
          MaCATTPvaTD
          CATTPvaTD
        }
      }
    }
  }
`;
export const QUERY_tinhChatDTs = gql`
  query QUERY_tinhChatDTs($utilsParams: UtilsParamsInput!) {
    tinhChatDTs(utilsParams: $utilsParams) {
      MaTCDT
      TinhChat
    }
  }
`;
export const QUERY_loaiDTs = gql`
  query QUERY_loaiDTs($utilsParams: UtilsParamsInput!) {
    loaiDTs(utilsParams: $utilsParams) {
      MaLoaiDT
      LoaiDT
    }
  }
`;
export const QUERY_hinhthucHDs = gql`
  query QUERY_hinhthucHDs($utilsParams: UtilsParamsInput!) {
    hinhthucHDs(utilsParams: $utilsParams) {
      MaHTHD
      HinhThuc
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
export const QUERY_dauMoiPH_DNs = gql`
  query QUERY_dauMoiPH_DNs($utilsParams: UtilsParamsInput!) {
    dauMoiPH_DNs(utilsParams: $utilsParams) {
      MaDMPH
      DeNghiTSNT {
        MaDN
        So
      }
      LDDonViDN {
        MaCBCS
        HoTen
      }
      CBTrucTiepPH {
        MaCBCS
        HoTen
      }
    }
  }
`;
export const QUERY_kyDuyet_DNs = gql`
  query QUERY_kyDuyet_DNs($utilsParams: UtilsParamsInput!) {
    kyDuyet_DNs(utilsParams: $utilsParams) {
      MaKDDN
      DeNghiTSNT {
        MaDN
        So
      }
      DaiDienCATTPvaTD {
        MaCBCS
        HoTen
      }
      DaiDienDonViDN {
        MaCBCS
        HoTen
      }
      DaiDienDonViTSNT {
        MaCBCS
        HoTen
      }
    }
  }
`;
export const QUERY_denghiTSNTs_tinhTPs = gql`
  query QUERY_denghiTSNTs_tinhTPs($utilsParams: UtilsParamsInput!) {
    denghiTSNTs_tinhTPs(utilsParams: $utilsParams) {
      MaTinhTP
      MaDN
    }
  }
`;
export const QUERY_kehoachTSNTs = gql`
  query QUERY_kehoachTSNTs($utilsParams: UtilsParamsInput!) {
    kehoachTSNTs(utilsParams: $utilsParams) {
      MaKH
      So
      Ngay
      VanDeChuY
      NoiDung
      LanhDaoPD {
        MaCBCS
        HoTen
      }
      BCHPhuTrach {
        MaCBCS
        HoTen
      }
      TramCT {
        MaTramCT
        DiaDiem
      }
      QuyetDinhTSNT {
        MaQD
        So
        DeNghiTSNT {
          MaDN
          DoiTuong {
            MaDoiTuong
            TenDT
          }
        }
      }
      LLDBs {
        MaLLDB
        BiDanh
      }
    }
  }
`;
export const QUERY_lldbs = gql`
  query QUERY_lldbs($utilsParams: UtilsParamsInput!) {
    lldbs(utilsParams: $utilsParams) {
      MaLLDB
      BiDanh
      LoaiLLDB {
        MaLoaiLLDB
        TenLLDB
      }
      TSQuanLy {
        MaCBCS
        HoTen
      }
    }
  }
`;
export const QUERY_lucluongThamGiaKHs = gql`
  query QUERY_lucluongThamGiaKHs($utilsParams: UtilsParamsInput!) {
    lucluongThamGiaKHs(utilsParams: $utilsParams) {
      MaLLTGKH
      ViTri
      KeHoachTSNT {
        MaKH
        So
      }
      CBCS {
        MaCBCS
        HoTen
      }
    }
  }
`;
export const QUERY_tramCTs = gql`
  query QUERY_tramCTs($utilsParams: UtilsParamsInput!) {
    tramCTs(utilsParams: $utilsParams) {
      MaTramCT
      Ngay
      DiaDiem
      SoDoTram
      TSXayDung {
        MaCBCS
        HoTen
      }
      LanhDaoPD {
        MaCBCS
        HoTen
      }
    }
  }
`;
export const QUERY_bienBanRKNs = gql`
  query QUERY_bienBanRKNs($utilsParams: UtilsParamsInput!) {
    bienBanRKNs(utilsParams: $utilsParams) {
      MaBBRKN
      Ngay
      KetQuaTSNT {
        MaKQ
        KeHoachTSNT {
          MaKH
          So
        }
      }
      ChuToa {
        MaCBCS
        HoTen
      }
      ThuKy {
        MaCBCS
        HoTen
      }
      ThanhPhanTDs {
        MaCBCS
        HoTen
      }
    }
  }
`;
export const QUERY_bienBanRKNs_cbcss = gql`
  query QUERY_bienBanRKNs_cbcss($utilsParams: UtilsParamsInput!) {
    bienBanRKNs_cbcss(utilsParams: $utilsParams) {
      MaBBRKN
      MaCBCS
    }
  }
`;
export const QUERY_danhgiaTSTHs = gql`
  query QUERY_danhgiaTSTHs($utilsParams: UtilsParamsInput!) {
    danhgiaTSTHs(utilsParams: $utilsParams) {
      MaDanhGiaTSTH
      VaiTro
      LyDo
      DanhGia
      KetQuaTSNT {
        MaKQ
        KeHoachTSNT {
          MaKH
          QuyetDinhTSNT {
            MaQD
            BiDanh
            DeNghiTSNT {
              MaDN
              DoiTuong {
                MaDoiTuong
                TenDT
              }
            }
          }
        }
      }
      CBCS {
        MaCBCS
        HoTen
      }
    }
  }
`;






export const MUTATION_createBienBanRKN_CBCS = gql`
  mutation MUTATION_createBienBanRKN_CBCS(
    $bienBanRKN_CBCSInput: BienBanRKN_CBCSInput!
  ) {
    createBienBanRKN_CBCS(bienBanRKN_CBCSInput: $bienBanRKN_CBCSInput) {
      MaBBRKN
      MaCBCS
    }
  }
`;
export const MUTATION_editBienBanRKN_CBCS = gql`
  mutation MUTATION_editBienBanRKN_CBCS(
    $bienBanRKN_CBCSInput: BienBanRKN_CBCSInput!
    $MaBBRKN: Float!
    $MaCBCS: Float!
  ) {
    editBienBanRKN_CBCS(
      bienBanRKN_CBCSInput: $bienBanRKN_CBCSInput
      MaBBRKN: $MaBBRKN
      MaCBCS: $MaCBCS
    ) {
      MaBBRKN
      MaCBCS
    }
  }
`;
export const MUTATION_deleteBienBanRKN_CBCS = gql`
  mutation MUTATION_deleteBienBanRKN_CBCS($MaBBRKN: Float!, $MaCBCS: Float!) {
    deleteBienBanRKN_CBCS(MaBBRKN: $MaBBRKN, MaCBCS: $MaCBCS) {
      MaBBRKN
      MaCBCS
    }
  }
`;
export const QUERY_baocaoKQGHs_cbcss = gql`
  query QUERY_baocaoKQGHs_cbcss($utilsParams: UtilsParamsInput!) {
    baocaoKQGHs_cbcss(utilsParams: $utilsParams) {
      MaBCKQGH
      MaCBCS
    }
  }
`;
export const QUERY_baocaoKQXMQuanHes = gql`
  query QUERY_baocaoKQXMQuanHes($utilsParams: UtilsParamsInput!) {
    baocaoKQXMQuanHes(utilsParams: $utilsParams) {
      MaBCKQXMQH
      HoTen
      Ngay
      BaoCaoPHQH {
        MaBCPHQH
        BiDanh
        KetQuaTSNT {
          MaKQ
          KeHoachTSNT {
            MaKH
            QuyetDinhTSNT {
              MaQD
              BiDanh
              DeNghiTSNT {
                MaDN
                DoiTuong {
                  MaDoiTuong
                  TenDT
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const QUERY_baocaoKQXMDiaChis = gql`
  query QUERY_baocaoKQXMDiaChis($utilsParams: UtilsParamsInput!) {
    baocaoKQXMDiaChis(utilsParams: $utilsParams) {
      MaBCKQXMDC
      Ngay
      HoTenChuHo
      TenKhac
      GioiTinh
      NamSinh
      QueQuan
      HKTT
      NoiO
      NoiLamViec
      QuanHeGiaDinh
      HoKhacCungDC
      NgheNghiep
      BienPhapXM
      BaoCaoPHDC {
        MaBCPHDC
        DiaChi
        KetQuaTSNT {
          MaKQ
          KeHoachTSNT {
            MaKH
            QuyetDinhTSNT {
              MaQD
              BiDanh
              DeNghiTSNT {
                MaDN
                DoiTuong {
                  MaDoiTuong
                  TenDT
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const QUERY_baoCaoKTDNs = gql`
  query QUERY_baoCaoKTDNs($utilsParams: UtilsParamsInput!) {
    baoCaoKTDNs(utilsParams: $utilsParams) {
      MaBCKTDN
      Ngay
      TinhHinhDT
      VanDeRKN
      KetQuaTSNT {
        MaKQ
        KeHoachTSNT {
          MaKH
          So
          QuyetDinhTSNT {
            MaQD
            BiDanh
            DeNghiTSNT {
              MaDN
              DoiTuong {
                MaDoiTuong
                TenDT
              }
            }
          }
        }
      }
    }
  }
`;
export const QUERY_ketquaTSNTs = gql`
  query QUERY_ketquaTSNTs($utilsParams: UtilsParamsInput!) {
    ketquaTSNTs(utilsParams: $utilsParams) {
      MaKQ
      ThoiGianBD
      ThoiGianKT
      DDNB
      KeHoachTSNT {
        MaKH
        So
        QuyetDinhTSNT {
          MaQD
          BiDanh
          DeNghiTSNT {
            MaDN
            DoiTuong {
              MaDoiTuong
              TenDT
            }
          }
        }
      }
      PhamViTSs {
        MaTinhTP
        TinhTP
      }
    }
  }
`;
export const QUERY_baocaoPHQHs_cbcss = gql`
  query QUERY_baocaoPHQHs_cbcss($utilsParams: UtilsParamsInput!) {
    baocaoPHQHs_cbcss(utilsParams: $utilsParams) {
      MaBCPHQH
      MaCBCS
    }
  }
`;
export const QUERY_ketquaTSNTs_tinhTPs = gql`
  query QUERY_ketquaTSNTs_tinhTPs($utilsParams: UtilsParamsInput!) {
    ketquaTSNTs_tinhTPs(utilsParams: $utilsParams) {
      MaTinhTP
      MaKQ
    }
  }
`;
export const QUERY_ketQuaXMQuanHes = gql`
  query QUERY_ketQuaXMQuanHes($utilsParams: UtilsParamsInput!) {
    ketQuaXMQuanHes(utilsParams: $utilsParams) {
      MaKQXMQH
      So
      Ngay
      BaoCaoPHQH {
        MaBCPHQH
        BiDanh
      }
      LanhDaoPD {
        MaCBCS
        HoTen
      }
    }
  }
`;
export const QUERY_ketQuaXMDiaChis = gql`
  query QUERY_ketQuaXMDiaChis($utilsParams: UtilsParamsInput!) {
    ketQuaXMDiaChis(utilsParams: $utilsParams) {
      MaKQXMDC
      So
      Ngay
      BaoCaoPHDC {
        MaBCPHDC
        DiaChi
      }
      LanhDaoPD {
        MaCBCS
        HoTen
      }
    }
  }
`;

// mutation
export const MUTATION_createBaoCaoKQXMQuanHe = gql`
  mutation MUTATION_createBaoCaoKQXMQuanHe(
    $baocaoKQXMQuanHeInput: BaoCaoKQXMQuanHeInput!
  ) {
    createBaoCaoKQXMQuanHe(baocaoKQXMQuanHeInput: $baocaoKQXMQuanHeInput) {
      MaBCKQXMQH
      Ngay
    }
  }
`;
export const MUTATION_editBaoCaoKQXMQuanHe = gql`
  mutation MUTATION_editBaoCaoKQXMQuanHe(
    $baocaoKQXMQuanHeInput: BaoCaoKQXMQuanHeInput!
    $id: Float!
  ) {
    editBaoCaoKQXMQuanHe(
      baocaoKQXMQuanHeInput: $baocaoKQXMQuanHeInput
      id: $id
    ) {
      MaBCKQXMQH
      Ngay
    }
  }
`;
export const MUTATION_deleteBaoCaoKQXMQuanHe = gql`
  mutation MUTATION_deleteBaoCaoKQXMQuanHe(
    $baocaoKQXMQuanHeInput: BaoCaoKQXMQuanHeInput!
    $id: Float!
  ) {
    deleteBaoCaoKQXMQuanHe(
      baocaoKQXMQuanHeInput: $baocaoKQXMQuanHeInput
      id: $id
    ) {
      MaBCKQXMQH
      Ngay
    }
  }
`;
export const MUTATION_createBaoCaoKQXMDiaChi = gql`
  mutation MUTATION_createBaoCaoKQXMDiaChi(
    $baocaoKQXMDiaChiInput: BaoCaoKQXMDiaChiInput!
  ) {
    createBaoCaoKQXMDiaChi(baocaoKQXMDiaChiInput: $baocaoKQXMDiaChiInput) {
      MaBCKQXMDC
      Ngay
    }
  }
`;
export const MUTATION_editBaoCaoKQXMDiaChi = gql`
  mutation MUTATION_editBaoCaoKQXMDiaChi(
    $baocaoKQXMDiaChiInput: BaoCaoKQXMDiaChiInput!
    $id: Float!
  ) {
    editBaoCaoKQXMDiaChi(
      baocaoKQXMDiaChiInput: $baocaoKQXMDiaChiInput
      id: $id
    ) {
      MaBCKQXMDC
      Ngay
    }
  }
`;
export const MUTATION_deleteBaoCaoKQXMDiaChi = gql`
  mutation MUTATION_deleteBaoCaoKQXMDiaChi(
    $baocaoKQXMDiaChiInput: BaoCaoKQXMDiaChiInput!
    $id: Float!
  ) {
    deleteBaoCaoKQXMDiaChi(
      baocaoKQXMDiaChiInput: $baocaoKQXMDiaChiInput
      id: $id
    ) {
      MaBCKQXMDC
      Ngay
    }
  }
`;
export const MUTATION_createBaoCaoKTDN = gql`
  mutation MUTATION_createBaoCaoKTDN($baocaoKTDNInput: BaoCaoKTDNInput!) {
    createBaoCaoKTDN(baocaoKTDNInput: $baocaoKTDNInput) {
      MaBCKTDN
      Ngay
    }
  }
`;
export const MUTATION_editBaoCaoKTDN = gql`
  mutation MUTATION_editBaoCaoKTDN(
    $baocaoKTDNInput: BaoCaoKTDNInput!
    $id: Float!
  ) {
    editBaoCaoKTDN(baocaoKTDNInput: $baocaoKTDNInput, id: $id) {
      MaBCKTDN
      Ngay
    }
  }
`;
export const MUTATION_deleteBaoCaoKTDN = gql`
  mutation MUTATION_deleteBaoCaoKTDN(
    $baocaoKTDNInput: BaoCaoKTDNInput!
    $id: Float!
  ) {
    deleteBaoCaoKTDN(baocaoKTDNInput: $baocaoKTDNInput, id: $id) {
      MaBCKTDN
      Ngay
    }
  }
`;
export const MUTATION_createBaoCaoPHQH = gql`
  mutation MUTATION_createBaoCaoPHQH($baocaoPHQHInput: BaoCaoPHQHInput!) {
    createBaoCaoPHQH(baocaoPHQHInput: $baocaoPHQHInput) {
      MaBCPHQH
      Ngay
    }
  }
`;
export const MUTATION_editBaoCaoPHQH = gql`
  mutation MUTATION_editBaoCaoPHQH(
    $baocaoPHQHInput: BaoCaoPHQHInput!
    $id: Float!
  ) {
    editBaoCaoPHQH(baocaoPHQHInput: $baocaoPHQHInput, id: $id) {
      MaBCPHQH
      Ngay
    }
  }
`;
export const MUTATION_deleteBaoCaoPHQH = gql`
  mutation MUTATION_deleteBaoCaoPHQH(
    $baocaoPHQHInput: BaoCaoPHQHInput!
    $id: Float!
  ) {
    deleteBaoCaoPHQH(baocaoPHQHInput: $baocaoPHQHInput, id: $id) {
      MaBCPHQH
      Ngay
    }
  }
`;
export const MUTATION_createBaoCaoKQGH_CBCS = gql`
  mutation MUTATION_createBaoCaoKQGH_CBCS(
    $baocaokqgh_cbcsInput: BaoCaoKQGH_CBCSInput!
  ) {
    createBaoCaoKQGH_CBCS(baocaokqgh_cbcsInput: $baocaoKQGH_cbcsInput) {
      MaBCKQGH
      MaCBCS
    }
  }
`;
export const MUTATION_editBaoCaoKQGH_CBCS = gql`
  mutation MUTATION_editBaoCaoKQGH_CBCS(
    $baocaokqgh_cbcsInput: BaoCaoKQGH_CBCSInput!
    $MaBCKQGH: Float!
    $MaCBCS: Float!
  ) {
    editBaoCaoKQGH_CBCS(
      baocaokqgh_cbcsInput: $baocaokqgh_cbcsInput
      MaBCKQGH: $MaBCKQGH
      MaCBCS: $MaCBCS
    ) {
      MaBCKQGH
      MaCBCS
    }
  }
`;
export const MUTATION_deleteBaoCaoKQGH_CBCS = gql`
  mutation MUTATION_deleteBaoCaoKQGH_CBCS($MaBCKQGH: Float!, $MaCBCS: Float!) {
    deleteBaoCaoKQGH_CBCS(MaBCKQGH: $MaBCKQGH, MaCBCS: $MaCBCS) {
      MaBCKQGH
      MaCBCS
    }
  }
`;
export const MUTATION_createBaoCaoPHQH_CBCS = gql`
  mutation MUTATION_createBaoCaoPHQH_CBCS(
    $baocaoPHQH_cbcsInput: BaoCaoPHQH_CBCSInput!
  ) {
    createBaoCaoPHQH_CBCS(baocaoPHQH_cbcsInput: $baocaoPHQH_cbcsInput) {
      MaBCPHQH
      MaCBCS
    }
  }
`;
export const MUTATION_editBaoCaoPHQH_CBCS = gql`
  mutation MUTATION_editBaoCaoPHQH_CBCS(
    $baocaoPHQH_cbcsInput: BaoCaoPHQH_CBCSInput!
    $MaBCPHQH: Float!
    $MaCBCS: Float!
  ) {
    editBaoCaoPHQH_CBCS(
      baocaoPHQH_cbcsInput: $baocaoPHQH_cbcsInput
      MaBCPHQH: $MaBCPHQH
      MaCBCS: $MaCBCS
    ) {
      MaBCPHQH
      MaCBCS
    }
  }
`;
export const MUTATION_deleteBaoCaoPHQH_CBCS = gql`
  mutation MUTATION_deleteBaoCaoPHQH_CBCS($MaBCPHQH: Float!, $MaCBCS: Float!) {
    deleteBaoCaoPHQH_CBCS(MaBCPHQH: $MaBCPHQH, MaCBCS: $MaCBCS) {
      MaBCPHQH
      MaCBCS
    }
  }
`;
export const MUTATION_createKetQuaTSNT = gql`
  mutation MUTATION_createKetQuaTSNT($ketquaTSNTInput: KetQuaTSNTInput!) {
    createKetQuaTSNT(ketquaTSNTInput: $ketquaTSNTInput) {
      MaKQ
      ThoiGianBD
    }
  }
`;
export const MUTATION_editKetQuaTSNT = gql`
  mutation MUTATION_editKetQuaTSNT(
    $ketquaTSNTInput: KetQuaTSNTInput!
    $id: Float!
  ) {
    editKetQuaTSNT(ketquaTSNTInput: $ketquaTSNTInput, id: $id) {
      MaKQ
      ThoiGianBD
    }
  }
`;
export const MUTATION_deleteKetQuaTSNT = gql`
  mutation MUTATION_deleteKetQuaTSNT($id: Float!) {
    deleteKetQuaTSNT(id: $id) {
      MaKQ
      ThoiGianBD
    }
  }
`;
export const MUTATION_createKetQuaTSNT_TinhTP = gql`
  mutation MUTATION_createKetQuaTSNT_TinhTP(
    $ketquaTSNT_tinhtpInput: KetQuaTSNT_TinhTPInput!
  ) {
    createKetQuaTSNT_TinhTP(ketquaTSNT_tinhtpInput: $ketquaTSNT_tinhtpInput) {
      MaKQ
      MaTinhTP
    }
  }
`;
export const MUTATION_editKetQuaTSNT_TinhTP = gql`
  mutation MUTATION_editKetQuaTSNT_TinhTP(
    $ketquaTSNT_tinhtpInput: KetQuaTSNT_TinhTPInput!
    $MaKQ: Float!
    $MaTinhTP: Float!
  ) {
    editKetQuaTSNT_TinhTP(
      ketquaTSNT_tinhtpInput: $ketquaTSNT_tinhtpInput
      MaKQ: $MaKQ
      MaTinhTP: $MaTinhTP
    ) {
      MaKQ
      MaTinhTP
    }
  }
`;
export const MUTATION_deleteKetQuaTSNT_TinhTP = gql`
  mutation MUTATION_deleteKetQuaTSNT_TinhTP($MaKQ: Float!, $MaTinhTP: Float!) {
    deleteKetQuaTSNT_TinhTP(MaKQ: $MaKQ, MaTinhTP: $MaTinhTP) {
      MaKQ
      MaTinhTP
    }
  }
`;
export const MUTATION_createKetQuaXMQuanHe = gql`
  mutation MUTATION_createKetQuaXMQuanHe(
    $ketQuaXMQuanHeInput: KetQuaXMQuanHeInput!
  ) {
    createKetQuaXMQuanHe(ketQuaXMQuanHeInput: $ketQuaXMQuanHeInput) {
      MaKQXMQH
      So
    }
  }
`;
export const MUTATION_editKetQuaXMQuanHe = gql`
  mutation MUTATION_editKetQuaXMQuanHe(
    $ketQuaXMQuanHeInput: KetQuaXMQuanHeInput!
    $id: Float!
  ) {
    editKetQuaXMQuanHe(ketQuaXMQuanHeInput: $ketQuaXMQuanHeInput, id: $id) {
      MaKQXMQH
      So
    }
  }
`;
export const MUTATION_deleteKetQuaXMQuanHe = gql`
  mutation MUTATION_deleteKetQuaXMQuanHe($id: Float!) {
    deleteKetQuaXMQuanHe(id: $id) {
      MaKQXMQH
      So
    }
  }
`;
export const MUTATION_createKetQuaXMDiaChi = gql`
  mutation MUTATION_createKetQuaXMDiaChi(
    $ketQuaXMDiaChiInput: KetQuaXMDiaChiInput!
  ) {
    createKetQuaXMDiaChi(ketQuaXMDiaChiInput: $ketQuaXMDiaChiInput) {
      MaKQXMDC
      So
    }
  }
`;
export const MUTATION_editKetQuaXMDiaChi = gql`
  mutation MUTATION_editKetQuaXMDiaChi(
    $ketQuaXMDiaChiInput: KetQuaXMDiaChiInput!
    $id: Float!
  ) {
    editKetQuaXMDiaChi(ketQuaXMDiaChiInput: $ketQuaXMDiaChiInput, id: $id) {
      MaKQXMDC
      So
    }
  }
`;
export const MUTATION_deleteKetQuaXMDiaChi = gql`
  mutation MUTATION_deleteKetQuaXMDiaChi($id: Float!) {
    deleteKetQuaXMDiaChi(id: $id) {
      MaKQXMDC
      So
    }
  }
`;
export const MUTATION_createBaoCaoPHPT = gql`
  mutation MUTATION_createBaoCaoPHPT($baocaoPHPTInput: BaoCaoPHPTInput!) {
    createBaoCaoPHPT(baocaoPHPTInput: $baocaoPHPTInput) {
      MaBCPHPT
      BKS
    }
  }
`;
export const MUTATION_editBaoCaoPHPT = gql`
  mutation MUTATION_editBaoCaoPHPT(
    $baocaoPHPTInput: BaoCaoPHPTInput!
    $id: Float!
  ) {
    editBaoCaoPHPT(baocaoPHPTInput: $baocaoPHPTInput, id: $id) {
      MaBCPHPT
      BKS
    }
  }
`;
export const MUTATION_deleteBaoCaoPHPT = gql`
  mutation MUTATION_deleteBaoCaoPHPT(
    $baocaoPHPTInput: BaoCaoPHPTInput!
    $id: Float!
  ) {
    deleteBaoCaoPHPT(baocaoPHPTInput: $baocaoPHPTInput, id: $id) {
      MaBCPHPT
      BKS
    }
  }
`;
export const MUTATION_createDanhGiaTSTH = gql`
  mutation MUTATION_createDanhGiaTSTH($danhgiaTSTHInput: DanhGiaTSTHInput!) {
    createDanhGiaTSTH(danhgiaTSTHInput: $danhgiaTSTHInput) {
      MaDanhGiaTSTH
      KetQuaTSNT {
        MaKQ
        KeHoachTSNT {
          MaKH
          QuyetDinhTSNT {
            MaQD
            BiDanh
            DeNghiTSNT {
              MaDN
              DoiTuong {
                MaDoiTuong
                TenDT
              }
            }
          }
        }
      }
    }
  }
`;
export const MUTATION_editDanhGiaTSTH = gql`
  mutation MUTATION_editDanhGiaTSTH(
    $danhgiaTSTHInput: DanhGiaTSTHInput!
    $id: Float!
  ) {
    editDanhGiaTSTH(danhgiaTSTHInput: $danhgiaTSTHInput, id: $id) {
      MaDanhGiaTSTH
      KetQuaTSNT {
        MaKQ
        KeHoachTSNT {
          MaKH
          QuyetDinhTSNT {
            MaQD
            BiDanh
            DeNghiTSNT {
              MaDN
              DoiTuong {
                MaDoiTuong
                TenDT
              }
            }
          }
        }
      }
    }
  }
`;
export const MUTATION_deleteDanhGiaTSTH = gql`
  mutation MUTATION_deleteDanhGiaTSTH($id: Float!) {
    deleteDanhGiaTSTH(id: $id) {
      MaDanhGiaTSTH
      KetQuaTSNT {
        MaKQ
        KeHoachTSNT {
          MaKH
          QuyetDinhTSNT {
            MaQD
            BiDanh
            DeNghiTSNT {
              MaDN
              DoiTuong {
                MaDoiTuong
                TenDT
              }
            }
          }
        }
      }
    }
  }
`;
export const MUTATION_createBaoCaoPHDC = gql`
  mutation MUTATION_createBaoCaoPHDC($baocaoPHDCInput: BaoCaoPHDCInput!) {
    createBaoCaoPHDC(baocaoPHDCInput: $baocaoPHDCInput) {
      MaBCPHDC
      DiaChi
    }
  }
`;
export const MUTATION_editBaoCaoPHDC = gql`
  mutation MUTATION_editBaoCaoPHDC(
    $baocaoPHDCInput: BaoCaoPHDCInput!
    $id: Float!
  ) {
    editBaoCaoPHDC(baocaoPHDCInput: $baocaoPHDCInput, id: $id) {
      MaBCPHDC
      DiaChi
    }
  }
`;
export const MUTATION_deleteBaoCaoPHDC = gql`
  mutation MUTATION_deleteBaoCaoPHDC(
    $baocaoPHDCInput: BaoCaoPHDCInput!
    $id: Float!
  ) {
    deleteBaoCaoPHDC(baocaoPHDCInput: $baocaoPHDCInput, id: $id) {
      MaBCPHDC
      DiaChi
    }
  }
`;
export const MUTATION_createBaoCaoPHDC_CBCS = gql`
  mutation MUTATION_createBaoCaoPHDC_CBCS(
    $baocaoPHDC_cbcsInput: BaoCaoPHDC_CBCSInput!
  ) {
    createBaoCaoPHDC_CBCS(baocaoPHDC_cbcsInput: $baocaoPHDC_cbcsInput) {
      MaBCPHDC
      MaCBCS
    }
  }
`;
export const MUTATION_editBaoCaoPHDC_CBCS = gql`
  mutation MUTATION_editBaoCaoPHDC_CBCS(
    $baocaoPHDC_cbcsInput: BaoCaoPHDC_CBCSInput!
    $MaBCPHDC: Float!
    $MaCBCS: Float!
  ) {
    editBaoCaoPHDC_CBCS(
      baocaoPHDC_cbcsInput: $baocaoPHDC_cbcsInput
      MaBCPHDC: $MaBCPHDC
      MaCBCS: $MaCBCS
    ) {
      MaBCPHDC
      MaCBCS
    }
  }
`;
export const MUTATION_deleteBaoCaoPHDC_CBCS = gql`
  mutation MUTATION_deleteBaoCaoPHDC_CBCS($MaBCPHDC: Float!, $MaCBCS: Float!) {
    deleteBaoCaoPHDC_CBCS(MaBCPHDC: $MaBCPHDC, MaCBCS: $MaCBCS) {
      MaBCPHDC
      MaCBCS
    }
  }
`;
export const MUTATION_createChuyenAn = gql`
  mutation MUTATION_createChuyenAn($chuyenanInput: ChuyenAnInput!) {
    createChuyenAn(chuyenanInput: $chuyenanInput) {
      MaCA
      TenCA
    }
  }
`;
export const MUTATION_editChuyenAn = gql`
  mutation MUTATION_editChuyenAn(
    $chuyenanInput: ChuyenAnInput!
    $id: Float!
  ) {
    editChuyenAn(chuyenanInput: $chuyenanInput, id: $id) {
      MaCA
      TenCA
    }
  }
`;
export const MUTATION_deleteChuyenAn = gql`
  mutation MUTATION_deleteChuyenAn(
    $chuyenanInput: ChuyenAnInput!
    $id: Float!
  ) {
    deleteChuyenAn(chuyenanInput: $chuyenanInput, id: $id) {
      MaCA
      TenCA
    }
  }
`;


















// chua duyet lai

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
export const QUERY_quocTichs = gql`
  query QUERY_quocTichs($utilsParams: UtilsParamsInput!) {
    quocTichs(utilsParams: $utilsParams) {
      MaQT
      TenQT
    }
  }
`;
export const QUERY_loaiLLDBs = gql`
  query QUERY_loaiLLDBs($utilsParams: UtilsParamsInput!) {
    loaiLLDBs(utilsParams: $utilsParams) {
      MaLoaiLLDB
      TenLLDB
      KyHieu
    }
  }
`;

export const QUERY_tinhTPs = gql`
  query QUERY_tinhTPs($utilsParams: UtilsParamsInput!) {
    tinhTPs(utilsParams: $utilsParams) {
      MaTinhTP
      TinhTP
      Cap
    }
  }
`;
export const QUERY_ddnbs = gql`
  query QUERY_ddnbs($utilsParams: UtilsParamsInput!) {
    ddnbs(utilsParams: $utilsParams) {
      MaDDNB
      DacDiem
    }
  }
`;
export const QUERY_bienphapDTs_doituongs = gql`
  query QUERY_bienphapDTs_doituongs($utilsParams: UtilsParamsInput!) {
    bienphapDTs_doituongs(utilsParams: $utilsParams) {
      MaBPDT
      MaDoiTuong
    }
  }
`;
export const QUERY_quyetdinhTSNTs_tinhTPs = gql`
  query QUERY_quyetdinhTSNTs_tinhTPs($utilsParams: UtilsParamsInput!) {
    quyetdinhTSNTs_tinhTPs(utilsParams: $utilsParams) {
      MaQD
      MaTinhTP
    }
  }
`;
export const QUERY_kehoachTSNTs_lldbs = gql`
  query QUERY_kehoachTSNTs_lldbs($utilsParams: UtilsParamsInput!) {
    kehoachTSNTs_lldbs(utilsParams: $utilsParams) {
      MaLLDB
      MaKH
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
export const MUTATION_createHinhThucHD = gql`
  mutation MUTATION_createHinhThucHD($hinhthuc: String!) {
    createHinhThucHD(hinhthuc: $hinhthuc) {
      MaHTHD
      HinhThuc
    }
  }
`;
export const MUTATION_editHinhThucHD = gql`
  mutation MUTATION_editHinhThucHD($hinhthuc: String!, $id: Float!) {
    editHinhThucHD(hinhthuc: $hinhthuc, id: $id) {
      MaHTHD
      HinhThuc
    }
  }
`;
export const MUTATION_deleteHinhThucHD = gql`
  mutation MUTATION_deleteHinhThucHD($id: Float!) {
    deleteHinhThucHD(id: $id) {
      MaHTHD
      HinhThuc
    }
  }
`;
export const MUTATION_createLoaiLLDB = gql`
  mutation MUTATION_createLoaiLLDB($loaiLLDBInput: LoaiLLDBInput!) {
    createLoaiLLDB(loaiLLDBInput: $loaiLLDBInput) {
      MaLoaiLLDB
      TenLLDB
      KyHieu
    }
  }
`;
export const MUTATION_editLoaiLLDB = gql`
  mutation MUTATION_editLoaiLLDB($loaiLLDBInput: LoaiLLDBInput!, $id: Float!) {
    editLoaiLLDB(loaiLLDBInput: $loaiLLDBInput, id: $id) {
      MaLoaiLLDB
      TenLLDB
      KyHieu
    }
  }
`;
export const MUTATION_deleteLoaiLLDB = gql`
  mutation MUTATION_deleteLoaiLLDB($id: Float!) {
    deleteLoaiLLDB(id: $id) {
      MaLoaiLLDB
      TenLLDB
      KyHieu
    }
  }
`;
export const MUTATION_createLoaiDT = gql`
  mutation MUTATION_createLoaiDT($loaiDT: String!) {
    createLoaiDT(loaiDT: $loaiDT) {
      MaLoaiDT
      LoaiDT
    }
  }
`;
export const MUTATION_editLoaiDT = gql`
  mutation MUTATION_editLoaiDT($loaiDT: String!, $id: Float!) {
    editLoaiDT(loaiDT: $loaiDT, id: $id) {
      MaLoaiDT
      LoaiDT
    }
  }
`;
export const MUTATION_deleteLoaiDT = gql`
  mutation MUTATION_deleteLoaiDT($id: Float!) {
    deleteLoaiDT(id: $id) {
      MaLoaiDT
      LoaiDT
    }
  }
`;
export const MUTATION_createLLDB = gql`
  mutation MUTATION_createLLDB($lldbInput: LLDBInput!) {
    createLLDB(lldbInput: $lldbInput) {
      MaLLDB
      BiDanh
    }
  }
`;
export const MUTATION_editLLDB = gql`
  mutation MUTATION_editLLDB($lldbInput: LLDBInput!, $id: Float!) {
    editLLDB(lldbInput: $lldbInput, id: $id) {
      MaLLDB
      BiDanh
    }
  }
`;
export const MUTATION_deleteLLDB = gql`
  mutation MUTATION_deleteLLDB($id: Float!) {
    deleteLLDB(id: $id) {
      MaLLDB
      BiDanh
    }
  }
`;
export const MUTATION_createQuocTich = gql`
  mutation MUTATION_createQuocTich($tenQT: String!) {
    createQuocTich(tenQT: $tenQT) {
      MaQT
      TenQT
    }
  }
`;
export const MUTATION_editQuocTich = gql`
  mutation MUTATION_editQuocTich($tenQT: String!, $id: Float!) {
    editQuocTich(tenQT: $tenQT, id: $id) {
      MaQT
      TenQT
    }
  }
`;
export const MUTATION_deleteQuocTich = gql`
  mutation MUTATION_deleteQuocTich($id: Float!) {
    deleteQuocTich(id: $id) {
      MaQT
      TenQT
    }
  }
`;
export const MUTATION_createTinhChatDT = gql`
  mutation MUTATION_createTinhChatDT($tinhchat: String!) {
    createTinhChatDT(tinhchat: $tinhchat) {
      MaTCDT
      TinhChat
    }
  }
`;
export const MUTATION_editTinhChatDT = gql`
  mutation MUTATION_editTinhChatDT($tinhchat: String!, $id: Float!) {
    editTinhChatDT(tinhchat: $tinhchat, id: $id) {
      MaTCDT
      TinhChat
    }
  }
`;
export const MUTATION_deleteTinhChatDT = gql`
  mutation MUTATION_deleteTinhChatDT($id: Float!) {
    deleteTinhChatDT(id: $id) {
      MaTCDT
      TinhChat
    }
  }
`;
export const MUTATION_createTonGiao = gql`
  mutation MUTATION_createTonGiao($tenTG: String!) {
    createTonGiao(tenTG: $tenTG) {
      MaTG
      TenTG
    }
  }
`;
export const MUTATION_editTonGiao = gql`
  mutation MUTATION_editTonGiao($tenTG: String!, $id: Float!) {
    editTonGiao(tenTG: $tenTG, id: $id) {
      MaTG
      TenTG
    }
  }
`;
export const MUTATION_deleteTonGiao = gql`
  mutation MUTATION_deleteTonGiao($id: Float!) {
    deleteTonGiao(id: $id) {
      MaTG
      TenTG
    }
  }
`;
export const MUTATION_createTinhTP = gql`
  mutation MUTATION_createTinhTP($tinhTPInput: TinhTPInput!) {
    createTinhTP(tinhTPInput: $tinhTPInput) {
      MaTinhTP
      TinhTP
    }
  }
`;
export const MUTATION_editTinhTP = gql`
  mutation MUTATION_editTinhTP($tinhTPInput: TinhTPInput!, $id: Float!) {
    editTinhTP(tinhTPInput: $tinhTPInput, id: $id) {
      MaTinhTP
      TinhTP
    }
  }
`;
export const MUTATION_deleteTinhTP = gql`
  mutation MUTATION_deleteTinhTP($id: Float!) {
    deleteTinhTP(id: $id) {
      MaTinhTP
      TinhTP
    }
  }
`;
export const MUTATION_createDDNB = gql`
  mutation MUTATION_createDDNB($ddnb: String!) {
    createDDNB(ddnb: $ddnb) {
      MaDDNB
      DacDiem
    }
  }
`;
export const MUTATION_editDDNB = gql`
  mutation MUTATION_editDDNB($ddnb: String!, $id: Float!) {
    editDDNB(ddnb: $ddnb, id: $id) {
      MaDDNB
      DacDiem
    }
  }
`;
export const MUTATION_deleteDDNB = gql`
  mutation MUTATION_deleteDDNB($id: Float!) {
    deleteDDNB(id: $id) {
      MaDDNB
      DacDiem
    }
  }
`;
export const MUTATION_createDoi = gql`
  mutation MUTATION_createDoi($doiInput: DoiInput!) {
    createDoi(doiInput: $doiInput) {
      MaDoi
      TenDoi
    }
  }
`;
export const MUTATION_editDoi = gql`
  mutation MUTATION_editDoi($doiInput: DoiInput!, $id: Float!) {
    editDoi(doiInput: $doiInput, id: $id) {
      MaDoi
      TenDoi
    }
  }
`;
export const MUTATION_deleteDoi = gql`
  mutation MUTATION_deleteDoi($id: Float!) {
    deleteDoi(id: $id) {
      MaDoi
      TenDoi
    }
  }
`;
export const MUTATION_createCBCS = gql`
  mutation MUTATION_createCBCS($cbcsInput: CBCSInput!) {
    createCBCS(cbcsInput: $cbcsInput) {
      MaCBCS
      HoTen
    }
  }
`;
export const MUTATION_editCBCS = gql`
  mutation MUTATION_editCBCS($cbcsInput: CBCSInput!, $id: Float!) {
    editCBCS(cbcsInput: $cbcsInput, id: $id) {
      MaCBCS
      HoTen
    }
  }
`;
export const MUTATION_deleteCBCS = gql`
  mutation MUTATION_deleteCBCS($cbcsInput: CBCSInput!, $id: Float!) {
    deleteCBCS(cbcsInput: $cbcsInput, id: $id) {
      MaCBCS
      HoTen
    }
  }
`;
export const MUTATION_createDoiTuong = gql`
  mutation MUTATION_createDoiTuong($doituongInput: DoiTuongInput!) {
    createDoiTuong(doituongInput: $doituongInput) {
      MaDoiTuong
      TenDT
    }
  }
`;
export const MUTATION_editDoiTuong = gql`
  mutation MUTATION_editDoiTuong($doituongInput: DoiTuongInput!, $id: Float!) {
    editDoiTuong(doituongInput: $doituongInput, id: $id) {
      MaDoiTuong
      TenDT
    }
  }
`;
export const MUTATION_deleteDoiTuong = gql`
  mutation MUTATION_deleteDoiTuong(
    $doituongInput: DoiTuongInput!
    $id: Float!
  ) {
    deleteDoiTuong(doituongInput: $doituongInput, id: $id) {
      MaDoiTuong
      TenDT
    }
  }
`;
export const MUTATION_createBienPhapDT_DoiTuong = gql`
  mutation MUTATION_createBienPhapDT_DoiTuong(
    $bienphapdt_doituongInput: BienPhapDT_DoiTuongInput!
  ) {
    createBienPhapDT_DoiTuong(
      bienphapdt_doituongInput: $bienphapdt_doituongInput
    ) {
      MaBPDT
      MaDoiTuong
    }
  }
`;
export const MUTATION_editBienPhapDT_DoiTuong = gql`
  mutation MUTATION_editBienPhapDT_DoiTuong(
    $bienphapdt_doituongInput: BienPhapDT_DoiTuongInput!
    $MaBPDT: Float!
    $MaDoiTuong: Float!
  ) {
    editBienPhapDT_DoiTuong(
      bienphapdt_doituongInput: $bienphapdt_doituongInput
      MaBPDT: $MaBPDT
      MaDoiTuong: $MaDoiTuong
    ) {
      MaBPDT
      MaDoiTuong
    }
  }
`;
export const MUTATION_deleteBienPhapDT_DoiTuong = gql`
  mutation MUTATION_deleteBienPhapDT_DoiTuong(
    $MaBPDT: Float!
    $MaDoiTuong: Float!
  ) {
    deleteBienPhapDT_DoiTuong(MaBPDT: $MaBPDT, MaDoiTuong: $MaDoiTuong) {
      MaBPDT
      MaDoiTuong
    }
  }
`;
export const MUTATION_createDeNghiTSNT = gql`
  mutation MUTATION_createDeNghiTSNT($denghiTSNTInput: DeNghiTSNTInput!) {
    createDeNghiTSNT(denghiTSNTInput: $denghiTSNTInput) {
      MaDN
      So
    }
  }
`;
export const MUTATION_editDeNghiTSNT = gql`
  mutation MUTATION_editDeNghiTSNT(
    $denghiTSNTInput: DeNghiTSNTInput!
    $id: Float!
  ) {
    editDeNghiTSNT(denghiTSNTInput: $denghiTSNTInput, id: $id) {
      MaDN
      So
    }
  }
`;
export const MUTATION_deleteDeNghiTSNT = gql`
  mutation MUTATION_deleteDeNghiTSNT(
    $denghiTSNTInput: DeNghiTSNTInput!
    $id: Float!
  ) {
    deleteDeNghiTSNT(denghiTSNTInput: $denghiTSNTInput, id: $id) {
      MaDN
      So
    }
  }
`;
export const MUTATION_createDeNghiTSNT_TinhTP = gql`
  mutation MUTATION_createDeNghiTSNT_TinhTP(
    $denghitsnt_tinhtpInput: DeNghiTSNT_TinhTPInput!
  ) {
    createDeNghiTSNT_TinhTP(denghitsnt_tinhtpInput: $denghitsnt_tinhtpInput) {
      MaTinhTP
      MaDN
    }
  }
`;
export const MUTATION_editDeNghiTSNT_TinhTP = gql`
  mutation MUTATION_editDeNghiTSNT_TinhTP(
    $denghitsnt_tinhtpInput: DeNghiTSNT_TinhTPInput!
    $MaTinhTP: Float!
    $MaDN: Float!
  ) {
    editDeNghiTSNT_TinhTP(
      denghitsnt_tinhtpInput: $denghitsnt_tinhtpInput
      MaTinhTP: $MaTinhTP
      MaDN: $MaDN
    ) {
      MaTinhTP
      MaDN
    }
  }
`;
export const MUTATION_deleteDeNghiTSNT_TinhTP = gql`
  mutation MUTATION_deleteDeNghiTSNT_TinhTP($MaTinhTP: Float!, $MaDN: Float!) {
    deleteDeNghiTSNT_TinhTP(MaTinhTP: $MaTinhTP, MaDN: $MaDN) {
      MaTinhTP
      MaDN
    }
  }
`;
export const MUTATION_createDauMoiPH_DN = gql`
  mutation MUTATION_createDauMoiPH_DN($dauMoiPH_DNInput: DauMoiPH_DNInput!) {
    createDauMoiPH_DN(dauMoiPH_DNInput: $dauMoiPH_DNInput) {
      MaDMPH
      DeNghiTSNT {
        MaDN
        So
      }
    }
  }
`;
export const MUTATION_editDauMoiPH_DN = gql`
  mutation MUTATION_editDauMoiPH_DN(
    $dauMoiPH_DNInput: DauMoiPH_DNInput!
    $id: Float!
  ) {
    editDauMoiPH_DN(dauMoiPH_DNInput: $dauMoiPH_DNInput, id: $id) {
      MaDMPH
      DeNghiTSNT {
        MaDN
        So
      }
    }
  }
`;
export const MUTATION_deleteDauMoiPH_DN = gql`
  mutation MUTATION_deleteDauMoiPH_DN($id: Float!) {
    deleteDauMoiPH_DN(id: $id) {
      MaDMPH
      DeNghiTSNT {
        MaDN
        So
      }
    }
  }
`;
export const MUTATION_createKyDuyet_DN = gql`
  mutation MUTATION_createKyDuyet_DN($kyDuyet_DNInput: KyDuyet_DNInput!) {
    createKyDuyet_DN(kyDuyet_DNInput: $kyDuyet_DNInput) {
      MaKDDN
      DeNghiTSNT {
        MaDN
        So
      }
    }
  }
`;
export const MUTATION_editKyDuyet_DN = gql`
  mutation MUTATION_editKyDuyet_DN(
    $kyDuyet_DNInput: KyDuyet_DNInput!
    $id: Float!
  ) {
    editKyDuyet_DN(kyDuyet_DNInput: $kyDuyet_DNInput, id: $id) {
      MaKDDN
      DeNghiTSNT {
        MaDN
        So
      }
    }
  }
`;
export const MUTATION_deleteKyDuyet_DN = gql`
  mutation MUTATION_deleteKyDuyet_DN($id: Float!) {
    deleteKyDuyet_DN(id: $id) {
      MaKDDN
      DeNghiTSNT {
        MaDN
        So
      }
    }
  }
`;
export const MUTATION_createQuyetDinhTSNT = gql`
  mutation MUTATION_createQuyetDinhTSNT(
    $quyetdinhTSNTInput: QuyetDinhTSNTInput!
  ) {
    createQuyetDinhTSNT(quyetdinhTSNTInput: $quyetdinhTSNTInput) {
      MaQD
      So
    }
  }
`;
export const MUTATION_editQuyetDinhTSNT = gql`
  mutation MUTATION_editQuyetDinhTSNT(
    $quyetdinhTSNTInput: QuyetDinhTSNTInput!
    $id: Float!
  ) {
    editQuyetDinhTSNT(quyetdinhTSNTInput: $quyetdinhTSNTInput, id: $id) {
      MaQD
      So
    }
  }
`;
export const MUTATION_deleteQuyetDinhTSNT = gql`
  mutation MUTATION_deleteQuyetDinhTSNT(
    $quyetdinhTSNTInput: QuyetDinhTSNTInput!
    $id: Float!
  ) {
    deleteQuyetDinhTSNT(quyetdinhTSNTInput: $quyetdinhTSNTInput, id: $id) {
      MaQD
      So
    }
  }
`;
export const MUTATION_createQuyetDinhTSNT_TinhTP = gql`
  mutation MUTATION_createQuyetDinhTSNT_TinhTP(
    $quyetdinhtsnt_tinhtpInput: QuyetDinhTSNT_TinhTPInput!
  ) {
    createQuyetDinhTSNT_TinhTP(
      quyetdinhtsnt_tinhtpInput: $quyetdinhtsnt_tinhtpInput
    ) {
      MaTinhTP
      MaQD
    }
  }
`;
export const MUTATION_editQuyetDinhTSNT_TinhTP = gql`
  mutation MUTATION_editQuyetDinhTSNT_TinhTP(
    $quyetdinhtsnt_tinhtpInput: QuyetDinhTSNT_TinhTPInput!
    $MaTinhTP: Float!
    $MaQD: Float!
  ) {
    editQuyetDinhTSNT_TinhTP(
      quyetdinhtsnt_tinhtpInput: $quyetdinhtsnt_tinhtpInput
      MaTinhTP: $MaTinhTP
      MaQD: $MaQD
    ) {
      MaTinhTP
      MaQD
    }
  }
`;
export const MUTATION_deleteQuyetDinhTSNT_TinhTP = gql`
  mutation MUTATION_deleteQuyetDinhTSNT_TinhTP(
    $MaTinhTP: Float!
    $MaQD: Float!
  ) {
    deleteQuyetDinhTSNT_TinhTP(MaTinhTP: $MaTinhTP, MaQD: $MaQD) {
      MaTinhTP
      MaQD
    }
  }
`;
export const MUTATION_createKeHoachTSNT = gql`
  mutation MUTATION_createKeHoachTSNT($kehoachTSNTInput: KeHoachTSNTInput!) {
    createKeHoachTSNT(kehoachTSNTInput: $kehoachTSNTInput) {
      MaKH
      So
    }
  }
`;
export const MUTATION_editKeHoachTSNT = gql`
  mutation MUTATION_editKeHoachTSNT(
    $kehoachTSNTInput: KeHoachTSNTInput!
    $id: Float!
  ) {
    editKeHoachTSNT(kehoachTSNTInput: $kehoachTSNTInput, id: $id) {
      MaKH
      So
    }
  }
`;
export const MUTATION_deleteKeHoachTSNT = gql`
  mutation MUTATION_deleteKeHoachTSNT(
    $kehoachTSNTInput: KeHoachTSNTInput!
    $id: Float!
  ) {
    deleteKeHoachTSNT(kehoachTSNTInput: $kehoachTSNTInput, id: $id) {
      MaKH
      So
    }
  }
`;
export const MUTATION_createKeHoachTSNT_LLDB = gql`
  mutation MUTATION_createKeHoachTSNT_LLDB(
    $kehoachtsnt_lldbInput: KeHoachTSNT_LLDBInput!
  ) {
    createKeHoachTSNT_LLDB(kehoachtsnt_lldbInput: $kehoachtsnt_lldbInput) {
      MaLLDB
      MaKH
    }
  }
`;
export const MUTATION_editKeHoachTSNT_LLDB = gql`
  mutation MUTATION_editKeHoachTSNT_LLDB(
    $kehoachtsnt_lldbInput: KeHoachTSNT_LLDBInput!
    $MaLLDB: Float!
    $MaKH: Float!
  ) {
    editKeHoachTSNT_LLDB(
      kehoachtsnt_lldbInput: $kehoachtsnt_lldbInput
      MaLLDB: $MaLLDB
      MaKH: $MaKH
    ) {
      MaLLDB
      MaKH
    }
  }
`;
export const MUTATION_deleteKeHoachTSNT_LLDB = gql`
  mutation MUTATION_deleteKeHoachTSNT_LLDB($MaLLDB: Float!, $MaKH: Float!) {
    deleteKeHoachTSNT_LLDB(MaLLDB: $MaLLDB, MaKH: $MaKH) {
      MaLLDB
      MaKH
    }
  }
`;
export const MUTATION_createLucLuongThamGiaKH = gql`
  mutation MUTATION_createLucLuongThamGiaKH(
    $lucluongThamGiaKHInput: LucLuongThamGiaKHInput!
  ) {
    createLucLuongThamGiaKH(lucluongThamGiaKHInput: $lucluongThamGiaKHInput) {
      MaLLTGKH
      KeHoachTSNT {
        MaKH
        So
      }
      CBCS {
        MaCBCS
        HoTen
      }
    }
  }
`;
export const MUTATION_editLucLuongThamGiaKH = gql`
  mutation MUTATION_editLucLuongThamGiaKH(
    $lucluongThamGiaKHInput: LucLuongThamGiaKHInput!
    $id: Float!
  ) {
    editLucLuongThamGiaKH(
      lucluongThamGiaKHInput: $lucluongThamGiaKHInput
      id: $id
    ) {
      MaLLTGKH
      KeHoachTSNT {
        MaKH
        So
      }
      CBCS {
        MaCBCS
        HoTen
      }
    }
  }
`;
export const MUTATION_deleteLucLuongThamGiaKH = gql`
  mutation MUTATION_deleteLucLuongThamGiaKH($id: Float!) {
    deleteLucLuongThamGiaKH(id: $id) {
      MaLLTGKH
      KeHoachTSNT {
        MaKH
        So
      }
      CBCS {
        MaCBCS
        HoTen
      }
    }
  }
`;
export const MUTATION_createTramCT = gql`
  mutation MUTATION_createTramCT($tramCTInput: TramCTInput!) {
    createTramCT(tramCTInput: $tramCTInput) {
      MaTramCT
      DiaDiem
    }
  }
`;
export const MUTATION_editTramCT = gql`
  mutation MUTATION_editTramCT($tramCTInput: TramCTInput!, $id: Float!) {
    editTramCT(tramCTInput: $tramCTInput, id: $id) {
      MaTramCT
      DiaDiem
    }
  }
`;
export const MUTATION_deleteTramCT = gql`
  mutation MUTATION_deleteTramCT($tramCTInput: TramCTInput!, $id: Float!) {
    deleteTramCT(tramCTInput: $tramCTInput, id: $id) {
      MaTramCT
      DiaDiem
    }
  }
`;
export const MUTATION_createBienBanRKN = gql`
  mutation MUTATION_createBienBanRKN($bienbanRKNInput: BienBanRKNInput!) {
    createBienBanRKN(bienbanRKNInput: $bienbanRKNInput) {
      MaBBRKN
      Ngay
    }
  }
`;
export const MUTATION_editBienBanRKN = gql`
  mutation MUTATION_editBienBanRKN(
    $bienbanRKNInput: BienBanRKNInput!
    $id: Float!
  ) {
    editBienBanRKN(bienbanRKNInput: $bienbanRKNInput, id: $id) {
      MaBBRKN
      Ngay
    }
  }
`;
export const MUTATION_deleteBienBanRKN = gql`
  mutation MUTATION_deleteBienBanRKN(
    $bienbanRKNInput: BienBanRKNInput!
    $id: Float!
  ) {
    deleteBienBanRKN(bienbanRKNInput: $bienbanRKNInput, id: $id) {
      MaBBRKN
      Ngay
    }
  }
`;
export const MUTATION_createBaoCaoKQGH = gql`
  mutation MUTATION_createBaoCaoKQGH($baocaoKQGHInput: BaoCaoKQGHInput!) {
    createBaoCaoKQGH(baocaoKQGHInput: $baocaoKQGHInput) {
      MaBCKQGH
      Ngay
    }
  }
`;
export const MUTATION_editBaoCaoKQGH = gql`
  mutation MUTATION_editBaoCaoKQGH(
    $baocaoKQGHInput: BaoCaoKQGHInput!
    $id: Float!
  ) {
    editBaoCaoKQGH(baocaoKQGHInput: $baocaoKQGHInput, id: $id) {
      MaBCKQGH
      Ngay
    }
  }
`;
export const MUTATION_deleteBaoCaoKQGH = gql`
  mutation MUTATION_deleteBaoCaoKQGH(
    $baocaoKQGHInput: BaoCaoKQGHInput!
    $id: Float!
  ) {
    deleteBaoCaoKQGH(baocaoKQGHInput: $baocaoKQGHInput, id: $id) {
      MaBCKQGH
      Ngay
    }
  }
`;
// -----------------------------
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
