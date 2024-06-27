import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createDanToc,
  MUTATION_editDanToc,
  QUERY_dantocs,
  QUERY_quocTichs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_DanToc } from "./FormInitial";

const InputDanTocStyled = styled.div`
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

export default function InputDanToc() {
  const navigate = useNavigate();
  const { data: Data_dantocs, error } = useQuery(QUERY_dantocs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_quocTichs } = useQuery(QUERY_quocTichs, {
    variables: { utilsParams: {} },
  });
  const [createDanToc] = useMutation(MUTATION_createDanToc, {
    refetchQueries: [{ query: QUERY_dantocs, variables: { utilsParams: {} } }],
  });
  const [editDanToc] = useMutation(MUTATION_editDanToc, {
    refetchQueries: [{ query: QUERY_dantocs, variables: { utilsParams: {} } }],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [dantocs, set_dantocs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_DanToc);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_dantocs(handleSearch("DanTocs", Data_dantocs.dantocs, e.target.value));
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "MaQT" ? Number(e.target.value) : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.TenDT.trim() !== "") {
      if (statusEdit) {
        editDanToc({
          variables: {
            danTocInput: {
              TenDT: form.TenDT,
              MaQT: form.MaQT,
            },
            id: form.MaDT,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật "${data.editDanToc.TenDT}" thành công`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_DanToc)
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        createDanToc({
          variables: {
            danTocInput: {
              TenDT: form.TenDT,
              MaQT: form.MaQT,
            },
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới "${data.createDanToc.TenDT}" thành công`,
              "success"
            );
            setForm(FI_DanToc)
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      }
    } else {
      showNotification("Cảnh báo", "Vui lòng nhập đầy đủ giá trị!", "warning");
    }
  };

  const onEditData = (dantoc: any) => {
    setStatusEdit(true);
    setForm({
      ...form,
      TenDT: dantoc.TenDT,
      MaQT: dantoc.QuocTich?.MaQT,
      MaDT: dantoc.MaDT,
    });
  };

  const onDeleteData = (dantoc: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: dantoc.TenDT,
      Table: "DanTocs",
      ID: dantoc.MaDT,
    });

  useEffect(() => {
    if (Data_dantocs) {
      set_dantocs(Data_dantocs.dantocs);
    }
  }, [Data_dantocs]);

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

  if (!Data_dantocs) return <Spinner />;
  return (
    <InputDanTocStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách dân tộc hiện có <b>({dantocs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh TenDT..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">TenDT</th>
                  <th scope="col">QuocTich</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...dantocs].reverse().map((dantoc: any, ind: number) => (
                  <tr key={ind} title={`MaDT: ${dantoc.MaDT}`}>
                    <td>{dantoc.TenDT}</td>
                    <td>{dantoc.QuocTich?.TenQT}</td>
                    <td className="ip-ls-action">
                      <i
                        className="fa-solid fa-pen"
                        onClick={() => onEditData(dantoc)}
                        title="Sửa"
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        data-bs-toggle="modal"
                        data-bs-target="#modalDeleteData"
                        onClick={() => onDeleteData(dantoc)}
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
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} dân tộc:</h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Dân tộc (TenDT):</label>
              <input
                required
                value={form.TenDT ? form.TenDT : ""}
                name="TenDT"
                onChange={changeForm}
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mã quốc tịch (MaQT):</label>
              <select
                required
                value={form.MaQT ? form.MaQT : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaQT"
              >
                <option defaultValue={""}>Chọn quốc tịch</option>
                {Data_quocTichs &&
                  Data_quocTichs.quocTichs.map((quoctich: any, ind: number) => (
                    <option key={ind} value={quoctich.MaQT}>
                      {quoctich.TenQT}
                    </option>
                  ))}
              </select>
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
    </InputDanTocStyled>
  );
}
