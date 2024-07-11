import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createDoiTuongCA,
  MUTATION_editDoiTuongCA,
  QUERY_chuyenans,
  QUERY_doituongCAs,
  QUERY_doituongs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_DoiTuongCA } from "./FormInitial";

const InputDoiTuongCAStyled = styled.div`
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

export default function InputDoiTuongCA() {
  const navigate = useNavigate();
  const { data: Data_doituongCAs, error } = useQuery(QUERY_doituongCAs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_chuyenans } = useQuery(QUERY_chuyenans, {
    variables: { utilsParams: {} },
  });
  const { data: Data_doituongs } = useQuery(QUERY_doituongs, {
    variables: { utilsParams: {} },
  });
  const [createDoiTuongCA] = useMutation(MUTATION_createDoiTuongCA, {
    refetchQueries: [
      { query: QUERY_doituongCAs, variables: { utilsParams: {} } },
    ],
  });
  const [editDoiTuongCA] = useMutation(MUTATION_editDoiTuongCA, {
    refetchQueries: [
      { query: QUERY_doituongCAs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [doituongCAs, set_doituongCAs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_DoiTuongCA);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_doituongCAs(
      handleSearch("DoiTuongCAs", Data_doituongCAs.doituongCAs, e.target.value)
    );
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "MaCA" || e.target.name === "MaDoiTuong"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      form.MaCA &&
      form.MaDoiTuong &&
      form.MaCA !== "" &&
      form.MaDoiTuong !== ""
    ) {
      if (statusEdit) {
        const { MaDTCA, ...doituongCAInput } = form;
        editDoiTuongCA({
          variables: {
            doituongCAInput,
            id: form.MaDTCA,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật đối tượng "${data.editDoiTuongCA?.DoiTuong?.TenDT}" vào chuyên án bí số "${data.editDoiTuongCA?.ChuyenAn?.BiSo}" thành công!`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_DoiTuongCA);
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        const { MaDTCA, ...doituongCAInput } = form;
        createDoiTuongCA({
          variables: {
            doituongCAInput,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới đối tượng "${data.createDoiTuongCA?.DoiTuong?.TenDT}" vào chuyên án bí số "${data.createDoiTuongCA?.ChuyenAn?.BiSo}" thành công`,
              "success"
            );
            setForm(FI_DoiTuongCA);
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

  const onEditData = (doituongca: any) => {
    setStatusEdit(true);
    setForm({
      ...form,
      MaDTCA: doituongca.MaDTCA,
      BiSo: doituongca.BiSo,
      ViTri: doituongca.ViTri,

      MaCA: doituongca.ChuyenAn?.MaCA,
      MaDoiTuong: doituongca.DoiTuong?.MaDoiTuong,
    });
  };

  const onDeleteData = (doituongca: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: `${doituongca.DoiTuong?.TenDT} thuộc chuyên án ${doituongca.ChuyenAn?.BiSo}`,
      Table: "DoiTuongCAs",
      ID: doituongca.MaDTCA,
    });

  useEffect(() => {
    if (Data_doituongCAs) {
      set_doituongCAs(Data_doituongCAs.doituongCAs);
    }
  }, [Data_doituongCAs]);

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

  if (!Data_doituongCAs) return <Spinner />;
  return (
    <InputDoiTuongCAStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách đối tượng chuyên án hiện có <b>({doituongCAs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh DoiTuongCA..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">BiSo</th>
                  <th scope="col">ViTri</th>
                  <th scope="col">ChuyenAn</th>
                  <th scope="col">DoiTuong</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...doituongCAs]
                  .reverse()
                  .map((doituongca: any, ind: number) => (
                    <tr key={ind} title={`MaDTCA: ${doituongca.MaDTCA}`}>
                      <td>{doituongca.BiSo}</td>
                      <td>{doituongca.ViTri}</td>
                      <td>{doituongca.ChuyenAn?.BiSo}</td>
                      <td>{doituongca.DoiTuong?.TenDT}</td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => onEditData(doituongca)}
                          title="Sửa"
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeleteData"
                          onClick={() => onDeleteData(doituongca)}
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
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} đối tượng chuyên án:</h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Mã chuyên án (MaCA):</label>
              <select
                required
                value={form.MaCA ? form.MaCA : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaCA"
              >
                <option defaultValue={""}>Chọn chuyên án</option>
                {Data_chuyenans &&
                  Data_chuyenans.chuyenans.map((chuyenan: any, ind: number) => (
                    <option key={ind} value={chuyenan.MaCA}>
                      {chuyenan.BiSo}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Mã đối tượng (MaDoiTuong):</label>
              <select
                required
                value={form.MaDoiTuong ? form.MaDoiTuong : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaDoiTuong"
              >
                <option defaultValue={""}>Chọn đối tượng</option>
                {Data_doituongs &&
                  Data_doituongs.doituongs.map((doituong: any, ind: number) => (
                    <option key={ind} value={doituong.MaDoiTuong}>
                      {doituong.TenDT}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Bí số:</label>
              <input
                value={form.BiSo ? form.BiSo : ""}
                name="BiSo"
                onChange={changeForm}
                type="text"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Vị trí:</label>
              <select
                value={form.ViTri ? form.ViTri : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="ViTri"
              >
                <option defaultValue={""}>Chọn vị trí</option>
                <option value={"Đối tượng chính"}>Đối tượng chính</option>
                <option value={"Đối tượng phụ"}>Đối tượng phụ</option>
                <option value={"Đối tượng liên quan"}>
                  Đối tượng liên quan
                </option>
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
    </InputDoiTuongCAStyled>
  );
}
