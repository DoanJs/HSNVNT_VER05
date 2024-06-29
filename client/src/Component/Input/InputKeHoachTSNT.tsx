import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import moment from "moment";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createKeHoachTSNT,
  MUTATION_editKeHoachTSNT,
  QUERY_caQHvaTDs,
  QUERY_cbcss,
  QUERY_dois,
  QUERY_doituongs,
  QUERY_kehoachTSNTs,
  QUERY_quyetdinhTSNTs,
  QUERY_tramCTs,
} from "../../graphql/documentNode";
import {
  handleSearch,
  handleTime,
  showNotification,
} from "../../utils/functions";
import { FI_KeHoachTSNT } from "./FormInitial";

const InputKeHoachTSNTstyled = styled.div`
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

export default function InputKeHoachTSNT() {
  const navigate = useNavigate();
  const { data: Data_kehoachTSNTs, error } = useQuery(QUERY_kehoachTSNTs, {
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
  const { data: Data_quyetdinhTSNTs } = useQuery(QUERY_quyetdinhTSNTs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_tramCTs } = useQuery(QUERY_tramCTs, {
    variables: { utilsParams: {} },
  });

  // ----------------------------------------------------
  const [createKeHoachTSNT] = useMutation(MUTATION_createKeHoachTSNT, {
    refetchQueries: [
      { query: QUERY_kehoachTSNTs, variables: { utilsParams: {} } },
    ],
  });
  const [editKeHoachTSNT] = useMutation(MUTATION_editKeHoachTSNT, {
    refetchQueries: [
      { query: QUERY_kehoachTSNTs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [kehoachTSNTs, set_kehoachTSNTs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_KeHoachTSNT);
  // --------------------------------------------------------------------------------------------
  const convertForm = (obj: any) => {
    let day = (time: any) => moment(time).date();
    let month = (time: any) => moment(time).month();
    let year = (time: any) => moment(time).year();
    return {
      MaKH: obj.MaKH,
      So: obj.So,
      Ngay: obj.Ngay
        ? `${year(obj.Ngay)}-${
            month(obj.Ngay) < 9
              ? "0" + (month(obj.Ngay) + 1)
              : month(obj.Ngay) + 1
          }-${day(obj.Ngay) < 10 ? "0" + day(obj.Ngay) : day(obj.Ngay)}`
        : "",
      VanDeChuY: obj.VanDeChuY,
      NoiDung: obj.NoiDung,
      MaQD: obj.QuyetDinhTSNT?.MaQD,
      MaCAQHvaTD: obj.CAQHvaTD?.MaCAQHvaTD,
      MaDoiTuong: obj.DoiTuong?.MaDoiTuong,
      MaDoi: obj.Doi?.MaDoi,

      MaTramCT: obj.TramCT?.MaTramCT,
      MaLanhDaoPD: obj.LanhDaoPD?.MaCBCS,
      MaBCHPhuTrach: obj.BCHPhuTrach?.MaCBCS,

      MaQD_edit: obj.QuyetDinhTSNT?.MaQD,
    };
  };

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_kehoachTSNTs(
      handleSearch(
        "KeHoachTSNTs",
        Data_kehoachTSNTs.kehoachTSNTs,
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
        e.target.name === "MaQD" ||
        e.target.name === "MaCAQHvaTD" ||
        e.target.name === "MaDoiTuong" ||
        e.target.name === "MaDoi" ||
        e.target.name === "MaTramCT" ||
        e.target.name === "MaLanhDaoPD" ||
        e.target.name === "MaBCHPhuTrach"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.So.trim() !== "") {
      if (
        // check one-to-one with MaQD
        kehoachTSNTs.filter(
          (kehoachTSNT: any) => kehoachTSNT.QuyetDinhTSNT?.MaQD === form.MaQD
        ).length === 0 ||
        (kehoachTSNTs.filter(
          (kehoachTSNT: any) => kehoachTSNT.QuyetDinhTSNT?.MaQD === form.MaQD
        ).length !== 0 &&
          form.MaQD_edit === form.MaQD)
      ) {
        if (statusEdit) {
          const { MaKH, MaQD_edit, ...kehoachTSNTInput } = form;
          editKeHoachTSNT({
            variables: {
              kehoachTSNTInput,
              id: MaKH,
            },
            onCompleted: (data) => {
              showNotification(
                "Chúc mừng",
                `Cập nhật quyết định số "${data.editKeHoachTSNT.So}" thành công`,
                "success"
              );
              setStatusEdit(false);
              setForm(FI_KeHoachTSNT);
            },
            onError: (error) => {
              showNotification("Lỗi!", error.message, "danger");
              navigate("/dangnhap");
            },
          });
        } else {
          const { MaKH, MaQD_edit, ...kehoachTSNTInput } = form;
          createKeHoachTSNT({
            variables: {
              kehoachTSNTInput,
            },
            onCompleted: (data) => {
              showNotification(
                "Chúc mừng",
                `Thêm mới kế hoạch số "${data.createKeHoachTSNT.So}" thành công`,
                "success"
              );
              setForm(FI_KeHoachTSNT);
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

  const onEditData = (kehoachTSNT: any) => {
    setStatusEdit(true);
    setForm(convertForm(kehoachTSNT));
  };

  const onDeleteData = (kehoachTSNT: any) => {
    const { MaKH, MaQD_edit, ...inputKeHoachTSNT } =
      convertForm(kehoachTSNT);
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: `kế hoạch TSNT số ${kehoachTSNT.So}`,
      Table: "KeHoachTSNTs",
      ID: kehoachTSNT.MaKH,
      Form: inputKeHoachTSNT,
    });
  };

  useEffect(() => {
    if (Data_kehoachTSNTs) {
      set_kehoachTSNTs(Data_kehoachTSNTs.kehoachTSNTs);
    }
  }, [Data_kehoachTSNTs]);

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

  if (!Data_kehoachTSNTs) return <Spinner />;
  return (
    <InputKeHoachTSNTstyled>
      <div className="row justify-content-center">
        <div className="col-12 ip-ls-old">
          <h5>
            Danh sách kế hoạch TSNT hiện có <b>({kehoachTSNTs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh KeHoachTSNT..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">SoKH</th>
                  <th scope="col">SoQD</th>
                  <th scope="col">Ngay</th>
                  <th scope="col">DoiTuong</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...kehoachTSNTs]
                  .reverse()
                  .map((kehoachTSNT: any, ind: number) => (
                    <tr key={ind} title={`MaKH: ${kehoachTSNT.MaKH}`}>
                      <td>{kehoachTSNT.So}</td>
                      <td>{kehoachTSNT.QuyetDinhTSNT?.So}</td>
                      <td>
                        {kehoachTSNT.Ngay && handleTime(kehoachTSNT.Ngay)}
                      </td>
                      <td>{kehoachTSNT.DoiTuong?.TenDT}</td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => onEditData(kehoachTSNT)}
                          title="Sửa"
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeleteData"
                          onClick={() => onDeleteData(kehoachTSNT)}
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
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} kế hoạch TSNT:</h5>
          <form onSubmit={submitForm}>
            <div className="row">
              <div className="col-2 mb-3">
                <label className="form-label">Số kế hoạch (So):</label>
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
                <label className="form-label">Ngày kế hoạch:</label>
                <input
                  value={form.Ngay ? form.Ngay : ""}
                  name="Ngay"
                  onChange={changeForm}
                  type="date"
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
                <label className="form-label">
                  Mã BCH đội phụ trách (MaBCHPhuTrach):
                </label>
                <select
                  value={form.MaBCHPhuTrach ? form.MaBCHPhuTrach : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaBCHPhuTrach"
                >
                  <option defaultValue={""}>Chọn BCH đội phụ trách</option>
                  {Data_cbcss &&
                    Data_cbcss.cbcss.map((cbcs: any, ind: number) => (
                      <option key={ind} value={cbcs.MaCBCS}>
                        {cbcs.HoTen}
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
              <div className="col-2 mb-3">
                <label className="form-label">
                  Mã Trạm công tác (MaTramCT):
                </label>
                <select
                  value={form.MaTramCT ? form.MaTramCT : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaTramCT"
                >
                  <option defaultValue={""}>Chọn trạm công tác</option>
                  {Data_tramCTs &&
                    Data_tramCTs.tramCTs.map((tramct: any, ind: number) => (
                      <option key={ind} value={tramct.MaTramCT}>
                        {tramct.DiaDiem}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="row">
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
    </InputKeHoachTSNTstyled>
  );
}
