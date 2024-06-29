import { useMutation, useReactiveVar } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_deleteBienPhapDT,
  MUTATION_deleteBienPhapDT_DoiTuong,
  MUTATION_deleteCAQHvaTD,
  MUTATION_deleteCATTPvaTD,
  MUTATION_deleteCBCS,
  MUTATION_deleteCapBac,
  MUTATION_deleteCapCA,
  MUTATION_deleteChucVu,
  MUTATION_deleteDDNB,
  MUTATION_deleteDanToc,
  MUTATION_deleteDauMoiPH_DN,
  MUTATION_deleteDeNghiTSNT,
  MUTATION_deleteDeNghiTSNT_TinhTP,
  MUTATION_deleteDoi,
  MUTATION_deleteDoiTuong,
  MUTATION_deleteHinhThucHD,
  MUTATION_deleteKeHoachTSNT,
  MUTATION_deleteKyDuyet_DN,
  MUTATION_deleteLLDB,
  MUTATION_deleteLoaiDT,
  MUTATION_deleteLoaiLLDB,
  MUTATION_deleteQuocTich,
  MUTATION_deleteQuyetDinhTSNT,
  MUTATION_deleteQuyetDinhTSNT_TinhTP,
  MUTATION_deleteTinhChatDT,
  MUTATION_deleteTinhTP,
  MUTATION_deleteTonGiao,
  QUERY_bienPhapDTs,
  QUERY_bienphapDTs_doituongs,
  QUERY_caQHvaTDs,
  QUERY_caTTPvaTDs,
  QUERY_capCAs,
  QUERY_capbacs,
  QUERY_cbcss,
  QUERY_chucvus,
  QUERY_dantocs,
  QUERY_dauMoiPH_DNs,
  QUERY_ddnbs,
  QUERY_denghiTSNTs,
  QUERY_denghiTSNTs_tinhTPs,
  QUERY_dois,
  QUERY_doituongs,
  QUERY_hinhthucHDs,
  QUERY_kehoachTSNTs,
  QUERY_kyDuyet_DNs,
  QUERY_lldbs,
  QUERY_loaiDTs,
  QUERY_loaiLLDBs,
  QUERY_quocTichs,
  QUERY_quyetdinhTSNTs,
  QUERY_quyetdinhTSNTs_tinhTPs,
  QUERY_tinhChatDTs,
  QUERY_tinhTPs,
  QUERY_tonGiaos,
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
  const [deleteDDNB] = useMutation(MUTATION_deleteDDNB, {
    refetchQueries: [{ query: QUERY_ddnbs, variables: { utilsParams: {} } }],
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

  const onMutationSuccess = () =>
    showNotification(
      "Chúc mừng",
      `Xóa "${infoDeleteData.Title}" thành công`,
      "success"
    );
  const onMutationError = () => {
    showNotification(
      "Lỗi!",
      "Dữ liệu có liên kết đến bảng khác. Hành động xóa bị lỗi, vui lòng kiểm tra lại!",
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
      case "DDNBs":
        deleteDDNB({
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
