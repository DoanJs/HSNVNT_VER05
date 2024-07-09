import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import moment from "moment";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createKetQuaXMDiaChi,
  MUTATION_editKetQuaXMDiaChi,
  QUERY_baocaoPHDCs,
  QUERY_cbcss,
  QUERY_ketQuaXMDiaChis
} from "../../graphql/documentNode";
import {
  handleSearch,
  handleTime,
  showNotification,
} from "../../utils/functions";
import { FI_KetQuaXMDiaChi } from "./FormInitial";

const InputKetQuaXMDiaChiStyled = styled.div`
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

export default function InputKetQuaXMDiaChi() {
  const navigate = useNavigate();
  const { data: Data_ketQuaXMDiaChis, error } = useQuery(
    QUERY_ketQuaXMDiaChis,
    {
      variables: { utilsParams: {} },
    }
  );
  const { data: Data_baocaoPHDCs } = useQuery(QUERY_baocaoPHDCs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_cbcss } = useQuery(QUERY_cbcss, {
    variables: { utilsParams: {} },
  });
  const [createKetQuaXMDiaChi] = useMutation(MUTATION_createKetQuaXMDiaChi, {
    refetchQueries: [
      { query: QUERY_ketQuaXMDiaChis, variables: { utilsParams: {} } },
    ],
  });
  const [editKetQuaXMDiaChi] = useMutation(MUTATION_editKetQuaXMDiaChi, {
    refetchQueries: [
      { query: QUERY_ketQuaXMDiaChis, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [ketQuaXMDiaChis, set_ketQuaXMDiaChis] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_KetQuaXMDiaChi);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_ketQuaXMDiaChis(
      handleSearch(
        "KetQuaXMDiaChis",
        Data_ketQuaXMDiaChis.ketQuaXMDiaChis,
        e.target.value
      )
    );
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "MaBCPHDC" || e.target.name === "MaLanhDaoPD"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.So.trim() !== "") {
      if (
        // check one-to-one with MaBCPHQH
        ketQuaXMDiaChis.filter(
          (ketquaxmdc: any) => ketquaxmdc.BaoCaoPHDC?.MaBCPHDC === form.MaBCPHDC
        ).length === 0 ||
        (ketQuaXMDiaChis.filter(
          (ketquaxmdc: any) => ketquaxmdc.BaoCaoPHDC?.MaBCPHDC === form.MaBCPHDC
        ).length !== 0 &&
          form.MaBCPHDC_edit === form.MaBCPHDC)
      ) {
        if (statusEdit) {
          const { MaKQXMDC, MaBCPHDC_edit, ...ketQuaXMDiaChiInput } = form;
          editKetQuaXMDiaChi({
            variables: {
              ketQuaXMDiaChiInput,
              id: form.MaKQXMDC,
            },
            onCompleted: (data) => {
              showNotification(
                "Chúc mừng",
                `Cập nhật kết quả xác minh địa chỉ số "${data.editKetQuaXMDiaChi?.So}" thành công`,
                "success"
              );
              setStatusEdit(false);
              setForm(FI_KetQuaXMDiaChi);
            },
            onError: (error) => {
              showNotification("Lỗi!", error.message, "danger");
              navigate("/dangnhap");
            },
          });
        } else {
          const { MaKQXMDC, MaBCPHDC_edit, ...ketQuaXMDiaChiInput } = form;
          createKetQuaXMDiaChi({
            variables: {
              ketQuaXMDiaChiInput,
            },
            onCompleted: (data) => {
              showNotification(
                "Chúc mừng",
                `Thêm mới kết quả xác minh địa chỉ số "${data.createKetQuaXMDiaChi?.So}" thành công`,
                "success"
              );
              setForm(FI_KetQuaXMDiaChi);
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
      showNotification("Cảnh báo", "Vui lòng nhập đầy đủ giá trị!", "warning");
    }
  };

  const onEditData = (ketquaxmdc: any) => {
    let day = (time: any) => moment(time).date();
    let month = (time: any) => moment(time).month();
    let year = (time: any) => moment(time).year();
    setStatusEdit(true);
    setForm({
      ...form,
      MaKQXMDC: ketquaxmdc.MaKQXMDC,
      So: ketquaxmdc.So,
      Ngay: ketquaxmdc.Ngay
        ? `${year(ketquaxmdc.Ngay)}-${
            month(ketquaxmdc.Ngay) < 9
              ? "0" + (month(ketquaxmdc.Ngay) + 1)
              : month(ketquaxmdc.Ngay) + 1
          }-${
            day(ketquaxmdc.Ngay) < 10
              ? "0" + day(ketquaxmdc.Ngay)
              : day(ketquaxmdc.Ngay)
          }`
        : "",
      MaBCPHDC: ketquaxmdc.BaoCaoPHQH?.MaBCPHDC,
      MaBCPHDC_edit: ketquaxmdc.BaoCaoPHQH?.MaBCPHDC,
    });
  };

  const onDeleteData = (ketquaxmdc: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: ketquaxmdc.So,
      Table: "KetQuaXMDiaChis",
      ID: ketquaxmdc.MaKQXMDC,
    });

  useEffect(() => {
    if (Data_ketQuaXMDiaChis) {
      set_ketQuaXMDiaChis(Data_ketQuaXMDiaChis.ketQuaXMDiaChis);
    }
  }, [Data_ketQuaXMDiaChis]);

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

  if (!Data_ketQuaXMDiaChis) return <Spinner />;
  return (
    <InputKetQuaXMDiaChiStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách kết quả xác minh địa chỉ hiện có{" "}
            <b>({ketQuaXMDiaChis.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh KetQuaXMDiaChi..."
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
                  <th scope="col">DiaChi</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...ketQuaXMDiaChis]
                  .reverse()
                  .map((ketquaxmdc: any, ind: number) => (
                    <tr key={ind} title={`MaKQXMDC: ${ketquaxmdc.MaKQXMDC}`}>
                      <td>{ketquaxmdc.So}</td>
                      <td>{ketquaxmdc.Ngay && handleTime(ketquaxmdc.Ngay)}</td>
                      <td>{ketquaxmdc.BaoCaoPHDC?.DiaChi}</td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => onEditData(ketquaxmdc)}
                          title="Sửa"
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeleteData"
                          onClick={() => onDeleteData(ketquaxmdc)}
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
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} kết quả xác minh địa chỉ:
          </h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">So:</label>
              <input
                required
                value={form.So ? form.So : ""}
                name="So"
                onChange={changeForm}
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ngày:</label>
              <input
                value={form.Ngay ? form.Ngay : ""}
                name="Ngay"
                onChange={changeForm}
                type="date"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mã BCPHDC (MaBCPHDC):</label>
              <select
                required
                value={form.MaBCPHDC ? form.MaBCPHDC : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaBCPHDC"
              >
                <option defaultValue={""}>Chọn báo cáo PHDC</option>
                {Data_baocaoPHDCs &&
                  Data_baocaoPHDCs.baocaoPHDCs.map(
                    (baocaophdc: any, ind: number) => (
                      <option key={ind} value={baocaophdc.MaBCPHDC}>
                        {baocaophdc.DiaChi} -{" "}
                        {
                          baocaophdc.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
                            ?.BiDanh
                        }{" "}
                        -{" "}
                        {
                          baocaophdc.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
                            ?.DeNghiTSNT?.DoiTuong?.TenDT
                        }
                      </option>
                    )
                  )}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Mã lãnh đạo phê duyệt (MaLanhDaoPD):
              </label>
              <select
                required
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
    </InputKetQuaXMDiaChiStyled>
  );
}
