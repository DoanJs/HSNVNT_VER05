import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import moment from "moment";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createBaoCaoKQXMDiaChi,
  MUTATION_editBaoCaoKQXMDiaChi,
  QUERY_baocaoKQXMDiaChis,
  QUERY_baocaoPHDCs,
  QUERY_cbcss,
} from "../../graphql/documentNode";
import {
  handleSearch,
  handleTime,
  showNotification,
} from "../../utils/functions";
import { FI_BaoCaoKQXMDiaChi } from "./FormInitial";

const InputBaoCaoKQXMDiaChistyled = styled.div`
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

export default function InputBaoCaoKQXMDiaChi() {
  const navigate = useNavigate();
  const { data: Data_baocaoKQXMDiaChis, error } = useQuery(
    QUERY_baocaoKQXMDiaChis,
    {
      variables: { utilsParams: {} },
    }
  );
  const { data: Data_baocaoPHDCs } = useQuery(QUERY_baocaoPHDCs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_cbcss } = useQuery(QUERY_cbcss, {
    variables: { utilsParams: {} },
  });
  // ----------------------------------------------------
  const [createBaoCaoKQXMDiaChi] = useMutation(
    MUTATION_createBaoCaoKQXMDiaChi,
    {
      refetchQueries: [
        { query: QUERY_baocaoKQXMDiaChis, variables: { utilsParams: {} } },
      ],
    }
  );
  const [editBaoCaoKQXMDiaChi] = useMutation(MUTATION_editBaoCaoKQXMDiaChi, {
    refetchQueries: [
      { query: QUERY_baocaoKQXMDiaChis, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [baocaoKQXMDiaChis, set_baocaoKQXMDiaChis] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_BaoCaoKQXMDiaChi);
  // --------------------------------------------------------------------------------------------
  const convertForm = (obj: any) => {
    let day = (time: any) => moment(time).date();
    let month = (time: any) => moment(time).month();
    let year = (time: any) => moment(time).year();
    return {
      MaBCKQXMDC: obj.MaBCKQXMDC,
      Ngay: obj.Ngay
        ? `${year(obj.Ngay)}-${
            month(obj.Ngay) < 9
              ? "0" + (month(obj.Ngay) + 1)
              : month(obj.Ngay) + 1
          }-${day(obj.Ngay) < 10 ? "0" + day(obj.Ngay) : day(obj.Ngay)}`
        : "",
      HoTenChuHo: obj.HoTenChuHo,
      TenKhac: obj.TenKhac,
      GioiTinh: obj.GioiTinh,
      NamSinh: obj.NamSinh,
      QueQuan: obj.QueQuan,
      HKTT: obj.HKTT,
      NoiO: obj.NoiO,
      NoiLamViec: obj.NoiLamViec,
      QuanHeGiaDinh: obj.QuanHeGiaDinh,
      HoKhacCungDC: obj.HoKhacCungDC,
      NgheNghiep: obj.NgheNghiep,
      BienPhapXM: obj.BienPhapXM,

      MaBCPHDC: obj.BaoCaoPHDC?.MaBCPHDC,
      MaTSXacMinh: obj.TSXacMinh?.MaCBCS,
      MaLanhDaoPD: obj.LanhDaoPD?.MaCBCS,
      MaBCHPhuTrach: obj.BCHPhuTrach?.MaCBCS,

      MaBCPHDC_edit: obj.BaoCaoPHDC?.MaBCPHDC,
    };
  };

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_baocaoKQXMDiaChis(
      handleSearch(
        "BaoCaoKQXMDiaChis",
        Data_baocaoKQXMDiaChis.baocaoKQXMDiaChis,
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
        e.target.name === "GioiTinh" ||
        e.target.name === "MaBCPHDC" ||
        e.target.name === "MaTSXacMinh" ||
        e.target.name === "MaLanhDaoPD" ||
        e.target.name === "MaBCHPhuTrach"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.Ngay !== "") {
      if (
        // check one-to-one with MaBCPHDC
        baocaoKQXMDiaChis.filter(
          (baocaokqxmdc: any) =>
            baocaokqxmdc.BaoCaoPHDC?.MaBCPHDC === form.MaBCPHDC
        ).length === 0 ||
        (baocaoKQXMDiaChis.filter(
          (baocaokqxmdc: any) =>
            baocaokqxmdc.BaoCaoPHDC?.MaBCPHDC === form.MaBCPHDC
        ).length !== 0 &&
          form.MaBCPHDC_edit === form.MaBCPHDC)
      ) {
        if (statusEdit) {
          const { MaBCKQXMDC, MaBCPHDC_edit, ...baocaoKQXMDiaChiInput } = form;
          editBaoCaoKQXMDiaChi({
            variables: {
              baocaoKQXMDiaChiInput,
              id: MaBCKQXMDC,
            },
            onCompleted: (data) => {
              showNotification(
                "Chúc mừng",
                `Cập nhật báo cáo kết quả xác minh địa chỉ ngày "${
                  data.editBaoCaoKQXMDiaChi?.Ngay &&
                  handleTime(data.editBaoCaoKQXMDiaChi?.Ngay)
                }" thành công`,
                "success"
              );
              setStatusEdit(false);
              setForm(FI_BaoCaoKQXMDiaChi);
            },
            onError: (error) => {
              showNotification("Lỗi!", error.message, "danger");
              navigate("/dangnhap");
            },
          });
        } else {
          const { MaBCKQXMDC, MaBCPHDC_edit, ...baocaoKQXMDiaChiInput } = form;
          createBaoCaoKQXMDiaChi({
            variables: {
              baocaoKQXMDiaChiInput,
            },
            onCompleted: (data) => {
              showNotification(
                "Chúc mừng",
                `Thêm mới báo cáo kết quả xác minh địa chỉ ngày "${
                  data.createBaoCaoKQXMDiaChi?.Ngay &&
                  handleTime(data.createBaoCaoKQXMDiaChi.Ngay)
                }" thành công`,
                "success"
              );
              setForm(FI_BaoCaoKQXMDiaChi);
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

  const onEditData = (baocaokqxmdc: any) => {
    setStatusEdit(true);
    setForm(convertForm(baocaokqxmdc));
  };

  const onDeleteData = (baocaokqxmdc: any) => {
    const { MaBCKQXMDC, MaBCPHDC_edit, ...inputBaoCaoKQXMDiaChi } =
      convertForm(baocaokqxmdc);
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: `báo cáo KQXMDC ngày ${handleTime(baocaokqxmdc.Ngay)}`,
      Table: "BaoCaoKQXMDiaChis",
      ID: baocaokqxmdc.MaBCKQXMDC,
      Form: inputBaoCaoKQXMDiaChi,
    });
  };

  useEffect(() => {
    if (Data_baocaoKQXMDiaChis) {
      set_baocaoKQXMDiaChis(Data_baocaoKQXMDiaChis.baocaoKQXMDiaChis);
    }
  }, [Data_baocaoKQXMDiaChis]);

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

  if (!Data_baocaoKQXMDiaChis) return <Spinner />;
  return (
    <InputBaoCaoKQXMDiaChistyled>
      <div className="row justify-content-center">
        <div className="col-12 ip-ls-old">
          <h5>
            Danh sách báo cáo kết quả xác minh địa chỉ hiện có{" "}
            <b>({baocaoKQXMDiaChis.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh BaoCaoKQXMDiaChi..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">NgayBC</th>
                  <th scope="col">HoTenChuHo</th>
                  <th scope="col">BCPHDC</th>
                  <th scope="col">BiDanhDT</th>
                  <th scope="col">DoiTuong</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...baocaoKQXMDiaChis]
                  .reverse()
                  .map((baocaokqxmdc: any, ind: number) => (
                    <tr
                      key={ind}
                      title={`MaBCKQXMDC: ${baocaokqxmdc.MaBCKQXMDC}`}
                    >
                      <td>
                        {baocaokqxmdc.Ngay && handleTime(baocaokqxmdc.Ngay)}
                      </td>
                      <td>{baocaokqxmdc.HoTenChuHo}</td>
                      <td>{baocaokqxmdc.BaoCaoPHDC?.DiaChi}</td>
                      <td>
                        {
                          baocaokqxmdc.BaoCaoPHDC?.KetQuaTSNT?.KeHoachTSNT
                            ?.QuyetDinhTSNT?.BiDanh
                        }
                      </td>
                      <td>
                        {
                          baocaokqxmdc.BaoCaoPHDC?.KetQuaTSNT?.KeHoachTSNT
                            ?.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong?.TenDT
                        }
                      </td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => onEditData(baocaokqxmdc)}
                          title="Sửa"
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeleteData"
                          onClick={() => onDeleteData(baocaokqxmdc)}
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
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} báo cáo kết quả xác minh địa
            chỉ:
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
                <label className="form-label">Họ tên:</label>
                <input
                  value={form.HoTenChuHo ? form.HoTenChuHo : ""}
                  name="HoTenChuHo"
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
                <label className="form-label">Năm sinh:</label>
                <input
                  value={form.NamSinh ? form.NamSinh : ""}
                  name="NamSinh"
                  onChange={changeForm}
                  type="date"
                  className="form-control"
                />
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
                <label className="form-label">HKTT:</label>
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
                <label className="form-label">Biện pháp XM:</label>
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
                        {cbcs.HoTen} - {cbcs.Doi?.TenDoi} -{" "}
                        {cbcs.Doi?.CAQHvaTD?.CAQHvaTD}
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
                        {cbcs.HoTen} - {cbcs.Doi?.TenDoi} -{" "}
                        {cbcs.Doi?.CAQHvaTD?.CAQHvaTD}
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
                        {cbcs.HoTen} - {cbcs.Doi?.TenDoi} -{" "}
                        {cbcs.Doi?.CAQHvaTD?.CAQHvaTD}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Mã BCPHDC (MaBCPHDC):</label>
                <select
                  value={form.MaBCPHDC ? form.MaBCPHDC : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaBCPHDC"
                >
                  <option defaultValue={""}>Chọn BCPHQH</option>
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
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label">Quan hệ gia đình:</label>
                  <textarea
                    value={form.QuanHeGiaDinh ? form.QuanHeGiaDinh : ""}
                    name="QuanHeGiaDinh"
                    onChange={changeForm}
                    className="form-control"
                    rows={5}
                  ></textarea>
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">Hộ khác cùng địa chỉ:</label>
                  <textarea
                    value={form.HoKhacCungDC ? form.HoKhacCungDC : ""}
                    name="HoKhacCungDC"
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
    </InputBaoCaoKQXMDiaChistyled>
  );
}
