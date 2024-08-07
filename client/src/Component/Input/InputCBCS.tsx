import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import moment from "moment";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createCBCS,
  MUTATION_editCBCS,
  QUERY_capbacs,
  QUERY_cbcss,
  QUERY_chucvus,
  QUERY_dantocs,
  QUERY_dois,
  QUERY_tonGiaos,
} from "../../graphql/documentNode";
import {
  handleSearch,
  handleTime,
  showNotification,
} from "../../utils/functions";
import { FI_CBCS } from "./FormInitial";

const InputCBCSStyled = styled.div`
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

export default function InputCBCS() {
  const navigate = useNavigate();
  const { data: Data_cbcss, error } = useQuery(QUERY_cbcss, {
    variables: { utilsParams: {} },
  });
  const { data: Data_dantocs } = useQuery(QUERY_dantocs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_tonGiaos } = useQuery(QUERY_tonGiaos, {
    variables: { utilsParams: {} },
  });
  const { data: Data_dois } = useQuery(QUERY_dois, {
    variables: { utilsParams: {} },
  });
  const { data: Data_capbacs } = useQuery(QUERY_capbacs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_chucvus } = useQuery(QUERY_chucvus, {
    variables: { utilsParams: {} },
  });
  const [createCBCS] = useMutation(MUTATION_createCBCS, {
    refetchQueries: [{ query: QUERY_cbcss, variables: { utilsParams: {} } }],
  });
  const [editCBCS] = useMutation(MUTATION_editCBCS, {
    refetchQueries: [{ query: QUERY_cbcss, variables: { utilsParams: {} } }],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [cbcss, set_cbcss] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_CBCS);

  // --------------------------------------------------------------------------------------------

  const convertForm = (obj: any) => {
    let day = moment(obj.NgaySinh).date();
    let month = moment(obj.NgaySinh).month();
    let year = moment(obj.NgaySinh).year();
    return {
      MaCBCS: obj.MaCBCS,
      HoTen: obj.HoTen,
      TenKhac: obj.TenKhac,
      AnhDD: obj.AnhDD,
      NgaySinh: obj.NgaySinh
        ? `${year}-${month < 9 ? "0" + (month + 1) : month + 1}-${
            day < 10 ? "0" + day : day
          }`
        : "",
      GioiTinh: obj.GioiTinh,
      QueQuan: obj.QueQuan,
      HKTT: obj.HKTT,
      NoiO: obj.NoiO,
      SDT: obj.SDT,
      CMCCHC: obj.CMCCHC,
      PhuongTien: obj.PhuongTien,
      ThongTinChiTiet: obj.ThongTinChiTiet,
      MaDT: obj.DanToc?.MaDT,
      MaTG: obj.TonGiao?.MaTG,
      MaDoi: obj.Doi?.MaDoi,
      MaCB: obj.CapBac?.MaCB,
      MaCV: obj.ChucVu?.MaCV,
    };
  };

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_cbcss(handleSearch("CBCSs", Data_cbcss.cbcss, e.target.value));
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
        e.target.name === "MaDoi" ||
        e.target.name === "MaCB" ||
        e.target.name === "MaCV"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.HoTen.trim() !== "") {
      if (statusEdit) {
        const { MaCBCS, ...cbcsInput } = form;
        editCBCS({
          variables: {
            cbcsInput,
            id: MaCBCS,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật CBCS "${data.editCBCS.HoTen}" thành công`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_CBCS);
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        const { MaCBCS, ...cbcsInput } = form;
        createCBCS({
          variables: {
            cbcsInput,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới CBCS "${data.createCBCS.HoTen}" thành công`,
              "success"
            );
            setForm(FI_CBCS);
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

  const onEditData = (cbcs: any) => {
    setStatusEdit(true);
    setForm(convertForm(cbcs));
  };

  const onDeleteData = (cbcs: any) => {
    const { MaCBCS, ...inputCBCS } = convertForm(cbcs);
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: cbcs.HoTen,
      Table: "CBCSs",
      ID: cbcs.MaCBCS,
      Form: inputCBCS,
    });
  };

  useEffect(() => {
    if (Data_cbcss) {
      set_cbcss(Data_cbcss.cbcss);
    }
  }, [Data_cbcss]);

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

  if (!Data_cbcss) return <Spinner />;
  return (
    <InputCBCSStyled>
      <div className="row justify-content-center">
        <div className="col-12 ip-ls-old">
          <h5>
            Danh sách cán bộ chiến sĩ hiện có <b>({cbcss.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh CBCS..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">HoTen/TenKhac</th>
                  <th scope="col">NgaySinh/GioiTinh</th>
                  <th scope="col">ChucVu/CapBac</th>
                  <th scope="col">DonVi</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...cbcss].reverse().map((cbcs: any, ind: number) => (
                  <tr key={ind}>
                    <td title={cbcs.TenKhac}>{cbcs.HoTen}</td>
                    <td
                      title={
                        cbcs.GioiTinh
                          ? Number(cbcs.GioiTinh) === 1
                            ? "Nữ"
                            : "Nam"
                          : ""
                      }
                    >
                      {cbcs.NgaySinh && handleTime(cbcs.NgaySinh)}
                    </td>
                    <td title={cbcs.CapBac?.CapBac}>{cbcs.ChucVu?.ChucVu}</td>
                    <td>
                      {cbcs.Doi?.TenDoi} - {cbcs.Doi?.CAQHvaTD?.CAQHvaTD} -{" "}
                      {cbcs.Doi?.CAQHvaTD?.CATTPvaTD?.CATTPvaTD}
                    </td>
                    <td className="ip-ls-action">
                      <i
                        className="fa-solid fa-pen"
                        onClick={() => onEditData(cbcs)}
                        title="Sửa"
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        data-bs-toggle="modal"
                        data-bs-target="#modalDeleteData"
                        onClick={() => onDeleteData(cbcs)}
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
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} cán bộ chiến sĩ:</h5>
          <form onSubmit={submitForm}>
            <div className="row">
              <div className="col-2 mb-3">
                <label className="form-label">Họ và tên:</label>
                <input
                  required
                  value={form.HoTen ? form.HoTen : ""}
                  name="HoTen"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
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
                  aria-describedby="emailHelp"
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
                  aria-describedby="emailHelp"
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
                  aria-describedby="emailHelp"
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
                  aria-describedby="emailHelp"
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
                  aria-describedby="emailHelp"
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
                  aria-describedby="emailHelp"
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
                  aria-describedby="emailHelp"
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
                  aria-describedby="emailHelp"
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
                  aria-describedby="emailHelp"
                />
              </div>
              {/* --------------------------Ma lien quan----------------------------------- */}
              <div className="col-2 mb-3">
                <label className="form-label">Mã cấp bậc (MaCB):</label>
                <select
                  value={form.MaCB ? form.MaCB : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaCB"
                >
                  <option defaultValue={""}>Chọn cấp bậc</option>
                  {Data_capbacs &&
                    Data_capbacs.capbacs.map((capbac: any, ind: number) => (
                      <option key={ind} value={capbac.MaCB}>
                        {capbac.CapBac}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Mã chức vụ (MaCV):</label>
                <select
                  value={form.MaCV ? form.MaCV : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaCV"
                >
                  <option defaultValue={""}>Chọn chức vụ</option>
                  {Data_chucvus &&
                    Data_chucvus.chucvus.map((chucvu: any, ind: number) => (
                      <option key={ind} value={chucvu.MaCV}>
                        {chucvu.ChucVu}
                      </option>
                    ))}
                </select>
              </div>
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
              <div className="col-2 mb-3">
                <label className="form-label">Mã đội (MaDoi):</label>
                <select
                  value={form.MaDoi ? form.MaDoi : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaDoi"
                >
                  <option defaultValue={""}>Chọn đội</option>
                  {Data_dois &&
                    Data_dois.dois.map((doi: any, ind: number) => (
                      <option key={ind} value={doi.MaDoi}>
                        {doi.TenDoi} - {doi.CAQHvaTD?.CAQHvaTD} -{" "}
                        {doi.CAQHvaTD?.CATTPvaTD?.CATTPvaTD}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="col-12 mb-3">
              <label className="form-label">Thông tin chi tiết:</label>
              <textarea
                value={form.ThongTinChiTiet ? form.ThongTinChiTiet : ""}
                name="ThongTinChiTiet"
                onChange={changeForm}
                className="form-control"
                aria-describedby="emailHelp"
                rows={5}
              ></textarea>
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
    </InputCBCSStyled>
  );
}
