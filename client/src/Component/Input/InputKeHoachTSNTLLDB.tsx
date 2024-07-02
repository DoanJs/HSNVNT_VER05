import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createKeHoachTSNT_LLDB,
  MUTATION_editKeHoachTSNT_LLDB,
  QUERY_kehoachTSNTs,
  QUERY_kehoachTSNTs_lldbs,
  QUERY_lldbs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_KeHoachTSNT_LLDB } from "./FormInitial";

const InputKeHoachTSNTLLDBStyled = styled.div`
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

export default function InputKeHoachTSNTLLDB() {
  const navigate = useNavigate();
  const { data: Data_kehoachTSNTs, error } = useQuery(QUERY_kehoachTSNTs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_kehoachTSNTs_lldbs } = useQuery(QUERY_kehoachTSNTs_lldbs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_lldbs } = useQuery(QUERY_lldbs, {
    variables: { utilsParams: {} },
  });
  const [createKeHoachTSNT_LLDB] = useMutation(
    MUTATION_createKeHoachTSNT_LLDB,
    {
      refetchQueries: [
        { query: QUERY_kehoachTSNTs, variables: { utilsParams: {} } },
        { query: QUERY_kehoachTSNTs_lldbs, variables: { utilsParams: {} } },
      ],
    }
  );
  const [editKeHoachTSNT_LLDB] = useMutation(MUTATION_editKeHoachTSNT_LLDB, {
    refetchQueries: [
      { query: QUERY_kehoachTSNTs, variables: { utilsParams: {} } },
      { query: QUERY_kehoachTSNTs_lldbs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [kehoachTSNTs, set_kehoachTSNTs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_KeHoachTSNT_LLDB);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_kehoachTSNTs(
      handleSearch(
        "KeHoachTSNTs",
        Data_kehoachTSNTs.kehoachTSNTs,
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
    if (form.MaKH && form.MaLLDB) {
      if (
        Data_kehoachTSNTs_lldbs.kehoachTSNTs_lldbs?.filter(
          (obj: any) => obj.MaLLDB === form.MaLLDB && obj.MaKH === form.MaKH
        ).length === 0
      ) {
        if (statusEdit) {
          editKeHoachTSNT_LLDB({
            variables: {
              kehoachtsnt_lldbInput: {
                MaLLDB: form.MaLLDB,
                MaKH: form.MaKH,
              },
              MaLLDB: form.MaLLDB_old,
              MaKH: form.MaKH_old,
            },
            onCompleted: () => {
              showNotification(
                "Chúc mừng",
                `Cập nhật "{ MaLLDB: ${form.MaLLDB}, MaKH: ${form.MaKH} }" thành công`,
                "success"
              );
              setStatusEdit(false);
              setForm(FI_KeHoachTSNT_LLDB);
            },
            onError: (error) => {
              showNotification("Lỗi!", error.message, "danger");
              navigate("/dangnhap");
            },
          });
        } else {
          createKeHoachTSNT_LLDB({
            variables: {
              kehoachtsnt_lldbInput: {
                MaLLDB: form.MaLLDB,
                MaKH: form.MaKH,
              },
            },
            onCompleted: () => {
              showNotification(
                "Chúc mừng",
                `Thêm mới "{ MaLLDB: ${form.MaLLDB}, MaKH: ${form.MaKH} }" thành công`,
                "success"
              );
              setForm(FI_KeHoachTSNT_LLDB);
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
      MaLLDB: obj.MaLLDB,
      MaKH: obj.MaKH,
      MaLLDB_old: obj.MaLLDB,
      MaKH_old: obj.MaKH,
    });
  };

  const onDeleteData = (obj: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: `{ MaLLDB: ${obj.MaLLDB}, MaKH: ${obj.MaKH} }`,
      Table: "KeHoachTSNTs_LLDBs",
      Form: {
        MaLLDB: obj.MaLLDB,
        MaKH: obj.MaKH,
      },
    });

  useEffect(() => {
    if (Data_kehoachTSNTs) {
      set_kehoachTSNTs(Data_kehoachTSNTs.kehoachTSNTs);
    }
  }, [Data_kehoachTSNTs]);

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

  if (!Data_kehoachTSNTs) return <Spinner />;
  return (
    <InputKeHoachTSNTLLDBStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>Danh sách kế hoạch TSNT_lực lượng đặc biệt hiện có: </h5>
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
                  <th scope="col">SoKH</th>
                  <th scope="col">BiDanh</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...kehoachTSNTs].reverse().map((kehoachtsnt: any) => {
                  return kehoachtsnt.LLDBs?.map((lldb: any, ind: number) => (
                    <tr key={ind}>
                      <td>{kehoachtsnt.So}</td>
                      <td>{lldb.BiDanh}</td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() =>
                            onEditData({
                              MaLLDB: lldb.MaLLDB,
                              MaKH: kehoachtsnt.MaKH,
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
                              MaLLDB: lldb.MaLLDB,
                              MaKH: kehoachtsnt.MaKH,
                            })
                          }
                          title="Xóa"
                        ></i>
                      </td>
                    </tr>
                  ));
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-6">
          <h5>
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} kế hoạch TSNT_lực lượng đặc
            biệt:
          </h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Mã kế hoạch TSNT (MaKH):</label>
              <select
                required
                value={form.MaKH ? form.MaKH : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaKH"
              >
                <option defaultValue={""}>Chọn kế hoạch TSNT</option>
                {Data_kehoachTSNTs &&
                  Data_kehoachTSNTs.kehoachTSNTs.map(
                    (kehoachtsnt: any, ind: number) => (
                      <option key={ind} value={kehoachtsnt.MaKH}>
                        {kehoachtsnt.So}
                      </option>
                    )
                  )}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Mã lực lượng đặc biệt (MaLLDB):
              </label>
              <select
                required
                value={form.MaLLDB ? form.MaLLDB : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaLLDB"
              >
                <option defaultValue={""}>Chọn lực lượng đặc biệt</option>
                {Data_lldbs &&
                  Data_lldbs.lldbs.map((lldb: any, ind: number) => (
                    <option key={ind} value={lldb.MaLLDB}>
                      {lldb.BiDanh}
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
    </InputKeHoachTSNTLLDBStyled>
  );
}
