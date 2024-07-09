import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createBaoCaoPHQH_CBCS,
  MUTATION_editBaoCaoPHQH_CBCS,
  QUERY_baocaoPHQHs,
  QUERY_baocaoPHQHs_cbcss,
  QUERY_cbcss,
} from "../../graphql/documentNode";
import {
  handleSearch,
  handleTime,
  showNotification,
} from "../../utils/functions";
import { FI_BaoCaoPHQH_CBCS } from "./FormInitial";

const InputBaoCaoPHQHCBCSStyled = styled.div`
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

export default function InputBaoCaoPHQHCBCS() {
  const navigate = useNavigate();
  const { data: Data_baocaoPHQHs, error } = useQuery(QUERY_baocaoPHQHs, {
    variables: { utilsParams: {} },
  });

  const { data: Data_baocaoPHQHs_cbcss } = useQuery(QUERY_baocaoPHQHs_cbcss, {
    variables: { utilsParams: {} },
  });
  const { data: Data_cbcss } = useQuery(QUERY_cbcss, {
    variables: { utilsParams: {} },
  });
  const [createBaoCaoPHQH_CBCS] = useMutation(MUTATION_createBaoCaoPHQH_CBCS, {
    refetchQueries: [
      { query: QUERY_baocaoPHQHs, variables: { utilsParams: {} } },
      { query: QUERY_baocaoPHQHs_cbcss, variables: { utilsParams: {} } },
    ],
  });
  const [editBaoCaoPHQH_CBCS] = useMutation(MUTATION_editBaoCaoPHQH_CBCS, {
    refetchQueries: [
      { query: QUERY_baocaoPHQHs, variables: { utilsParams: {} } },
      { query: QUERY_baocaoPHQHs_cbcss, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [baocaoPHQHs, set_baocaoPHQHs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_BaoCaoPHQH_CBCS);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_baocaoPHQHs(
      handleSearch("BaoCaoPHQHs", Data_baocaoPHQHs.baocaoPHQHs, e.target.value)
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
    if (form.MaCBCS && form.MaBCPHQH) {
      if (
        Data_baocaoPHQHs_cbcss.baocaoPHQHs_cbcss?.filter(
          (obj: any) =>
            obj.MaCBCS === form.MaCBCS && obj.MaBCPHQH === form.MaBCPHQH
        ).length === 0
      ) {
        if (statusEdit) {
          editBaoCaoPHQH_CBCS({
            variables: {
              baocaoPHQH_cbcsInput: {
                MaBCPHQH: form.MaBCPHQH,
                MaCBCS: form.MaCBCS,
              },
              MaBCPHQH: form.MaBCPHQH_old,
              MaCBCS: form.MaCBCS_old,
            },
            onCompleted: () => {
              showNotification(
                "Chúc mừng",
                `Cập nhật "{ MaBCPHQH: ${form.MaBCPHQH}, MaCBCS: ${form.MaCBCS} }" thành công!`,
                "success"
              );
              setStatusEdit(false);
              setForm(FI_BaoCaoPHQH_CBCS);
            },
            onError: (error) => {
              showNotification("Lỗi!", error.message, "danger");
              navigate("/dangnhap");
            },
          });
        } else {
          createBaoCaoPHQH_CBCS({
            variables: {
              baocaoPHQH_cbcsInput: {
                MaBCPHQH: form.MaBCPHQH,
                MaCBCS: form.MaCBCS,
              },
            },
            onCompleted: () => {
              showNotification(
                "Chúc mừng",
                `Thêm mới "{ MaBCPHQH: ${form.MaBCPHQH}, MaCBCS: ${form.MaCBCS} }" thành công`,
                "success"
              );
              setForm(FI_BaoCaoPHQH_CBCS);
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
      MaBCPHQH: obj.MaBCPHQH,
      MaCBCS: obj.MaCBCS,
      MaBCPHQH_old: obj.MaBCPHQH,
      MaCBCS_old: obj.MaCBCS,
    });
  };

  const onDeleteData = (obj: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: `{ MaBCPHQH: ${obj.MaBCPHQH}, MaCBCS: ${obj.MaCBCS} }`,
      Table: "BaoCaoPHQHs_CBCSs",
      Form: {
        MaBCPHQH: obj.MaBCPHQH,
        MaCBCS: obj.MaCBCS,
      },
    });

  useEffect(() => {
    if (Data_baocaoPHQHs) {
      set_baocaoPHQHs(Data_baocaoPHQHs.baocaoPHQHs);
    }
  }, [Data_baocaoPHQHs]);

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

  if (!Data_baocaoPHQHs) return <Spinner />;
  return (
    <InputBaoCaoPHQHCBCSStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>Danh sách báo cáo phát hiện quan hệ_CBCS hiện có: </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh BaoCaoPHQH_CBCS..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">NgayBC</th>
                  <th scope="col">BiDanh</th>
                  <th scope="col">CBCS</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...baocaoPHQHs].reverse().map((baocaophqh: any) => {
                  return baocaophqh.TSThucHiens?.map(
                    (cbcs: any, ind: number) => (
                      <tr key={ind}>
                        <td>
                          {baocaophqh.Ngay && handleTime(baocaophqh.Ngay)}
                        </td>
                        <td>{baocaophqh.BiDanh}</td>
                        <td>{cbcs.HoTen}</td>
                        <td className="ip-ls-action">
                          <i
                            className="fa-solid fa-pen"
                            onClick={() =>
                              onEditData({
                                MaCBCS: cbcs.MaCBCS,
                                MaBCPHQH: baocaophqh.MaBCPHQH,
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
                                MaCBCS: cbcs.MaCBCS,
                                MaBCPHQH: baocaophqh.MaBCPHQH,
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
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} báo cáo phát hiện quan
            hệ_CBCS:
          </h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Mã báo cáo PHQH (MaBCPHQH):</label>
              <select
                required
                value={form.MaBCPHQH ? form.MaBCPHQH : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaBCPHQH"
              >
                <option defaultValue={""}>Chọn báo cáo PHQH</option>
                {Data_baocaoPHQHs &&
                  Data_baocaoPHQHs.baocaoPHQHs.map(
                    (baocaophqh: any, ind: number) => (
                      <option key={ind} value={baocaophqh.MaBCPHQH}>
                        {handleTime(baocaophqh.Ngay)}-{baocaophqh.BiDanh}
                      </option>
                    )
                  )}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Mã CBCS thực hiện (MaCBCS):</label>
              <select
                required
                value={form.MaCBCS ? form.MaCBCS : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaCBCS"
              >
                <option defaultValue={""}>Chọn CBCS</option>
                {Data_cbcss &&
                  Data_cbcss.cbcss.map((cbcs: any, ind: number) => (
                    <option key={ind} value={cbcs.MaCBCS}>
                      {cbcs.HoTen} - {cbcs.Doi?.TenDoi} -{" "}
                      {cbcs.Doi?.CAQHvaTD?.CAQHvaTD}
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
    </InputBaoCaoPHQHCBCSStyled>
  );
}
