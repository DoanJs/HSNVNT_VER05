import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createBienBanRKN_CBCS,
  MUTATION_editBienBanRKN_CBCS,
  QUERY_bienBanRKNs,
  QUERY_bienBanRKNs_cbcss,
  QUERY_cbcss,
} from "../../graphql/documentNode";
import {
  handleSearch,
  handleTime,
  showNotification,
} from "../../utils/functions";
import { FI_BienBanRKN_CBCS } from "./FormInitial";

const InputBienBanRKNCBCSStyled = styled.div`
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

export default function InputBienBanRKNCBCS() {
  const navigate = useNavigate();
  const { data: Data_bienBanRKNs, error } = useQuery(QUERY_bienBanRKNs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_cbcss } = useQuery(QUERY_cbcss, {
    variables: { utilsParams: {} },
  });

  const { data: Data_bienBanRKNs_cbcss } = useQuery(QUERY_bienBanRKNs_cbcss, {
    variables: { utilsParams: {} },
  });
  const [createBienBanRKN_CBCS] = useMutation(MUTATION_createBienBanRKN_CBCS, {
    refetchQueries: [
      { query: QUERY_bienBanRKNs, variables: { utilsParams: {} } },
      { query: QUERY_bienBanRKNs_cbcss, variables: { utilsParams: {} } },
    ],
  });
  const [editBienBanRKN_CBCS] = useMutation(MUTATION_editBienBanRKN_CBCS, {
    refetchQueries: [
      { query: QUERY_bienBanRKNs, variables: { utilsParams: {} } },
      { query: QUERY_bienBanRKNs_cbcss, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [bienBanRKNs, set_bienBanRKNs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_BienBanRKN_CBCS);
  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_bienBanRKNs(
      handleSearch("BienBanRKNs", Data_bienBanRKNs.bienBanRKNs, e.target.value)
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
    if (form.MaCBCS && form.MaBBRKN) {
      if (
        Data_bienBanRKNs_cbcss.bienBanRKNs_cbcss?.filter(
          (obj: any) =>
            obj.MaBBRKN === form.MaBBRKN && obj.MaCBCS === form.MaCBCS
        ).length === 0
      ) {
        if (statusEdit) {
          editBienBanRKN_CBCS({
            variables: {
              bienBanRKN_CBCSInput: {
                MaBBRKN: form.MaBBRKN,
                MaCBCS: form.MaCBCS,
              },
              MaBBRKN: form.MaBBRKN_old,
              MaCBCS: form.MaCBCS_old,
            },
            onCompleted: () => {
              showNotification(
                "Chúc mừng",
                `Cập nhật "{ MaBBRKN: ${form.MaBBRKN}, MaCBCS: ${form.MaCBCS} }" thành công`,
                "success"
              );
              setStatusEdit(false);
              setForm(FI_BienBanRKN_CBCS);
            },
            onError: (error) => {
              console.log(error.message);
              showNotification("Lỗi!", error.message, "danger");
              navigate("/dangnhap");
            },
          });
        } else {
          createBienBanRKN_CBCS({
            variables: {
              bienBanRKN_CBCSInput: {
                MaBBRKN: form.MaBBRKN,
                MaCBCS: form.MaCBCS,
              },
            },
            onCompleted: () => {
              showNotification(
                "Chúc mừng",
                `Thêm mới "{ MaBBRKN: ${form.MaBBRKN}, MaCBCS: ${form.MaCBCS} }" thành công`,
                "success"
              );
              setForm(FI_BienBanRKN_CBCS);
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
      MaBBRKN: obj.MaBBRKN,
      MaCBCS: obj.MaCBCS,
      MaBBRKN_old: obj.MaBBRKN,
      MaCBCS_old: obj.MaCBCS,
    });
  };

  const onDeleteData = (obj: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: `{ MaBBRKN: ${obj.MaBBRKN}, MaCBCS: ${obj.MaCBCS} }`,
      Table: "BienBanRKNs_CBCSs",
      Form: {
        MaBBRKN: obj.MaBBRKN,
        MaCBCS: obj.MaCBCS,
      },
    });

  useEffect(() => {
    if (Data_bienBanRKNs) {
      set_bienBanRKNs(Data_bienBanRKNs.bienBanRKNs);
    }
  }, [Data_bienBanRKNs]);

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

  if (!Data_bienBanRKNs) return <Spinner />;
  return (
    <InputBienBanRKNCBCSStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>Danh sách biên bản RKN_CBCS tham gia hiện có: </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh BienBanRKN_CBCS..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">NgayBBRKN</th>
                  <th scope="col">CBCS</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...bienBanRKNs].reverse().map((bienbanrkn: any) => {
                  return bienbanrkn.ThanhPhanTDs?.map(
                    (ldtg: any, ind: number) => (
                      <tr key={ind}>
                        <td>
                          {bienbanrkn.Ngay && handleTime(bienbanrkn.Ngay)}
                        </td>
                        <td>{ldtg.HoTen}</td>
                        <td className="ip-ls-action">
                          <i
                            className="fa-solid fa-pen"
                            onClick={() =>
                              onEditData({
                                MaCBCS: ldtg.MaCBCS,
                                MaBBRKN: bienbanrkn.MaBBRKN,
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
                                MaCBCS: ldtg.MaCBCS,
                                MaBBRKN: bienbanrkn.MaBBRKN,
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
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} biên bản RKN_CBCS tham
            gia:
          </h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Mã biên bản RKN (MaBBRKN):</label>
              <select
                required
                value={form.MaBBRKN ? form.MaBBRKN : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaBBRKN"
              >
                <option defaultValue={""}>Chọn biên bản RKN</option>
                {Data_bienBanRKNs &&
                  Data_bienBanRKNs.bienBanRKNs.map(
                    (bienbanrkn: any, ind: number) => (
                      <option key={ind} value={bienbanrkn.MaBBRKN}>
                        {bienbanrkn.Ngay && handleTime(bienbanrkn.Ngay)}
                      </option>
                    )
                  )}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Mã CBCS tham gia (MaCBCS):
              </label>
              <select
                required
                value={form.MaCBCS ? form.MaCBCS : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaCBCS"
              >
                <option defaultValue={""}>Chọn CBCS tham gia</option>
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
    </InputBienBanRKNCBCSStyled>
  );
}
