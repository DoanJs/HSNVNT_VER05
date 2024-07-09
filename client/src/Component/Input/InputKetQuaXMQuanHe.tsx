import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createKetQuaXMQuanHe,
  MUTATION_editKetQuaXMQuanHe,
  QUERY_baocaoPHQHs,
  QUERY_cbcss,
  QUERY_ketQuaXMQuanHes,
} from "../../graphql/documentNode";
import {
  handleSearch,
  handleTime,
  showNotification,
} from "../../utils/functions";
import { FI_KetQuaXMQuanHe } from "./FormInitial";
import moment from "moment";

const InputKetQuaXMQuanHeStyled = styled.div`
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

export default function InputKetQuaXMQuanHe() {
  const navigate = useNavigate();
  const { data: Data_ketQuaXMQuanHes, error } = useQuery(
    QUERY_ketQuaXMQuanHes,
    {
      variables: { utilsParams: {} },
    }
  );
  const { data: Data_baocaoPHQHs } = useQuery(QUERY_baocaoPHQHs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_cbcss } = useQuery(QUERY_cbcss, {
    variables: { utilsParams: {} },
  });
  const [createKetQuaXMQuanHe] = useMutation(MUTATION_createKetQuaXMQuanHe, {
    refetchQueries: [
      { query: QUERY_ketQuaXMQuanHes, variables: { utilsParams: {} } },
    ],
  });
  const [editKetQuaXMQuanHe] = useMutation(MUTATION_editKetQuaXMQuanHe, {
    refetchQueries: [
      { query: QUERY_ketQuaXMQuanHes, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [ketQuaXMQuanHes, set_ketQuaXMQuanHes] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_KetQuaXMQuanHe);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_ketQuaXMQuanHes(
      handleSearch(
        "KetQuaXMQuanHes",
        Data_ketQuaXMQuanHes.ketQuaXMQuanHes,
        e.target.value
      )
    );
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "MaBCPHQH" || e.target.name === "MaLanhDaoPD"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.So.trim() !== "") {
      if (
        // check one-to-one with MaBCPHQH
        ketQuaXMQuanHes.filter(
          (ketquaxmqh: any) => ketquaxmqh.BaoCaoPHQH?.MaBCPHQH === form.MaBCPHQH
        ).length === 0 ||
        (ketQuaXMQuanHes.filter(
          (ketquaxmqh: any) => ketquaxmqh.BaoCaoPHQH?.MaBCPHQH === form.MaBCPHQH
        ).length !== 0 &&
          form.MaBCPHQH_edit === form.MaBCPHQH)
      ) {
        if (statusEdit) {
          const { MaKQXMQH, MaBCPHQH_edit, ...ketQuaXMQuanHeInput } = form;
          editKetQuaXMQuanHe({
            variables: {
              ketQuaXMQuanHeInput,
              id: form.MaKQXMQH,
            },
            onCompleted: (data) => {
              showNotification(
                "Chúc mừng",
                `Cập nhật kết quả xác minh quan hệ số "${data.editKetQuaXMQuanHe?.So}" thành công`,
                "success"
              );
              setStatusEdit(false);
              setForm(FI_KetQuaXMQuanHe);
            },
            onError: (error) => {
              showNotification("Lỗi!", error.message, "danger");
              navigate("/dangnhap");
            },
          });
        } else {
          const { MaKQXMQH, MaBCPHQH_edit, ...ketQuaXMQuanHeInput } = form;
          createKetQuaXMQuanHe({
            variables: {
              ketQuaXMQuanHeInput,
            },
            onCompleted: (data) => {
              showNotification(
                "Chúc mừng",
                `Thêm mới kết quả xác minh quan hệ số "${data.createKetQuaXMQuanHe?.So}" thành công`,
                "success"
              );
              setForm(FI_KetQuaXMQuanHe);
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

  const onEditData = (ketquaxmqh: any) => {
    let day = (time: any) => moment(time).date();
    let month = (time: any) => moment(time).month();
    let year = (time: any) => moment(time).year();
    setStatusEdit(true);
    setForm({
      ...form,
      MaKQXMQH: ketquaxmqh.MaKQXMQH,
      So: ketquaxmqh.So,
      Ngay: ketquaxmqh.Ngay
        ? `${year(ketquaxmqh.Ngay)}-${
            month(ketquaxmqh.Ngay) < 9
              ? "0" + (month(ketquaxmqh.Ngay) + 1)
              : month(ketquaxmqh.Ngay) + 1
          }-${
            day(ketquaxmqh.Ngay) < 10
              ? "0" + day(ketquaxmqh.Ngay)
              : day(ketquaxmqh.Ngay)
          }`
        : "",
      MaBCPHQH: ketquaxmqh.BaoCaoPHQH?.MaBCPHQH,
      MaBCPHQH_edit: ketquaxmqh.BaoCaoPHQH?.MaBCPHQH,
    });
  };

  const onDeleteData = (ketquaxmqh: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: ketquaxmqh.So,
      Table: "KetQuaXMQuanHes",
      ID: ketquaxmqh.MaKQXMQH,
    });

  useEffect(() => {
    if (Data_ketQuaXMQuanHes) {
      set_ketQuaXMQuanHes(Data_ketQuaXMQuanHes.ketQuaXMQuanHes);
    }
  }, [Data_ketQuaXMQuanHes]);

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

  if (!Data_ketQuaXMQuanHes) return <Spinner />;
  return (
    <InputKetQuaXMQuanHeStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách kết quả xác minh quan hệ hiện có{" "}
            <b>({ketQuaXMQuanHes.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh KetQuaXMQuanHe..."
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
                  <th scope="col">BiDanh</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...ketQuaXMQuanHes]
                  .reverse()
                  .map((ketquaxmqh: any, ind: number) => (
                    <tr key={ind} title={`MaKQXMQH: ${ketquaxmqh.MaKQXMQH}`}>
                      <td>{ketquaxmqh.So}</td>
                      <td>{ketquaxmqh.Ngay && handleTime(ketquaxmqh.Ngay)}</td>
                      <td>{ketquaxmqh.BaoCaoPHQH?.BiDanh}</td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => onEditData(ketquaxmqh)}
                          title="Sửa"
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeleteData"
                          onClick={() => onDeleteData(ketquaxmqh)}
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
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} kết quả xác minh quan hệ:
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
              <label className="form-label">Mã BCPHQH (MaBCPHQH):</label>
              <select
                required
                value={form.MaBCPHQH ? form.MaBCPHQH : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaBCPHQH"
              >
                <option defaultValue={""}>Chọn báo cáo PHQH</option>
                {Data_baocaoPHQHs &&
                  Data_baocaoPHQHs.baocaoPHQHs.map(
                    (baocaophqh: any, ind: number) => (
                      <option key={ind} value={baocaophqh.MaBCPHQH}>
                        {baocaophqh.BiDanh} -{" "}
                        {
                          baocaophqh.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
                            ?.BiDanh
                        }{" "}
                        -{" "}
                        {
                          baocaophqh.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
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
    </InputKetQuaXMQuanHeStyled>
  );
}
