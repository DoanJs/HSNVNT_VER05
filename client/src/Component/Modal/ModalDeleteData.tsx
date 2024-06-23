import { useMutation, useReactiveVar } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_deleteBienPhapDT,
  MUTATION_deleteCapBac,
  MUTATION_deleteCapCA,
  MUTATION_deleteCAQHvaTD,
  MUTATION_deleteCATTPvaTD,
  MUTATION_deleteChucVu,
  MUTATION_deleteDanToc,
  MUTATION_deleteDDNB,
  MUTATION_deleteDoi,
  MUTATION_deleteHinhThucHD,
  MUTATION_deleteLLDB,
  MUTATION_deleteLoaiDT,
  MUTATION_deleteLoaiLLDB,
  MUTATION_deleteQuocTich,
  MUTATION_deleteTinhChatDT,
  MUTATION_deleteTinhTP,
  MUTATION_deleteTonGiao,
  QUERY_bienPhapDTs,
  QUERY_capbacs,
  QUERY_capCAs,
  QUERY_caQHvaTDs,
  QUERY_caTTPvaTDs,
  QUERY_chucvus,
  QUERY_dantocs,
  QUERY_ddnbs,
  QUERY_dois,
  QUERY_hinhthucHDs,
  QUERY_lldbs,
  QUERY_loaiDTs,
  QUERY_loaiLLDBs,
  QUERY_quocTichs,
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
