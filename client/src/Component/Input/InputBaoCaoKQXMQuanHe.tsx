import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import moment from "moment";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createBaoCaoKQXMQuanHe,
  MUTATION_editBaoCaoKQXMQuanHe,
  QUERY_baocaoKQXMQuanHes,
  QUERY_baocaoPHQHs,
  QUERY_cbcss,
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
  const { data: Data_baocaoPHQHs } = useQuery(QUERY_baocaoPHQHs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_cbcss } = useQuery(QUERY_cbcss, {
    variables: { utilsParams: {} },
  });
  // ----------------------------------------------------
  const [createBaoCaoKQXMQuanHe] = useMutation(
    MUTATION_createBaoCaoKQXMQuanHe,
    {
      refetchQueries: [
        { query: QUERY_baocaoKQXMQuanHes, variables: { utilsParams: {} } },
      ],
    }
  );
  const [editBaoCaoKQXMQuanHe] = useMutation(MUTATION_editBaoCaoKQXMQuanHe, {
    refetchQueries: [
      { query: QUERY_baocaoKQXMQuanHes, variables: { utilsParams: {} } },
    ],
  });
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
      MaBCKQXMQH: obj.MaBCKQXMQH,
      Ngay: obj.Ngay
        ? `${year(obj.Ngay)}-${
            month(obj.Ngay) < 9
              ? "0" + (month(obj.Ngay) + 1)
              : month(obj.Ngay) + 1
          }-${day(obj.Ngay) < 10 ? "0" + day(obj.Ngay) : day(obj.Ngay)}`
        : "",
      HoTen: obj.HoTen,
      TenKhac: obj.TenKhac,
      GioiTinh: obj.GioiTinh,
      NamSinh: obj.NamSinh,
      QueQuan: obj.QueQuan,
      HKTT: obj.HKTT,
      NoiO: obj.NoiO,
      NgheNghiep: obj.NgheNghiep,
      ChucVu: obj.ChucVu,
      NoiLamViec: obj.NoiLamViec,
      QuanHeGDXH: obj.QuanHeGDXH,
      BienPhapXM: obj.BienPhapXM,

      MaBCPHQH: obj.BaoCaoPHQH?.MaBCPHQH,
      MaTSXacMinh: obj.TSXacMinh?.MaCBCS,
      MaLanhDaoPD: obj.LanhDaoPD?.MaCBCS,
      MaBCHPhuTrach: obj.BCHPhuTrach?.MaCBCS,

      MaBCPHQH_edit: obj.BaoCaoPHQH?.MaBCPHQH,
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
        e.target.name === "GioiTinh" ||
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
    if (form.Ngay !== "") {
      if (
        // check one-to-one with MaBCPHQH
        baocaoKQXMQuanHes.filter(
          (baocaokqxmqh: any) => baocaokqxmqh.BaoCaoPHQH?.MaBCPHQH === form.MaBCPHQH
        ).length === 0 ||
        (baocaoKQXMQuanHes.filter(
          (baocaokqxmqh: any) => baocaokqxmqh.BaoCaoPHQH?.MaBCPHQH === form.MaBCPHQH
        ).length !== 0 &&
          form.MaBCPHQH_edit === form.MaBCPHQH)
      ) {
        if (statusEdit) {
          const { MaBCKQXMQH, MaBCPHQH_edit, ...baocaoKQXMQuanHeInput } = form;
          editBaoCaoKQXMQuanHe({
            variables: {
              baocaoKQXMQuanHeInput,
              id: MaBCKQXMQH,
            },
            onCompleted: (data) => {
              showNotification(
                "Chúc mừng",
                `Cập nhật báo cáo kết quả xác minh quan hệ ngày "${
                  data.editBaoCaoKQXMQuanHe?.Ngay &&
                  handleTime(data.editBaoCaoKQXMQuanHe?.Ngay)
                }" thành công`,
                "success"
              );
              setStatusEdit(false);
              setForm(FI_BaoCaoKQXMQuanHe);
            },
            onError: (error) => {
              showNotification("Lỗi!", error.message, "danger");
              navigate("/dangnhap");
            },
          });
        } else {
          const { MaBCKQXMQH, MaBCPHQH_edit, ...baocaoKQXMQuanHeInput } = form;
          createBaoCaoKQXMQuanHe({
            variables: {
              baocaoKQXMQuanHeInput,
            },
            onCompleted: (data) => {
              showNotification(
                "Chúc mừng",
                `Thêm mới báo cáo kết quả xác minh quan hệ ngày "${
                  data.createBaoCaoKQXMQuanHe?.Ngay &&
                  handleTime(data.createBaoCaoKQXMQuanHe.Ngay)
                }" thành công`,
                "success"
              );
              setForm(FI_BaoCaoKQXMQuanHe);
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

  const onEditData = (baocaokqxmqh: any) => {
    setStatusEdit(true);
    setForm(convertForm(baocaokqxmqh));
  };

  const onDeleteData = (baocaokqxmqh: any) => {
    const { MaBCKQXMQH, MaBCPHQH_edit, ...inputBaoCaoKQXMQuanHe } =
      convertForm(baocaokqxmqh);
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: `báo cáo KQXMQH ngày ${handleTime(baocaokqxmqh.Ngay)}`,
      Table: "BaoCaoKQXMQuanHes",
      ID: baocaokqxmqh.MaBCKQXMQH,
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
                  <th scope="col">HoTen</th>
                  <th scope="col">BCPHQH</th>
                  <th scope="col">BiDanhDT</th>
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
                      <td>{baocaokqxmqh.HoTen}</td>
                      <td>{baocaokqxmqh.BaoCaoPHQH?.BiDanh}</td>
                      <td>
                        {
                          baocaokqxmqh.BaoCaoPHQH?.KetQuaTSNT?.KeHoachTSNT
                            ?.QuyetDinhTSNT?.BiDanh
                        }
                      </td>
                      <td>
                        {
                          baocaokqxmqh.BaoCaoPHQH?.KetQuaTSNT?.KeHoachTSNT
                            ?.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong?.TenDT
                        }
                      </td>
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
                <label className="form-label">Họ tên:</label>
                <input
                  value={form.HoTen ? form.HoTen : ""}
                  name="HoTen"
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
                <label className="form-label">Mã BCPHQH (MaBCPHQH):</label>
                <select
                  value={form.MaBCPHQH ? form.MaBCPHQH : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaBCPHQH"
                >
                  <option defaultValue={""}>Chọn BCPHQH</option>
                  {Data_baocaoPHQHs &&
                    Data_baocaoPHQHs.baocaoPHQHs.map(
                      (baocaophqh: any, ind: number) => (
                        <option key={ind} value={baocaophqh.MaBCPHQH}>
                          {baocaophqh.BiDanh} -{" "}
                          {
                            baocaophqh.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
                              ?.BiDanh
                          }{" "}
                          -{" "}
                          {
                            baocaophqh.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
                              ?.DeNghiTSNT?.DoiTuong?.TenDT
                          }
                        </option>
                      )
                    )}
                </select>
              </div>
              <div className="col-12 mb-3">
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
