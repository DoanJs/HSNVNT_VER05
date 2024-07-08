import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createChucVu,
  MUTATION_editChucVu,
  QUERY_chucvus,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_ChucVu } from "./FormInitial";

const InputChucVuStyled = styled.div`
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

export default function InputChucVu() {
  const navigate = useNavigate();
  const { data: Data_chucvus, error } = useQuery(QUERY_chucvus, {
    variables: { utilsParams: {} },
  });
  const [createChucVu] = useMutation(MUTATION_createChucVu, {
    refetchQueries: [{ query: QUERY_chucvus, variables: { utilsParams: {} } }],
  });
  const [editChucVu] = useMutation(MUTATION_editChucVu, {
    refetchQueries: [{ query: QUERY_chucvus, variables: { utilsParams: {} } }],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [chucvus, set_chucvus] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_ChucVu);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_chucvus(handleSearch("ChucVus", Data_chucvus.chucvus, e.target.value));
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.ChucVu.trim() !== "") {
      if (statusEdit) {
        editChucVu({
          variables: {
            chucVu: form.ChucVu,
            id: form.MaCV,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật chức vụ "${data.editChucVu.ChucVu}" thành công`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_ChucVu)
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        createChucVu({
          variables: {
            chucVu: form.ChucVu,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới chức vụ "${data.createChucVu.ChucVu}" thành công`,
              "success"
            );
            setForm(FI_ChucVu)
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

  const onEditData = (chucvu: any) => {
    setStatusEdit(true);
    setForm({
      ...form,
      MaCV: chucvu.MaCV,
      ChucVu: chucvu.ChucVu,
    });
  };

  const onDeleteData = (chucvu: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: chucvu.ChucVu,
      Table: "ChucVus",
      ID: chucvu.MaCV,
    });

  useEffect(() => {
    if (Data_chucvus) {
      set_chucvus(Data_chucvus.chucvus);
    }
  }, [Data_chucvus]);

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

  if (!Data_chucvus) return <Spinner />;
  return (
    <InputChucVuStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách chức vụ hiện có <b>({chucvus.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh ChucVu..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">ChucVu</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...chucvus].reverse().map((chucvu: any, ind: number) => (
                  <tr key={ind} title={`MaCV: ${chucvu.MaCV}`}>
                    <td>{chucvu.ChucVu}</td>
                    <td className="ip-ls-action">
                      <i
                        className="fa-solid fa-pen"
                        onClick={() => onEditData(chucvu)}
                        title="Sửa"
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        data-bs-toggle="modal"
                        data-bs-target="#modalDeleteData"
                        onClick={() => onDeleteData(chucvu)}
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
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} chức vụ:</h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Chức vụ (ChucVu):</label>
              <input
                required
                value={form.ChucVu ? form.ChucVu : ""}
                name="ChucVu"
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
    </InputChucVuStyled>
  );
}
