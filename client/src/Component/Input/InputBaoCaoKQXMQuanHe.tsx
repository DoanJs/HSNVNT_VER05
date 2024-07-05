import { useQuery, useReactiveVar } from "@apollo/client";
import moment from "moment";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  QUERY_baocaoKQXMQuanHes,
  QUERY_baocaoPHQHs,
  QUERY_caQHvaTDs,
  QUERY_cbcss,
  QUERY_dois,
  QUERY_doituongs,
  QUERY_quyetdinhTSNTs,
} from "../../graphql/documentNode";
import {
  handleSearch,
  handleTime,
  showNotification,
} from "../../utils/functions";
import { FI_BaoCaoKQXMQuanHe } from "./FormInitial";

const InputBaoCaoKQXMQuanHestyled = styled.div`
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

export default function InputBaoCaoKQXMQuanHe() {
  const navigate = useNavigate();
  const { data: Data_baocaoKQXMQuanHes, error } = useQuery(
    QUERY_baocaoKQXMQuanHes,
    {
      variables: { utilsParams: {} },
    }
  );
  console.log(Data_baocaoKQXMQuanHes)
  const { data: Data_caQHvaTDs } = useQuery(QUERY_caQHvaTDs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_dois } = useQuery(QUERY_dois, {
    variables: { utilsParams: {} },
  });
  const { data: Data_doituongs } = useQuery(QUERY_doituongs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_quyetdinhTSNTs } = useQuery(QUERY_quyetdinhTSNTs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_baocaoPHQHs } = useQuery(QUERY_baocaoPHQHs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_cbcss } = useQuery(QUERY_cbcss, {
    variables: { utilsParams: {} },
  });
  // ----------------------------------------------------
  // const [createQuyetDinhTSNT] = useMutation(MUTATION_createQuyetDinhTSNT, {
  //   refetchQueries: [
  //     { query: QUERY_baocaoKQXMQuanHes, variables: { utilsParams: {} } },
  //   ],
  // });
  // const [editQuyetDinhTSNT] = useMutation(MUTATION_editQuyetDinhTSNT, {
  //   refetchQueries: [
  //     { query: QUERY_baocaoKQXMQuanHes, variables: { utilsParams: {} } },
  //   ],
  // });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [baocaoKQXMQuanHes, set_baocaoKQXMQuanHes] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_BaoCaoKQXMQuanHe);
  // --------------------------------------------------------------------------------------------
  const convertForm = (obj: any) => {
    let day = (time: any) => moment(time).date();
    let month = (time: any) => moment(time).month();
    let year = (time: any) => moment(time).year();
    return {
      MaQD: obj.MaQD,
      So: obj.So,
      Ngay: obj.Ngay
        ? `${year(obj.Ngay)}-${
            month(obj.Ngay) < 9
              ? "0" + (month(obj.Ngay) + 1)
              : month(obj.Ngay) + 1
          }-${day(obj.Ngay) < 10 ? "0" + day(obj.Ngay) : day(obj.Ngay)}`
        : "",
      BiDanh: obj.BiDanh,
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
      ThoiGianKT: obj.ThoiGianKT
        ? `${year(obj.ThoiGianKT)}-${
            month(obj.ThoiGianKT) < 9
              ? "0" + (month(obj.ThoiGianKT) + 1)
              : month(obj.ThoiGianKT) + 1
          }-${
            day(obj.ThoiGianKT) < 10
              ? "0" + day(obj.ThoiGianKT)
              : day(obj.ThoiGianKT)
          }`
        : "",
      NhiemVuCT: obj.NhiemVuCT,

      MaDN: obj.DeNghiTSNT?.MaDN,
      MaLanhDaoPD: obj.LanhDaoPD?.MaCBCS,
      MaDoi: obj.Doi?.MaDoi,
      MaCATTPvaTD: obj.CATTPvaTD?.MaCATTPvaTD,
      MaCAQHvaTD: obj.CAQHvaTD?.MaCAQHvaTD,
      MaDoiTuong: obj.DoiTuong?.MaDoiTuong,
      MaDN_edit: obj.DeNghiTSNT?.MaDN,
    };
  };

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_baocaoKQXMQuanHes(
      handleSearch(
        "BaoCaoKQXMQuanHes",
        Data_baocaoKQXMQuanHes.baocaoKQXMQuanHes,
        e.target.value
      )
    );
  };

  const changeForm = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "MaCAQHvaTD" ||
        e.target.name === "MaDoi" ||
        e.target.name === "MaDoiTuong" ||
        e.target.name === "MaQD" ||
        e.target.name === "MaBCPHQH" ||
        e.target.name === "MaTSXacMinh" ||
        e.target.name === "MaLanhDaoPD" ||
        e.target.name === "MaBCHPhuTrach"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (form.So.trim() !== "") {
    //   if (
    //     // check one-to-one with MaDN
    //     baocaoKQXMQuanHes.filter(
    //       (quyetdinhTSNT: any) => quyetdinhTSNT.DeNghiTSNT?.MaDN === form.MaDN
    //     ).length === 0 ||
    //     (baocaoKQXMQuanHes.filter(
    //       (quyetdinhTSNT: any) => quyetdinhTSNT.DeNghiTSNT?.MaDN === form.MaDN
    //     ).length !== 0 &&
    //       form.MaDN_edit === form.MaDN)
    //   ) {
    //     if (statusEdit) {
    //       const { MaQD, MaDN_edit, ...quyetdinhTSNTInput } = form;
    //       editQuyetDinhTSNT({
    //         variables: {
    //           quyetdinhTSNTInput,
    //           id: MaQD,
    //         },
    //         onCompleted: (data) => {
    //           showNotification(
    //             "Chúc mừng",
    //             `Cập nhật quyết định số "${data.editQuyetDinhTSNT.So}" thành công`,
    //             "success"
    //           );
    //           setStatusEdit(false);
    //           setForm(FI_QuyetDinhTSNT);
    //         },
    //         onError: (error) => {
    //           showNotification("Lỗi!", error.message, "danger");
    //           navigate("/dangnhap");
    //         },
    //       });
    //     } else {
    //       const { MaQD, MaDN_edit, ...quyetdinhTSNTInput } = form;
    //       createQuyetDinhTSNT({
    //         variables: {
    //           quyetdinhTSNTInput,
    //         },
    //         onCompleted: (data) => {
    //           showNotification(
    //             "Chúc mừng",
    //             `Thêm mới quyết định số "${data.createQuyetDinhTSNT.So}" thành công`,
    //             "success"
    //           );
    //           setForm(FI_QuyetDinhTSNT);
    //         },
    //         onError: (error) => {
    //           showNotification("Lỗi!", error.message, "danger");
    //           navigate("/dangnhap");
    //         },
    //       });
    //     }
    //   } else {
    //     showNotification(
    //       "Cảnh báo!",
    //       "Dữ liệu đã tồn tại, vui lòng kiểm tra lại !",
    //       "warning"
    //     );
    //   }
    // } else {
    //   showNotification(
    //     "Cảnh báo",
    //     "Vui lòng nhập đúng và đầy đủ giá trị!",
    //     "warning"
    //   );
    // }
  };

  const onEditData = (baocaokqxmqh: any) => {
    setStatusEdit(true);
    console.log(baocaokqxmqh);
    // setForm(convertForm(quyetdinhTSNT));
  };

  const onDeleteData = (baocaokqxmqh: any) => {
    const { MaQD, MaDN_edit, ...inputBaoCaoKQXMQuanHe } =
      convertForm(baocaokqxmqh);
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: `quyết định TSNT số ${baocaokqxmqh.So}`,
      Table: "baocaoKQXMQuanHes",
      ID: baocaokqxmqh.MaQD,
      Form: inputBaoCaoKQXMQuanHe,
    });
  };

  useEffect(() => {
    if (Data_baocaoKQXMQuanHes) {
      set_baocaoKQXMQuanHes(Data_baocaoKQXMQuanHes.baocaoKQXMQuanHes);
    }
  }, [Data_baocaoKQXMQuanHes]);

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

  if (!Data_baocaoKQXMQuanHes) return <Spinner />;
  return (
    <InputBaoCaoKQXMQuanHestyled>
      <div className="row justify-content-center">
        <div className="col-12 ip-ls-old">
          <h5>
            Danh sách báo cáo kết quả xác minh quan hệ hiện có{" "}
            <b>({baocaoKQXMQuanHes.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh BaoCaoKQXMQuanHe..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">NgayBC</th>
                  <th scope="col">BiDanh</th>
                  <th scope="col">QuyetDinh</th>
                  <th scope="col">DoiTuong</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...baocaoKQXMQuanHes]
                  .reverse()
                  .map((baocaokqxmqh: any, ind: number) => (
                    <tr
                      key={ind}
                      title={`MaBCKQXMQH: ${baocaokqxmqh.MaBCKQXMQH}`}
                    >
                      <td>
                        {baocaokqxmqh.Ngay && handleTime(baocaokqxmqh.Ngay)}
                      </td>
                      <td>{baocaokqxmqh.BaoCaoPHQH?.BiDanh}</td>
                      <td>{baocaokqxmqh.QuyetDinhTSNT?.So}</td>
                      <td>{baocaokqxmqh.DoiTuong?.TenDT}</td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => onEditData(baocaokqxmqh)}
                          title="Sửa"
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeleteData"
                          onClick={() => onDeleteData(baocaokqxmqh)}
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
          <h5>
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} báo cáo kết quả xác minh
            quan hệ:
          </h5>
          <form onSubmit={submitForm}>
            <div className="row">
              <div className="col-2 mb-3">
                <label className="form-label">Ngày báo cáo:</label>
                <input
                  required
                  value={form.Ngay ? form.Ngay : ""}
                  name="Ngay"
                  onChange={changeForm}
                  type="date"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Họ tên (HoTen):</label>
                <input
                  value={form.HoTen ? form.HoTen : ""}
                  name="HoTen"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Tên khác (TenKhac):</label>
                <input
                  value={form.TenKhac ? form.TenKhac : ""}
                  name="TenKhac"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Giới tính (GioiTinh):</label>
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
                <label className="form-label">Năm sinh (NamSinh):</label>
                <input
                  value={form.NamSinh ? form.NamSinh : ""}
                  name="NamSinh"
                  onChange={changeForm}
                  type="date"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Quê quán (QueQuan):</label>
                <input
                  value={form.QueQuan ? form.QueQuan : ""}
                  name="QueQuan"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">HKTT (HKTT):</label>
                <input
                  value={form.HKTT ? form.HKTT : ""}
                  name="HKTT"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Nơi ở (NoiO):</label>
                <input
                  value={form.NoiO ? form.NoiO : ""}
                  name="NoiO"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Nghề nghiệp (NgheNghiep):</label>
                <input
                  value={form.NgheNghiep ? form.NgheNghiep : ""}
                  name="NgheNghiep"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Chức vụ (ChucVu):</label>
                <input
                  value={form.ChucVu ? form.ChucVu : ""}
                  name="ChucVu"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Nơi làm việc (NoiLamViec):</label>
                <input
                  value={form.NoiLamViec ? form.NoiLamViec : ""}
                  name="NoiLamViec"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Biện pháp XM (BienPhapXM):</label>
                <input
                  value={form.BienPhapXM ? form.BienPhapXM : ""}
                  name="BienPhapXM"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              {/* --------------------------Ma lien quan----------------------------------- */}
              <div className="col-2 mb-3">
                <label className="form-label">Mã đối tượng (MaDoiTuong):</label>
                <select
                  value={form.MaDoiTuong ? form.MaDoiTuong : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaDoiTuong"
                >
                  <option defaultValue={""}>Chọn đối tượng</option>
                  {Data_doituongs &&
                    Data_doituongs.doituongs.map(
                      (doituong: any, ind: number) => (
                        <option key={ind} value={doituong.MaDoiTuong}>
                          {doituong.TenDT}
                        </option>
                      )
                    )}
                </select>
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Mã quyết định TSNT (MaQD):</label>
                <select
                  value={form.MaQD ? form.MaQD : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaQD"
                >
                  <option defaultValue={""}>Chọn quyết định TSNT</option>
                  {Data_quyetdinhTSNTs &&
                    Data_quyetdinhTSNTs.quyetdinhTSNTs.map(
                      (quyetdinhtsnt: any, ind: number) => (
                        <option key={ind} value={quyetdinhtsnt.MaQD}>
                          {quyetdinhtsnt.So}
                        </option>
                      )
                    )}
                </select>
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Mã lãnh đạo (MaLanhDaoPD):</label>
                <select
                  value={form.MaLanhDaoPD ? form.MaLanhDaoPD : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaLanhDaoPD"
                >
                  <option defaultValue={""}>Chọn lãnh đạo phê duyệt</option>
                  {Data_cbcss &&
                    Data_cbcss.cbcss.map((cbcs: any, ind: number) => (
                      <option key={ind} value={cbcs.MaCBCS}>
                        {cbcs.HoTen}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">
                  Mã TS xác minh (MaTSXacMinh):
                </label>
                <select
                  value={form.MaTSXacMinh ? form.MaTSXacMinh : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaTSXacMinh"
                >
                  <option defaultValue={""}>Chọn trinh sát xác minh</option>
                  {Data_cbcss &&
                    Data_cbcss.cbcss.map((cbcs: any, ind: number) => (
                      <option key={ind} value={cbcs.MaCBCS}>
                        {cbcs.HoTen}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Mã BCH (MaBCHPhuTrach):</label>
                <select
                  value={form.MaBCHPhuTrach ? form.MaBCHPhuTrach : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaBCHPhuTrach"
                >
                  <option defaultValue={""}>Chọn BCH phụ trách</option>
                  {Data_cbcss &&
                    Data_cbcss.cbcss.map((cbcs: any, ind: number) => (
                      <option key={ind} value={cbcs.MaCBCS}>
                        {cbcs.HoTen}
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
                        {doi.TenDoi}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Mã BCPHQH (MaBCPHQH):</label>
                <select
                  value={form.MaBCPHQH ? form.MaBCPHQH : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaBCPHQH"
                >
                  <option defaultValue={""}>Chọn BCPHQH tương ứng</option>
                  {Data_baocaoPHQHs &&
                    Data_baocaoPHQHs.baocaoPHQHs.map(
                      (baocaophqh: any, ind: number) => (
                        <option key={ind} value={baocaophqh.MaBCPHQH}>
                          {baocaophqh.BiDanh}
                        </option>
                      )
                    )}
                </select>
              </div>
              <div className="col-3 mb-3">
                <label className="form-label">Mã CAQHvaTD (MaCAQHvaTD):</label>
                <select
                  value={form.MaCAQHvaTD ? form.MaCAQHvaTD : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaCAQHvaTD"
                >
                  <option defaultValue={""}>
                    Chọn CA quận huyện và tương đương
                  </option>
                  {Data_caQHvaTDs &&
                    Data_caQHvaTDs.caQHvaTDs.map(
                      (caQHvaTD: any, ind: number) => (
                        <option key={ind} value={caQHvaTD.MaCAQHvaTD}>
                          {caQHvaTD.CAQHvaTD}
                        </option>
                      )
                    )}
                </select>
              </div>
              <div className="col-7 mb-3">
                <label className="form-label">Quan hệ GDXH (QuanHeGDXH):</label>
                <textarea
                  value={form.QuanHeGDXH ? form.QuanHeGDXH : ""}
                  name="QuanHeGDXH"
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
    </InputBaoCaoKQXMQuanHestyled>
  );
}
