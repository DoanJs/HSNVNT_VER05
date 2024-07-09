import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createBaoCaoKQGH_CBCS,
  MUTATION_editBaoCaoKQGH_CBCS,
  QUERY_baocaoKQGHs,
  QUERY_baocaoKQGHs_cbcss,
  QUERY_cbcss,
} from "../../graphql/documentNode";
import {
  handleSearch,
  handleTime,
  showNotification,
} from "../../utils/functions";
import { FI_BaoCaoKQGH_CBCS } from "./FormInitial";

const InputBaoCaoKQGHCBCSStyled = styled.div`
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

export default function InputBaoCaoKQGHCBCS() {
  const navigate = useNavigate();
  const { data: Data_baocaoKQGHs, error } = useQuery(QUERY_baocaoKQGHs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_baocaoKQGHs_cbcss } = useQuery(QUERY_baocaoKQGHs_cbcss, {
    variables: { utilsParams: {} },
  });
  const { data: Data_cbcss } = useQuery(QUERY_cbcss, {
    variables: { utilsParams: {} },
  });
  const [createBaoCaoKQGH_CBCS] = useMutation(MUTATION_createBaoCaoKQGH_CBCS, {
    refetchQueries: [
      { query: QUERY_baocaoKQGHs, variables: { utilsParams: {} } },
      { query: QUERY_baocaoKQGHs_cbcss, variables: { utilsParams: {} } },
    ],
  });
  const [editBaoCaoKQGH_CBCS] = useMutation(MUTATION_editBaoCaoKQGH_CBCS, {
    refetchQueries: [
      { query: QUERY_baocaoKQGHs, variables: { utilsParams: {} } },
      { query: QUERY_baocaoKQGHs_cbcss, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [baocaoKQGHs, set_baocaoKQGHs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_BaoCaoKQGH_CBCS);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_baocaoKQGHs(
      handleSearch("BaoCaoKQGHs", Data_baocaoKQGHs.baocaoKQGHs, e.target.value)
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
    if (form.MaCBCS && form.MaBCKQGH) {
      if (
        Data_baocaoKQGHs_cbcss.baocaoKQGHs_cbcss?.filter(
          (obj: any) =>
            obj.MaCBCS === form.MaCBCS && obj.MaBCKQGH === form.MaBCKQGH
        ).length === 0
      ) {
        if (statusEdit) {
          editBaoCaoKQGH_CBCS({
            variables: {
              baocaokqgh_cbcsInput: {
                MaBCKQGH: form.MaBCKQGH,
                MaCBCS: form.MaCBCS,
              },
              MaBCKQGH: form.MaBCKQGH_old,
              MaCBCS: form.MaCBCS_old,
            },
            onCompleted: () => {
              showNotification(
                "Chúc mừng",
                `Cập nhật "{ MaBCKQGH: ${form.MaBCKQGH}, MaCBCS: ${form.MaCBCS} }" thành công`,
                "success"
              );
              setStatusEdit(false);
              setForm(FI_BaoCaoKQGH_CBCS);
            },
            onError: (error) => {
              showNotification("Lỗi!", error.message, "danger");
              navigate("/dangnhap");
            },
          });
        } else {
          createBaoCaoKQGH_CBCS({
            variables: {
              baocaokqgh_cbcsInput: {
                MaBCKQGH: form.MaBCKQGH,
                MaCBCS: form.MaCBCS,
              },
            },
            onCompleted: () => {
              showNotification(
                "Chúc mừng",
                `Thêm mới "{ MaBCKQGH: ${form.MaBCKQGH}, MaCBCS: ${form.MaCBCS} }" thành công`,
                "success"
              );
              setForm(FI_BaoCaoKQGH_CBCS);
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
      MaBCKQGH: obj.MaBCKQGH,
      MaCBCS: obj.MaCBCS,
      MaBCKQGH_old: obj.MaBCKQGH,
      MaCBCS_old: obj.MaCBCS,
    });
  };

  const onDeleteData = (obj: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: `{ MaBCKQGH: ${obj.MaBCKQGH}, MaCBCS: ${obj.MaCBCS} }`,
      Table: "BaoCaoKQGHs_CBCSs",
      Form: {
        MaBCKQGH: obj.MaBCKQGH,
        MaCBCS: obj.MaCBCS,
      },
    });

  useEffect(() => {
    if (Data_baocaoKQGHs) {
      set_baocaoKQGHs(Data_baocaoKQGHs.baocaoKQGHs);
    }
  }, [Data_baocaoKQGHs]);

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

  if (!Data_baocaoKQGHs) return <Spinner />;
  return (
    <InputBaoCaoKQGHCBCSStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>Danh sách báo cáo kết quả ghi hình_CBCS hiện có: </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh BaoCaoKQGH_CBCS..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">NgayBC</th>
                  <th scope="col">HinhAnh</th>
                  <th scope="col">CBCS</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...baocaoKQGHs].reverse().map((baocaokqgh: any) => {
                  return baocaokqgh.TSThucHiens?.map(
                    (cbcs: any, ind: number) => (
                      <tr key={ind}>
                        <td>
                          {baocaokqgh.Ngay && handleTime(baocaokqgh.Ngay)}
                        </td>
                        <td>
                          <Link to={baocaokqgh.HinhAnh}>Link</Link>
                        </td>
                        <td>{cbcs.HoTen}</td>
                        <td className="ip-ls-action">
                          <i
                            className="fa-solid fa-pen"
                            onClick={() =>
                              onEditData({
                                MaCBCS: cbcs.MaCBCS,
                                MaBCKQGH: baocaokqgh.MaBCKQGH,
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
                                MaBCKQGH: baocaokqgh.MaBCKQGH,
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
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} báo cáo kết quả ghi
            hình_CBCS:
          </h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Mã báo cáo KQGH (MaBCKQGH):</label>
              <select
                required
                value={form.MaBCKQGH ? form.MaBCKQGH : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaBCKQGH"
              >
                <option defaultValue={""}>Chọn báo cáo KQGH</option>
                {Data_baocaoKQGHs &&
                  Data_baocaoKQGHs.baocaoKQGHs.map(
                    (baocaokqgh: any, ind: number) => (
                      <option key={ind} value={baocaokqgh.MaBCKQGH}>
                        {handleTime(baocaokqgh.Ngay)}-{baocaokqgh.DiaDiem}
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
    </InputBaoCaoKQGHCBCSStyled>
  );
}
