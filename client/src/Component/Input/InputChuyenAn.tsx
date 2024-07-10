import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import moment from "moment";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createChuyenAn,
  MUTATION_editChuyenAn,
  QUERY_chuyenans,
  QUERY_tinhChatDTs,
} from "../../graphql/documentNode";
import {
  handleSearch,
  handleTime,
  showNotification,
} from "../../utils/functions";
import { FI_ChuyenAn } from "./FormInitial";

const InputChuyenAnstyled = styled.div`
  .ip-ls-old {
    border-bottom: 1px solid green;
    margin-bottom: 16px;
    b {
      color: red;
    }
    form {
      margin: 16px 0;
    }
    .ip-ls-old-content {
      max-height: 450px;
      overflow-y: scroll;
      .fa-table {
        cursor: pointer;
      }
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

export default function InputChuyenAn() {
  const navigate = useNavigate();
  const { data: Data_chuyenans, error } = useQuery(QUERY_chuyenans, {
    variables: { utilsParams: {} },
  });
  const { data: Data_tinhChatDTs } = useQuery(QUERY_tinhChatDTs, {
    variables: { utilsParams: {} },
  });
  // ----------------------------------------------------
  const [createChuyenAn] = useMutation(MUTATION_createChuyenAn, {
    refetchQueries: [
      { query: QUERY_chuyenans, variables: { utilsParams: {} } },
    ],
  });
  const [editChuyenAn] = useMutation(MUTATION_editChuyenAn, {
    refetchQueries: [
      { query: QUERY_chuyenans, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [chuyenans, set_chuyenans] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_ChuyenAn);
  // --------------------------------------------------------------------------------------------
  const convertForm = (obj: any) => {
    let day = (time: any) => moment(time).date();
    let month = (time: any) => moment(time).month();
    let year = (time: any) => moment(time).year();
    return {
      MaCA: obj.MaCA,
      ThoiGianBD: obj.ThoiGianBD
        ? `${year(obj.ThoiGianBD)}-${
            month(obj.ThoiGianBD) < 9
              ? "0" + (month(obj.ThoiGianBD) + 1)
              : month(obj.ThoiGianBD) + 1
          }-${
            day(obj.ThoiGianBD) < 10
              ? "0" + day(obj.ThoiGianBD)
              : day(obj.ThoiGianBD)
          }`
        : "",
      BiSo: obj.BiSo,
      TenCA: obj.TenCA,
      NoiDung: obj.NoiDung,

      MaTCDT: obj.TinhChatDT?.MaTCDT,
    };
  };

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_chuyenans(
      handleSearch("ChuyenAns", Data_chuyenans.chuyenans, e.target.value)
    );
  };

  const changeForm = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "MaTCDT" ? Number(e.target.value) : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.TenCA !== "") {
      if (statusEdit) {
        const { MaCA, ...chuyenanInput } = form;
        console.log(form)
        editChuyenAn({
          variables: {
            chuyenanInput,
            id: MaCA,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật chuyên án "${data.editChuyenAn?.TenCA}" thành công`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_ChuyenAn);
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        const { MaCA, ...chuyenanInput } = form;
        createChuyenAn({
          variables: {
            chuyenanInput,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới chuyên án "${data.createChuyenAn?.TenCA}" thành công`,
              "success"
            );
            setForm(FI_ChuyenAn);
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      }
    } else {
      showNotification(
        "Cảnh báo",
        "Vui lòng nhập đúng và đầy đủ giá trị!",
        "warning"
      );
    }
  };

  const onEditData = (chuyenan: any) => {
    setStatusEdit(true);
    setForm(convertForm(chuyenan));
  };

  const onDeleteData = (chuyenan: any) => {
    const { MaCA, ...chuyenanInput } = convertForm(chuyenan);
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: `chuyên án ${chuyenan.TenCA}`,
      Table: "ChuyenAns",
      ID: chuyenan.MaCA,
      Form: chuyenanInput,
    });
  };

  useEffect(() => {
    if (Data_chuyenans) {
      set_chuyenans(Data_chuyenans.chuyenans);
    }
  }, [Data_chuyenans]);

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

  if (!Data_chuyenans) return <Spinner />;
  return (
    <InputChuyenAnstyled>
      <div className="row justify-content-center">
        <div className="col-12 ip-ls-old">
          <h5>
            Danh sách chuyên án hiện có <b>({chuyenans.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh ChuyenAn..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">TenCA</th>
                  <th scope="col">BiSo</th>
                  <th scope="col">ThoiGianBD</th>
                  <th scope="col">TinhChatDT</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...chuyenans].reverse().map((chuyenan: any, ind: number) => (
                  <tr key={ind} title={`MaCA: ${chuyenan.MaCA}`}>
                    <td>{chuyenan.TenCA}</td>
                    <td>{chuyenan.BiSo}</td>
                    <td>
                      {chuyenan.ThoiGianBD && handleTime(chuyenan.ThoiGianBD)}
                    </td>
                    <td>{chuyenan.TinhChatDT?.TinhChat}</td>
                    <td className="ip-ls-action">
                      <i
                        className="fa-solid fa-pen"
                        onClick={() => onEditData(chuyenan)}
                        title="Sửa"
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        data-bs-toggle="modal"
                        data-bs-target="#modalDeleteData"
                        onClick={() => onDeleteData(chuyenan)}
                        title="Xóa"
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-12">
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} chuyên án:</h5>
          <form onSubmit={submitForm}>
            <div className="row">
              <div className="col-2 mb-3">
                <label className="form-label">Tên chuyên án:</label>
                <input
                  required
                  value={form.TenCA ? form.TenCA : ""}
                  name="TenCA"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Bí số:</label>
                <input
                  value={form.BiSo ? form.BiSo : ""}
                  name="BiSo"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Thời gian bắt đầu:</label>
                <input
                  value={form.ThoiGianBD ? form.ThoiGianBD : ""}
                  name="ThoiGianBD"
                  onChange={changeForm}
                  type="date"
                  className="form-control"
                />
              </div>
              {/* --------------------------Ma lien quan----------------------------------- */}
              <div className="col-2 mb-3">
                <label className="form-label">
                  Mã tính chất đối tượng (MaTCDT):
                </label>
                <select
                  value={form.MaTCDT ? form.MaTCDT : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaTCDT"
                >
                  <option defaultValue={""}>Chọn tính chất đối tượng</option>
                  {Data_tinhChatDTs &&
                    Data_tinhChatDTs.tinhChatDTs.map(
                      (tinhchatdt: any, ind: number) => (
                        <option key={ind} value={tinhchatdt.MaTCDT}>
                          {tinhchatdt.TinhChat}
                        </option>
                      )
                    )}
                </select>
              </div>
              <div className="row">
                <div className="col-12 mb-3">
                  <label className="form-label">Nội dung:</label>
                  <textarea
                    value={form.NoiDung ? form.NoiDung : ""}
                    name="NoiDung"
                    onChange={changeForm}
                    className="form-control"
                    rows={5}
                  ></textarea>
                </div>
              </div>
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
    </InputChuyenAnstyled>
  );
}
