import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createThanhVienBCA,
  MUTATION_editThanhVienBCA,
  QUERY_cbcss,
  QUERY_chuyenans,
  QUERY_thanhvienBCAs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_ThanhVienBCA } from "./FormInitial";

const InputThanhVienBCAStyled = styled.div`
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

export default function InputThanhVienBCA() {
  const navigate = useNavigate();
  const { data: Data_thanhvienBCAs, error } = useQuery(QUERY_thanhvienBCAs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_chuyenans } = useQuery(QUERY_chuyenans, {
    variables: { utilsParams: {} },
  });
  const { data: Data_cbcss } = useQuery(QUERY_cbcss, {
    variables: { utilsParams: {} },
  });
  const [createThanhVienBCA] = useMutation(MUTATION_createThanhVienBCA, {
    refetchQueries: [
      { query: QUERY_thanhvienBCAs, variables: { utilsParams: {} } },
    ],
  });
  const [editThanhVienBCA] = useMutation(MUTATION_editThanhVienBCA, {
    refetchQueries: [
      { query: QUERY_thanhvienBCAs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [thanhvienBCAs, set_thanhvienBCAs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_ThanhVienBCA);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_thanhvienBCAs(
      handleSearch(
        "ThanhVienBCAs",
        Data_thanhvienBCAs.thanhvienBCAs,
        e.target.value
      )
    );
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "MaCA" || e.target.name === "MaCBCS"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.MaCA && form.MaCBCS && form.MaCA !== "" && form.MaCBCS !== "") {
      if (statusEdit) {
        const { MaTVBCA, ...thanhvienBCAInput } = form;
        editThanhVienBCA({
          variables: {
            thanhvienBCAInput,
            id: form.MaTVBCA,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật thành viên BCA "${data.editThanhVienBCA?.CBCS?.HoTen}" vào chuyên án bí số "${data.editThanhVienBCA?.ChuyenAn?.BiSo}" thành công!`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_ThanhVienBCA);
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        const { MaTVBCA, ...thanhvienBCAInput } = form;
        createThanhVienBCA({
          variables: {
            thanhvienBCAInput,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới thành viên BCA "${data.createThanhVienBCA?.CBCS?.HoTen}" vào chuyên án bí số "${data.createThanhVienBCA?.ChuyenAn?.BiSo}" thành công`,
              "success"
            );
            setForm(FI_ThanhVienBCA);
          },
          onError: (error) => {
            console.log(error.message)
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      }
    } else {
      showNotification("Cảnh báo", "Vui lòng nhập đầy đủ giá trị!", "warning");
    }
  };

  const onEditData = (thanhvienbca: any) => {
    setStatusEdit(true);
    setForm({
      ...form,
      MaTVBCA: thanhvienbca.MaTVBCA,
      BiDanh: thanhvienbca.BiDanh,
      ViTri: thanhvienbca.ViTri,

      MaCA: thanhvienbca.ChuyenAn?.MaCA,
      MaCBCS: thanhvienbca.CBCS?.MaCBCS,
    });
  };

  const onDeleteData = (thanhvienbca: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: `${thanhvienbca.CBCS?.HoTen} thuộc chuyên án ${thanhvienbca.ChuyenAn?.BiSo}`,
      Table: "ThanhVienBCAs",
      ID: thanhvienbca.MaTVBCA,
    });

  useEffect(() => {
    if (Data_thanhvienBCAs) {
      set_thanhvienBCAs(Data_thanhvienBCAs.thanhvienBCAs);
    }
  }, [Data_thanhvienBCAs]);

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

  if (!Data_thanhvienBCAs) return <Spinner />;
  return (
    <InputThanhVienBCAStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách thành viên Ban chuyên án hiện có{" "}
            <b>({thanhvienBCAs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh ThanhVienBCA..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">BiDanh</th>
                  <th scope="col">ViTri</th>
                  <th scope="col">ChuyenAn</th>
                  <th scope="col">CBCS</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...thanhvienBCAs]
                  .reverse()
                  .map((thanhvienbca: any, ind: number) => (
                    <tr key={ind} title={`MaTVBCA: ${thanhvienbca.MaTVBCA}`}>
                      <td>{thanhvienbca.BiDanh}</td>
                      <td>{thanhvienbca.ViTri}</td>
                      <td>{thanhvienbca.ChuyenAn?.BiSo}</td>
                      <td>{thanhvienbca.CBCS?.HoTen}</td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => onEditData(thanhvienbca)}
                          title="Sửa"
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeleteData"
                          onClick={() => onDeleteData(thanhvienbca)}
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
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} thành viên Ban chuyên án:
          </h5>
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
                {Data_cbcss &&
                  Data_cbcss.cbcss.map((cbcs: any, ind: number) => (
                    <option key={ind} value={cbcs.MaCBCS}>
                      {cbcs.HoTen} - {cbcs.Doi?.TenDoi} -{" "}
                      {cbcs.Doi?.CAQHvaTD?.CAQHvaTD} -{" "}
                      {cbcs.Doi?.CAQHvaTD?.CATTPvaTD?.CATTPvaTD}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Bí danh:</label>
              <input
                value={form.BiDanh ? form.BiDanh : ""}
                name="BiDanh"
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
                <option value={"Trưởng ban chuyên án"}>
                  Trưởng ban chuyên án
                </option>
                <option value={"Phó ban chuyên án"}>Phó ban chuyên án</option>
                <option value={"Thành viên ban chuyên án"}>
                  Thành viên ban chuyên án
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
    </InputThanhVienBCAStyled>
  );
}
