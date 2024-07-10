import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createBaoCaoPHDC_CBCS,
  MUTATION_editBaoCaoPHDC_CBCS,
  QUERY_baocaoPHDCs,
  QUERY_baocaoPHDCs_cbcss,
  QUERY_cbcss,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_BaoCaoPHDC_CBCS } from "./FormInitial";

const InputBaoCaoPHDCCBCSStyled = styled.div`
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

export default function InputBaoCaoPHDCCBCS() {
  const navigate = useNavigate();
  const { data: Data_baocaoPHDCs, error } = useQuery(QUERY_baocaoPHDCs, {
    variables: { utilsParams: {} },
  });

  const { data: Data_baocaoPHDCs_cbcss } = useQuery(QUERY_baocaoPHDCs_cbcss, {
    variables: { utilsParams: {} },
  });
  const { data: Data_cbcss } = useQuery(QUERY_cbcss, {
    variables: { utilsParams: {} },
  });
  const [createBaoCaoPHDC_CBCS] = useMutation(MUTATION_createBaoCaoPHDC_CBCS, {
    refetchQueries: [
      { query: QUERY_baocaoPHDCs, variables: { utilsParams: {} } },
      { query: QUERY_baocaoPHDCs_cbcss, variables: { utilsParams: {} } },
    ],
  });
  const [editBaoCaoPHDC_CBCS] = useMutation(MUTATION_editBaoCaoPHDC_CBCS, {
    refetchQueries: [
      { query: QUERY_baocaoPHDCs, variables: { utilsParams: {} } },
      { query: QUERY_baocaoPHDCs_cbcss, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [baocaoPHDCs, set_baocaoPHDCs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_BaoCaoPHDC_CBCS);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_baocaoPHDCs(
      handleSearch("BaoCaoPHDCs", Data_baocaoPHDCs.baocaoPHDCs, e.target.value)
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
    if (form.MaCBCS && form.MaBCPHDC) {
      if (
        Data_baocaoPHDCs_cbcss.baocaoPHDCs_cbcss?.filter(
          (obj: any) =>
            obj.MaCBCS === form.MaCBCS && obj.MaBCPHDC === form.MaBCPHDC
        ).length === 0
      ) {
        if (statusEdit) {
          editBaoCaoPHDC_CBCS({
            variables: {
              baocaoPHDC_cbcsInput: {
                MaBCPHDC: form.MaBCPHDC,
                MaCBCS: form.MaCBCS,
              },
              MaBCPHDC: form.MaBCPHDC_old,
              MaCBCS: form.MaCBCS_old,
            },
            onCompleted: () => {
              showNotification(
                "Chúc mừng",
                `Cập nhật "{ MaBCPHDC: ${form.MaBCPHDC}, MaCBCS: ${form.MaCBCS} }" thành công!`,
                "success"
              );
              setStatusEdit(false);
              setForm(FI_BaoCaoPHDC_CBCS);
            },
            onError: (error) => {
              showNotification("Lỗi!", error.message, "danger");
              navigate("/dangnhap");
            },
          });
        } else {
          createBaoCaoPHDC_CBCS({
            variables: {
              baocaoPHDC_cbcsInput: {
                MaBCPHDC: form.MaBCPHDC,
                MaCBCS: form.MaCBCS,
              },
            },
            onCompleted: () => {
              showNotification(
                "Chúc mừng",
                `Thêm mới "{ MaBCPHDC: ${form.MaBCPHDC}, MaCBCS: ${form.MaCBCS} }" thành công`,
                "success"
              );
              setForm(FI_BaoCaoPHDC_CBCS);
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
      MaBCPHDC: obj.MaBCPHDC,
      MaCBCS: obj.MaCBCS,
      MaBCPHDC_old: obj.MaBCPHDC,
      MaCBCS_old: obj.MaCBCS,
    });
  };

  const onDeleteData = (obj: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: `{ MaBCPHDC: ${obj.MaBCPHDC}, MaCBCS: ${obj.MaCBCS} }`,
      Table: "BaoCaoPHDCs_CBCSs",
      Form: {
        MaBCPHDC: obj.MaBCPHDC,
        MaCBCS: obj.MaCBCS,
      },
    });

  useEffect(() => {
    if (Data_baocaoPHDCs) {
      set_baocaoPHDCs(Data_baocaoPHDCs.baocaoPHDCs);
    }
  }, [Data_baocaoPHDCs]);

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

  if (!Data_baocaoPHDCs) return <Spinner />;
  return (
    <InputBaoCaoPHDCCBCSStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>Danh sách báo cáo phát hiện địa chỉ_CBCS hiện có: </h5>
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
                  <th scope="col">DiaChi</th>
                  <th scope="col">BiDanhDT</th>
                  <th scope="col">DoiTuong</th>
                  <th scope="col">CBCS</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...baocaoPHDCs].reverse().map((baocaophdc: any) => {
                  return baocaophdc.TSThucHiens?.map(
                    (cbcs: any, ind: number) => (
                      <tr key={ind}>
                        <td>{baocaophdc.DiaChi}</td>
                        <td>
                          {
                            baocaophdc.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
                              ?.BiDanh
                          }
                        </td>
                        <td>
                          {
                            baocaophdc.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
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
                                MaBCPHDC: baocaophdc.MaBCPHDC,
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
                                MaBCPHDC: baocaophdc.MaBCPHDC,
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
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} báo cáo phát hiện địa
            chỉ_CBCS:
          </h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Mã báo cáo PHDC (MaBCPHDC):</label>
              <select
                required
                value={form.MaBCPHDC ? form.MaBCPHDC : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaBCPHDC"
              >
                <option defaultValue={""}>Chọn báo cáo PHDC</option>
                {Data_baocaoPHDCs &&
                  Data_baocaoPHDCs.baocaoPHDCs.map(
                    (baocaophdc: any, ind: number) => (
                      <option key={ind} value={baocaophdc.MaBCPHDC}>
                        {baocaophdc.DiaChi} -{" "}
                        {
                          baocaophdc.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
                            ?.BiDanh
                        }{" "}
                        -{" "}
                        {
                          baocaophdc.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
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
    </InputBaoCaoPHDCCBCSStyled>
  );
}
