import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createDoi,
  MUTATION_editDoi,
  QUERY_caQHvaTDs,
  QUERY_dois,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_Doi } from "./FormInitial";

const InputDoiStyled = styled.div`
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

export default function InputDoi() {
  const navigate = useNavigate();
  const { data: Data_dois, error } = useQuery(QUERY_dois, {
    variables: { utilsParams: {} },
  });
  const { data: Data_caQHvaTDs } = useQuery(QUERY_caQHvaTDs, {
    variables: { utilsParams: {} },
  });
  const [createDoi] = useMutation(MUTATION_createDoi, {
    refetchQueries: [{ query: QUERY_dois, variables: { utilsParams: {} } }],
  });
  const [editDoi] = useMutation(MUTATION_editDoi, {
    refetchQueries: [{ query: QUERY_dois, variables: { utilsParams: {} } }],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [dois, set_dois] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_Doi);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_dois(handleSearch("Dois", Data_dois.dois, e.target.value));
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "MaCAQHvaTD"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.TenDoi.trim() !== "") {
      if (statusEdit) {
        editDoi({
          variables: {
            doiInput: {
              TenDoi: form.TenDoi,
              MaCAQHvaTD: form.MaCAQHvaTD,
            },
            id: form.MaDoi,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật "${data.editDoi.TenDoi}" thành công`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_Doi)
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        createDoi({
          variables: {
            doiInput: {
              TenDoi: form.TenDoi,
              MaCAQHvaTD: form.MaCAQHvaTD,
            },
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới "${data.createDoi.TenDoi}" thành công`,
              "success"
            );
            setForm(FI_Doi)
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

  const onEditData = (doi: any) => {
    setStatusEdit(true);
    setForm({
      ...form,
      TenDoi: doi.TenDoi,
      MaCAQHvaTD: doi.CAQHvaTD?.MaCAQHvaTD,
      MaDoi: doi.MaDoi,
    });
  };

  const onDeleteData = (doi: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: doi.TenDoi,
      Table: "Dois",
      ID: doi.MaDoi,
    });

  useEffect(() => {
    if (Data_dois) {
      set_dois(Data_dois.dois);
    }
  }, [Data_dois]);

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

  if (!Data_dois) return <Spinner />;
  return (
    <InputDoiStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách đội hiện có <b>({dois.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh Doi..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">TenDoi</th>
                  <th scope="col">CAQHvaTD</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...dois].reverse().map((doi: any, ind: number) => (
                  <tr key={ind} title={`MaDoi: ${doi.MaDoi}`}>
                    <td>{doi.TenDoi}</td>
                    <td>{doi.CAQHvaTD?.CAQHvaTD}</td>
                    <td className="ip-ls-action">
                      <i
                        className="fa-solid fa-pen"
                        onClick={() => onEditData(doi)}
                        title="Sửa"
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        data-bs-toggle="modal"
                        data-bs-target="#modalDeleteData"
                        onClick={() => onDeleteData(doi)}
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
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} đội:</h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Đội (Doi):</label>
              <input
                required
                value={form.TenDoi ? form.TenDoi : ""}
                name="TenDoi"
                onChange={changeForm}
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Mã công an quận huyện và tương đương (MaCAQHvaTD):
              </label>
              <select
                value={form.MaCAQHvaTD ? form.MaCAQHvaTD : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaCAQHvaTD"
              >
                <option defaultValue={""}>
                  Chọn công an quận huyện và tương đương
                </option>
                {Data_caQHvaTDs &&
                  Data_caQHvaTDs.caQHvaTDs.map((caqhvatd: any, ind: number) => (
                    <option key={ind} value={caqhvatd.MaCAQHvaTD}>
                      {caqhvatd.CAQHvaTD}
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
    </InputDoiStyled>
  );
}
