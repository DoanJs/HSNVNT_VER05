import { useMutation, useReactiveVar } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_deleteBaoCaoKQGH,
  MUTATION_deleteBaoCaoKQGH_CBCS,
  MUTATION_deleteBaoCaoKQXMDiaChi,
  MUTATION_deleteBaoCaoKQXMQuanHe,
  MUTATION_deleteBaoCaoKTDN,
  MUTATION_deleteBaoCaoPHDC,
  MUTATION_deleteBaoCaoPHPT,
  MUTATION_deleteBaoCaoPHQH,
  MUTATION_deleteBaoCaoPHQH_CBCS,
  MUTATION_deleteBienBanRKN,
  MUTATION_deleteBienBanRKN_CBCS,
  MUTATION_deleteBienPhapDT,
  MUTATION_deleteBienPhapDT_DoiTuong,
  MUTATION_deleteCAQHvaTD,
  MUTATION_deleteCATTPvaTD,
  MUTATION_deleteCBCS,
  MUTATION_deleteCapBac,
  MUTATION_deleteCapCA,
  MUTATION_deleteChucVu,
  MUTATION_deleteChuyenAn,
  MUTATION_deleteDanToc,
  MUTATION_deleteDanhGiaTSTH,
  MUTATION_deleteDauMoiPH_DN,
  MUTATION_deleteDeNghiTSNT,
  MUTATION_deleteDeNghiTSNT_TinhTP,
  MUTATION_deleteDoi,
  MUTATION_deleteDoiTuong,
  MUTATION_deleteDoiTuongCA,
  MUTATION_deleteHinhThucHD,
  MUTATION_deleteKeHoachTSNT,
  MUTATION_deleteKeHoachTSNT_LLDB,
  MUTATION_deleteKetQuaTSNT,
  MUTATION_deleteKetQuaTSNT_TinhTP,
  MUTATION_deleteKetQuaXMDiaChi,
  MUTATION_deleteKetQuaXMQuanHe,
  MUTATION_deleteKyDuyet_DN,
  MUTATION_deleteLLDB,
  MUTATION_deleteLoaiDT,
  MUTATION_deleteLoaiLLDB,
  MUTATION_deleteLucLuongThamGiaKH,
  MUTATION_deleteQuocTich,
  MUTATION_deleteQuyetDinhTSNT,
  MUTATION_deleteQuyetDinhTSNT_TinhTP,
  MUTATION_deleteThanhVienBCA,
  MUTATION_deleteTinhChatDT,
  MUTATION_deleteTinhTP,
  MUTATION_deleteTonGiao,
  MUTATION_deleteTramCT,
  QUERY_baoCaoKTDNs,
  QUERY_baocaoKQGHs,
  QUERY_baocaoKQGHs_cbcss,
  QUERY_baocaoKQXMDiaChis,
  QUERY_baocaoKQXMQuanHes,
  QUERY_baocaoPHDCs,
  QUERY_baocaoPHPTs,
  QUERY_baocaoPHQHs,
  QUERY_baocaoPHQHs_cbcss,
  QUERY_bienBanRKNs,
  QUERY_bienBanRKNs_cbcss,
  QUERY_bienPhapDTs,
  QUERY_bienphapDTs_doituongs,
  QUERY_caQHvaTDs,
  QUERY_caTTPvaTDs,
  QUERY_capCAs,
  QUERY_capbacs,
  QUERY_cbcss,
  QUERY_chucvus,
  QUERY_chuyenans,
  QUERY_danhgiaTSTHs,
  QUERY_dantocs,
  QUERY_dauMoiPH_DNs,
  QUERY_denghiTSNTs,
  QUERY_denghiTSNTs_tinhTPs,
  QUERY_dois,
  QUERY_doituongCAs,
  QUERY_doituongs,
  QUERY_hinhthucHDs,
  QUERY_kehoachTSNTs,
  QUERY_kehoachTSNTs_lldbs,
  QUERY_ketQuaXMDiaChis,
  QUERY_ketQuaXMQuanHes,
  QUERY_ketquaTSNTs,
  QUERY_ketquaTSNTs_tinhTPs,
  QUERY_kyDuyet_DNs,
  QUERY_lldbs,
  QUERY_loaiDTs,
  QUERY_loaiLLDBs,
  QUERY_lucluongThamGiaKHs,
  QUERY_quocTichs,
  QUERY_quyetdinhTSNTs,
  QUERY_quyetdinhTSNTs_tinhTPs,
  QUERY_thanhvienBCAs,
  QUERY_tinhChatDTs,
  QUERY_tinhTPs,
  QUERY_tonGiaos,
  QUERY_tramCTs
} from "../../graphql/documentNode";
import { showNotification } from "../../utils/functions";

export default function ModalDeleteData() {
  const navigate = useNavigate();
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [deleteCATTPvaTD] = useMutation(MUTATION_deleteCATTPvaTD, {
    refetchQueries: [
      { query: QUERY_caTTPvaTDs, variables: { utilsParams: {} } },
    ],
  });
  const [deleteCAQHvaTD] = useMutation(MUTATION_deleteCAQHvaTD, {
    refetchQueries: [
      { query: QUERY_caQHvaTDs, variables: { utilsParams: {} } },
    ],
  });
  const [deleteChucVu] = useMutation(MUTATION_deleteChucVu, {
    refetchQueries: [{ query: QUERY_chucvus, variables: { utilsParams: {} } }],
  });
  const [deleteBienPhapDT] = useMutation(MUTATION_deleteBienPhapDT, {
    refetchQueries: [
      { query: QUERY_bienPhapDTs, variables: { utilsParams: {} } },
    ],
  });
  const [deleteCapBac] = useMutation(MUTATION_deleteCapBac, {
    refetchQueries: [{ query: QUERY_capbacs, variables: { utilsParams: {} } }],
  });
  const [deleteCapCA] = useMutation(MUTATION_deleteCapCA, {
    refetchQueries: [{ query: QUERY_capCAs, variables: { utilsParams: {} } }],
  });
  const [deleteDanToc] = useMutation(MUTATION_deleteDanToc, {
    refetchQueries: [{ query: QUERY_dantocs, variables: { utilsParams: {} } }],
  });
  const [deleteHinhThucHD] = useMutation(MUTATION_deleteHinhThucHD, {
    refetchQueries: [
      { query: QUERY_hinhthucHDs, variables: { utilsParams: {} } },
    ],
  });
  const [deleteLoaiLLDB] = useMutation(MUTATION_deleteLoaiLLDB, {
    refetchQueries: [
      { query: QUERY_loaiLLDBs, variables: { utilsParams: {} } },
    ],
  });
  const [deleteLoaiDT] = useMutation(MUTATION_deleteLoaiDT, {
    refetchQueries: [{ query: QUERY_loaiDTs, variables: { utilsParams: {} } }],
  });
  const [deleteLLDB] = useMutation(MUTATION_deleteLLDB, {
    refetchQueries: [{ query: QUERY_lldbs, variables: { utilsParams: {} } }],
  });
  const [deleteQuocTich] = useMutation(MUTATION_deleteQuocTich, {
    refetchQueries: [
      { query: QUERY_quocTichs, variables: { utilsParams: {} } },
    ],
  });
  const [deleteTinhChatDT] = useMutation(MUTATION_deleteTinhChatDT, {
    refetchQueries: [
      { query: QUERY_tinhChatDTs, variables: { utilsParams: {} } },
    ],
  });
  const [deleteTonGiao] = useMutation(MUTATION_deleteTonGiao, {
    refetchQueries: [{ query: QUERY_tonGiaos, variables: { utilsParams: {} } }],
  });
  const [deleteTinhTP] = useMutation(MUTATION_deleteTinhTP, {
    refetchQueries: [{ query: QUERY_tinhTPs, variables: { utilsParams: {} } }],
  });
  const [deleteDoi] = useMutation(MUTATION_deleteDoi, {
    refetchQueries: [{ query: QUERY_dois, variables: { utilsParams: {} } }],
  });
  const [deleteCBCS] = useMutation(MUTATION_deleteCBCS, {
    refetchQueries: [{ query: QUERY_cbcss, variables: { utilsParams: {} } }],
  });
  const [deleteDoiTuong] = useMutation(MUTATION_deleteDoiTuong, {
    refetchQueries: [
      { query: QUERY_doituongs, variables: { utilsParams: {} } },
    ],
  });
  const [deleteBienPhapDT_DoiTuong] = useMutation(
    MUTATION_deleteBienPhapDT_DoiTuong,
    {
      refetchQueries: [
        { query: QUERY_bienphapDTs_doituongs, variables: { utilsParams: {} } },
        { query: QUERY_doituongs, variables: { utilsParams: {} } },
      ],
    }
  );
  const [deleteDeNghiTSNT] = useMutation(MUTATION_deleteDeNghiTSNT, {
    refetchQueries: [
      { query: QUERY_denghiTSNTs, variables: { utilsParams: {} } },
    ],
  });
  const [deleteDeNghiTSNT_TinhTP] = useMutation(
    MUTATION_deleteDeNghiTSNT_TinhTP,
    {
      refetchQueries: [
        { query: QUERY_denghiTSNTs_tinhTPs, variables: { utilsParams: {} } },
        { query: QUERY_denghiTSNTs, variables: { utilsParams: {} } },
      ],
    }
  );
  const [deleteDauMoiPH_DN] = useMutation(MUTATION_deleteDauMoiPH_DN, {
    refetchQueries: [
      { query: QUERY_dauMoiPH_DNs, variables: { utilsParams: {} } },
    ],
  });
  const [deleteKyDuyet_DN] = useMutation(MUTATION_deleteKyDuyet_DN, {
    refetchQueries: [
      { query: QUERY_kyDuyet_DNs, variables: { utilsParams: {} } },
    ],
  });
  const [deleteQuyetDinhTSNT] = useMutation(MUTATION_deleteQuyetDinhTSNT, {
    refetchQueries: [
      { query: QUERY_quyetdinhTSNTs, variables: { utilsParams: {} } },
    ],
  });
  const [deleteQuyetDinhTSNT_TinhTP] = useMutation(
    MUTATION_deleteQuyetDinhTSNT_TinhTP,
    {
      refetchQueries: [
        { query: QUERY_quyetdinhTSNTs_tinhTPs, variables: { utilsParams: {} } },
        { query: QUERY_quyetdinhTSNTs, variables: { utilsParams: {} } },
      ],
    }
  );
  const [deleteKeHoachTSNT] = useMutation(MUTATION_deleteKeHoachTSNT, {
    refetchQueries: [
      { query: QUERY_kehoachTSNTs, variables: { utilsParams: {} } },
    ],
  });
  const [deleteKeHoachTSNT_LLDB] = useMutation(
    MUTATION_deleteKeHoachTSNT_LLDB,
    {
      refetchQueries: [
        { query: QUERY_kehoachTSNTs, variables: { utilsParams: {} } },
        { query: QUERY_kehoachTSNTs_lldbs, variables: { utilsParams: {} } },
      ],
    }
  );
  const [deleteLucLuongThamGiaKH] = useMutation(
    MUTATION_deleteLucLuongThamGiaKH,
    {
      refetchQueries: [
        { query: QUERY_lucluongThamGiaKHs, variables: { utilsParams: {} } },
      ],
    }
  );
  const [deleteTramCT] = useMutation(MUTATION_deleteTramCT, {
    refetchQueries: [{ query: QUERY_tramCTs, variables: { utilsParams: {} } }],
  });
  const [deleteBienBanRKN] = useMutation(MUTATION_deleteBienBanRKN, {
    refetchQueries: [
      { query: QUERY_bienBanRKNs, variables: { utilsParams: {} } },
    ],
  });
  const [deleteBienBanRKN_CBCS] = useMutation(MUTATION_deleteBienBanRKN_CBCS, {
    refetchQueries: [
      { query: QUERY_bienBanRKNs_cbcss, variables: { utilsParams: {} } },
      { query: QUERY_bienBanRKNs, variables: { utilsParams: {} } },
    ],
  });
  const [deleteBaoCaoKQGH] = useMutation(MUTATION_deleteBaoCaoKQGH, {
    refetchQueries: [
      { query: QUERY_baocaoKQGHs, variables: { utilsParams: {} } },
    ],
  });
  const [deleteBaoCaoKQGH_CBCS] = useMutation(MUTATION_deleteBaoCaoKQGH_CBCS, {
    refetchQueries: [
      { query: QUERY_baocaoKQGHs, variables: { utilsParams: {} } },
      { query: QUERY_baocaoKQGHs_cbcss, variables: { utilsParams: {} } },
    ],
  });
  const [deleteBaoCaoKQXMQuanHe] = useMutation(
    MUTATION_deleteBaoCaoKQXMQuanHe,
    {
      refetchQueries: [
        { query: QUERY_baocaoKQXMQuanHes, variables: { utilsParams: {} } },
      ],
    }
  );
  const [deleteBaoCaoKQXMDiaChi] = useMutation(
    MUTATION_deleteBaoCaoKQXMDiaChi,
    {
      refetchQueries: [
        { query: QUERY_baocaoKQXMDiaChis, variables: { utilsParams: {} } },
      ],
    }
  );
  const [deleteBaoCaoKTDN] = useMutation(MUTATION_deleteBaoCaoKTDN, {
    refetchQueries: [
      { query: QUERY_baoCaoKTDNs, variables: { utilsParams: {} } },
    ],
  });
  const [deleteBaoCaoPHQH] = useMutation(MUTATION_deleteBaoCaoPHQH, {
    refetchQueries: [
      { query: QUERY_baocaoPHQHs, variables: { utilsParams: {} } },
    ],
  });
  const [deleteBaoCaoPHQH_CBCS] = useMutation(MUTATION_deleteBaoCaoPHQH_CBCS, {
    refetchQueries: [
      { query: QUERY_baocaoPHQHs, variables: { utilsParams: {} } },
      { query: QUERY_baocaoPHQHs_cbcss, variables: { utilsParams: {} } },
    ],
  });
  const [deleteKetQuaTSNT] = useMutation(MUTATION_deleteKetQuaTSNT, {
    refetchQueries: [
      { query: QUERY_ketquaTSNTs, variables: { utilsParams: {} } },
    ],
  });
  const [deleteKetQuaTSNT_TinhTP] = useMutation(
    MUTATION_deleteKetQuaTSNT_TinhTP,
    {
      refetchQueries: [
        { query: QUERY_ketquaTSNTs, variables: { utilsParams: {} } },
        { query: QUERY_ketquaTSNTs_tinhTPs, variables: { utilsParams: {} } },
      ],
    }
  );
  const [deleteKetQuaXMQuanHe] = useMutation(
    MUTATION_deleteKetQuaXMQuanHe,
    {
      refetchQueries: [
        { query: QUERY_ketQuaXMQuanHes, variables: { utilsParams: {} } },
      ],
    }
  );
  const [deleteKetQuaXMDiaChi] = useMutation(
    MUTATION_deleteKetQuaXMDiaChi,
    {
      refetchQueries: [
        { query: QUERY_ketQuaXMDiaChis, variables: { utilsParams: {} } },
      ],
    }
  );
  const [deleteBaoCaoPHPT] = useMutation(
    MUTATION_deleteBaoCaoPHPT,
    {
      refetchQueries: [
        { query: QUERY_baocaoPHPTs, variables: { utilsParams: {} } },
      ],
    }
  );
  const [deleteBaoCaoPHDC] = useMutation(
    MUTATION_deleteBaoCaoPHDC,
    {
      refetchQueries: [
        { query: QUERY_baocaoPHDCs, variables: { utilsParams: {} } },
      ],
    }
  );
  const [deleteDanhGiaTSTH] = useMutation(
    MUTATION_deleteDanhGiaTSTH,
    {
      refetchQueries: [
        { query: QUERY_danhgiaTSTHs, variables: { utilsParams: {} } },
      ],
    }
  );
  const [deleteChuyenAn] = useMutation(
    MUTATION_deleteChuyenAn,
    {
      refetchQueries: [
        { query: QUERY_chuyenans, variables: { utilsParams: {} } },
      ],
    }
  );
  const [deleteDoiTuongCA] = useMutation(
    MUTATION_deleteDoiTuongCA,
    {
      refetchQueries: [
        { query: QUERY_doituongCAs, variables: { utilsParams: {} } },
      ],
    }
  );
  const [deleteThanhVienBCA] = useMutation(
    MUTATION_deleteThanhVienBCA,
    {
      refetchQueries: [
        { query: QUERY_thanhvienBCAs, variables: { utilsParams: {} } },
      ],
    }
  );

  const onMutationSuccess = () =>
    showNotification(
      "Chúc mừng",
      `Xóa "${infoDeleteData.Title}" thành công!`,
      "success"
    );
  const onMutationError = () => {
    showNotification(
      "Lỗi!",
      "Dữ liệu có liên kết đến bảng khác hoặc bạn không có quyền này. Hành động xóa bị lỗi, vui lòng kiểm tra lại!",
      "danger"
    );
    navigate("/dangnhap");
  };

  const onDeleteData = () => {
    switch (infoDeleteData.Table) {
      case "CATTPvaTDs":
        deleteCATTPvaTD({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "CAQHvaTDs":
        deleteCAQHvaTD({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "ChucVus":
        deleteChucVu({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "BienPhapDTs":
        deleteBienPhapDT({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "CapBacs":
        deleteCapBac({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "CapCAs":
        deleteCapCA({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "DanTocs":
        deleteDanToc({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "HinhThucHDs":
        deleteHinhThucHD({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "LoaiLLDBs":
        deleteLoaiLLDB({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "LoaiDTs":
        deleteLoaiDT({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "LLDBs":
        deleteLLDB({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "QuocTichs":
        deleteQuocTich({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "TinhChatDTs":
        deleteTinhChatDT({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "TonGiaos":
        deleteTonGiao({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "TinhTPs":
        deleteTinhTP({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "Dois":
        deleteDoi({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "CBCSs":
        deleteCBCS({
          variables: {
            cbcsInput: infoDeleteData.Form,
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "DoiTuongs":
        deleteDoiTuong({
          variables: {
            doituongInput: infoDeleteData.Form,
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "BienPhapDTs_DoiTuongs":
        deleteBienPhapDT_DoiTuong({
          variables: {
            MaBPDT: infoDeleteData.Form.MaBPDT,
            MaDoiTuong: infoDeleteData.Form.MaDoiTuong,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "DeNghiTSNTs":
        deleteDeNghiTSNT({
          variables: {
            denghiTSNTInput: infoDeleteData.Form,
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "DeNghiTSNTs_TinhTPs":
        deleteDeNghiTSNT_TinhTP({
          variables: {
            MaTinhTP: infoDeleteData.Form.MaTinhTP,
            MaDN: infoDeleteData.Form.MaDN,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "DauMoiPH_DNs":
        deleteDauMoiPH_DN({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "KyDuyet_DNs":
        deleteKyDuyet_DN({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "QuyetDinhTSNTs":
        deleteQuyetDinhTSNT({
          variables: {
            quyetdinhTSNTInput: infoDeleteData.Form,
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "QuyetDinhTSNTs_TinhTPs":
        deleteQuyetDinhTSNT_TinhTP({
          variables: {
            MaTinhTP: infoDeleteData.Form.MaTinhTP,
            MaQD: infoDeleteData.Form.MaQD,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "KeHoachTSNTs":
        deleteKeHoachTSNT({
          variables: {
            kehoachTSNTInput: infoDeleteData.Form,
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "KeHoachTSNTs_LLDBs":
        deleteKeHoachTSNT_LLDB({
          variables: {
            MaLLDB: infoDeleteData.Form.MaLLDB,
            MaKH: infoDeleteData.Form.MaKH,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "LucLuongThamGiaKHs":
        deleteLucLuongThamGiaKH({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "TramCTs":
        deleteTramCT({
          variables: {
            tramCTInput: infoDeleteData.Form,
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "BienBanRKNs":
        deleteBienBanRKN({
          variables: {
            bienbanRKNInput: infoDeleteData.Form,
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "BienBanRKNs_CBCSs":
        deleteBienBanRKN_CBCS({
          variables: {
            MaBBRKN: infoDeleteData.Form.MaBBRKN,
            MaCBCS: infoDeleteData.Form.MaCBCS,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "BaoCaoKQGHs":
        deleteBaoCaoKQGH({
          variables: {
            baocaoKQGHInput: infoDeleteData.Form,
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "BaoCaoKQGHs_CBCSs":
        deleteBaoCaoKQGH_CBCS({
          variables: {
            MaBCKQGH: infoDeleteData.Form.MaBCKQGH,
            MaCBCS: infoDeleteData.Form.MaCBCS,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "BaoCaoKQXMQuanHes":
        deleteBaoCaoKQXMQuanHe({
          variables: {
            baocaoKQXMQuanHeInput: infoDeleteData.Form,
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "BaoCaoKQXMDiaChis":
        deleteBaoCaoKQXMDiaChi({
          variables: {
            baocaoKQXMDiaChiInput: infoDeleteData.Form,
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "BaoCaoKTDNs":
        deleteBaoCaoKTDN({
          variables: {
            baocaoKTDNInput: infoDeleteData.Form,
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "BaoCaoPHQHs":
        deleteBaoCaoPHQH({
          variables: {
            baocaoPHQHInput: infoDeleteData.Form,
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "BaoCaoPHQHs_CBCSs":
        deleteBaoCaoPHQH_CBCS({
          variables: {
            MaBCPHQH: infoDeleteData.Form.MaBCPHQH,
            MaCBCS: infoDeleteData.Form.MaCBCS,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "KetQuaTSNTs":
        deleteKetQuaTSNT({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "KetQuaTSNTs_TinhTPs":
        deleteKetQuaTSNT_TinhTP({
          variables: {
            MaKQ: infoDeleteData.Form.MaKQ,
            MaTinhTP: infoDeleteData.Form.MaTinhTP,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "KetQuaXMQuanHes":
        deleteKetQuaXMQuanHe({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "KetQuaXMDiaChis":
        deleteKetQuaXMDiaChi({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "BaoCaoPHPTs":
        deleteBaoCaoPHPT({
          variables: {
            baocaoPHPTInput: infoDeleteData.Form,
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "DanhGiaTSTHs":
        deleteDanhGiaTSTH({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "BaoCaoPHDCs":
        deleteBaoCaoPHDC({
          variables: {
            baocaoPHDCInput: infoDeleteData.Form,
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "ChuyenAns":
        deleteChuyenAn({
          variables: {
            chuyenanInput: infoDeleteData.Form,
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "DoiTuongCAs":
        deleteDoiTuongCA({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      case "ThanhVienBCAs":
        deleteThanhVienBCA({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => onMutationSuccess(),
          onError: () => onMutationError(),
        });
        break;
      default:
        break;
    }
  };
  return (
    <div
      className="modal fade"
      id="modalDeleteData"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Xóa dữ liệu
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <h6>
              Hành động này không thể hoàn tác. Bạn chắc chắn muốn xóa dữ liệu "
              <b> {infoDeleteData?.Title} </b>" khỏi hệ thống cơ sở dữ liệu ?
            </h6>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Hủy
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={onDeleteData}
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
