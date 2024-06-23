import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createLLDB,
  MUTATION_editLLDB,
  QUERY_cbcss,
  QUERY_lldbs,
  QUERY_loaiLLDBs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";

const InputLLDBStyled = styled.div`
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

export default function InputLLDB() {
  const navigate = useNavigate();
  const { data: Data_lldbs, error } = useQuery(QUERY_lldbs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_loaiLLDBs } = useQuery(QUERY_loaiLLDBs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_cbcss } = useQuery(QUERY_cbcss, {
    variables: { utilsParams: {} },
  });
  const [createLLDB] = useMutation(MUTATION_createLLDB, {
    refetchQueries: [{ query: QUERY_lldbs, variables: { utilsParams: {} } }],
  });
  const [editLLDB] = useMutation(MUTATION_editLLDB, {
    refetchQueries: [{ query: QUERY_lldbs, variables: { utilsParams: {} } }],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [lldbs, set_lldbs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState({
    MaLLDB: 0,
    BiDanh: "",
    MaLoaiLLDB: 0,
    MaTSQuanLy: 0,
  });

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_lldbs(handleSearch("LLDBs", Data_lldbs.lldbs, e.target.value));
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log(form);
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "MaLoaiLLDB" || e.target.name === "MaTSQuanLy"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      form.BiDanh.trim() !== "" &&
      form.MaLoaiLLDB !== 0 &&
      form.MaTSQuanLy !== 0
    ) {
      if (statusEdit) {
        editLLDB({
          variables: {
            lldbInput: {
              BiDanh: form.BiDanh,
              MaLoaiLLDB: form.MaLoaiLLDB,
              MaTSQuanLy: form.MaTSQuanLy,
            },
            id: form.MaLLDB,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật "${data.editLLDB.BiDanh}" thành công`,
              "success"
            );
            setStatusEdit(false);
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        createLLDB({
          variables: {
            lldbInput: {
              BiDanh: form.BiDanh,
              MaLoaiLLDB: form.MaLoaiLLDB,
              MaTSQuanLy: form.MaTSQuanLy,
            },
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới "${data.createLLDB.BiDanh}" thành công`,
              "success"
            );
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      }
    } else {
      showNotification("Cảnh báo", "Vui lòng nhập đúng và đầy đủ giá trị!", "warning");
    }
  };

  const onEditData = (lldb: any) => {
    setStatusEdit(true);
    setForm({
      ...form,
      BiDanh: lldb.BiDanh,
      MaLoaiLLDB: lldb.LoaiLLDB.MaLoaiLLDB,
      MaTSQuanLy: lldb.TSQuanLy.MaCBCS,
      MaLLDB: lldb.MaLLDB,
    });
  };

  const onDeleteData = (lldb: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: lldb.BiDanh,
      Table: "LLDBs",
      ID: lldb.MaLLDB,
    });

  useEffect(() => {
    if (Data_lldbs) {
      set_lldbs(Data_lldbs.lldbs);
    }
  }, [Data_lldbs]);

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

  if (!Data_lldbs) return <Spinner />;
  return (
    <InputLLDBStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách lực lượng đặc biệt hiện có <b>({lldbs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh LLDB..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">MaLLDB</th>
                  <th scope="col">BiDanh</th>
                  <th scope="col">LoaiLLDB</th>
                  <th scope="col">TSQuanLy</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...lldbs].reverse().map((lldb: any, ind: number) => (
                  <tr key={ind}>
                    <td>{lldb.MaLLDB}</td>
                    <td>{lldb.BiDanh}</td>
                    <td>{lldb.LoaiLLDB.TenLLDB}</td>
                    <td>{lldb.TSQuanLy.HoTen}</td>
                    <td className="ip-ls-action">
                      <i
                        className="fa-solid fa-pen"
                        onClick={() => onEditData(lldb)}
                        title="Sửa"
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        data-bs-toggle="modal"
                        data-bs-target="#modalDeleteData"
                        onClick={() => onDeleteData(lldb)}
                        title="Xóa"
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-6">
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} lực lượng đặc biệt:</h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Lực lượng đặc biệt (LLDB):</label>
              <input
                required
                value={form.BiDanh}
                name="BiDanh"
                onChange={changeForm}
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Mã loại lực lượng đặc biệt (MaLoaiLLDB):
              </label>
              <select
                required
                value={form.MaLoaiLLDB}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaLoaiLLDB"
              >
                <option defaultValue={""}>Chọn loại lực lượng đặc biệt</option>
                {Data_loaiLLDBs &&
                  Data_loaiLLDBs.loaiLLDBs.map((loailldb: any, ind: number) => (
                    <option key={ind} value={loailldb.MaLoaiLLDB}>
                      {loailldb.TenLLDB}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Mã trinh sát quản lý (MaTSQuanLy):
              </label>
              <select
                required
                value={form.MaTSQuanLy}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaTSQuanLy"
              >
                <option defaultValue={""}>Chọn trinh sát quản lý</option>
                {Data_cbcss &&
                  Data_cbcss.cbcss.map((cbcs: any, ind: number) => (
                    <option key={ind} value={cbcs.MaCBCS}>
                      {cbcs.HoTen}
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
    </InputLLDBStyled>
  );
}
