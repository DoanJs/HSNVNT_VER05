import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import moment from "moment";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createDeNghiTSNT,
  MUTATION_editDeNghiTSNT,
  QUERY_caQHvaTDs,
  QUERY_denghiTSNTs,
  QUERY_doituongs,
  QUERY_hinhthucHDs,
} from "../../graphql/documentNode";
import {
  handleSearch,
  handleTime,
  showNotification,
} from "../../utils/functions";
import { FI_DeNghiTSNT } from "./FormInitial";

const InputDeNghiTSNTStyled = styled.div`
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

export default function InputDeNghiTSNT() {
  const navigate = useNavigate();
  const { data: Data_denghiTSNTs, error } = useQuery(QUERY_denghiTSNTs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_doituongs } = useQuery(QUERY_doituongs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_hinhthucHDs } = useQuery(QUERY_hinhthucHDs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_caQHvaTDs } = useQuery(QUERY_caQHvaTDs, {
    variables: { utilsParams: {} },
  });

  // ----------------------------------------------------
  const [createDeNghiTSNT] = useMutation(MUTATION_createDeNghiTSNT, {
    refetchQueries: [
      { query: QUERY_denghiTSNTs, variables: { utilsParams: {} } },
    ],
  });
  const [editDeNghiTSNT] = useMutation(MUTATION_editDeNghiTSNT, {
    refetchQueries: [
      { query: QUERY_denghiTSNTs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [denghiTSNTs, set_denghiTSNTs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_DeNghiTSNT);
  // --------------------------------------------------------------------------------------------
  const convertForm = (obj: any) => {
    let day = (time: any) => moment(time).date();
    let month = (time: any) => moment(time).month();
    let year = (time: any) => moment(time).year();
    return {
      MaDN: obj.MaDN,
      So: obj.So,
      Ngay: obj.Ngay
        ? `${year(obj.Ngay)}-${
            month(obj.Ngay) < 9
              ? "0" + (month(obj.Ngay) + 1)
              : month(obj.Ngay) + 1
          }-${day(obj.Ngay) < 10 ? "0" + day(obj.Ngay) : day(obj.Ngay)}`
        : "",
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
      NoiDungDN: obj.NoiDungDN,
      NoiDungTN: obj.NoiDungTN,

      MaCAQHvaTD: obj.CAQHvaTD?.MaCAQHvaTD,
      MaDoiTuong: obj.DoiTuong?.MaDoiTuong,
      MaHTHD: obj.HinhThucHD?.MaHTHD,
    };
  };

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_denghiTSNTs(
      handleSearch("DeNghiTSNTs", Data_denghiTSNTs.denghiTSNTs, e.target.value)
    );
  };

  const changeForm = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "MaDoiTuong" ||
        e.target.name === "MaHTHD" ||
        e.target.name === "MaCAQHvaTD"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.So.trim() !== "") {
      if (statusEdit) {
        const { MaDN, ...denghiTSNTInput } = form;
        editDeNghiTSNT({
          variables: {
            denghiTSNTInput,
            id: MaDN,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật đề nghị TSNT "${data.editDeNghiTSNT.So}" thành công`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_DeNghiTSNT);
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        const { MaDN, ...denghiTSNTInput } = form;
        createDeNghiTSNT({
          variables: {
            denghiTSNTInput,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới đề nghị TSNT "${data.createDeNghiTSNT.So}" thành công`,
              "success"
            );
            setForm(FI_DeNghiTSNT);
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

  const onEditData = (denghiTSNT: any) => {
    setStatusEdit(true);
    setForm(convertForm(denghiTSNT));
  };

  const onDeleteData = (denghiTSNT: any) => {
    const { MaDN, ...inputDeNghiTSNT } = convertForm(denghiTSNT);
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: denghiTSNT.So,
      Table: "DeNghiTSNTs",
      ID: denghiTSNT.MaDN,
      Form: inputDeNghiTSNT,
    });
  };

  useEffect(() => {
    if (Data_denghiTSNTs) {
      set_denghiTSNTs(Data_denghiTSNTs.denghiTSNTs);
    }
  }, [Data_denghiTSNTs]);

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

  if (!Data_denghiTSNTs) return <Spinner />;
  return (
    <InputDeNghiTSNTStyled>
      <div className="row justify-content-center">
        <div className="col-12 ip-ls-old">
          <h5>
            Danh sách đề nghị TSNT hiện có <b>({denghiTSNTs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh DeNghiTSNT..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">So</th>
                  <th scope="col">Ngay</th>
                  <th scope="col">DoiTuong</th>
                  <th scope="col">ThoiGianBD</th>
                  <th scope="col">ThoiGianKT</th>
                  <th scope="col">HinhThucHD</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...denghiTSNTs]
                  .reverse()
                  .map((denghiTSNT: any, ind: number) => (
                    <tr key={ind} title={`MaDN: ${denghiTSNT.MaDN}`}>
                      <td>{denghiTSNT.So}</td>
                      <td>{denghiTSNT.Ngay && handleTime(denghiTSNT.Ngay)}</td>
                      <td>{denghiTSNT.DoiTuong?.TenDT}</td>
                      <td>
                        {denghiTSNT.ThoiGianBD &&
                          handleTime(denghiTSNT.ThoiGianBD)}
                      </td>
                      <td>
                        {denghiTSNT.ThoiGianKT &&
                          handleTime(denghiTSNT.ThoiGianKT)}
                      </td>
                      <td>{denghiTSNT.HinhThucHD?.HinhThuc}</td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => onEditData(denghiTSNT)}
                          title="Sửa"
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeleteData"
                          onClick={() => onDeleteData(denghiTSNT)}
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
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} đề nghị TSNT:</h5>
          <form onSubmit={submitForm}>
            <div className="row">
              <div className="col-2 mb-3">
                <label className="form-label">Số đề nghị:</label>
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
                <label className="form-label">Ngày đề nghị:</label>
                <input
                  value={form.Ngay ? form.Ngay : ""}
                  name="Ngay"
                  onChange={changeForm}
                  type="date"
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
                <label className="form-label">Mã hình thức HD (MaHTHD):</label>
                <select
                  value={form.MaHTHD ? form.MaHTHD : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaHTHD"
                >
                  <option defaultValue={""}>Chọn hình thức HD</option>
                  {Data_hinhthucHDs &&
                    Data_hinhthucHDs.hinhthucHDs.map(
                      (hinhthuc: any, ind: number) => (
                        <option key={ind} value={hinhthuc.MaHTHD}>
                          {hinhthuc.HinhThuc}
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
                    Chọn công an quận huyện và tương đương
                  </option>
                  {Data_caQHvaTDs &&
                    Data_caQHvaTDs.caQHvaTDs.map(
                      (caQHvaTD: any, ind: number) => (
                        <option key={ind} value={caQHvaTD.MaCAQHvaTD}>
                          {caQHvaTD.CAQHvaTD} - {caQHvaTD.CATTPvaTD?.CATTPvaTD}
                        </option>
                      )
                    )}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-6 mb-3">
                <label className="form-label">Nội dung đề nghị:</label>
                <textarea
                  value={form.NoiDungDN ? form.NoiDungDN : ""}
                  name="NoiDungDN"
                  onChange={changeForm}
                  className="form-control"
                  rows={5}
                ></textarea>
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Nội dung thống nhất:</label>
                <textarea
                  value={form.NoiDungTN ? form.NoiDungTN : ""}
                  name="NoiDungTN"
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
    </InputDeNghiTSNTStyled>
  );
}
