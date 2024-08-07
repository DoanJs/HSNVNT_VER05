import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createDeNghiTSNT_TinhTP,
  MUTATION_editDeNghiTSNT_TinhTP,
  QUERY_denghiTSNTs,
  QUERY_denghiTSNTs_tinhTPs,
  QUERY_tinhTPs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_DeNghiTSNT_TinhTP } from "./FormInitial";

const InputDenghiTSNTTinhTPStyled = styled.div`
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

export default function InputDenghiTSNTTinhTP() {
  const navigate = useNavigate();
  const { data: Data_denghiTSNTs, error } = useQuery(QUERY_denghiTSNTs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_tinhTPs } = useQuery(QUERY_tinhTPs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_denghiTSNTs_tinhTPs } = useQuery(
    QUERY_denghiTSNTs_tinhTPs,
    {
      variables: { utilsParams: {} },
    }
  );
  const [createDeNghiTSNT_TinhTP] = useMutation(
    MUTATION_createDeNghiTSNT_TinhTP,
    {
      refetchQueries: [
        { query: QUERY_denghiTSNTs, variables: { utilsParams: {} } },
        { query: QUERY_denghiTSNTs_tinhTPs, variables: { utilsParams: {} } },
      ],
    }
  );
  const [editDeNghiTSNT_TinhTP] = useMutation(MUTATION_editDeNghiTSNT_TinhTP, {
    refetchQueries: [
      { query: QUERY_denghiTSNTs, variables: { utilsParams: {} } },
      { query: QUERY_denghiTSNTs_tinhTPs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [denghiTSNTs, set_denghiTSNTs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_DeNghiTSNT_TinhTP);
  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_denghiTSNTs(
      handleSearch("DeNghiTSNTs", Data_denghiTSNTs.denghiTSNTs, e.target.value)
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
    if (form.MaDN && form.MaTinhTP) {
      if (
        Data_denghiTSNTs_tinhTPs.denghiTSNTs_tinhTPs?.filter(
          (obj: any) => obj.MaTinhTP === form.MaTinhTP && obj.MaDN === form.MaDN
        ).length === 0
      ) {
        if (statusEdit) {
          editDeNghiTSNT_TinhTP({
            variables: {
              denghitsnt_tinhtpInput: {
                MaTinhTP: form.MaTinhTP,
                MaDN: form.MaDN,
              },
              MaTinhTP: form.MaTinhTP_old,
              MaDN: form.MaDN_old,
            },
            onCompleted: () => {
              showNotification(
                "Chúc mừng",
                `Cập nhật đề nghị TSNT_tỉnh TP "{ MaTinhTP: ${form.MaTinhTP}, MaDN: ${form.MaDN} }" thành công`,
                "success"
              );
              setStatusEdit(false);
              setForm(FI_DeNghiTSNT_TinhTP);
            },
            onError: (error) => {
              showNotification("Lỗi!", error.message, "danger");
              navigate("/dangnhap");
            },
          });
        } else {
          createDeNghiTSNT_TinhTP({
            variables: {
              denghitsnt_tinhtpInput: {
                MaTinhTP: form.MaTinhTP,
                MaDN: form.MaDN,
              },
            },
            onCompleted: () => {
              showNotification(
                "Chúc mừng",
                `Thêm mới đề nghị TSNT_tỉnh TP "{ MaTinhTP: ${form.MaTinhTP}, MaDN: ${form.MaDN} }" thành công`,
                "success"
              );
              setForm(FI_DeNghiTSNT_TinhTP);
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
      MaDN: obj.MaDN,
      MaTinhTP_old: obj.MaTinhTP,
      MaDN_old: obj.MaDN,
    });
  };

  const onDeleteData = (obj: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: `{MaTinhTP: ${obj.MaTinhTP}, MaDN: ${obj.MaDN}}`,
      Table: "DeNghiTSNTs_TinhTPs",
      Form: {
        MaTinhTP: obj.MaTinhTP,
        MaDN: obj.MaDN,
      },
    });

  useEffect(() => {
    if (Data_denghiTSNTs) {
      set_denghiTSNTs(Data_denghiTSNTs.denghiTSNTs);
    }
  }, [Data_denghiTSNTs]);

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

  if (!Data_denghiTSNTs) return <Spinner />;
  return (
    <InputDenghiTSNTTinhTPStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>Danh sách đề nghị trinh sát_tỉnh thành phố hiện có: </h5>
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
                  <th scope="col">SoDN</th>
                  <th scope="col">TinhTP</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...denghiTSNTs].reverse().map((denghitsnt: any) => {
                  return denghitsnt.DiaBanDNs?.map(
                    (tinhtp: any, ind: number) => (
                      <tr key={ind}>
                        <td>{denghitsnt.So}</td>
                        <td>{tinhtp.TinhTP}</td>
                        <td className="ip-ls-action">
                          <i
                            className="fa-solid fa-pen"
                            onClick={() =>
                              onEditData({
                                MaTinhTP: tinhtp.MaTinhTP,
                                MaDN: denghitsnt.MaDN,
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
                                MaDN: denghitsnt.MaDN,
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
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} đề nghị TSNT_tỉnh thành phố:
          </h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Mã đề nghị TSNT (MaDN):</label>
              <select
                required
                value={form.MaDN ? form.MaDN : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaDN"
              >
                <option defaultValue={""}>Chọn đề nghị TSNT</option>
                {Data_denghiTSNTs &&
                  Data_denghiTSNTs.denghiTSNTs.map(
                    (denghitsnt: any, ind: number) => (
                      <option key={ind} value={denghitsnt.MaDN}>
                        {denghitsnt.So}
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
    </InputDenghiTSNTTinhTPStyled>
  );
}
