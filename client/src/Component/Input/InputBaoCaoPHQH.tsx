import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import moment from "moment";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createBaoCaoPHQH,
  MUTATION_editBaoCaoPHQH,
  QUERY_baocaoPHQHs,
  QUERY_cbcss,
  QUERY_ketquaTSNTs,
} from "../../graphql/documentNode";
import {
  handleSearch,
  handleTime,
  showNotification,
} from "../../utils/functions";
import { FI_BaoCaoPHQH } from "./FormInitial";

const InputBaoCaoPHQHstyled = styled.div`
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

export default function InputBaoCaoPHQH() {
  const navigate = useNavigate();
  const { data: Data_baocaoPHQHs, error } = useQuery(QUERY_baocaoPHQHs, {
    variables: { utilsParams: {} },
  });

  const { data: Data_ketquaTSNTs } = useQuery(QUERY_ketquaTSNTs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_cbcss } = useQuery(QUERY_cbcss, {
    variables: { utilsParams: {} },
  });
  // ----------------------------------------------------
  const [createBaoCaoPHQH] = useMutation(MUTATION_createBaoCaoPHQH, {
    refetchQueries: [
      { query: QUERY_baocaoPHQHs, variables: { utilsParams: {} } },
    ],
  });
  const [editBaoCaoPHQH] = useMutation(MUTATION_editBaoCaoPHQH, {
    refetchQueries: [
      { query: QUERY_baocaoPHQHs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [baocaoPHQHs, set_baocaoPHQHs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_BaoCaoPHQH);
  // --------------------------------------------------------------------------------------------
  const convertForm = (obj: any) => {
    let day = (time: any) => moment(time).date();
    let month = (time: any) => moment(time).month();
    let year = (time: any) => moment(time).year();
    return {
      MaBCPHQH: obj.MaBCPHQH,
      Ngay: obj.Ngay
        ? `${year(obj.Ngay)}-${
            month(obj.Ngay) < 9
              ? "0" + (month(obj.Ngay) + 1)
              : month(obj.Ngay) + 1
          }-${day(obj.Ngay) < 10 ? "0" + day(obj.Ngay) : day(obj.Ngay)}`
        : "",
      ThoiGianPH: obj.ThoiGianPH
        ? `${year(obj.ThoiGianPH)}-${
            month(obj.ThoiGianPH) < 9
              ? "0" + (month(obj.ThoiGianPH) + 1)
              : month(obj.ThoiGianPH) + 1
          }-${
            day(obj.ThoiGianPH) < 10
              ? "0" + day(obj.ThoiGianPH)
              : day(obj.ThoiGianPH)
          }`
        : "",
      DiaDiemPH: obj.DiaDiemPH,
      HinhAnh: obj.HinhAnh,
      DiaChiCC: obj.DiaChiCC,
      BiDanh: obj.BiDanh,
      TSNhanXet: obj.TSNhanXet,
      DDNhanDang: obj.DDNhanDang,

      MaKQ: obj.KetQuaTSNT?.MaKQ,
      MaLanhDaoPD: obj.LanhDaoPD?.MaCBCS,
      MaToTruongTS: obj.ToTruongTS?.MaCBCS,
    };
  };

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_baocaoPHQHs(
      handleSearch("BaoCaoPHQHs", Data_baocaoPHQHs.baocaoPHQHs, e.target.value)
    );
  };

  const changeForm = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "MaKQ" ||
        e.target.name === "MaLanhDaoPD" ||
        e.target.name === "MaToTruongTS"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.Ngay !== "") {
      if (statusEdit) {
        const { MaBCPHQH, ...baocaoPHQHInput } = form;
        editBaoCaoPHQH({
          variables: {
            baocaoPHQHInput,
            id: MaBCPHQH,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật báo cáo phát hiện quan hệ ngày "${
                data.editBaoCaoPHQH.Ngay && handleTime(data.editBaoCaoPHQH.Ngay)
              }" thành công!`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_BaoCaoPHQH);
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        const { MaBCPHQH, ...baocaoPHQHInput } = form;
        createBaoCaoPHQH({
          variables: {
            baocaoPHQHInput,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới báo cáo kết quả ghi hình ngày "${
                data.createBaoCaoPHQH.Ngay &&
                handleTime(data.createBaoCaoPHQH.Ngay)
              }" thành công`,
              "success"
            );
            setForm(FI_BaoCaoPHQH);
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

  const onEditData = (baocaophqh: any) => {
    setStatusEdit(true);
    setForm(convertForm(baocaophqh));
  };

  const onDeleteData = (baocaophqh: any) => {
    const { MaBCPHQH, ...inputBaoCaoPHQH } = convertForm(baocaophqh);
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: `báo cáo phát hiện quan hệ ngày ${
        baocaophqh.Ngay && handleTime(baocaophqh.Ngay)
      }`,
      Table: "BaoCaoPHQHs",
      ID: baocaophqh.MaBCPHQH,
      Form: inputBaoCaoPHQH,
    });
  };

  useEffect(() => {
    if (Data_baocaoPHQHs) {
      set_baocaoPHQHs(Data_baocaoPHQHs.baocaoPHQHs);
    }
  }, [Data_baocaoPHQHs]);

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

  if (!Data_baocaoPHQHs) return <Spinner />;
  return (
    <InputBaoCaoPHQHstyled>
      <div className="row justify-content-center">
        <div className="col-12 ip-ls-old">
          <h5>
            Danh sách báo cáo phát hiện quan hệ hiện có hiện có{" "}
            <b>({baocaoPHQHs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh BaoCaoPHQH..."
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
                  <th scope="col">ThoiGianPH</th>
                  <th scope="col">DiaDiemPH</th>
                  <th scope="col">BiDanhDT</th>
                  <th scope="col">DoiTuong</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...baocaoPHQHs]
                  .reverse()
                  .map((baocaophqh: any, ind: number) => (
                    <tr key={ind} title={`MaBCPHQH: ${baocaophqh.MaBCPHQH}`}>
                      <td>{baocaophqh.Ngay && handleTime(baocaophqh.Ngay)}</td>
                      <td>{baocaophqh.BiDanh}</td>
                      <td>
                        {baocaophqh.ThoiGianPH &&
                          handleTime(baocaophqh.ThoiGianPH)}
                      </td>
                      <td>{baocaophqh.DiaDiemPH}</td>
                      <td>
                        {
                          baocaophqh.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
                            ?.BiDanh
                        }
                      </td>
                      <td>
                        {
                          baocaophqh.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
                            ?.DeNghiTSNT?.DoiTuong?.TenDT
                        }
                      </td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => onEditData(baocaophqh)}
                          title="Sửa"
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeleteData"
                          onClick={() => onDeleteData(baocaophqh)}
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
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} báo cáo phát hiện quan hệ:
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
                <label className="form-label">Hình ảnh:</label>
                <input
                  value={form.HinhAnh ? form.HinhAnh : ""}
                  name="HinhAnh"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Thời gian PH:</label>
                <input
                  value={form.ThoiGianPH ? form.ThoiGianPH : ""}
                  name="ThoiGianPH"
                  onChange={changeForm}
                  type="date"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Địa điểm PH:</label>
                <input
                  value={form.DiaDiemPH ? form.DiaDiemPH : ""}
                  name="DiaDiemPH"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Địa chỉ cuối cùng:</label>
                <input
                  value={form.DiaChiCC ? form.DiaChiCC : ""}
                  name="DiaChiCC"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Bí danh:</label>
                <input
                  value={form.BiDanh ? form.BiDanh : ""}
                  name="BiDanh"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Đặc điểm nhận dạng:</label>
                <input
                  value={form.DDNhanDang ? form.DDNhanDang : ""}
                  name="DDNhanDang"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">TS nhận xét:</label>
                <input
                  value={form.TSNhanXet ? form.TSNhanXet : ""}
                  name="TSNhanXet"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              {/* --------------------------Ma lien quan----------------------------------- */}
              <div className="col-2 mb-3">
                <label className="form-label">Mã kết quả TSNT (MaKQ):</label>
                <select
                  value={form.MaKQ ? form.MaKQ : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaKQ"
                >
                  <option defaultValue={""}>Chọn kết quả TSNT</option>
                  {Data_ketquaTSNTs &&
                    Data_ketquaTSNTs.ketquaTSNTs.map(
                      (ketquatsnt: any, ind: number) => (
                        <option key={ind} value={ketquatsnt.MaKQ}>
                          {ketquatsnt.MaKQ} - {ketquatsnt.KeHoachTSNT?.So} -{" "}
                          {ketquatsnt.KeHoachTSNT?.QuyetDinhTSNT?.BiDanh} -{" "}
                          {
                            ketquatsnt.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT
                              ?.DoiTuong?.TenDT
                          }
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
                        {cbcs.HoTen} -{cbcs.Doi?.TenDoi} -{" "}
                        {cbcs.Doi?.CAQHvaTD?.CAQHvaTD}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-3 mb-3">
                <label className="form-label">
                  Mã tổ trưởng TS (MaToTruongTS):
                </label>
                <select
                  value={form.MaToTruongTS ? form.MaToTruongTS : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaToTruongTS"
                >
                  <option defaultValue={""}>Chọn CBCS</option>
                  {Data_cbcss &&
                    Data_cbcss.cbcss.map((cbcs: any, ind: number) => (
                      <option key={ind} value={cbcs.MaCBCS}>
                        {cbcs.HoTen} -{cbcs.Doi?.TenDoi} -{" "}
                        {cbcs.Doi?.CAQHvaTD?.CAQHvaTD}
                      </option>
                    ))}
                </select>
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
    </InputBaoCaoPHQHstyled>
  );
}
