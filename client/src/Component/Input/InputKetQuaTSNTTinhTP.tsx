import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createKetQuaTSNT_TinhTP,
  MUTATION_editKetQuaTSNT_TinhTP,
  QUERY_ketquaTSNTs,
  QUERY_ketquaTSNTs_tinhTPs,
  QUERY_tinhTPs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_KetQuaTSNT_TinhTP } from "./FormInitial";

const InputKetQuaTSNTTinhTPStyled = styled.div`
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

export default function InputKetQuaTSNTTinhTP() {
  const navigate = useNavigate();
  const { data: Data_ketquaTSNTs, error } = useQuery(QUERY_ketquaTSNTs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_tinhTPs } = useQuery(QUERY_tinhTPs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_ketquaTSNTs_tinhTPs } = useQuery(
    QUERY_ketquaTSNTs_tinhTPs,
    {
      variables: { utilsParams: {} },
    }
  );
  const [createKetQuaTSNT_TinhTP] = useMutation(
    MUTATION_createKetQuaTSNT_TinhTP,
    {
      refetchQueries: [
        { query: QUERY_ketquaTSNTs, variables: { utilsParams: {} } },
        { query: QUERY_ketquaTSNTs_tinhTPs, variables: { utilsParams: {} } },
      ],
    }
  );
  const [editKetQuaTSNT_TinhTP] = useMutation(MUTATION_editKetQuaTSNT_TinhTP, {
    refetchQueries: [
      { query: QUERY_ketquaTSNTs, variables: { utilsParams: {} } },
      { query: QUERY_ketquaTSNTs_tinhTPs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [ketquaTSNTs, set_ketquaTSNTs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_KetQuaTSNT_TinhTP);
  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_ketquaTSNTs(
      handleSearch("KetQuaTSNTs", Data_ketquaTSNTs.ketquaTSNTs, e.target.value)
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
    if (form.MaKQ && form.MaTinhTP) {
      if (
        Data_ketquaTSNTs_tinhTPs.ketquaTSNTs_tinhTPs?.filter(
          (obj: any) => obj.MaTinhTP === form.MaTinhTP && obj.MaKQ === form.MaKQ
        ).length === 0
      ) {
        if (statusEdit) {
          editKetQuaTSNT_TinhTP({
            variables: {
              ketquaTSNT_tinhtpInput: {
                MaTinhTP: form.MaTinhTP,
                MaKQ: form.MaKQ,
              },
              MaTinhTP: form.MaTinhTP_old,
              MaKQ: form.MaKQ_old,
            },
            onCompleted: () => {
              showNotification(
                "Chúc mừng",
                `Cập nhật kết quả TSNT_tỉnh TP "{ MaTinhTP: ${form.MaTinhTP}, MaKQ: ${form.MaKQ} }" thành công`,
                "success"
              );
              setStatusEdit(false);
              setForm(FI_KetQuaTSNT_TinhTP);
            },
            onError: (error) => {
              showNotification("Lỗi!", error.message, "danger");
              navigate("/dangnhap");
            },
          });
        } else {
          createKetQuaTSNT_TinhTP({
            variables: {
              ketquaTSNT_tinhtpInput: {
                MaTinhTP: form.MaTinhTP,
                MaKQ: form.MaKQ,
              },
            },
            onCompleted: () => {
              showNotification(
                "Chúc mừng",
                `Thêm mới kết quả TSNT_tỉnh TP "{ MaTinhTP: ${form.MaTinhTP}, MaKQ: ${form.MaKQ} }" thành công`,
                "success"
              );
              setForm(FI_KetQuaTSNT_TinhTP);
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
      MaTinhTP: obj.MaTinhTP,
      MaKQ: obj.MaKQ,
      MaTinhTP_old: obj.MaTinhTP,
      MaKQ_old: obj.MaKQ,
    });
  };

  const onDeleteData = (obj: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: `{MaTinhTP: ${obj.MaTinhTP}, MaKQ: ${obj.MaKQ}}`,
      Table: "KetQuaTSNTs_TinhTPs",
      Form: {
        MaTinhTP: obj.MaTinhTP,
        MaKQ: obj.MaKQ,
      },
    });

  useEffect(() => {
    if (Data_ketquaTSNTs) {
      set_ketquaTSNTs(Data_ketquaTSNTs.ketquaTSNTs);
    }
  }, [Data_ketquaTSNTs]);

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

  if (!Data_ketquaTSNTs) return <Spinner />;
  return (
    <InputKetQuaTSNTTinhTPStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>Danh sách kết quả TSNT_tỉnh thành phố hiện có: </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh KetQuaTSNT_TinhTP..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">MaKQ</th>
                  <th scope="col">KHTSNT</th>
                  <th scope="col">TinhTP</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...ketquaTSNTs].reverse().map((ketquatsnt: any) => {
                  return ketquatsnt.PhamViTSs?.map(
                    (tinhtp: any, ind: number) => (
                      <tr key={ind}>
                        <td>{ketquatsnt.MaKQ}</td>
                        <td>{ketquatsnt.KeHoachTSNT?.So}</td>
                        <td>{tinhtp.TinhTP}</td>
                        <td className="ip-ls-action">
                          <i
                            className="fa-solid fa-pen"
                            onClick={() =>
                              onEditData({
                                MaTinhTP: tinhtp.MaTinhTP,
                                MaKQ: ketquatsnt.MaKQ,
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
                                MaTinhTP: tinhtp.MaTinhTP,
                                MaKQ: ketquatsnt.MaKQ,
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
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} kết quả TSNT_tỉnh thành phố:
          </h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Mã kết quả TSNT (MaKQ):</label>
              <select
                required
                value={form.MaKQ ? form.MaKQ : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaKQ"
              >
                <option defaultValue={""}>Chọn kết quả TSNT</option>
                {Data_ketquaTSNTs &&
                  Data_ketquaTSNTs.ketquaTSNTs.map(
                    (ketquatsnt: any, ind: number) => (
                      <option key={ind} value={ketquatsnt.MaKQ}>
                        {ketquatsnt.MaKQ} - {ketquatsnt.KeHoachTSNT?.So}
                      </option>
                    )
                  )}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Mã tỉnh thành phố (MaTinhTP):
              </label>
              <select
                required
                value={form.MaTinhTP ? form.MaTinhTP : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaTinhTP"
              >
                <option defaultValue={""}>Chọn tỉnh thành phố</option>
                {Data_tinhTPs &&
                  Data_tinhTPs.tinhTPs.map((tinhtp: any, ind: number) => (
                    <option key={ind} value={tinhtp.MaTinhTP}>
                      {tinhtp.TinhTP}
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
    </InputKetQuaTSNTTinhTPStyled>
  );
}
