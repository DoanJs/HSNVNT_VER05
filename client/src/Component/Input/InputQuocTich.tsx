import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createQuocTich,
  MUTATION_editQuocTich,
  QUERY_quocTichs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";

const InputQuocTichStyled = styled.div`
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

export default function InputQuocTich() {
  const navigate = useNavigate();
  const { data: Data_quocTichs, error } = useQuery(QUERY_quocTichs, {
    variables: { utilsParams: {} },
  });
  const [createQuocTich] = useMutation(MUTATION_createQuocTich, {
    refetchQueries: [
      { query: QUERY_quocTichs, variables: { utilsParams: {} } },
    ],
  });
  const [editQuocTich] = useMutation(MUTATION_editQuocTich, {
    refetchQueries: [
      { query: QUERY_quocTichs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [quocTichs, set_quocTichs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState({
    MaQT: 0,
    TenQT: "",
  });

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_quocTichs(
      handleSearch("QuocTichs", Data_quocTichs.quocTichs, e.target.value)
    );
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.TenQT.trim() !== "") {
      if (statusEdit) {
        editQuocTich({
          variables: {
            tenQT: form.TenQT,
            id: form.MaQT,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật "${data.editQuocTich.TenQT}" thành công`,
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
        createQuocTich({
          variables: {
            tenQT: form.TenQT,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới "${data.createQuocTich.TenQT}" thành công`,
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

  const onEditData = (quoctich: any) => {
    setStatusEdit(true);
    setForm({
      ...form,
      MaQT: quoctich.MaQT,
      TenQT: quoctich.TenQT,
    });
  };

  const onDeleteData = (quoctich: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: quoctich.TenQT,
      Table: "QuocTichs",
      ID: quoctich.MaQT,
    });

  useEffect(() => {
    if (Data_quocTichs) {
      set_quocTichs(Data_quocTichs.quocTichs);
    }
  }, [Data_quocTichs]);

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

  if (!Data_quocTichs) return <Spinner />;
  return (
    <InputQuocTichStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách quốc tịch hiện có <b>({quocTichs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh QuocTich..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">TenQT</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...quocTichs].reverse().map((quoctich: any, ind: number) => (
                  <tr key={ind} title={`MaQT: ${quoctich.MaQT}`}>
                    <td>{quoctich.TenQT}</td>
                    <td className="ip-ls-action">
                      <i
                        className="fa-solid fa-pen"
                        onClick={() => onEditData(quoctich)}
                        title="Sửa"
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        data-bs-toggle="modal"
                        data-bs-target="#modalDeleteData"
                        onClick={() => onDeleteData(quoctich)}
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
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} quốc tịch:</h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Quốc tịch (QuocTich):</label>
              <input
                required
                value={form.TenQT ? form.TenQT : ""}
                name="TenQT"
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
    </InputQuocTichStyled>
  );
}
