import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createQuyetDinhTSNT_TinhTP,
  MUTATION_editQuyetDinhTSNT_TinhTP,
  QUERY_quyetdinhTSNTs,
  QUERY_quyetdinhTSNTs_tinhTPs,
  QUERY_tinhTPs
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_QuyetDinhTSNT_TinhTP } from "./FormInitial";

const InputQuyetDinhTSNTTinhTPStyled = styled.div`
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

export default function InputQuyetDinhTSNTTinhTP() {
  const navigate = useNavigate();
  const { data: Data_quyetdinhTSNTs, error } = useQuery(QUERY_quyetdinhTSNTs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_tinhTPs } = useQuery(QUERY_tinhTPs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_quyetdinhTSNTs_tinhTPs } = useQuery(
    QUERY_quyetdinhTSNTs_tinhTPs,
    {
      variables: { utilsParams: {} },
    }
  );

  const [createQuyetDinhTSNT_TinhTP] = useMutation(
    MUTATION_createQuyetDinhTSNT_TinhTP,
    {
      refetchQueries: [
        { query: QUERY_quyetdinhTSNTs, variables: { utilsParams: {} } },
        { query: QUERY_quyetdinhTSNTs_tinhTPs, variables: { utilsParams: {} } },
      ],
    }
  );
  const [editQuyetDinhTSNT_TinhTP] = useMutation(
    MUTATION_editQuyetDinhTSNT_TinhTP,
    {
      refetchQueries: [
        { query: QUERY_quyetdinhTSNTs, variables: { utilsParams: {} } },
        { query: QUERY_quyetdinhTSNTs_tinhTPs, variables: { utilsParams: {} } },
      ],
    }
  );
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [quyetdinhTSNTs, set_quyetdinhTSNTs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_QuyetDinhTSNT_TinhTP);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_quyetdinhTSNTs(
      handleSearch(
        "QuyetDinhTSNTs",
        Data_quyetdinhTSNTs.quyetdinhTSNTs,
        e.target.value
      )
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
    if (form.MaQD && form.MaTinhTP) {
      if (
        Data_quyetdinhTSNTs_tinhTPs.quyetdinhTSNTs_tinhTPs?.filter(
          (obj: any) => obj.MaTinhTP === form.MaTinhTP && obj.MaQD === form.MaQD
        ).length === 0
      ) {
        if (statusEdit) {
              editQuyetDinhTSNT_TinhTP({
                variables: {
                  quyetdinhtsnt_tinhtpInput: {
                    MaTinhTP: form.MaTinhTP,
                    MaQD: form.MaQD,
                  },
                  MaTinhTP: form.MaTinhTP_old,
                  MaQD: form.MaQD_old,
                },
                onCompleted: () => {
                  showNotification(
                    "Chúc mừng",
                    `Cập nhật quyết đinh TSNT_tỉnh TP "{ MaTinhTP: ${form.MaTinhTP}, MaQD: ${form.MaQD} }" thành công`,
                    "success"
                  );
                  setStatusEdit(false);
                  setForm(FI_QuyetDinhTSNT_TinhTP);
                },
                onError: (error) => {
                  showNotification("Lỗi!", error.message, "danger");
                  navigate("/dangnhap");
                },
              });
        } else {
          createQuyetDinhTSNT_TinhTP({
            variables: {
              quyetdinhtsnt_tinhtpInput: {
                MaTinhTP: form.MaTinhTP,
                MaQD: form.MaQD,
              },
            },
            onCompleted: () => {
              showNotification(
                "Chúc mừng",
                `Thêm mới quyết đinh TSNT_tỉnh TP "{ MaTinhTP: ${form.MaTinhTP}, MaQD: ${form.MaQD} }" thành công`,
                "success"
              );
              setForm(FI_QuyetDinhTSNT_TinhTP);
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
      MaQD: obj.MaQD,
      MaTinhTP_old: obj.MaTinhTP,
      MaQD_old: obj.MaQD,
    });
  };

  const onDeleteData = (obj: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: `{MaTinhTP: ${obj.MaTinhTP}, MaQD: ${obj.MaQD}}`,
      Table: "QuyetDinhTSNTs_TinhTPs",
      Form: {
        MaTinhTP: obj.MaTinhTP,
        MaQD: obj.MaQD,
      },
    });

  useEffect(() => {
    if (Data_quyetdinhTSNTs) {
      set_quyetdinhTSNTs(Data_quyetdinhTSNTs.quyetdinhTSNTs);
    }
  }, [Data_quyetdinhTSNTs]);

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

  if (!Data_quyetdinhTSNTs) return <Spinner />;
  return (
    <InputQuyetDinhTSNTTinhTPStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>Danh sách quyết định trinh sát_tỉnh thành phố hiện có: </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">SoQD</th>
                  <th scope="col">TinhTP</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...quyetdinhTSNTs].reverse().map((quyetdinhtsnt: any) => {
                  return quyetdinhtsnt.PhamViTSs?.map(
                    (tinhtp: any, ind: number) => (
                      <tr key={ind}>
                        <td>{quyetdinhtsnt.So}</td>
                        <td>{tinhtp.TinhTP}</td>
                        <td className="ip-ls-action">
                          <i
                            className="fa-solid fa-pen"
                            onClick={() =>
                              onEditData({
                                MaTinhTP: tinhtp.MaTinhTP,
                                MaQD: quyetdinhtsnt.MaQD,
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
                                MaQD: quyetdinhtsnt.MaQD,
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
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} quyết định TSNT_tỉnh thành
            phố:
          </h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Mã quyết định TSNT (MaQD):</label>
              <select
                required
                value={form.MaQD ? form.MaQD : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaQD"
              >
                <option defaultValue={""}>Chọn quyết định TSNT</option>
                {Data_quyetdinhTSNTs &&
                  Data_quyetdinhTSNTs.quyetdinhTSNTs.map(
                    (quyetdinhtsnt: any, ind: number) => (
                      <option key={ind} value={quyetdinhtsnt.MaQD}>
                        {quyetdinhtsnt.So}
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
    </InputQuyetDinhTSNTTinhTPStyled>
  );
}
