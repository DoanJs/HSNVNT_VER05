import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createBienPhapDT_DoiTuong,
  MUTATION_editBienPhapDT_DoiTuong,
  QUERY_bienPhapDTs,
  QUERY_bienphapDTs_doituongs,
  QUERY_doituongs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_BienPhapDT_DoiTuong } from "./FormInitial";

const InputBienPhapDTDoiTuongStyled = styled.div`
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

export default function InputBienPhapDTDoiTuong() {
  const navigate = useNavigate();
  const { data: Data_doituongs, error } = useQuery(QUERY_doituongs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_bienPhapDTs } = useQuery(QUERY_bienPhapDTs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_bienphapDTs_doituongs } = useQuery(
    QUERY_bienphapDTs_doituongs,
    {
      variables: { utilsParams: {} },
    }
  );
  const [createBienPhapDT_DoiTuong] = useMutation(
    MUTATION_createBienPhapDT_DoiTuong,
    {
      refetchQueries: [
        { query: QUERY_doituongs, variables: { utilsParams: {} } },
        { query: QUERY_bienphapDTs_doituongs, variables: { utilsParams: {} } },
      ],
    }
  );
  const [editBienPhapDT_DoiTuong] = useMutation(
    MUTATION_editBienPhapDT_DoiTuong,
    {
      refetchQueries: [
        { query: QUERY_doituongs, variables: { utilsParams: {} } },
        { query: QUERY_bienphapDTs_doituongs, variables: { utilsParams: {} } },
      ],
    }
  );
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [doituongs, set_doituongs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_BienPhapDT_DoiTuong);
  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_doituongs(
      handleSearch("DoiTuongs", Data_doituongs.doituongs, e.target.value)
    );
  };

  const changeForm = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: Number(e.target.value),
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.MaBPDT && form.MaDoiTuong) {
      if (
        Data_bienphapDTs_doituongs.bienphapDTs_doituongs?.filter(
          (obj: any) =>
            obj.MaBPDT === form.MaBPDT && obj.MaDoiTuong === form.MaDoiTuong
        ).length === 0
      ) {
        if (statusEdit) {
          editBienPhapDT_DoiTuong({
            variables: {
              bienphapdt_doituongInput: {
                MaBPDT: form.MaBPDT,
                MaDoiTuong: form.MaDoiTuong,
              },
              MaBPDT: form.MaBPDT_old,
              MaDoiTuong: form.MaDoiTuong_old,
            },
            onCompleted: () => {
              showNotification(
                "Chúc mừng",
                `Cập nhật biện pháp điều tra - đối tượng "{ MaBPDT: ${form.MaBPDT}, MaDoiTuong: ${form.MaDoiTuong} }" thành công`,
                "success"
              );
              setStatusEdit(false);
              setForm(FI_BienPhapDT_DoiTuong);
            },
            onError: (error) => {
              showNotification("Lỗi!", error.message, "danger");
              navigate("/dangnhap");
            },
          });
        } else {
          createBienPhapDT_DoiTuong({
            variables: {
              bienphapdt_doituongInput: {
                MaBPDT: form.MaBPDT,
                MaDoiTuong: form.MaDoiTuong,
              },
            },
            onCompleted: () => {
              showNotification(
                "Chúc mừng",
                `Thêm mới biện pháp điều tra - đối tượng "{ MaBPDT: ${form.MaBPDT}, MaDoiTuong: ${form.MaDoiTuong} }" thành công`,
                "success"
              );
              setForm(FI_BienPhapDT_DoiTuong);
            },
            onError: (error) => {
              showNotification("Lỗi!", error.message, "danger");
              navigate("/dangnhap");
            },
          });
        }
      } else {
        showNotification(
          "Cảnh báo!",
          "Dữ liệu đã tồn tại, vui lòng kiểm tra lại !",
          "warning"
        );
      }
    } else {
      showNotification(
        "Cảnh báo",
        "Vui lòng nhập đúng và đầy đủ giá trị!",
        "warning"
      );
    }
  };

  const onEditData = (obj: any) => {
    setStatusEdit(true);
    setForm({
      ...form,
      MaBPDT: obj.MaBPDT,
      MaDoiTuong: obj.MaDoiTuong,
      MaBPDT_old: obj.MaBPDT,
      MaDoiTuong_old: obj.MaDoiTuong,
    });
  };

  const onDeleteData = (obj: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: `{MaBPDT: ${obj.MaBPDT}, MaDoiTuong: ${obj.MaDoiTuong}}`,
      Table: "BienPhapDTs_DoiTuongs",
      Form: {
        MaBPDT: obj.MaBPDT,
        MaDoiTuong: obj.MaDoiTuong,
      },
    });

  useEffect(() => {
    if (Data_doituongs) {
      set_doituongs(Data_doituongs.doituongs);
    }
  }, [Data_doituongs]);

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

  if (!Data_doituongs) return <Spinner />;
  return (
    <InputBienPhapDTDoiTuongStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách biện pháp điều tra_đối tượng hiện có:{" "}
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh theo tên đối tượng (TenDT)..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">DoiTuong</th>
                  <th scope="col">BienPhapDT</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...doituongs].reverse().map((doituong: any) => {
                  return doituong.BienPhapDTs?.map(
                    (bienphapdt: any, ind: number) => (
                      <tr key={ind}>
                        <td>{doituong.TenDT}</td>
                        <td>{bienphapdt.BienPhapDT}</td>
                        <td className="ip-ls-action">
                          <i
                            className="fa-solid fa-pen"
                            onClick={() =>
                              onEditData({
                                MaBPDT: bienphapdt.MaBPDT,
                                MaDoiTuong: doituong.MaDoiTuong,
                              })
                            }
                            title="Sửa"
                          ></i>
                          <i
                            className="fa-solid fa-trash"
                            data-bs-toggle="modal"
                            data-bs-target="#modalDeleteData"
                            onClick={() =>
                              onDeleteData({
                                MaBPDT: bienphapdt.MaBPDT,
                                MaDoiTuong: doituong.MaDoiTuong,
                              })
                            }
                            title="Xóa"
                          ></i>
                        </td>
                      </tr>
                    )
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-6">
          <h5>
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} biện pháp điều tra_đối
            tượng:
          </h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Mã đối tượng (MaDoiTuong):</label>
              <select
                required
                value={form.MaDoiTuong ? form.MaDoiTuong : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaDoiTuong"
              >
                <option defaultValue={""}>Chọn đối tượng</option>
                {Data_doituongs &&
                  Data_doituongs.doituongs.map((doituong: any, ind: number) => (
                    <option key={ind} value={doituong.MaDoiTuong}>
                      {doituong.TenDT}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Mã biện pháp điều tra (MaBPDT):
              </label>
              <select
                required
                value={form.MaBPDT ? form.MaBPDT : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaBPDT"
              >
                <option defaultValue={""}>Chọn biện pháp điều tra</option>
                {Data_bienPhapDTs &&
                  Data_bienPhapDTs.bienPhapDTs.map(
                    (bienphapdt: any, ind: number) => (
                      <option key={ind} value={bienphapdt.MaBPDT}>
                        {bienphapdt.BienPhapDT}
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
    </InputBienPhapDTDoiTuongStyled>
  );
}
