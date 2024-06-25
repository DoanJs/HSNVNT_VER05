import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createCapBac,
  MUTATION_editCapBac,
  QUERY_capbacs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";

const InputCapBacStyled = styled.div`
  .ip-ls-old {
    border-right: 1px solid green;
    b {
      color: red;
    }
    form {
      margin: 16px 0;
    }
    .ip-ls-old-content {
      max-height: 450px;
      overflow-y: scroll;
      .ip-ls-action {
        i {
          margin: 0 10px;
          cursor: pointer;
          color: red;
        }
        i:first-child {
          color: green;
        }
      }
    }
    .ip-ls-old-content::-webkit-scrollbar {
      background-color: #e4e6eb;
      width: 4px;
    }
    .ip-ls-old-content::-webkit-scrollbar-thumb {
      background-color: #007bff;
      border-radius: 10px;
    }
  }
`;

export default function InputCapBac() {
  const navigate = useNavigate();
  const { data: Data_capbacs, error } = useQuery(QUERY_capbacs, {
    variables: { utilsParams: {} },
  });
  const [createCapBac] = useMutation(MUTATION_createCapBac, {
    refetchQueries: [{ query: QUERY_capbacs, variables: { utilsParams: {} } }],
  });
  const [editCapBac] = useMutation(MUTATION_editCapBac, {
    refetchQueries: [{ query: QUERY_capbacs, variables: { utilsParams: {} } }],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [capbacs, set_capbacs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState({
    MaCB: 0,
    CapBac: "",
  });

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_capbacs(handleSearch("CapBacs", Data_capbacs.capbacs, e.target.value));
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.CapBac.trim() !== "") {
      if (statusEdit) {
        editCapBac({
          variables: {
            capBac: form.CapBac,
            id: form.MaCB,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật "${data.editCapBac.CapBac}" thành công`,
              "success"
            );
            setStatusEdit(false);
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        createCapBac({
          variables: {
            capBac: form.CapBac,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới "${data.createCapBac.CapBac}" thành công`,
              "success"
            );
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      }
    } else {
      showNotification(
        "Cảnh báo",
        "Vui lòng nhập đúng và đầy đủ giá trị!",
        "warning"
      );
    }
  };

  const onEditData = (capbac: any) => {
    setStatusEdit(true);
    setForm({
      ...form,
      MaCB: capbac.MaCB,
      CapBac: capbac.CapBac,
    });
  };

  const onDeleteData = (capbac: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: capbac.CapBac,
      Table: "CapBacs",
      ID: capbac.MaCB,
    });

  useEffect(() => {
    if (Data_capbacs) {
      set_capbacs(Data_capbacs.capbacs);
    }
  }, [Data_capbacs]);

  useEffect(() => {
    if (error) {
      showNotification(
        "Cảnh báo",
        "Hết phiên hoạt động. Vui lòng đăng nhập lại",
        "warning"
      );
      navigate("/dangnhap");
    }
    // eslint-disable-next-line
  }, [error]);

  if (!Data_capbacs) return <Spinner />;
  return (
    <InputCapBacStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách cấp bậc hiện có <b>({capbacs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh CapBac..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">CapBac</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...capbacs].reverse().map((capbac: any, ind: number) => (
                  <tr key={ind} title={`MaCB: ${capbac.MaCB}`}>
                    <td>{capbac.CapBac}</td>
                    <td className="ip-ls-action">
                      <i
                        className="fa-solid fa-pen"
                        onClick={() => onEditData(capbac)}
                        title="Sửa"
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        data-bs-toggle="modal"
                        data-bs-target="#modalDeleteData"
                        onClick={() => onDeleteData(capbac)}
                        title="Xóa"
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-6">
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} cấp bậc:</h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Cấp bậc (CapBac):</label>
              <input
                required
                value={form.CapBac ? form.CapBac : ""}
                name="CapBac"
                onChange={changeForm}
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <button
              type="submit"
              className={statusEdit ? "btn btn-primary" : "btn btn-success"}
            >
              {statusEdit ? "Cập nhật" : "Thêm mới"}
            </button>
          </form>
        </div>
      </div>

      <ModalDeleteData />
    </InputCapBacStyled>
  );
}
