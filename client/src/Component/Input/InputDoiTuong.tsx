import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import moment from "moment";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createDoiTuong,
  MUTATION_editDoiTuong,
  QUERY_dantocs,
  QUERY_doituongs,
  QUERY_loaiDTs,
  QUERY_tinhChatDTs,
  QUERY_tonGiaos,
} from "../../graphql/documentNode";
import {
  handleSearch,
  handleTime,
  showNotification,
} from "../../utils/functions";
import { FI_DoiTuong } from "./FormInitial";

const InputDoiTuongStyled = styled.div`
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

export default function InputDoiTuong() {
  const navigate = useNavigate();
  const { data: Data_doituongs, error } = useQuery(QUERY_doituongs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_dantocs } = useQuery(QUERY_dantocs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_tonGiaos } = useQuery(QUERY_tonGiaos, {
    variables: { utilsParams: {} },
  });
  const { data: Data_tinhChatDTs } = useQuery(QUERY_tinhChatDTs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_loaiDTs } = useQuery(QUERY_loaiDTs, {
    variables: { utilsParams: {} },
  });

  // ----------------------------------------------------
  const [createDoiTuong] = useMutation(MUTATION_createDoiTuong, {
    refetchQueries: [
      { query: QUERY_doituongs, variables: { utilsParams: {} } },
    ],
  });
  const [editDoiTuong] = useMutation(MUTATION_editDoiTuong, {
    refetchQueries: [
      { query: QUERY_doituongs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [doituongs, set_doituongs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_DoiTuong);
  // --------------------------------------------------------------------------------------------
  const convertForm = (obj: any) => {
    let day = moment(obj.NgaySinh).date();
    let month = moment(obj.NgaySinh).month();
    let year = moment(obj.NgaySinh).year();
    return {
      MaDoiTuong: obj.MaDoiTuong,
      TenDT: obj.TenDT,
      TenKhac: obj.TenKhac,
      GioiTinh: obj.GioiTinh,
      NgaySinh: obj.NgaySinh
        ? `${year}-${month < 9 ? "0" + (month + 1) : month + 1}-${
            day < 10 ? "0" + day : day
          }`
        : "",
      NoiSinh: obj.NoiSinh,
      CMCCHC: obj.CMCCHC,
      AnhDD: obj.AnhDD,
      QueQuan: obj.QueQuan,
      HKTT: obj.HKTT,
      NoiO: obj.NoiO,
      NgheNghiep: obj.NgheNghiep,
      ChucVu: obj.ChucVu,
      NoiLamViec: obj.NoiLamViec,
      PhuongTien: obj.PhuongTien,
      SDT: obj.SDT,
      ThongTinKhac: obj.ThongTinKhac,

      MaDT: obj.DanToc?.MaDT,
      MaTG: obj.TonGiao?.MaTG,
      MaTCDT: obj.TinhChatDT?.MaTCDT,
      MaLoai: obj.LoaiDT?.MaLoaiDT,
    };
  };

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_doituongs(
      handleSearch("DoiTuongs", Data_doituongs.doituongs, e.target.value)
    );
  };

  const changeForm = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "GioiTinh" ||
        e.target.name === "MaDT" ||
        e.target.name === "MaTG" ||
        e.target.name === "MaTCDT" ||
        e.target.name === "MaLoai"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.TenDT.trim() !== "") {
      if (statusEdit) {
        const { MaDoiTuong, ...doituongInput } = form;
        editDoiTuong({
          variables: {
            doituongInput,
            id: MaDoiTuong,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật đối tượng "${data.editDoiTuong.TenDT}" thành công`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_DoiTuong);
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        const { MaDoiTuong, ...doituongInput } = form;
        createDoiTuong({
          variables: {
            doituongInput,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới đối tượng "${data.createDoiTuong.TenDT}" thành công`,
              "success"
            );
            setForm(FI_DoiTuong);
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

  const onEditData = (doituong: any) => {
    setStatusEdit(true);
    setForm(convertForm(doituong));
  };

  const onDeleteData = (doituong: any) => {
    const { MaDoiTuong, ...inputDoiTuong } = convertForm(doituong);
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: doituong.TenDT,
      Table: "DoiTuongs",
      ID: doituong.MaDoiTuong,
      Form: inputDoiTuong,
    });
  };

  useEffect(() => {
    if (Data_doituongs) {
      set_doituongs(Data_doituongs.doituongs);
    }
  }, [Data_doituongs]);

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

  if (!Data_doituongs) return <Spinner />;
  return (
    <InputDoiTuongStyled>
      <div className="row justify-content-center">
        <div className="col-12 ip-ls-old">
          <h5>
            Danh sách đối tượng hiện có <b>({doituongs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh DoiTuong..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">TenDT/TenKhac</th>
                  <th scope="col">NgaySinh/GioiTinh</th>
                  <th scope="col">NoiO</th>
                  <th scope="col">NgheNghiep/NoiLamViec</th>
                  <th scope="col">TinhChatDT</th>
                  <th scope="col">LoaiDT</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...doituongs].reverse().map((doituong: any, ind: number) => (
                  <tr key={ind} title={`MaDoiTuong: ${doituong.MaDoiTuong}`}>
                    <td title={doituong.TenKhac}>{doituong.TenDT}</td>
                    <td
                      title={
                        doituong.GioiTinh
                          ? Number(doituong.GioiTinh) === 1
                            ? "Nữ"
                            : "Nam"
                          : ""
                      }
                    >
                      {doituong.NgaySinh && handleTime(doituong.NgaySinh)}
                    </td>
                    <td>{doituong.NoiO}</td>
                    <td title={doituong.ChucVu + "-" + doituong.NoiLamViec}>
                      {doituong.NgheNghiep}
                    </td>
                    <td>{doituong.TinhChatDT?.TinhChat}</td>
                    <td>{doituong.LoaiDT?.LoaiDT}</td>
                    <td className="ip-ls-action">
                      <i
                        className="fa-solid fa-pen"
                        onClick={() => onEditData(doituong)}
                        title="Sửa"
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        data-bs-toggle="modal"
                        data-bs-target="#modalDeleteData"
                        onClick={() => onDeleteData(doituong)}
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
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} đối tượng:</h5>
          <form onSubmit={submitForm}>
            <div className="row">
              <div className="col-2 mb-3">
                <label className="form-label">Tên đối tượng:</label>
                <input
                  required
                  value={form.TenDT ? form.TenDT : ""}
                  name="TenDT"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Tên khác:</label>
                <input
                  value={form.TenKhac ? form.TenKhac : ""}
                  name="TenKhac"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Ảnh đại diện:</label>
                <input
                  value={form.AnhDD ? form.AnhDD : ""}
                  name="AnhDD"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Ngày sinh:</label>
                <input
                  value={form.NgaySinh ? form.NgaySinh : ""}
                  name="NgaySinh"
                  onChange={changeForm}
                  type="date"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Nơi sinh:</label>
                <input
                  value={form.NoiSinh ? form.NoiSinh : ""}
                  name="NoiSinh"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Giới tính:</label>
                <select
                  value={form.GioiTinh ? form.GioiTinh : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="GioiTinh"
                >
                  <option defaultValue={""}>Chọn giới tính</option>
                  <option value={2}>Nam</option>
                  <option value={1}>Nữ</option>
                </select>
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Quê quán:</label>
                <input
                  value={form.QueQuan ? form.QueQuan : ""}
                  name="QueQuan"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Hộ khẩu thường trú:</label>
                <input
                  value={form.HKTT ? form.HKTT : ""}
                  name="HKTT"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Nơi ở:</label>
                <input
                  value={form.NoiO ? form.NoiO : ""}
                  name="NoiO"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">SĐT:</label>
                <input
                  value={form.SDT ? form.SDT : ""}
                  name="SDT"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">CMCCHC:</label>
                <input
                  value={form.CMCCHC ? form.CMCCHC : ""}
                  name="CMCCHC"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Nghề nghiệp:</label>
                <input
                  value={form.NgheNghiep ? form.NgheNghiep : ""}
                  name="NgheNghiep"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Chức vụ:</label>
                <input
                  value={form.ChucVu ? form.ChucVu : ""}
                  name="ChucVu"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Nơi làm việc:</label>
                <input
                  value={form.NoiLamViec ? form.NoiLamViec : ""}
                  name="NoiLamViec"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Phương tiện:</label>
                <input
                  value={form.PhuongTien ? form.PhuongTien : ""}
                  name="PhuongTien"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              {/* --------------------------Ma lien quan----------------------------------- */}
              <div className="col-2 mb-3">
                <label className="form-label">Mã tôn giáo (MaTG):</label>
                <select
                  value={form.MaTG ? form.MaTG : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaTG"
                >
                  <option defaultValue={""}>Chọn tôn giáo</option>
                  {Data_tonGiaos &&
                    Data_tonGiaos.tonGiaos.map((tongiao: any, ind: number) => (
                      <option key={ind} value={tongiao.MaTG}>
                        {tongiao.TenTG}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Mã TCDT (MaTCDT):</label>
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
                      (tinhchat: any, ind: number) => (
                        <option key={ind} value={tinhchat.MaTCDT}>
                          {tinhchat.TinhChat}
                        </option>
                      )
                    )}
                </select>
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">
                  Mã loại đối tượng (MaLoai):
                </label>
                <select
                  value={form.MaLoai ? form.MaLoai : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaLoai"
                >
                  <option defaultValue={""}>Chọn loại đối tượng</option>
                  {Data_loaiDTs &&
                    Data_loaiDTs.loaiDTs.map((loaiDT: any, ind: number) => (
                      <option key={ind} value={loaiDT.MaLoaiDT}>
                        {loaiDT.LoaiDT}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-3 mb-3">
                <label className="form-label">Mã dân tộc (MaDT):</label>
                <select
                  value={form.MaDT ? form.MaDT : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaDT"
                >
                  <option defaultValue={""}>Chọn dân tộc</option>
                  {Data_dantocs &&
                    Data_dantocs.dantocs.map((dantoc: any, ind: number) => (
                      <option key={ind} value={dantoc.MaDT}>
                        {dantoc.TenDT} - {dantoc.QuocTich?.TenQT}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-9 mb-3">
                <label className="form-label">Thông tin khác:</label>
                <textarea
                  value={form.ThongTinKhac ? form.ThongTinKhac : ""}
                  name="ThongTinKhac"
                  onChange={changeForm}
                  className="form-control"
                  rows={5}
                ></textarea>
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
    </InputDoiTuongStyled>
  );
}
