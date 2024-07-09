import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import moment from "moment";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createBaoCaoKQGH,
  MUTATION_editBaoCaoKQGH,
  QUERY_baocaoKQGHs,
  QUERY_cbcss,
  QUERY_ketquaTSNTs,
} from "../../graphql/documentNode";
import {
  handleSearch,
  handleTime,
  showNotification,
} from "../../utils/functions";
import { FI_BaoCaoKQGH } from "./FormInitial";

const InputBaoCaoKQGHstyled = styled.div`
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

export default function InputBaoCaoKQGH() {
  const navigate = useNavigate();
  const { data: Data_baocaoKQGHs, error } = useQuery(QUERY_baocaoKQGHs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_ketquaTSNTs } = useQuery(QUERY_ketquaTSNTs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_cbcss } = useQuery(QUERY_cbcss, {
    variables: { utilsParams: {} },
  });
  // ----------------------------------------------------
  const [createBaoCaoKQGH] = useMutation(MUTATION_createBaoCaoKQGH, {
    refetchQueries: [
      { query: QUERY_baocaoKQGHs, variables: { utilsParams: {} } },
    ],
  });
  const [editBaoCaoKQGH] = useMutation(MUTATION_editBaoCaoKQGH, {
    refetchQueries: [
      { query: QUERY_baocaoKQGHs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [baocaoKQGHs, set_baocaoKQGHs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_BaoCaoKQGH);
  // --------------------------------------------------------------------------------------------
  const convertForm = (obj: any) => {
    let day = (time: any) => moment(time).date();
    let month = (time: any) => moment(time).month();
    let year = (time: any) => moment(time).year();
    return {
      MaBCKQGH: obj.MaBCKQGH,
      Ngay: obj.Ngay
        ? `${year(obj.Ngay)}-${
            month(obj.Ngay) < 9
              ? "0" + (month(obj.Ngay) + 1)
              : month(obj.Ngay) + 1
          }-${day(obj.Ngay) < 10 ? "0" + day(obj.Ngay) : day(obj.Ngay)}`
        : "",
      HinhAnh: obj.HinhAnh,
      MucDich: obj.MucDich,
      ThoiGian: obj.ThoiGian
        ? `${year(obj.ThoiGian)}-${
            month(obj.ThoiGian) < 9
              ? "0" + (month(obj.ThoiGian) + 1)
              : month(obj.ThoiGian) + 1
          }-${
            day(obj.ThoiGian) < 10 ? "0" + day(obj.ThoiGian) : day(obj.ThoiGian)
          }`
        : "",
      DiaDiem: obj.DiaDiem,
      PhuongTienSD: obj.PhuongTienSD,
      VaiNguyTrang: obj.VaiNguyTrang,
      NoiDung: obj.NoiDung,

      MaKQ: obj.KetQuaTSNT?.MaKQ,
      MaLanhDaoPD: obj.LanhDaoPD?.MaCBCS,
    };
  };

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_baocaoKQGHs(
      handleSearch("BaoCaoKQGHs", Data_baocaoKQGHs.baocaoKQGHs, e.target.value)
    );
  };

  const changeForm = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "MaKQ" || e.target.name === "MaLanhDaoPD"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.Ngay !== "") {
      if (statusEdit) {
        const { MaBCKQGH, ...baocaoKQGHInput } = form;
        editBaoCaoKQGH({
          variables: {
            baocaoKQGHInput,
            id: MaBCKQGH,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật báo cáo kết quả ghi hình ngày "${
                data.editBaoCaoKQGH.Ngay && handleTime(data.editBaoCaoKQGH.Ngay)
              }" thành công`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_BaoCaoKQGH);
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        const { MaBCKQGH, ...baocaoKQGHInput } = form;
        createBaoCaoKQGH({
          variables: {
            baocaoKQGHInput,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới báo cáo kết quả ghi hình ngày "${
                data.createBaoCaoKQGH.Ngay &&
                handleTime(data.createBaoCaoKQGH.Ngay)
              }" thành công`,
              "success"
            );
            setForm(FI_BaoCaoKQGH);
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

  const onEditData = (baocaokqgh: any) => {
    setStatusEdit(true);
    setForm(convertForm(baocaokqgh));
  };

  const onDeleteData = (baocaokqgh: any) => {
    const { MaBCKQGH, ...inputBaoCaoKQGH } = convertForm(baocaokqgh);
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: `báo cáo kết quả ghi hình ngày ${
        baocaokqgh.Ngay && handleTime(baocaokqgh.Ngay)
      }`,
      Table: "BaoCaoKQGHs",
      ID: baocaokqgh.MaBCKQGH,
      Form: inputBaoCaoKQGH,
    });
  };

  useEffect(() => {
    if (Data_baocaoKQGHs) {
      set_baocaoKQGHs(Data_baocaoKQGHs.baocaoKQGHs);
    }
  }, [Data_baocaoKQGHs]);

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

  if (!Data_baocaoKQGHs) return <Spinner />;
  return (
    <InputBaoCaoKQGHstyled>
      <div className="row justify-content-center">
        <div className="col-12 ip-ls-old">
          <h5>
            Danh sách báo cáo kết quả ghi hình hiện có hiện có{" "}
            <b>({baocaoKQGHs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh BaoCaoKQGH..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">NgayBC</th>
                  <th scope="col">HinhAnh</th>
                  <th scope="col">ThoiGian</th>
                  <th scope="col">DiaDiem</th>
                  <th scope="col">BiDanhDT</th>
                  <th scope="col">DoiTuong</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...baocaoKQGHs]
                  .reverse()
                  .map((baocaokqgh: any, ind: number) => (
                    <tr key={ind} title={`MaBCKQGH: ${baocaokqgh.MaBCKQGH}`}>
                      <td>{baocaokqgh.Ngay && handleTime(baocaokqgh.Ngay)}</td>
                      <td>
                        <Link target="_blank" to={baocaokqgh.HinhAnh}>
                          Link
                        </Link>
                      </td>
                      <td>
                        {baocaokqgh.ThoiGian && handleTime(baocaokqgh.ThoiGian)}
                      </td>
                      <td>{baocaokqgh.DiaDiem}</td>
                      <td>
                        {
                          baocaokqgh.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
                            ?.BiDanh
                        }
                      </td>
                      <td>
                        {
                          baocaokqgh.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
                            ?.DeNghiTSNT?.DoiTuong?.TenDT
                        }
                      </td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => onEditData(baocaokqgh)}
                          title="Sửa"
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeleteData"
                          onClick={() => onDeleteData(baocaokqgh)}
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
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} báo cáo kết quả ghi hình:
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
                <label className="form-label">Mục đích:</label>
                <input
                  value={form.MucDich ? form.MucDich : ""}
                  name="MucDich"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Thời gian GH:</label>
                <input
                  value={form.ThoiGian ? form.ThoiGian : ""}
                  name="ThoiGian"
                  onChange={changeForm}
                  type="date"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Địa điểm GH:</label>
                <input
                  value={form.DiaDiem ? form.DiaDiem : ""}
                  name="DiaDiem"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Phương tiện SD:</label>
                <input
                  value={form.PhuongTienSD ? form.PhuongTienSD : ""}
                  name="PhuongTienSD"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Vai ngụy trang:</label>
                <input
                  value={form.VaiNguyTrang ? form.VaiNguyTrang : ""}
                  name="VaiNguyTrang"
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
                          {ketquatsnt.MaKQ} - {ketquatsnt.KeHoachTSNT?.So}
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
              <div className="col-6 mb-3">
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
    </InputBaoCaoKQGHstyled>
  );
}
