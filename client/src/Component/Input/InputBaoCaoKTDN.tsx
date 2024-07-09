import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import moment from "moment";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createBaoCaoKTDN,
  MUTATION_editBaoCaoKTDN,
  QUERY_baoCaoKTDNs,
  QUERY_cbcss,
  QUERY_ketquaTSNTs,
} from "../../graphql/documentNode";
import {
  handleSearch,
  handleTime,
  showNotification,
} from "../../utils/functions";
import { FI_BaoCaoKTDN } from "./FormInitial";

const InputBaoCaoKTDNstyled = styled.div`
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

export default function InputBaoCaoKTDN() {
  const navigate = useNavigate();
  const { data: Data_baoCaoKTDNs, error } = useQuery(QUERY_baoCaoKTDNs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_ketquaTSNTs } = useQuery(QUERY_ketquaTSNTs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_cbcss } = useQuery(QUERY_cbcss, {
    variables: { utilsParams: {} },
  });
  // ----------------------------------------------------
  const [createBaoCaoKTDN] = useMutation(MUTATION_createBaoCaoKTDN, {
    refetchQueries: [
      { query: QUERY_baoCaoKTDNs, variables: { utilsParams: {} } },
    ],
  });
  const [editBaoCaoKTDN] = useMutation(MUTATION_editBaoCaoKTDN, {
    refetchQueries: [
      { query: QUERY_baoCaoKTDNs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [baoCaoKTDNs, set_baoCaoKTDNs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_BaoCaoKTDN);
  // --------------------------------------------------------------------------------------------
  const convertForm = (obj: any) => {
    let day = (time: any) => moment(time).date();
    let month = (time: any) => moment(time).month();
    let year = (time: any) => moment(time).year();
    return {
      MaBCKTDN: obj.MaBCKTDN,
      Ngay: obj.Ngay
        ? `${year(obj.Ngay)}-${
            month(obj.Ngay) < 9
              ? "0" + (month(obj.Ngay) + 1)
              : month(obj.Ngay) + 1
          }-${day(obj.Ngay) < 10 ? "0" + day(obj.Ngay) : day(obj.Ngay)}`
        : "",
      TinhHinhDT: obj.TinhHinhDT,
      VanDeRKN: obj.VanDeRKN,

      MaKQ: obj.KetQuaTSNT?.MaKQ,
      MaLanhDaoPD: obj.LanhDaoPD?.MaCBCS,
      MaCBTongHop: obj.CBTongHop?.MaCBCS,
      MaKQ_edit: obj.KetQuaTSNT?.MaKQ,
    };
  };

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_baoCaoKTDNs(
      handleSearch("BaoCaoKTDNs", Data_baoCaoKTDNs.baoCaoKTDNs, e.target.value)
    );
  };

  const changeForm = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "MaKQ" ||
        e.target.name === "MaLanhDaoPD" ||
        e.target.name === "MaCBTongHop"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.Ngay !== "") {
      if (
        // check one-to-one with MaKQ
        baoCaoKTDNs.filter(
          (baocaoktdn: any) => baocaoktdn.KetQuaTSNT?.MaKQ === form.MaKQ
        ).length === 0 ||
        (baoCaoKTDNs.filter(
          (baocaoktdn: any) => baocaoktdn.KetQuaTSNT?.MaKQ === form.MaKQ
        ).length !== 0 &&
          form.MaKQ_edit === form.MaKQ)
      ) {
        if (statusEdit) {
          const { MaBCKTDN, MaKQ_edit, ...baocaoKTDNInput } = form;
          editBaoCaoKTDN({
            variables: {
              baocaoKTDNInput,
              id: MaBCKTDN,
            },
            onCompleted: (data) => {
              showNotification(
                "Chúc mừng",
                `Cập nhật báo cáo kết thúc đề nghị ngày "${
                  data.editBaoCaoKTDN?.Ngay &&
                  handleTime(data.editBaoCaoKTDN?.Ngay)
                }" thành công`,
                "success"
              );
              setStatusEdit(false);
              setForm(FI_BaoCaoKTDN);
            },
            onError: (error) => {
              showNotification("Lỗi!", error.message, "danger");
              navigate("/dangnhap");
            },
          });
        } else {
          const { MaBCKTDN, MaKQ_edit, ...baocaoKTDNInput } = form;
          createBaoCaoKTDN({
            variables: {
              baocaoKTDNInput,
            },
            onCompleted: (data) => {
              showNotification(
                "Chúc mừng",
                `Thêm mới báo cáo kết thúc đề nghị ngày "${
                  data.createBaoCaoKTDN?.Ngay &&
                  handleTime(data.createBaoCaoKTDN?.Ngay)
                }" thành công`,
                "success"
              );
              setForm(FI_BaoCaoKTDN);
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

  const onEditData = (baocaoktdn: any) => {
    setStatusEdit(true);
    setForm(convertForm(baocaoktdn));
  };

  const onDeleteData = (baocaoktdn: any) => {
    const { MaBCKTDN, MaKQ_edit, ...inputBaoCaoKTDN } = convertForm(baocaoktdn);
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: `báo cáo KTDN ngày ${handleTime(baocaoktdn.Ngay)}`,
      Table: "BaoCaoKTDNs",
      ID: baocaoktdn.MaBCKTDN,
      Form: inputBaoCaoKTDN,
    });
  };

  useEffect(() => {
    if (Data_baoCaoKTDNs) {
      set_baoCaoKTDNs(Data_baoCaoKTDNs.baoCaoKTDNs);
    }
  }, [Data_baoCaoKTDNs]);

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

  if (!Data_baoCaoKTDNs) return <Spinner />;
  return (
    <InputBaoCaoKTDNstyled>
      <div className="row justify-content-center">
        <div className="col-12 ip-ls-old">
          <h5>
            Danh sách báo cáo kết thúc đề nghị hiện có{" "}
            <b>({baoCaoKTDNs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh BaoCaoKTDN..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">Ngay</th>
                  <th scope="col">KHTSNT</th>
                  <th scope="col">BiDanh</th>
                  <th scope="col">DoiTuong</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...baoCaoKTDNs]
                  .reverse()
                  .map((baocaoktdn: any, ind: number) => (
                    <tr key={ind} title={`MaBCKTDN: ${baocaoktdn.MaBCKTDN}`}>
                      <td>{baocaoktdn.Ngay && handleTime(baocaoktdn.Ngay)}</td>
                      <td>{baocaoktdn.KetQuaTSNT?.KeHoachTSNT?.So}</td>
                      <td>
                        {
                          baocaoktdn.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
                            ?.BiDanh
                        }
                      </td>
                      <td>
                        {
                          baocaoktdn.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT
                            ?.DeNghiTSNT?.DoiTuong?.TenDT
                        }
                      </td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => onEditData(baocaoktdn)}
                          title="Sửa"
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeleteData"
                          onClick={() => onDeleteData(baocaoktdn)}
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
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} báo cáo kết thúc đề nghị:
          </h5>
          <form onSubmit={submitForm}>
            <div className="row">
              <div className="col-2 mb-3">
                <label className="form-label">Ngày báo cáo:</label>
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
                        {cbcs.HoTen} - {cbcs.Doi?.TenDoi} -{" "}
                        {cbcs.Doi?.CAQHvaTD?.CAQHvaTD}
                      </option>
                    ))}
                </select>
              </div>
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label">Tình hình đối tượng:</label>
                  <textarea
                    value={form.TinhHinhDT ? form.TinhHinhDT : ""}
                    name="TinhHinhDT"
                    onChange={changeForm}
                    className="form-control"
                    rows={5}
                  ></textarea>
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">Vấn đề rút kinh nghiệm:</label>
                  <textarea
                    value={form.VanDeRKN ? form.VanDeRKN : ""}
                    name="VanDeRKN"
                    onChange={changeForm}
                    className="form-control"
                    rows={5}
                  ></textarea>
                </div>
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
    </InputBaoCaoKTDNstyled>
  );
}
