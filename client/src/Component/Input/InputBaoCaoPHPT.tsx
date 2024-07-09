import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createBaoCaoPHPT,
  MUTATION_editBaoCaoPHPT,
  QUERY_baocaoPHPTs,
  QUERY_ketquaTSNTs,
} from "../../graphql/documentNode";
import {
  handleSearch,
  handleTime,
  showNotification,
} from "../../utils/functions";
import { FI_BaoCaoPHPT } from "./FormInitial";
import moment from "moment";

const InputBaoCaoPHPTStyled = styled.div`
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

export default function InputBaoCaoPHPT() {
  const navigate = useNavigate();
  const { data: Data_baocaoPHPTs, error } = useQuery(QUERY_baocaoPHPTs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_ketquaTSNTs } = useQuery(QUERY_ketquaTSNTs, {
    variables: { utilsParams: {} },
  });
  const [createBaoCaoPHPT] = useMutation(MUTATION_createBaoCaoPHPT, {
    refetchQueries: [
      { query: QUERY_baocaoPHPTs, variables: { utilsParams: {} } },
    ],
  });
  const [editBaoCaoPHPT] = useMutation(MUTATION_editBaoCaoPHPT, {
    refetchQueries: [
      { query: QUERY_baocaoPHPTs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [baocaoPHPTs, set_baocaoPHPTs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_BaoCaoPHPT);
  // --------------------------------------------------------------------------------------------
  const convertForm = (obj: any) => {
    let day = (time: any) => moment(time).date();
    let month = (time: any) => moment(time).month();
    let year = (time: any) => moment(time).year();
    return {
      MaBCPHPT: obj.MaBCPHPT,
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
      BKS: obj.BKS,

      MaKQ: obj.KetQuaTSNT?.MaKQ,
    };
  };

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_baocaoPHPTs(
      handleSearch("BaoCaoPHPTs", Data_baocaoPHPTs.baocaoPHPTs, e.target.value)
    );
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "MaKQ" ? Number(e.target.value) : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.BKS.trim() !== "") {
      if (statusEdit) {
        const { MaBCPHPT, ...baocaoPHPTInput } = form;
        editBaoCaoPHPT({
          variables: {
            baocaoPHPTInput,
            id: form.MaBCPHPT,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật báo cáo phát hiện phương tiện "${data.editBaoCaoPHPT?.BKS}" thành công`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_BaoCaoPHPT);
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        const { MaBCPHPT, ...baocaoPHPTInput } = form;
        createBaoCaoPHPT({
          variables: {
            baocaoPHPTInput,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới báo cáo phát hiện phương tiện "${data.createBaoCaoPHPT?.BKS}" thành công`,
              "success"
            );
            setForm(FI_BaoCaoPHPT);
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

  const onEditData = (baocaophpt: any) => {
    setStatusEdit(true);
    setForm(convertForm(baocaophpt));
  };

  const onDeleteData = (baocaophpt: any) => {
    const { MaBCPHPT, ...inputBaoCaoPHPT } = convertForm(baocaophpt);
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: baocaophpt.BKS,
      Table: "BaoCaoPHPTs",
      ID: baocaophpt.MaBCPHPT,
      Form: inputBaoCaoPHPT,
    });
  };

  useEffect(() => {
    if (Data_baocaoPHPTs) {
      set_baocaoPHPTs(Data_baocaoPHPTs.baocaoPHPTs);
    }
  }, [Data_baocaoPHPTs]);

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

  if (!Data_baocaoPHPTs) return <Spinner />;
  return (
    <InputBaoCaoPHPTStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách báo cáo phát hiện phương tiện hiện có{" "}
            <b>({baocaoPHPTs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh BaoCaoPHPT..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">BKS</th>
                  <th scope="col">ThoiGianPH</th>
                  <th scope="col">BiDanhDT</th>
                  <th scope="col">DoiTuong</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...baocaoPHPTs]
                  .reverse()
                  .map((baocaophpt: any, ind: number) => (
                    <tr key={ind} title={`MaBCPHPT: ${baocaophpt.MaBCPHPT}`}>
                      <td>{baocaophpt.BKS}</td>
                      <td>
                        {baocaophpt.ThoiGianPH &&
                          handleTime(baocaophpt.ThoiGianPH)}
                      </td>
                      <td>
                        {
                          baocaophpt.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
                            ?.BiDanh
                        }
                      </td>
                      <td>
                        {
                          baocaophpt.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
                            ?.DeNghiTSNT?.DoiTuong?.TenDT
                        }
                      </td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => onEditData(baocaophpt)}
                          title="Sửa"
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeleteData"
                          onClick={() => onDeleteData(baocaophpt)}
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
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} báo cáo phát hiện phương
            tiện:
          </h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Biển kiểm soát:</label>
              <input
                required
                value={form.BKS ? form.BKS : ""}
                name="BKS"
                onChange={changeForm}
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Hình ảnh:</label>
              <input
                value={form.HinhAnh ? form.HinhAnh : ""}
                name="HinhAnh"
                onChange={changeForm}
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Thời gian phát hiện:</label>
              <input
                value={form.ThoiGianPH ? form.ThoiGianPH : ""}
                name="ThoiGianPH"
                onChange={changeForm}
                type="date"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Địa điểm phát hiện:</label>
              <input
                value={form.DiaDiemPH ? form.DiaDiemPH : ""}
                name="DiaDiemPH"
                onChange={changeForm}
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mã kết quả TSNT (MaKQ):</label>
              <select
                value={form.MaKQ ? form.MaKQ : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaKQ"
              >
                <option defaultValue={""}>Chọn kế hoạch TSNT</option>
                {Data_ketquaTSNTs &&
                  Data_ketquaTSNTs.ketquaTSNTs.map(
                    (ketquatsnt: any, ind: number) => (
                      <option key={ind} value={ketquatsnt.MaKQ}>
                        {ketquatsnt.MaKQ} - {ketquatsnt.KeHoachTSNT?.So} -{" "}
                        {ketquatsnt.KeHoachTSNT?.QuyetDinhTSNT?.BiDanh}
                      </option>
                    )
                  )}
              </select>
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
    </InputBaoCaoPHPTStyled>
  );
}
