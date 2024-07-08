import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createCAQHvaTD,
  MUTATION_editCAQHvaTD,
  QUERY_caQHvaTDs,
  QUERY_caTTPvaTDs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_CAQHvaTD } from "./FormInitial";

const InputCAQHvaTDStyled = styled.div`
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

export default function InputCAQHvaTD() {
  const navigate = useNavigate();
  const { data: Data_caQHvaTDs, error } = useQuery(QUERY_caQHvaTDs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_caTTPvaTDs } = useQuery(QUERY_caTTPvaTDs, {
    variables: { utilsParams: {} },
  });
  const [createCAQHvaTD] = useMutation(MUTATION_createCAQHvaTD, {
    refetchQueries: [
      { query: QUERY_caQHvaTDs, variables: { utilsParams: {} } },
    ],
  });
  const [editCAQHvaTD] = useMutation(MUTATION_editCAQHvaTD, {
    refetchQueries: [
      { query: QUERY_caQHvaTDs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [caQHvaTDs, set_caQHvaTDs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_CAQHvaTD);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_caQHvaTDs(
      handleSearch("CAQHvaTDs", Data_caQHvaTDs.caQHvaTDs, e.target.value)
    );
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "MaCATTPvaTD"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.CAQHvaTD.trim() !== "") {
      if (statusEdit) {
        editCAQHvaTD({
          variables: {
            caQHvaTDInput: {
              CAQHvaTD: form.CAQHvaTD,
              KyHieu: form.KyHieu,
              MaCATTPvaTD: form.MaCATTPvaTD,
            },
            id: form.MaCAQHvaTD,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật CAQHvaTD "${data.editCAQHvaTD.CAQHvaTD}" thành công`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_CAQHvaTD)
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        createCAQHvaTD({
          variables: {
            caQHvaTDInput: {
              CAQHvaTD: form.CAQHvaTD,
              MaCATTPvaTD: form.MaCATTPvaTD,
              KyHieu: form.KyHieu,
            },
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới CAQHvaTD "${data.createCAQHvaTD.CAQHvaTD}" thành công`,
              "success"
            );
            setForm(FI_CAQHvaTD)
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

  const onEditData = (caQHvaTD: any) => {
    setStatusEdit(true);
    setForm({
      ...form,
      MaCAQHvaTD: caQHvaTD.MaCAQHvaTD,
      CAQHvaTD: caQHvaTD.CAQHvaTD,
      KyHieu: caQHvaTD.KyHieu,
      MaCATTPvaTD: caQHvaTD.CATTPvaTD?.MaCATTPvaTD,
    });
  };

  const onDeleteData = (caQHvaTD: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: caQHvaTD.CAQHvaTD,
      Table: "CAQHvaTDs",
      ID: caQHvaTD.MaCAQHvaTD,
    });

  useEffect(() => {
    if (Data_caQHvaTDs) {
      set_caQHvaTDs(Data_caQHvaTDs.caQHvaTDs);
    }
  }, [Data_caQHvaTDs]);

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

  if (!Data_caQHvaTDs) return <Spinner />;
  return (
    <InputCAQHvaTDStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách Công an Quận/Huyện và tương đương hiện có{" "}
            <b>({caQHvaTDs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh CAQHvaTD..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">CAQHvaTD</th>
                  <th scope="col">KyHieu</th>
                  <th scope="col">CATTPvaTD</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...caQHvaTDs].reverse().map((caQHvaTD: any, ind: number) => (
                  <tr key={ind} title={`MaCAQHvaTD: ${caQHvaTD.MaCAQHvaTD}`}>
                    <td>{caQHvaTD.CAQHvaTD}</td>
                    <td>{caQHvaTD.KyHieu}</td>
                    <td>{caQHvaTD.CATTPvaTD?.CATTPvaTD}</td>
                    <td className="ip-ls-action">
                      <i
                        className="fa-solid fa-pen"
                        onClick={() => onEditData(caQHvaTD)}
                        title="Sửa"
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        data-bs-toggle="modal"
                        data-bs-target="#modalDeleteData"
                        onClick={() => onDeleteData(caQHvaTD)}
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
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} Công an Quận/Huyện và tương
            đương:
          </h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">
                Công an Quận/Huyện và tương đương (CAQHvaTD):
              </label>
              <input
                required
                value={form.CAQHvaTD ? form.CAQHvaTD : ""}
                name="CAQHvaTD"
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
            <div className="mb-3">
              <label className="form-label">
                Mã Công an Tỉnh/Thành phố và tương đương (MaCATTPvaTD):
              </label>
              <select
                required
                value={form.MaCATTPvaTD ? form.MaCATTPvaTD : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaCATTPvaTD"
              >
                <option defaultValue={""}>
                  Chọn Công an Tỉnh/Thành phố và tương đương
                </option>
                {Data_caTTPvaTDs &&
                  Data_caTTPvaTDs.caTTPvaTDs.map(
                    (caTTPvaTD: any, ind: number) => (
                      <option key={ind} value={caTTPvaTD.MaCATTPvaTD}>
                        {caTTPvaTD.CATTPvaTD}
                      </option>
                    )
                  )}
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
    </InputCAQHvaTDStyled>
  );
}
