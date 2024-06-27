import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createCATTPvaTD,
  MUTATION_editCATTPvaTD,
  QUERY_capCAs,
  QUERY_caTTPvaTDs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_CATTPvaTD } from "./FormInitial";

const InputCATTPvaTDStyled = styled.div`
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

export default function InputCATTPvaTD() {
  const navigate = useNavigate();
  const { data: Data_caTTPvaTDs, error } = useQuery(QUERY_caTTPvaTDs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_capCAs } = useQuery(QUERY_capCAs, {
    variables: { utilsParams: {} },
  });
  const [createCATTPvaTD] = useMutation(MUTATION_createCATTPvaTD, {
    refetchQueries: [
      { query: QUERY_caTTPvaTDs, variables: { utilsParams: {} } },
    ],
  });
  const [editCATTPvaTD] = useMutation(MUTATION_editCATTPvaTD, {
    refetchQueries: [
      { query: QUERY_caTTPvaTDs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [caTTPvaTDs, set_caTTPvaTDs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_CATTPvaTD);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_caTTPvaTDs(
      handleSearch("caTTPvaTDs", Data_caTTPvaTDs.caTTPvaTDs, e.target.value)
    );
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "MaCapCA" ? Number(e.target.value) : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.CATTPvaTD.trim() !== "") {
      if (statusEdit) {
        editCATTPvaTD({
          variables: {
            caTTPvaTDInput: {
              CATTPvaTD: form.CATTPvaTD,
              MaCapCA: form.MaCapCA,
            },
            id: form.MaCATTPvaTD,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật "${data.editCATTPvaTD.CATTPvaTD}" thành công`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_CATTPvaTD)
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        createCATTPvaTD({
          variables: {
            caTTPvaTDInput: {
              CATTPvaTD: form.CATTPvaTD,
              MaCapCA: form.MaCapCA,
            },
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới "${data.createCATTPvaTD.CATTPvaTD}" thành công`,
              "success"
            );
            setForm(FI_CATTPvaTD)
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

  const onEditData = (caTTPvaTD: any) => {
    setStatusEdit(true);
    setForm({
      ...form,
      CATTPvaTD: caTTPvaTD.CATTPvaTD,
      MaCapCA: caTTPvaTD.CapCA?.MaCapCA,
      MaCATTPvaTD: caTTPvaTD.MaCATTPvaTD,
    });
  };

  const onDeleteData = (caTTPvaTD: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: caTTPvaTD.CATTPvaTD,
      Table: "CATTPvaTDs",
      ID: caTTPvaTD.MaCATTPvaTD,
    });

  useEffect(() => {
    if (Data_caTTPvaTDs) {
      set_caTTPvaTDs(Data_caTTPvaTDs.caTTPvaTDs);
    }
  }, [Data_caTTPvaTDs]);

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

  if (!Data_caTTPvaTDs) return <Spinner />;
  return (
    <InputCATTPvaTDStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách Công an Tỉnh/Thành phố và tương đương hiện có{" "}
            <b>({caTTPvaTDs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh CATTPvaTD..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">CATTPvaTD</th>
                  <th scope="col">CapCA</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...caTTPvaTDs]
                  .reverse()
                  .map((caTTPvaTD: any, ind: number) => (
                    <tr key={ind} title={`MaCATTPvaTD: ${caTTPvaTD.MaCATTPvaTD}`}>
                      <td>{caTTPvaTD.CATTPvaTD}</td>
                      <td>{caTTPvaTD.CapCA?.CapCA}</td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => onEditData(caTTPvaTD)}
                          title="Sửa"
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeleteData"
                          onClick={() => onDeleteData(caTTPvaTD)}
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
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} Công an Tỉnh/Thành phố và
            tương đương:
          </h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">
                Công an Tỉnh/Thành phố và tương đương (CATTPvaTD):
              </label>
              <input
                required
                value={form.CATTPvaTD ? form.CATTPvaTD : ""}
                name="CATTPvaTD"
                onChange={changeForm}
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mã cấp Công an (MaCapCA):</label>
              <select
                required
                value={form.MaCapCA ? form.MaCapCA : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaCapCA"
              >
                <option defaultValue={""}>Chọn cấp Công an</option>
                {Data_capCAs &&
                  Data_capCAs.capCAs.map((capCA: any, ind: number) => (
                    <option key={ind} value={capCA.MaCapCA}>
                      {capCA.CapCA}
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
    </InputCATTPvaTDStyled>
  );
}
