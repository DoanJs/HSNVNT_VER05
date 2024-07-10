import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createDanhGiaTSTH,
  MUTATION_editDanhGiaTSTH,
  QUERY_cbcss,
  QUERY_danhgiaTSTHs,
  QUERY_ketquaTSNTs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_DanhGiaTSTH } from "./FormInitial";

const InputDanhGiaTSTHStyled = styled.div`
  .ip-ls-old {
    border-right: 1px solid green;
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

export default function InputDanhGiaTSTH() {
  const navigate = useNavigate();
  const { data: Data_danhgiaTSTHs, error } = useQuery(QUERY_danhgiaTSTHs, {
    variables: { utilsParams: {} },
  });
  const { data: Datq_ketquaTSNTs } = useQuery(QUERY_ketquaTSNTs, {
    variables: { utilsParams: {} },
  });
  const { data: Datq_cbcss } = useQuery(QUERY_cbcss, {
    variables: { utilsParams: {} },
  });
  const [createDanhGiaTSTH] = useMutation(MUTATION_createDanhGiaTSTH, {
    refetchQueries: [
      { query: QUERY_danhgiaTSTHs, variables: { utilsParams: {} } },
    ],
  });
  const [editDanhGiaTSTH] = useMutation(MUTATION_editDanhGiaTSTH, {
    refetchQueries: [
      { query: QUERY_danhgiaTSTHs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [danhgiaTSTHs, set_danhgiaTSTHs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_DanhGiaTSTH);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_danhgiaTSTHs(
      handleSearch(
        "DanhGiaTSTHs",
        Data_danhgiaTSTHs.danhgiaTSTHs,
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
        e.target.name === "MaKQ" || e.target.name === "MaCBCS"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.MaKQ && form.MaKQ !== "") {
      if (statusEdit) {
        const { MaDanhGiaTSTH, ...danhgiaTSTHInput } = form;
        editDanhGiaTSTH({
          variables: {
            danhgiaTSTHInput,
            id: form.MaDanhGiaTSTH,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật đánh giá trinh sát thực hiện TSNT "${data.editDanhGiaTSTH?.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.BiDanh}" thành công`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_DanhGiaTSTH);
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        const { MaDanhGiaTSTH, ...danhgiaTSTHInput } = form;
        createDanhGiaTSTH({
          variables: {
            danhgiaTSTHInput,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới đánh giá trinh sát thực hiện TSNT "${data.createDanhGiaTSTH?.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.BiDanh}" thành công`,
              "success"
            );
            setForm(FI_DanhGiaTSTH);
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      }
    } else {
      showNotification("Cảnh báo", "Vui lòng nhập đầy đủ giá trị!", "warning");
    }
  };

  const onEditData = (danhgiatsth: any) => {
    setStatusEdit(true);
    setForm({
      ...form,
      MaDanhGiaTSTH: danhgiatsth.MaDanhGiaTSTH,
      VaiTro: danhgiatsth.VaiTro,
      DanhGia: danhgiatsth.DanhGia,
      LyDo: danhgiatsth.LyDo,

      MaKQ: danhgiatsth.KetQuaTSNT?.MaKQ,
      MaCBCS: danhgiatsth.CBCS?.MaCBCS,
    });
  };

  const onDeleteData = (danhgiatsth: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: danhgiatsth.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.BiDanh,
      Table: "DanhGiaTSTHs",
      ID: danhgiatsth.MaDanhGiaTSTH,
    });

  useEffect(() => {
    if (Data_danhgiaTSTHs) {
      set_danhgiaTSTHs(Data_danhgiaTSTHs.danhgiaTSTHs);
    }
  }, [Data_danhgiaTSTHs]);

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

  if (!Data_danhgiaTSTHs) return <Spinner />;
  return (
    <InputDanhGiaTSTHStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách đánh giá trinh sát thực hiện hiện có{" "}
            <b>({danhgiaTSTHs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh DanhGiaTSTH..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">BiDanhDT</th>
                  <th scope="col">DoiTuong</th>
                  <th scope="col">CBCS</th>
                  <th scope="col">DanhGia</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...danhgiaTSTHs]
                  .reverse()
                  .map((danhgiatsth: any, ind: number) => (
                    <tr
                      key={ind}
                      title={`MaDanhGiaTSTH: ${danhgiatsth.MaDanhGiaTSTH}`}
                    >
                      <td>
                        {
                          danhgiatsth.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
                            ?.BiDanh
                        }
                      </td>
                      <td>
                        {
                          danhgiatsth.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
                            ?.DeNghiTSNT?.DoiTuong?.TenDT
                        }
                      </td>
                      <td>{danhgiatsth.CBCS?.HoTen}</td>
                      <td>{danhgiatsth.DanhGia}</td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => onEditData(danhgiatsth)}
                          title="Sửa"
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeleteData"
                          onClick={() => onDeleteData(danhgiatsth)}
                          title="Xóa"
                        ></i>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-6">
          <h5>
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} đánh giá trinh sát thực
            hiện:
          </h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Mã kết quả TSNT (MaKQ):</label>
              <select
                required
                value={form.MaKQ ? form.MaKQ : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaKQ"
              >
                <option defaultValue={""}>Chọn kết quả TSNT</option>
                {Datq_ketquaTSNTs &&
                  Datq_ketquaTSNTs.ketquaTSNTs.map(
                    (ketquatsnt: any, ind: number) => (
                      <option key={ind} value={ketquatsnt.MaKQ}>
                        {ketquatsnt.KeHoachTSNT?.So} -{" "}
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
            <div className="mb-3">
              <label className="form-label">Mã CBCS (MaCBCS):</label>
              <select
                required
                value={form.MaCBCS ? form.MaCBCS : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaCBCS"
              >
                <option defaultValue={""}>Chọn CBCS</option>
                {Datq_cbcss &&
                  Datq_cbcss.cbcss.map((cbcs: any, ind: number) => (
                    <option key={ind} value={cbcs.MaCBCS}>
                      {cbcs.HoTen} - {cbcs.Doi?.TenDoi} -{" "}
                      {cbcs.Doi?.CAQHvaTD?.CAQHvaTD}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Vai trò trong trinh sát:</label>
              <input
                value={form.VaiTro ? form.VaiTro : ""}
                name="VaiTro"
                onChange={changeForm}
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Đánh giá:</label>
              <select
                value={form.DanhGia ? form.DanhGia : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="DanhGia"
              >
                <option defaultValue={""}>Chọn đánh giá</option>
                <option value={"Biểu dương"}>Biểu dương</option>
                <option value={"RKN"}>RKN</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Lý do:</label>
              <textarea
                value={form.LyDo ? form.LyDo : ""}
                name="LyDo"
                onChange={changeForm}
                className="form-control"
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
    </InputDanhGiaTSTHStyled>
  );
}
