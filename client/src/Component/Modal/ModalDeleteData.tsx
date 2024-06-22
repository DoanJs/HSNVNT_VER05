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
  QUERY_bienPhapDTs,
  QUERY_capbacs,
  QUERY_capCAs,
  QUERY_caQHvaTDs,
  QUERY_caTTPvaTDs,
  QUERY_chucvus,
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

  const onDeleteData = () => {
    switch (infoDeleteData.Table) {
      case "CATTPvaTDs":
        deleteCATTPvaTD({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => {
            showNotification(
              "Chúc mừng",
              `Xóa "${infoDeleteData.Title}" thành công`,
              "success"
            );
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
        break;
      case "CAQHvaTDs":
        deleteCAQHvaTD({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => {
            showNotification(
              "Chúc mừng",
              `Xóa "${infoDeleteData.Title}" thành công`,
              "success"
            );
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
        break;
      case "ChucVus":
        deleteChucVu({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => {
            showNotification(
              "Chúc mừng",
              `Xóa "${infoDeleteData.Title}" thành công`,
              "success"
            );
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
        break;
      case "BienPhapDTs":
        deleteBienPhapDT({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => {
            showNotification(
              "Chúc mừng",
              `Xóa "${infoDeleteData.Title}" thành công`,
              "success"
            );
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
        break;
      case "CapBacs":
        deleteCapBac({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => {
            showNotification(
              "Chúc mừng",
              `Xóa "${infoDeleteData.Title}" thành công`,
              "success"
            );
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
        break;
      case "CapCAs":
        deleteCapCA({
          variables: {
            id: infoDeleteData.ID,
          },
          onCompleted: () => {
            showNotification(
              "Chúc mừng",
              `Xóa "${infoDeleteData.Title}" thành công`,
              "success"
            );
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
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
