import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createTinhTP,
  MUTATION_editTinhTP,
  QUERY_tinhTPs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_TinhTP } from "./FormInitial";

const InputTinhTPStyled = styled.div`
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

export default function InputTinhTP() {
  const navigate = useNavigate();
  const { data: Data_tinhTPs, error } = useQuery(QUERY_tinhTPs, {
    variables: { utilsParams: {} },
  });
  const [createTinhTP] = useMutation(MUTATION_createTinhTP, {
    refetchQueries: [{ query: QUERY_tinhTPs, variables: { utilsParams: {} } }],
  });
  const [editTinhTP] = useMutation(MUTATION_editTinhTP, {
    refetchQueries: [{ query: QUERY_tinhTPs, variables: { utilsParams: {} } }],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [tinhTPs, set_tinhTPs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_TinhTP);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_tinhTPs(handleSearch("TinhTPs", Data_tinhTPs.tinhTPs, e.target.value));
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.TinhTP.trim() !== "") {
      if (statusEdit) {
        editTinhTP({
          variables: {
            tinhTPInput: {
              TinhTP: form.TinhTP,
              Cap: form.Cap,
            },
            id: form.MaTinhTP,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật tỉnh, thành phố "${data.editTinhTP.TinhTP}" thành công`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_TinhTP);
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        createTinhTP({
          variables: {
            tinhTPInput: {
              TinhTP: form.TinhTP,
              Cap: form.Cap,
            },
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới tỉnh, thành phố "${data.createTinhTP.TinhTP}" thành công`,
              "success"
            );
            setForm(FI_TinhTP);
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
        "Vui lòng nhập đúng, đầy đủ giá trị!",
        "warning"
      );
    }
  };

  const onEditData = (tinhTP: any) => {
    setStatusEdit(true);
    setForm({
      ...form,
      MaTinhTP: tinhTP.MaTinhTP,
      TinhTP: tinhTP.TinhTP,
      Cap: tinhTP.Cap,
    });
  };

  const onDeleteData = (tinhTP: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: tinhTP.TinhTP,
      Table: "TinhTPs",
      ID: tinhTP.MaTinhTP,
    });

  useEffect(() => {
    if (Data_tinhTPs) {
      set_tinhTPs(Data_tinhTPs.tinhTPs);
    }
  }, [Data_tinhTPs]);

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

  if (!Data_tinhTPs) return <Spinner />;
  return (
    <InputTinhTPStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách tỉnh, thành phố hiện có <b>({tinhTPs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh TinhTP..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">TinhTP</th>
                  <th scope="col">Cap</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...tinhTPs].reverse().map((tinhTP: any, ind: number) => (
                  <tr key={ind} title={`MaTinhTP: ${tinhTP.MaTinhTP}`}>
                    <td>{tinhTP.TinhTP}</td>
                    <td>{tinhTP.Cap}</td>
                    <td className="ip-ls-action">
                      <i
                        className="fa-solid fa-pen"
                        onClick={() => onEditData(tinhTP)}
                        title="Sửa"
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        data-bs-toggle="modal"
                        data-bs-target="#modalDeleteData"
                        onClick={() => onDeleteData(tinhTP)}
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
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} tỉnh, thành phố:</h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Tỉnh, thành phố (TinhTP):</label>
              <input
                required
                value={form.TinhTP ? form.TinhTP : ""}
                name="TinhTP"
                onChange={changeForm}
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Cấp:</label>
              <input
                value={form.Cap ? form.Cap : ""}
                name="Cap"
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
    </InputTinhTPStyled>
  );
}
