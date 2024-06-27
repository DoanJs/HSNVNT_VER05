import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createLoaiDT,
  MUTATION_editLoaiDT,
  QUERY_loaiDTs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_LoaiDT } from "./FormInitial";

const InputLoaiDTStyled = styled.div`
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

export default function InputLoaiDT() {
  const navigate = useNavigate();
  const { data: Data_loaiDTs, error } = useQuery(QUERY_loaiDTs, {
    variables: { utilsParams: {} },
  });
  const [createLoaiDT] = useMutation(MUTATION_createLoaiDT, {
    refetchQueries: [{ query: QUERY_loaiDTs, variables: { utilsParams: {} } }],
  });
  const [editLoaiDT] = useMutation(MUTATION_editLoaiDT, {
    refetchQueries: [{ query: QUERY_loaiDTs, variables: { utilsParams: {} } }],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [loaiDTs, set_loaiDTs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_LoaiDT);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_loaiDTs(handleSearch("LoaiDTs", Data_loaiDTs.loaiDTs, e.target.value));
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.LoaiDT.trim() !== "") {
      if (statusEdit) {
        editLoaiDT({
          variables: {
            loaiDT: form.LoaiDT,
            id: form.MaLoaiDT,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật "${data.editLoaiDT.LoaiDT}" thành công`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_LoaiDT)
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        createLoaiDT({
          variables: {
            loaiDT: form.LoaiDT,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới "${data.createLoaiDT.LoaiDT}" thành công`,
              "success"
            );
            setForm(FI_LoaiDT)
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

  const onEditData = (loaiDT: any) => {
    setStatusEdit(true);
    setForm({
      ...form,
      MaLoaiDT: loaiDT.MaLoaiDT,
      LoaiDT: loaiDT.LoaiDT,
    });
  };

  const onDeleteData = (loaiDT: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: loaiDT.LoaiDT,
      Table: "LoaiDTs",
      ID: loaiDT.MaLoaiDT,
    });

  useEffect(() => {
    if (Data_loaiDTs) {
      set_loaiDTs(Data_loaiDTs.loaiDTs);
    }
  }, [Data_loaiDTs]);

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

  if (!Data_loaiDTs) return <Spinner />;
  return (
    <InputLoaiDTStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách loại đối tượng hiện có <b>({loaiDTs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh LoaiDT..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">LoaiDT</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...loaiDTs].reverse().map((loaiDT: any, ind: number) => (
                  <tr key={ind} title={`MaLoaiDT: ${loaiDT.MaLoaiDT}`}>
                    <td>{loaiDT.LoaiDT}</td>
                    <td className="ip-ls-action">
                      <i
                        className="fa-solid fa-pen"
                        onClick={() => onEditData(loaiDT)}
                        title="Sửa"
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        data-bs-toggle="modal"
                        data-bs-target="#modalDeleteData"
                        onClick={() => onDeleteData(loaiDT)}
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
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} loại đối tượng:</h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Loại đối tượng (LoaiDT):</label>
              <input
                required
                value={form.LoaiDT ? form.LoaiDT : ""}
                name="LoaiDT"
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
    </InputLoaiDTStyled>
  );
}
