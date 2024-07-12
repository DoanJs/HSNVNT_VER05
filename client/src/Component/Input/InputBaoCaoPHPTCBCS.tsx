import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createBaoCaoPHPT_CBCS,
  MUTATION_editBaoCaoPHPT_CBCS,
  QUERY_baocaoPHPTs,
  QUERY_baocaoPHPTs_cbcss,
  QUERY_cbcss,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_BaoCaoPHPT_CBCS } from "./FormInitial";

const InputBaoCaoPHPTCBCSStyled = styled.div`
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

export default function InputBaoCaoPHPTCBCS() {
  const navigate = useNavigate();
  const { data: Data_baocaoPHPTs, error } = useQuery(QUERY_baocaoPHPTs, {
    variables: { utilsParams: {} },
  });

  const { data: Data_baocaoPHPTs_cbcss } = useQuery(QUERY_baocaoPHPTs_cbcss, {
    variables: { utilsParams: {} },
  });
  const { data: Data_cbcss } = useQuery(QUERY_cbcss, {
    variables: { utilsParams: {} },
  });
  const [createBaoCaoPHPT_CBCS] = useMutation(MUTATION_createBaoCaoPHPT_CBCS, {
    refetchQueries: [
      { query: QUERY_baocaoPHPTs, variables: { utilsParams: {} } },
      { query: QUERY_baocaoPHPTs_cbcss, variables: { utilsParams: {} } },
    ],
  });
  const [editBaoCaoPHPT_CBCS] = useMutation(MUTATION_editBaoCaoPHPT_CBCS, {
    refetchQueries: [
      { query: QUERY_baocaoPHPTs, variables: { utilsParams: {} } },
      { query: QUERY_baocaoPHPTs_cbcss, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [baocaoPHPTs, set_baocaoPHPTs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_BaoCaoPHPT_CBCS);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_baocaoPHPTs(
      handleSearch("BaoCaoPHPTs", Data_baocaoPHPTs.baocaoPHPTs, e.target.value)
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
    if (form.MaCBCS && form.MaBCPHPT) {
      if (
        Data_baocaoPHPTs_cbcss.baocaoPHPTs_cbcss?.filter(
          (obj: any) =>
            obj.MaCBCS === form.MaCBCS && obj.MaBCPHPT === form.MaBCPHPT
        ).length === 0
      ) {
        if (statusEdit) {
          editBaoCaoPHPT_CBCS({
            variables: {
              baocaoPHPT_cbcsInput: {
                MaBCPHPT: form.MaBCPHPT,
                MaCBCS: form.MaCBCS,
              },
              MaBCPHPT: form.MaBCPHPT_old,
              MaCBCS: form.MaCBCS_old,
            },
            onCompleted: () => {
              showNotification(
                "Chúc mừng",
                `Cập nhật "{ MaBCPHPT: ${form.MaBCPHPT}, MaCBCS: ${form.MaCBCS} }" thành công!`,
                "success"
              );
              setStatusEdit(false);
              setForm(FI_BaoCaoPHPT_CBCS);
            },
            onError: (error) => {
              showNotification("Lỗi!", error.message, "danger");
              navigate("/dangnhap");
            },
          });
        } else {
          createBaoCaoPHPT_CBCS({
            variables: {
              baocaoPHPT_cbcsInput: {
                MaBCPHPT: form.MaBCPHPT,
                MaCBCS: form.MaCBCS,
              },
            },
            onCompleted: () => {
              showNotification(
                "Chúc mừng",
                `Thêm mới "{ MaBCPHPT: ${form.MaBCPHPT}, MaCBCS: ${form.MaCBCS} }" thành công`,
                "success"
              );
              setForm(FI_BaoCaoPHPT_CBCS);
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
      MaBCPHPT: obj.MaBCPHPT,
      MaCBCS: obj.MaCBCS,
      MaBCPHPT_old: obj.MaBCPHPT,
      MaCBCS_old: obj.MaCBCS,
    });
  };

  const onDeleteData = (obj: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: `{ MaBCPHPT: ${obj.MaBCPHPT}, MaCBCS: ${obj.MaCBCS} }`,
      Table: "BaoCaoPHPTs_CBCSs",
      Form: {
        MaBCPHPT: obj.MaBCPHPT,
        MaCBCS: obj.MaCBCS,
      },
    });

  useEffect(() => {
    if (Data_baocaoPHPTs) {
      set_baocaoPHPTs(Data_baocaoPHPTs.baocaoPHPTs);
    }
  }, [Data_baocaoPHPTs]);

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

  if (!Data_baocaoPHPTs) return <Spinner />;
  return (
    <InputBaoCaoPHPTCBCSStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>Danh sách báo cáo phát hiện phương tiện_CBCS hiện có: </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh BaoCaoPHDC_CBCS..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">BKS</th>
                  <th scope="col">BiDanhDT</th>
                  <th scope="col">DoiTuong</th>
                  <th scope="col">CBCS</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...baocaoPHPTs].reverse().map((baocaophpt: any) => {
                  return baocaophpt.TSThucHiens?.map(
                    (cbcs: any, ind: number) => (
                      <tr key={ind}>
                        <td>{baocaophpt.BKS}</td>
                        <td>
                          {
                            baocaophpt.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
                              ?.BiDanh
                          }
                        </td>
                        <td>
                          {
                            baocaophpt.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
                              ?.DeNghiTSNT?.DoiTuong?.TenDT
                          }
                        </td>
                        <td>{cbcs.HoTen}</td>
                        <td className="ip-ls-action">
                          <i
                            className="fa-solid fa-pen"
                            onClick={() =>
                              onEditData({
                                MaCBCS: cbcs.MaCBCS,
                                MaBCPHPT: baocaophpt.MaBCPHPT,
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
                                MaBCPHPT: baocaophpt.MaBCPHPT,
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
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} báo cáo phát hiện phương tiện_CBCS:
          </h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Mã báo cáo PHPT (MaBCPHPT):</label>
              <select
                required
                value={form.MaBCPHPT ? form.MaBCPHPT : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaBCPHPT"
              >
                <option defaultValue={""}>Chọn báo cáo PHPT</option>
                {Data_baocaoPHPTs &&
                  Data_baocaoPHPTs.baocaoPHPTs.map(
                    (baocaophpt: any, ind: number) => (
                      <option key={ind} value={baocaophpt.MaBCPHPT}>
                        {baocaophpt.BKS} -{" "}
                        {
                          baocaophpt.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
                            ?.BiDanh
                        }{" "}
                        -{" "}
                        {
                          baocaophpt.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
                            ?.DeNghiTSNT?.DoiTuong?.TenDT
                        }
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
    </InputBaoCaoPHPTCBCSStyled>
  );
}
