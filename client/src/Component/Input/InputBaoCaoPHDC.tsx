import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import moment from "moment";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createBaoCaoPHDC,
  MUTATION_editBaoCaoPHDC,
  QUERY_baocaoPHDCs,
  QUERY_ketquaTSNTs
} from "../../graphql/documentNode";
import {
  handleSearch,
  handleTime,
  showNotification,
} from "../../utils/functions";
import { FI_BaoCaoPHDC } from "./FormInitial";

const InputBaoCaoPHDCStyled = styled.div`
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

export default function InputBaoCaoPHDC() {
  const navigate = useNavigate();
  const { data: Data_baocaoPHDCs, error } = useQuery(QUERY_baocaoPHDCs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_ketquaTSNTs } = useQuery(QUERY_ketquaTSNTs, {
    variables: { utilsParams: {} },
  });
  const [createBaoCaoPHDC] = useMutation(MUTATION_createBaoCaoPHDC, {
    refetchQueries: [
      { query: QUERY_baocaoPHDCs, variables: { utilsParams: {} } },
    ],
  });
  const [editBaoCaoPHDC] = useMutation(MUTATION_editBaoCaoPHDC, {
    refetchQueries: [
      { query: QUERY_baocaoPHDCs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [baocaoPHDCs, set_baocaoPHDCs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_BaoCaoPHDC);
  // --------------------------------------------------------------------------------------------
  const convertForm = (obj: any) => {
    let day = (time: any) => moment(time).date();
    let month = (time: any) => moment(time).month();
    let year = (time: any) => moment(time).year();
    return {
      MaBCPHDC: obj.MaBCPHDC,
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
      DiaChi: obj.DiaChi,
      HinhAnh: obj.HinhAnh,

      MaKQ: obj.KetQuaTSNT?.MaKQ,
    };
  };

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_baocaoPHDCs(
      handleSearch("BaoCaoPHDCs", Data_baocaoPHDCs.baocaoPHDCs, e.target.value)
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
    if (form.DiaChi.trim() !== "") {
      if (statusEdit) {
        const { MaBCPHDC, ...baocaoPHDCInput } = form;
        editBaoCaoPHDC({
          variables: {
            baocaoPHDCInput,
            id: form.MaBCPHDC,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật báo cáo phát hiện địa chỉ "${data.editBaoCaoPHDC?.DiaChi}" thành công`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_BaoCaoPHDC);
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        const { MaBCPHDC, ...baocaoPHDCInput } = form;
        console.log(form)
        createBaoCaoPHDC({
          variables: {
            baocaoPHDCInput,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới báo cáo phát hiện địa chỉ "${data.createBaoCaoPHDC?.DiaChi}" thành công`,
              "success"
            );
            setForm(FI_BaoCaoPHDC);
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

  const onEditData = (baocaophdc: any) => {
    setStatusEdit(true);
    setForm(convertForm(baocaophdc));
  };

  const onDeleteData = (baocaophdc: any) => {
    const { MaBCPHDC, ...inputBaoCaoPHDC } = convertForm(baocaophdc);
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: baocaophdc.DiaChi,
      Table: "BaoCaoPHDCs",
      ID: baocaophdc.MaBCPHDC,
      Form: inputBaoCaoPHDC,
    });
  };

  useEffect(() => {
    if (Data_baocaoPHDCs) {
      set_baocaoPHDCs(Data_baocaoPHDCs.baocaoPHDCs);
    }
  }, [Data_baocaoPHDCs]);

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

  if (!Data_baocaoPHDCs) return <Spinner />;
  return (
    <InputBaoCaoPHDCStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách báo cáo phát hiện địa chỉ hiện có{" "}
            <b>({baocaoPHDCs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh BaoCaoPHDC..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">DiaChi</th>
                  <th scope="col">ThoiGianPH</th>
                  <th scope="col">BiDanhDT</th>
                  <th scope="col">DoiTuong</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...baocaoPHDCs]
                  .reverse()
                  .map((baocaophdc: any, ind: number) => (
                    <tr key={ind} title={`MaBCPHDC: ${baocaophdc.MaBCPHDC}`}>
                      <td>{baocaophdc.DiaChi}</td>
                      <td>
                        {baocaophdc.ThoiGianPH &&
                          handleTime(baocaophdc.ThoiGianPH)}
                      </td>
                      <td>
                        {
                          baocaophdc.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
                            ?.BiDanh
                        }
                      </td>
                      <td>
                        {
                          baocaophdc.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
                            ?.DeNghiTSNT?.DoiTuong?.TenDT
                        }
                      </td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => onEditData(baocaophdc)}
                          title="Sửa"
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeleteData"
                          onClick={() => onDeleteData(baocaophdc)}
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
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} báo cáo phát hiện địa chỉ:
          </h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Địa chỉ:</label>
              <input
                required
                value={form.DiaChi ? form.DiaChi : ""}
                name="DiaChi"
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
    </InputBaoCaoPHDCStyled>
  );
}
