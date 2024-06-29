import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createKyDuyet_DN,
  MUTATION_editKyDuyet_DN,
  QUERY_cbcss,
  QUERY_denghiTSNTs,
  QUERY_kyDuyet_DNs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_KyDuyet_DN } from "./FormInitial";

const InputKyDuyetDNStyled = styled.div`
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

export default function InputKyDuyetDN() {
  const navigate = useNavigate();
  const { data: Data_kyDuyet_DNs, error } = useQuery(QUERY_kyDuyet_DNs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_denghiTSNTs } = useQuery(QUERY_denghiTSNTs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_cbcss } = useQuery(QUERY_cbcss, {
    variables: { utilsParams: {} },
  });
  const [createKyDuyet_DN] = useMutation(MUTATION_createKyDuyet_DN, {
    refetchQueries: [
      { query: QUERY_kyDuyet_DNs, variables: { utilsParams: {} } },
    ],
  });
  const [editKyDuyet_DN] = useMutation(MUTATION_editKyDuyet_DN, {
    refetchQueries: [
      { query: QUERY_kyDuyet_DNs, variables: { utilsParams: {} } },
    ],
  });

  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [kyDuyet_DNs, set_kyDuyet_DNs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_KyDuyet_DN);
  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_kyDuyet_DNs(
      handleSearch("KyDuyet_DNs", Data_kyDuyet_DNs.kyDuyet_DNs, e.target.value)
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
        Data_kyDuyet_DNs.kyDuyet_DNs?.filter(
          (obj: any) => obj.DeNghiTSNT?.MaDN === form.MaDN
        ).length === 0 ||
        (Data_kyDuyet_DNs.kyDuyet_DNs?.filter(
          (obj: any) => obj.DeNghiTSNT?.MaDN === form.MaDN
        ).length !== 0 &&
          form.MaDN === form.MaDN_edit)
      ) {
        if (statusEdit) {
          editKyDuyet_DN({
            variables: {
              kyDuyet_DNInput: {
                MaDN: form.MaDN,
                MaDaiDienCATTPvaTD: form.MaDaiDienCATTPvaTD,
                MaDaiDienDonViDN: form.MaDaiDienDonViDN,
                MaDaiDienDonViTSNT: form.MaDaiDienDonViTSNT,
              },
              id: form.MaKDDN,
            },
            onCompleted: (data) => {
              showNotification(
                "Chúc mừng",
                `Cập nhật ký duyệt đề nghị "${data.editKyDuyet_DN?.DeNghiTSNT?.So}" thành công`,
                "success"
              );
              setStatusEdit(false);
              setForm(FI_KyDuyet_DN);
            },
            onError: (error) => {
              showNotification("Lỗi!", error.message, "danger");
              navigate("/dangnhap");
            },
          });
        } else {
          createKyDuyet_DN({
            variables: {
              kyDuyet_DNInput: {
                MaDN: form.MaDN,
                MaDaiDienCATTPvaTD: form.MaDaiDienCATTPvaTD,
                MaDaiDienDonViDN: form.MaDaiDienDonViDN,
                MaDaiDienDonViTSNT: form.MaDaiDienDonViTSNT,
              },
            },
            onCompleted: (data) => {
              showNotification(
                "Chúc mừng",
                `Thêm mới ký duyệt đề nghị "${data.createKyDuyet_DN?.DeNghiTSNT?.So}" thành công`,
                "success"
              );
              setForm(FI_KyDuyet_DN);
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
      MaKDDN: obj.MaKDDN,
      MaDN: obj.DeNghiTSNT?.MaDN,
      MaDaiDienCATTPvaTD: obj.DaiDienCATTPvaTD?.MaCBCS,
      MaDaiDienDonViDN: obj.DaiDienDonViDN?.MaCBCS,
      MaDaiDienDonViTSNT: obj.DaiDienDonViTSNT?.MaCBCS,
      MaDN_edit: obj.DeNghiTSNT?.MaDN,
    });
  };

  const onDeleteData = (obj: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: obj.DeNghiTSNT?.So,
      Table: "KyDuyet_DNs",
      ID: obj.MaKDDN,
    });

  useEffect(() => {
    if (Data_kyDuyet_DNs) {
      set_kyDuyet_DNs(Data_kyDuyet_DNs.kyDuyet_DNs);
    }
  }, [Data_kyDuyet_DNs]);

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

  if (!Data_kyDuyet_DNs) return <Spinner />;
  return (
    <InputKyDuyetDNStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>Danh sách ký duyệt đề nghị hiện có: </h5>
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
                  <th scope="col">DaiDienCATTPvaTD</th>
                  <th scope="col">DaiDienDonViDN</th>
                  <th scope="col">DaiDienDonViTSNT</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...kyDuyet_DNs]
                  .reverse()
                  .map((kyduyetdn: any, ind: number) => (
                    <tr key={ind}>
                      <td>{kyduyetdn.DeNghiTSNT?.So}</td>
                      <td>{kyduyetdn.DaiDienCATTPvaTD?.HoTen}</td>
                      <td>{kyduyetdn.DaiDienDonViDN?.HoTen}</td>
                      <td>{kyduyetdn.DaiDienDonViTSNT?.HoTen}</td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => onEditData(kyduyetdn)}
                          title="Sửa"
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeleteData"
                          onClick={() => onDeleteData(kyduyetdn)}
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
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} ký duyệt đề nghị:</h5>
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
                Mã đại diện CATTPvaTD (MaDaiDienCATTPvaTD):
              </label>
              <select
                required
                value={form.MaDaiDienCATTPvaTD ? form.MaDaiDienCATTPvaTD : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaDaiDienCATTPvaTD"
              >
                <option defaultValue={""}>Chọn đại diện CATTPvaTD</option>
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
                Mã đại diện đơn vị đề nghị (MaDaiDienDonViDN):
              </label>
              <select
                required
                value={form.MaDaiDienDonViDN ? form.MaDaiDienDonViDN : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaDaiDienDonViDN"
              >
                <option defaultValue={""}>Chọn đại diện đơn vị đề nghị</option>
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
                Mã đại diện đơn vị TSNT (MaDaiDienDonViTSNT):
              </label>
              <select
                required
                value={form.MaDaiDienDonViTSNT ? form.MaDaiDienDonViTSNT : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaDaiDienDonViTSNT"
              >
                <option defaultValue={""}>Chọn đại diện đơn vị TSNT</option>
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
    </InputKyDuyetDNStyled>
  );
}
