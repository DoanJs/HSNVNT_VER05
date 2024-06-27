import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createCapCA,
  MUTATION_editCapCA,
  QUERY_capCAs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_CapCA } from "./FormInitial";

const InputCapCAStyled = styled.div`
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

export default function InputCapCA() {
  const navigate = useNavigate();
  const { data: Data_capCAs, error } = useQuery(QUERY_capCAs, {
    variables: { utilsParams: {} },
  });
  const [createCapCA] = useMutation(MUTATION_createCapCA, {
    refetchQueries: [{ query: QUERY_capCAs, variables: { utilsParams: {} } }],
  });
  const [editCapCA] = useMutation(MUTATION_editCapCA, {
    refetchQueries: [{ query: QUERY_capCAs, variables: { utilsParams: {} } }],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [capCAs, set_capCAs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_CapCA);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_capCAs(handleSearch("CapCAs", Data_capCAs.capCAs, e.target.value));
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.CapCA.trim() !== "") {
      if (statusEdit) {
        editCapCA({
          variables: {
            capCA: form.CapCA,
            id: form.MaCapCA,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật "${data.editCapCA.CapCA}" thành công`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_CapCA)
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        createCapCA({
          variables: {
            capCA: form.CapCA,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới "${data.createCapCA.CapCA}" thành công`,
              "success"
            );
            setForm(FI_CapCA)
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

  const onEditData = (capCA: any) => {
    setStatusEdit(true);
    setForm({
      ...form,
      MaCapCA: capCA.MaCapCA,
      CapCA: capCA.CapCA,
    });
  };

  const onDeleteData = (capCA: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: capCA.CapCA,
      Table: "CapCAs",
      ID: capCA.MaCapCA,
    });

  useEffect(() => {
    if (Data_capCAs) {
      set_capCAs(Data_capCAs.capCAs);
    }
  }, [Data_capCAs]);

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

  if (!Data_capCAs) return <Spinner />;
  return (
    <InputCapCAStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách cấp công an hiện có <b>({capCAs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh CapCA..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">CapCA</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...capCAs].reverse().map((capCA: any, ind: number) => (
                  <tr key={ind} title={`MaCapCA: ${capCA.MaCapCA}`}>
                    <td>{capCA.CapCA}</td>
                    <td className="ip-ls-action">
                      <i
                        className="fa-solid fa-pen"
                        onClick={() => onEditData(capCA)}
                        title="Sửa"
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        data-bs-toggle="modal"
                        data-bs-target="#modalDeleteData"
                        onClick={() => onDeleteData(capCA)}
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
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} cấp công an:</h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Cấp công an (CapBac):</label>
              <input
                required
                value={form.CapCA ? form.CapCA : ""}
                name="CapCA"
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
    </InputCapCAStyled>
  );
}
