import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import moment from "moment";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createBienBanRKN,
  MUTATION_editBienBanRKN,
  QUERY_bienBanRKNs,
  QUERY_cbcss,
  QUERY_ketquaTSNTs,
} from "../../graphql/documentNode";
import {
  handleSearch,
  handleTime,
  showNotification,
} from "../../utils/functions";
import { FI_BienBanRKN } from "./FormInitial";

const InputBienBanRKNStyled = styled.div`
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

export default function InputBienBanRKN() {
  const navigate = useNavigate();
  const { data: Data_bienBanRKNs, error } = useQuery(QUERY_bienBanRKNs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_cbcss } = useQuery(QUERY_cbcss, {
    variables: { utilsParams: {} },
  });
  const { data: Data_ketquaTSNTs } = useQuery(QUERY_ketquaTSNTs, {
    variables: { utilsParams: {} },
  });
  // ----------------------------------------------------
  const [createBienBanRKN] = useMutation(MUTATION_createBienBanRKN, {
    refetchQueries: [
      { query: QUERY_bienBanRKNs, variables: { utilsParams: {} } },
    ],
  });
  const [editBienBanRKN] = useMutation(MUTATION_editBienBanRKN, {
    refetchQueries: [
      { query: QUERY_bienBanRKNs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [bienBanRKNs, set_bienBanRKNs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_BienBanRKN);

  // --------------------------------------------------------------------------------------------
  const convertForm = (obj: any) => {
    let day = (time: any) => moment(time).date();
    let month = (time: any) => moment(time).month();
    let year = (time: any) => moment(time).year();
    return {
      MaBBRKN: obj.MaBBRKN,

      Ngay: obj.Ngay
        ? `${year(obj.Ngay)}-${
            month(obj.Ngay) < 9
              ? "0" + (month(obj.Ngay) + 1)
              : month(obj.Ngay) + 1
          }-${day(obj.Ngay) < 10 ? "0" + day(obj.Ngay) : day(obj.Ngay)}`
        : "",
      DanhGiaLDP: obj.DanhGiaLDP,
      DanhGiaTS: obj.DanhGiaTS,
      DanhGiaDT: obj.DanhGiaDT,
      KetLuan: obj.KetLuan,
      DeXuat: obj.DeXuat,

      MaKQ: obj.KetQuaTSNT?.MaKQ,
      MaChuToa: obj.ChuToa?.MaCBCS,
      MaThuKy: obj.ThuKy?.MaCBCS,

      MaKQ_edit: obj.KetQuaTSNT?.MaKQ,
    };
  };

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_bienBanRKNs(
      handleSearch("BienBanRKNs", Data_bienBanRKNs.bienBanRKNs, e.target.value)
    );
  };

  const changeForm = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "MaKQ" ||
        e.target.name === "MaChuToa" ||
        e.target.name === "MaThuKy"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.Ngay !== "") {
      if (
        bienBanRKNs.filter(
          (bienbanRKN: any) => bienbanRKN.KetQuaTSNT?.MaKQ === form.MaKQ
        ).length === 0 ||
        (bienBanRKNs.filter(
          (bienbanRKN: any) => bienbanRKN.KetQuaTSNT?.MaKQ === form.MaKQ
        ).length !== 0 &&
          form.MaKQ_edit === form.MaKQ)
      ) {
        if (statusEdit) {
          const { MaBBRKN, MaKQ_edit, ...bienbanRKNInput } = form;
          editBienBanRKN({
            variables: {
              bienbanRKNInput,
              id: MaBBRKN,
            },
            onCompleted: (data) => {
              showNotification(
                "Chúc mừng",
                `Cập nhật biên bản RKN ngày "${handleTime(
                  data.editBienBanRKN?.Ngay
                )}" thành công`,
                "success"
              );
              setStatusEdit(false);
              setForm(FI_BienBanRKN);
            },
            onError: (error) => {
              showNotification("Lỗi!", error.message, "danger");
              navigate("/dangnhap");
            },
          });
        } else {
          const { MaBBRKN, MaKQ_edit, ...bienbanRKNInput } = form;
          createBienBanRKN({
            variables: {
              bienbanRKNInput,
            },
            onCompleted: (data) => {
              showNotification(
                "Chúc mừng",
                `Thêm mới biên bản RKN ngày "${handleTime(
                  data.createBienBanRKN?.Ngay
                )}" thành công`,
                "success"
              );
              setForm(FI_BienBanRKN);
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

  const onEditData = (bienbanrkn: any) => {
    setStatusEdit(true);
    setForm(convertForm(bienbanrkn));
  };

  const onDeleteData = (bienbanrkn: any) => {
    const { MaBBRKN, MaKQ_edit, ...inputBienBanRKN } = convertForm(bienbanrkn);
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: `biên bản RKN ngày ${handleTime(bienbanrkn.Ngay)}`,
      Table: "BienBanRKNs",
      ID: bienbanrkn.MaBBRKN,
      Form: inputBienBanRKN,
    });
  };

  useEffect(() => {
    if (Data_bienBanRKNs) {
      set_bienBanRKNs(Data_bienBanRKNs.bienBanRKNs);
    }
  }, [Data_bienBanRKNs]);

  useEffect(() => {
    if (error) {
      console.log(error.message);
      showNotification(
        "Cảnh báo",
        "Hết phiên hoạt động. Vui lòng đăng nhập lại",
        "warning"
      );
      navigate("/dangnhap");
    }
    // eslint-disable-next-line
  }, [error]);

  if (!Data_bienBanRKNs) return <Spinner />;
  return (
    <InputBienBanRKNStyled>
      <div className="row justify-content-center">
        <div className="col-12 ip-ls-old">
          <h5>
            Danh sách biên bản RKN hiện có <b>({bienBanRKNs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh BienBanRKN..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">Ngay</th>
                  <th scope="col">ChuToa</th>
                  <th scope="col">ThuKy</th>
                  <th scope="col">KeHoachTSNT</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...bienBanRKNs]
                  .reverse()
                  .map((bienbanrkn: any, ind: number) => (
                    <tr key={ind} title={`MaBBRKN: ${bienbanrkn.MaBBRKN}`}>
                      <td>{bienbanrkn.Ngay && handleTime(bienbanrkn.Ngay)}</td>
                      <td>{bienbanrkn.ChuToa?.HoTen}</td>
                      <td>{bienbanrkn.ThuKy?.HoTen}</td>
                      <td>{bienbanrkn.KetQuaTSNT?.KeHoachTSNT?.So}</td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => onEditData(bienbanrkn)}
                          title="Sửa"
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeleteData"
                          onClick={() => onDeleteData(bienbanrkn)}
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
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} biên bản RKN:</h5>
          <form onSubmit={submitForm}>
            <div className="row">
              <div className="col-2 mb-3">
                <label className="form-label">Ngày:</label>
                <input
                  required
                  value={form.Ngay ? form.Ngay : ""}
                  name="Ngay"
                  onChange={changeForm}
                  type="date"
                  className="form-control"
                />
              </div>
              {/* --------------------------Ma lien quan----------------------------------- */}
              <div className="col-2 mb-3">
                <label className="form-label">Mã chủ tọa (MaChuToa):</label>
                <select
                  value={form.MaChuToa ? form.MaChuToa : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaChuToa"
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
                <label className="form-label">Mã thư ký (MaThuKy):</label>
                <select
                  value={form.MaThuKy ? form.MaThuKy : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaThuKy"
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
              <div className="col-3 mb-3">
                <label className="form-label">Mã kết quả (MaKQ):</label>
                <select
                  value={form.MaKQ ? form.MaKQ : ""}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={changeForm}
                  name="MaKQ"
                >
                  <option defaultValue={""}>
                    Chọn kết quả TSNT/Kế hoạch TSNT tương đương
                  </option>
                  {Data_ketquaTSNTs &&
                    Data_ketquaTSNTs.ketquaTSNTs.map(
                      (ketquatsnt: any, ind: number) => (
                        <option key={ind} value={ketquatsnt.MaKQ}>
                          {ketquatsnt.KeHoachTSNT?.So}
                        </option>
                      )
                    )}
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-6 mb-3">
                <label className="form-label">Đánh giá đối tượng:</label>
                <textarea
                  value={form.DanhGiaDT ? form.DanhGiaDT : ""}
                  name="DanhGiaDT"
                  onChange={changeForm}
                  className="form-control"
                  rows={5}
                ></textarea>
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Đánh giá trinh sát:</label>
                <textarea
                  value={form.DanhGiaTS ? form.DanhGiaTS : ""}
                  name="DanhGiaTS"
                  onChange={changeForm}
                  className="form-control"
                  rows={5}
                ></textarea>
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Đánh giá Lãnh đạo:</label>
                <textarea
                  value={form.DanhGiaLDP ? form.DanhGiaLDP : ""}
                  name="DanhGiaLDP"
                  onChange={changeForm}
                  className="form-control"
                  rows={5}
                ></textarea>
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Kết luận:</label>
                <textarea
                  value={form.KetLuan ? form.KetLuan : ""}
                  name="KetLuan"
                  onChange={changeForm}
                  className="form-control"
                  rows={5}
                ></textarea>
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Đề xuất:</label>
                <textarea
                  value={form.DeXuat ? form.DeXuat : ""}
                  name="DeXuat"
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
    </InputBienBanRKNStyled>
  );
}
