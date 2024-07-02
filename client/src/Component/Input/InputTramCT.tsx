import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import moment from "moment";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createTramCT,
  MUTATION_editTramCT,
  QUERY_caQHvaTDs,
  QUERY_cbcss,
  QUERY_dois,
  QUERY_tramCTs,
} from "../../graphql/documentNode";
import {
  handleSearch,
  handleTime,
  showNotification,
} from "../../utils/functions";
import { FI_TramCT } from "./FormInitial";

const InputTramCTStyled = styled.div`
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

export default function InputTramCT() {
  const navigate = useNavigate();
  const { data: Data_tramCTs, error } = useQuery(QUERY_tramCTs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_caQHvaTDs } = useQuery(QUERY_caQHvaTDs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_dois } = useQuery(QUERY_dois, {
    variables: { utilsParams: {} },
  });
  const { data: Data_cbcss } = useQuery(QUERY_cbcss, {
    variables: { utilsParams: {} },
  });
  // ----------------------------------------------------
  const [createTramCT] = useMutation(MUTATION_createTramCT, {
    refetchQueries: [{ query: QUERY_tramCTs, variables: { utilsParams: {} } }],
  });
  const [editTramCT] = useMutation(MUTATION_editTramCT, {
    refetchQueries: [{ query: QUERY_tramCTs, variables: { utilsParams: {} } }],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [tramCTs, set_tramCTs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_TramCT);

  // --------------------------------------------------------------------------------------------
  const convertForm = (obj: any) => {
    let day = (time: any) => moment(time).date();
    let month = (time: any) => moment(time).month();
    let year = (time: any) => moment(time).year();
    return {
      MaTramCT: obj.MaTramCT,
      Ngay: obj.Ngay
        ? `${year(obj.Ngay)}-${
            month(obj.Ngay) < 9
              ? "0" + (month(obj.Ngay) + 1)
              : month(obj.Ngay) + 1
          }-${day(obj.Ngay) < 10 ? "0" + day(obj.Ngay) : day(obj.Ngay)}`
        : "",
      DiaDiem: obj.DiaDiem,
      TinhHinhDB: obj.TinhHinhDB,
      LyLichTram: obj.LyLichTram,
      SoDoTram: obj.SoDoTram,
      VanDeChuY: obj.VanDeChuY,
      QuyDinh: obj.QuyDinh,

      MaCAQHvaTD: obj.CAQHvaTD?.MaCAQHvaTD,
      MaDoi: obj.Doi?.MaDoi,
      MaTSXayDung: obj.TSXayDung?.MaCBCS,
      MaLanhDaoPD: obj.LanhDaoPD?.MaCBCS,
    };
  };

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_tramCTs(handleSearch("TramCTs", Data_tramCTs.tramCTs, e.target.value));
  };

  const changeForm = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "MaCAQHvaTD" ||
        e.target.name === "MaDoi" ||
        e.target.name === "MaTSXayDung" ||
        e.target.name === "MaLanhDaoPD"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.DiaDiem.trim() !== "") {
      if (statusEdit) {
        const { MaTramCT, ...tramCTInput } = form;
        editTramCT({
          variables: {
            tramCTInput,
            id: MaTramCT,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật "${data.editTramCT.DiaDiem}" thành công`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_TramCT);
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        const { MaTramCT, ...tramCTInput } = form;
        createTramCT({
          variables: {
            tramCTInput,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới "${data.createTramCT.DiaDiem}" thành công`,
              "success"
            );
            setForm(FI_TramCT);
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

  const onEditData = (tramct: any) => {
    setStatusEdit(true);
    setForm(convertForm(tramct));
  };

  const onDeleteData = (tramct: any) => {
    const { MaTramCT, ...inputTramCT } = convertForm(tramct);
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: `trạm công tác tại ${tramct.DiaDiem}`,
      Table: "TramCTs",
      ID: tramct.MaTramCT,
      Form: inputTramCT,
    });
  };

  useEffect(() => {
    if (Data_tramCTs) {
      set_tramCTs(Data_tramCTs.tramCTs);
    }
  }, [Data_tramCTs]);

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

  if (!Data_tramCTs) return <Spinner />;
  return (
    <InputTramCTStyled>
      <div className="row justify-content-center">
        <div className="col-12 ip-ls-old">
          <h5>
            Danh sách trạm công tác hiện có <b>({tramCTs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh TramCT..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">Ngay</th>
                  <th scope="col">DiaDiem</th>
                  <th scope="col">SoDoTram</th>
                  <th scope="col">TSXayDung</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...tramCTs].reverse().map((tramct: any, ind: number) => (
                  <tr key={ind} title={`MaTramCT: ${tramct.MaTramCT}`}>
                    <td>{tramct.Ngay && handleTime(tramct.Ngay)}</td>
                    <td>{tramct.DiaDiem}</td>
                    <td>{tramct.SoDoTram}</td>
                    <td>{tramct.TSXayDung?.HoTen}</td>
                    <td className="ip-ls-action">
                      <i
                        className="fa-solid fa-pen"
                        onClick={() => onEditData(tramct)}
                        title="Sửa"
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        data-bs-toggle="modal"
                        data-bs-target="#modalDeleteData"
                        onClick={() => onDeleteData(tramct)}
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
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} trạm công tác:</h5>
          <form onSubmit={submitForm}>
            <div className="row">
              <div className="col-2 mb-3">
                <label className="form-label">Địa điểm:</label>
                <input
                  required
                  value={form.DiaDiem ? form.DiaDiem : ""}
                  name="DiaDiem"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Ngày lập trạm:</label>
                <input
                  value={form.Ngay ? form.Ngay : ""}
                  name="Ngay"
                  onChange={changeForm}
                  type="date"
                  className="form-control"
                />
              </div>
              <div className="col-2 mb-3">
                <label className="form-label">Sơ đồ trạm:</label>
                <input
                  value={form.SoDoTram ? form.SoDoTram : ""}
                  name="SoDoTram"
                  onChange={changeForm}
                  type="text"
                  className="form-control"
                />
              </div>
              {/* --------------------------Ma lien quan----------------------------------- */}
              <div className="col-2 mb-3">
                <label className="form-label">
                  Mã TS xây dựng (MaTSXayDung):
                </label>
                <select
                  value={form.MaTSXayDung ? form.MaTSXayDung : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaTSXayDung"
                >
                  <option defaultValue={""}>Chọn CBCS</option>
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
                  Mã lãnh đạo phê duyệt (MaLanhDaoPD):
                </label>
                <select
                  value={form.MaLanhDaoPD ? form.MaLanhDaoPD : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaLanhDaoPD"
                >
                  <option defaultValue={""}>Chọn CBCS</option>
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
                    Chọn công an quận huyện và tương đương
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
            </div>

            <div className="row">
              <div className="col-6 mb-3">
                <label className="form-label">Tình hình địa bàn:</label>
                <textarea
                  value={form.TinhHinhDB ? form.TinhHinhDB : ""}
                  name="TinhHinhDB"
                  onChange={changeForm}
                  className="form-control"
                  rows={5}
                ></textarea>
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Lý lịch trạm:</label>
                <textarea
                  value={form.LyLichTram ? form.LyLichTram : ""}
                  name="LyLichTram"
                  onChange={changeForm}
                  className="form-control"
                  rows={5}
                ></textarea>
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Vấn đề chú ý:</label>
                <textarea
                  value={form.VanDeChuY ? form.VanDeChuY : ""}
                  name="VanDeChuY"
                  onChange={changeForm}
                  className="form-control"
                  rows={5}
                ></textarea>
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Quy định:</label>
                <textarea
                  value={form.QuyDinh ? form.QuyDinh : ""}
                  name="QuyDinh"
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
    </InputTramCTStyled>
  );
}
