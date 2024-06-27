import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createLoaiLLDB,
  MUTATION_editLoaiLLDB,
  QUERY_loaiLLDBs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_LoaiLLDB } from "./FormInitial";

const InputLoaiLLDBStyled = styled.div`
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

export default function InputLoaiLLDB() {
  const navigate = useNavigate();
  const { data: Data_loaiLLDBs, error } = useQuery(QUERY_loaiLLDBs, {
    variables: { utilsParams: {} },
  });
  const [createLoaiLLDB] = useMutation(MUTATION_createLoaiLLDB, {
    refetchQueries: [
      { query: QUERY_loaiLLDBs, variables: { utilsParams: {} } },
    ],
  });
  const [editLoaiLLDB] = useMutation(MUTATION_editLoaiLLDB, {
    refetchQueries: [
      { query: QUERY_loaiLLDBs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [loaiLLDBs, set_loaiLLDBs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_LoaiLLDB);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_loaiLLDBs(
      handleSearch("LoaiLLDBs", Data_loaiLLDBs.loaiLLDBs, e.target.value)
    );
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.TenLLDB.trim() !== "") {
      if (statusEdit) {
        editLoaiLLDB({
          variables: {
            loaiLLDBInput: {
              TenLLDB: form.TenLLDB,
              KyHieu: form.KyHieu,
            },
            id: form.MaLoaiLLDB,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật "${data.editLoaiLLDB.TenLLDB}" thành công`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_LoaiLLDB)
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        createLoaiLLDB({
          variables: {
            loaiLLDBInput: {
              TenLLDB: form.TenLLDB,
              KyHieu: form.KyHieu,
            },
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới "${data.createLoaiLLDB.TenLLDB}" thành công`,
              "success"
            );
            setForm(FI_LoaiLLDB)
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

  const onEditData = (loaiLLDB: any) => {
    setStatusEdit(true);
    setForm({
      ...form,
      MaLoaiLLDB: loaiLLDB.MaLoaiLLDB,
      TenLLDB: loaiLLDB.TenLLDB,
      KyHieu: loaiLLDB.KyHieu,
    });
  };

  const onDeleteData = (loaiLLDB: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: loaiLLDB.TenLLDB,
      Table: "LoaiLLDBs",
      ID: loaiLLDB.MaLoaiLLDB,
    });

  useEffect(() => {
    if (Data_loaiLLDBs) {
      set_loaiLLDBs(Data_loaiLLDBs.loaiLLDBs);
    }
  }, [Data_loaiLLDBs]);

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

  if (!Data_loaiLLDBs) return <Spinner />;
  return (
    <InputLoaiLLDBStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách loại lực lượng đặc biệt hiện có{" "}
            <b>({loaiLLDBs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh TenLLDB..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">TenLLDB</th>
                  <th scope="col">KyHieu</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...loaiLLDBs].reverse().map((loaiLLDB: any, ind: number) => (
                  <tr key={ind} title={`MaLoaiLLDB: ${loaiLLDB.MaLoaiLLDB}`}>
                    <td>{loaiLLDB.TenLLDB}</td>
                    <td>{loaiLLDB.KyHieu}</td>
                    <td className="ip-ls-action">
                      <i
                        className="fa-solid fa-pen"
                        onClick={() => onEditData(loaiLLDB)}
                        title="Sửa"
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        data-bs-toggle="modal"
                        data-bs-target="#modalDeleteData"
                        onClick={() => onDeleteData(loaiLLDB)}
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
          <h5>
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} loại lực lượng đặc biệt:
          </h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">
                Loại lực lượng đặc biệt (TenLLDB):
              </label>
              <input
                required
                value={form.TenLLDB ? form.TenLLDB : ""}
                name="TenLLDB"
                onChange={changeForm}
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ký hiệu:</label>
              <input
                value={form.KyHieu ? form.KyHieu : ""}
                name="KyHieu"
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
    </InputLoaiLLDBStyled>
  );
}
