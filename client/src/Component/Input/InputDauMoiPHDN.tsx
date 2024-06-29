import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createDauMoiPH_DN,
  MUTATION_editDauMoiPH_DN,
  QUERY_cbcss,
  QUERY_dauMoiPH_DNs,
  QUERY_denghiTSNTs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_DauMoiPH_DN } from "./FormInitial";

const InputDauMoiPHDNStyled = styled.div`
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

export default function InputDauMoiPHDN() {
  const navigate = useNavigate();
  const { data: Data_dauMoiPH_DNs, error } = useQuery(QUERY_dauMoiPH_DNs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_denghiTSNTs } = useQuery(QUERY_denghiTSNTs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_cbcss } = useQuery(QUERY_cbcss, {
    variables: { utilsParams: {} },
  });
  const [createDauMoiPH_DN] = useMutation(MUTATION_createDauMoiPH_DN, {
    refetchQueries: [
      { query: QUERY_dauMoiPH_DNs, variables: { utilsParams: {} } },
    ],
  });
  const [editDauMoiPH_DN] = useMutation(MUTATION_editDauMoiPH_DN, {
    refetchQueries: [
      { query: QUERY_dauMoiPH_DNs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [dauMoiPH_DNs, set_dauMoiPH_DNs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_DauMoiPH_DN);
  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_dauMoiPH_DNs(
      handleSearch(
        "DauMoiPH_DNs",
        Data_dauMoiPH_DNs.dauMoiPH_DNs,
        e.target.value
      )
    );
  };

  const changeForm = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: Number(e.target.value),
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.MaDN) {
      if (
        Data_dauMoiPH_DNs.dauMoiPH_DNs?.filter(
          (obj: any) => obj.DeNghiTSNT?.MaDN === form.MaDN
        ).length === 0 ||
        (Data_dauMoiPH_DNs.dauMoiPH_DNs?.filter(
          (obj: any) => obj.DeNghiTSNT?.MaDN === form.MaDN
        ).length !== 0 &&
          form.MaDN === form.MaDN_edit)
      ) {
        if (statusEdit) {
          editDauMoiPH_DN({
            variables: {
              dauMoiPH_DNInput: {
                MaDN: form.MaDN,
                MaLDDonViDN: form.MaLDDonViDN,
                MaCBTrucTiepPH: form.MaCBTrucTiepPH,
              },
              id: form.MaDMPH,
            },
            onCompleted: (data) => {
              showNotification(
                "Chúc mừng",
                `Cập nhật đầu mối phối hợp đề nghị "${data.editDauMoiPH_DN?.DeNghiTSNT?.So}" thành công`,
                "success"
              );
              setStatusEdit(false);
              setForm(FI_DauMoiPH_DN);
            },
            onError: (error) => {
              showNotification("Lỗi!", error.message, "danger");
              navigate("/dangnhap");
            },
          });
        } else {
          createDauMoiPH_DN({
            variables: {
              dauMoiPH_DNInput: {
                MaDN: form.MaDN,
                MaLDDonViDN: form.MaLDDonViDN,
                MaCBTrucTiepPH: form.MaCBTrucTiepPH,
              },
            },
            onCompleted: (data) => {
              showNotification(
                "Chúc mừng",
                `Thêm mới đầu mối phối hợp đề nghị "${data.createDauMoiPH_DN?.DeNghiTSNT?.So}" thành công`,
                "success"
              );
              setForm(FI_DauMoiPH_DN);
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

  const onEditData = (obj: any) => {
    setStatusEdit(true);
    setForm({
      ...obj,
      MaDMPH: obj.MaDMPH,
      MaDN: obj.DeNghiTSNT?.MaDN,
      MaLDDonViDN: obj.LDDonViDN?.MaCBCS,
      MaCBTrucTiepPH: obj.CBTrucTiepPH?.MaCBCS,
      MaDN_edit: obj.DeNghiTSNT?.MaDN,
    });
  };

  const onDeleteData = (obj: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: obj.DeNghiTSNT?.So,
      Table: "DauMoiPH_DNs",
      ID: obj.MaDMPH,
    });

  useEffect(() => {
    if (Data_dauMoiPH_DNs) {
      set_dauMoiPH_DNs(Data_dauMoiPH_DNs.dauMoiPH_DNs);
    }
  }, [Data_dauMoiPH_DNs]);

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

  if (!Data_dauMoiPH_DNs) return <Spinner />;
  return (
    <InputDauMoiPHDNStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>Danh sách đầu mối phối hợp đề nghị hiện có: </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">SoDN</th>
                  <th scope="col">LDDonViDN</th>
                  <th scope="col">CBTrucTiepPH</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...dauMoiPH_DNs]
                  .reverse()
                  .map((daumoiphdn: any, ind: number) => (
                    <tr key={ind}>
                      <td>{daumoiphdn.DeNghiTSNT?.So}</td>
                      <td>{daumoiphdn.LDDonViDN?.HoTen}</td>
                      <td>{daumoiphdn.CBTrucTiepPH?.HoTen}</td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => onEditData(daumoiphdn)}
                          title="Sửa"
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeleteData"
                          onClick={() => onDeleteData(daumoiphdn)}
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
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} đầu mối phối hợp đề nghị:
          </h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Mã đề nghị TSNT (MaDN):</label>
              <select
                required
                value={form.MaDN ? form.MaDN : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaDN"
              >
                <option defaultValue={""}>Chọn đề nghị TSNT</option>
                {Data_denghiTSNTs &&
                  Data_denghiTSNTs.denghiTSNTs.map(
                    (denghitsnt: any, ind: number) => (
                      <option key={ind} value={denghitsnt.MaDN}>
                        {denghitsnt.So}
                      </option>
                    )
                  )}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Mã lãnh đạo đơn vị đề nghị (MaLDDonViDN):
              </label>
              <select
                required
                value={form.MaLDDonViDN ? form.MaLDDonViDN : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaLDDonViDN"
              >
                <option defaultValue={""}>Chọn lãnh đạo đơn vị đề nghị</option>
                {Data_cbcss &&
                  Data_cbcss.cbcss.map((cbcs: any, ind: number) => (
                    <option key={ind} value={cbcs.MaCBCS}>
                      {cbcs.HoTen}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Mã cán bộ trực tiếp phối hợp (MaCBTrucTiepPH):
              </label>
              <select
                required
                value={form.MaCBTrucTiepPH ? form.MaCBTrucTiepPH : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaCBTrucTiepPH"
              >
                <option defaultValue={""}>
                  Chọn cán bộ trực tiếp phối hợp
                </option>
                {Data_cbcss &&
                  Data_cbcss.cbcss.map((cbcs: any, ind: number) => (
                    <option key={ind} value={cbcs.MaCBCS}>
                      {cbcs.HoTen}
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
    </InputDauMoiPHDNStyled>
  );
}
