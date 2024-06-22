import { useMutation, useReactiveVar } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
    MUTATION_deleteCATTPvaTD,
    QUERY_caTTPvaTDs,
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

  const onDeleteData = () => {
    console.log(infoDeleteData);
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
              Hành động này không thể hoàn tác. Bạn chắc chắn muốn xóa
              <b> {infoDeleteData?.Title} </b>
              khỏi hệ thống cơ sở dữ liệu ?
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
