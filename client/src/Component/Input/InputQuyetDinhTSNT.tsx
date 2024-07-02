import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import moment from "moment";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createQuyetDinhTSNT,
  MUTATION_editQuyetDinhTSNT,
  QUERY_caQHvaTDs,
  QUERY_caTTPvaTDs,
  QUERY_cbcss,
  QUERY_denghiTSNTs,
  QUERY_dois,
  QUERY_doituongs,
  QUERY_quyetdinhTSNTs,
} from "../../graphql/documentNode";
import {
  handleSearch,
  handleTime,
  showNotification,
} from "../../utils/functions";
import { FI_QuyetDinhTSNT } from "./FormInitial";

const InputQuyetDinhTSNTstyled = styled.div`
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

export default function InputQuyetDinhTSNT() {
  const navigate = useNavigate();
  const { data: Data_quyetdinhTSNTs, error } = useQuery(QUERY_quyetdinhTSNTs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_denghiTSNTs } = useQuery(QUERY_denghiTSNTs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_doituongs } = useQuery(QUERY_doituongs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_cbcss } = useQuery(QUERY_cbcss, {
    variables: { utilsParams: {} },
  });
  const { data: Data_dois } = useQuery(QUERY_dois, {
    variables: { utilsParams: {} },
  });
  const { data: Data_caQHvaTDs } = useQuery(QUERY_caQHvaTDs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_caTTPvaTDs } = useQuery(QUERY_caTTPvaTDs, {
    variables: { utilsParams: {} },
  });
  // ----------------------------------------------------
  const [createQuyetDinhTSNT] = useMutation(MUTATION_createQuyetDinhTSNT, {
    refetchQueries: [
      { query: QUERY_quyetdinhTSNTs, variables: { utilsParams: {} } },
    ],
  });
  const [editQuyetDinhTSNT] = useMutation(MUTATION_editQuyetDinhTSNT, {
    refetchQueries: [
      { query: QUERY_quyetdinhTSNTs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [quyetdinhTSNTs, set_quyetdinhTSNTs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_QuyetDinhTSNT);
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
    set_quyetdinhTSNTs(
      handleSearch(
        "QuyetDinhTSNTs",
        Data_quyetdinhTSNTs.quyetdinhTSNTs,
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
        e.target.name === "MaDN" ||
        e.target.name === "MaLanhDaoPD" ||
        e.target.name === "MaDoi" ||
        e.target.name === "MaCAQHvaTD" ||
        e.target.name === "MaCATTPvaTD" ||
        e.target.name === "MaDoiTuong"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.So.trim() !== "") {
      if (
        // check one-to-one with MaDN
        quyetdinhTSNTs.filter(
          (quyetdinhTSNT: any) => quyetdinhTSNT.DeNghiTSNT?.MaDN === form.MaDN
        ).length === 0 ||
        (quyetdinhTSNTs.filter(
          (quyetdinhTSNT: any) => quyetdinhTSNT.DeNghiTSNT?.MaDN === form.MaDN
        ).length !== 0 &&
          form.MaDN_edit === form.MaDN)
      ) {
        if (statusEdit) {
          const { MaQD, MaDN_edit, ...quyetdinhTSNTInput } = form;
          editQuyetDinhTSNT({
            variables: {
              quyetdinhTSNTInput,
              id: MaQD,
            },
            onCompleted: (data) => {
              showNotification(
                "Chúc mừng",
                `Cập nhật quyết định số "${data.editQuyetDinhTSNT.So}" thành công`,
                "success"
              );
              setStatusEdit(false);
              setForm(FI_QuyetDinhTSNT);
            },
            onError: (error) => {
              showNotification("Lỗi!", error.message, "danger");
              navigate("/dangnhap");
            },
          });
        } else {
          const { MaQD, MaDN_edit, ...quyetdinhTSNTInput } = form;
          createQuyetDinhTSNT({
            variables: {
              quyetdinhTSNTInput,
            },
            onCompleted: (data) => {
              showNotification(
                "Chúc mừng",
                `Thêm mới quyết định số "${data.createQuyetDinhTSNT.So}" thành công`,
                "success"
              );
              setForm(FI_QuyetDinhTSNT);
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

  const onEditData = (quyetdinhTSNT: any) => {
    setStatusEdit(true);
    setForm(convertForm(quyetdinhTSNT));
  };

  const onDeleteData = (quyetdinhTSNT: any) => {
    const { MaQD, MaDN_edit, ...inputQuyetDinhTSNT } =
      convertForm(quyetdinhTSNT);
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: `quyết định TSNT số ${quyetdinhTSNT.So}`,
      Table: "QuyetDinhTSNTs",
      ID: quyetdinhTSNT.MaQD,
      Form: inputQuyetDinhTSNT,
    });
  };

  useEffect(() => {
    if (Data_quyetdinhTSNTs) {
      set_quyetdinhTSNTs(Data_quyetdinhTSNTs.quyetdinhTSNTs);
    }
  }, [Data_quyetdinhTSNTs]);

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

  if (!Data_quyetdinhTSNTs) return <Spinner />;
  return (
    <InputQuyetDinhTSNTstyled>
      <div className="row justify-content-center">
        <div className="col-12 ip-ls-old">
          <h5>
            Danh sách quyết định TSNT hiện có <b>({quyetdinhTSNTs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh QuyetDinhTSNT..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">SoQD</th>
                  <th scope="col">SoDN</th>
                  <th scope="col">Ngay</th>
                  <th scope="col">DoiTuong</th>
                  <th scope="col">BiDanh</th>
                  <th scope="col">ThoiGianBD</th>
                  <th scope="col">ThoiGianKT</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...quyetdinhTSNTs]
                  .reverse()
                  .map((quyetdinhTSNT: any, ind: number) => (
                    <tr key={ind} title={`MaQD: ${quyetdinhTSNT.MaQD}`}>
                      <td>{quyetdinhTSNT.So}</td>
                      <td>{quyetdinhTSNT.DeNghiTSNT?.So}</td>
                      <td>
                        {quyetdinhTSNT.Ngay && handleTime(quyetdinhTSNT.Ngay)}
                      </td>
                      <td>{quyetdinhTSNT.DoiTuong?.TenDT}</td>
                      <td>{quyetdinhTSNT.BiDanh}</td>
                      <td>
                        {quyetdinhTSNT.ThoiGianBD &&
                          handleTime(quyetdinhTSNT.ThoiGianBD)}
                      </td>
                      <td>
                        {quyetdinhTSNT.ThoiGianKT &&
                          handleTime(quyetdinhTSNT.ThoiGianKT)}
                      </td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => onEditData(quyetdinhTSNT)}
                          title="Sửa"
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeleteData"
                          onClick={() => onDeleteData(quyetdinhTSNT)}
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
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} quyết định TSNT:</h5>
          <form onSubmit={submitForm}>
            <div className="row">
              <div className="col-2 mb-3">
                <label className="form-label">Số quyết định (So):</label>
                <input
                  required
                  value={form.So ? form.So : ""}
                  name="So"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Ngày quyết định:</label>
                <input
                  value={form.Ngay ? form.Ngay : ""}
                  name="Ngay"
                  onChange={changeForm}
                  type="date"
                  className="form-control"
                />
              </div>
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
                <label className="form-label">Bí danh (BiDanh):</label>
                <input
                  value={form.BiDanh ? form.BiDanh : ""}
                  name="BiDanh"
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
              <div className="col-2 mb-3">
                <label className="form-label">Thời gian kết thúc:</label>
                <input
                  value={form.ThoiGianKT ? form.ThoiGianKT : ""}
                  name="ThoiGianKT"
                  onChange={changeForm}
                  type="date"
                  className="form-control"
                />
              </div>
              {/* --------------------------Ma lien quan----------------------------------- */}
              <div className="col-2 mb-3">
                <label className="form-label">Mã đề nghị TSNT (MaDN):</label>
                <select
                  value={form.MaDN ? form.MaDN : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaDN"
                >
                  <option defaultValue={""}>Chọn đề nghị TSNT</option>
                  {Data_denghiTSNTs &&
                    Data_denghiTSNTs.denghiTSNTs.map(
                      (denghitsnt: any, ind: number) => (
                        <option key={ind} value={denghitsnt.MaDN}>
                          {denghitsnt.So}
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
              <div className="col-3 mb-3">
                <label className="form-label">
                  Mã CATTPvaTD (MaCATTPvaTD):
                </label>
                <select
                  value={form.MaCATTPvaTD ? form.MaCATTPvaTD : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaCATTPvaTD"
                >
                  <option defaultValue={""}>
                    Chọn CA tỉnh thành phố và tương đương
                  </option>
                  {Data_caTTPvaTDs &&
                    Data_caTTPvaTDs.caTTPvaTDs.map(
                      (caTTPvaTD: any, ind: number) => (
                        <option key={ind} value={caTTPvaTD.MaCATTPvaTD}>
                          {caTTPvaTD.CATTPvaTD}
                        </option>
                      )
                    )}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-6 mb-3">
                <label className="form-label">Nhiệm vụ cụ thể:</label>
                <textarea
                  value={form.NhiemVuCT ? form.NhiemVuCT : ""}
                  name="NhiemVuCT"
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
    </InputQuyetDinhTSNTstyled>
  );
}
