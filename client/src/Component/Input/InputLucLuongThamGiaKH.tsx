import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createLucLuongThamGiaKH,
  MUTATION_editLucLuongThamGiaKH,
  QUERY_cbcss,
  QUERY_kehoachTSNTs,
  QUERY_lucluongThamGiaKHs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_LucLuongThamGiaKH } from "./FormInitial";

const InputLucLuongThamGiaKHStyled = styled.div`
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
export default function InputLucLuongThamGiaKH() {
  const navigate = useNavigate();
  const { data: Data_lucluongThamGiaKHs, error } = useQuery(
    QUERY_lucluongThamGiaKHs,
    {
      variables: { utilsParams: {} },
    }
  );
  const { data: Data_cbcss } = useQuery(QUERY_cbcss, {
    variables: { utilsParams: {} },
  });
  const { data: Data_kehoachTSNTs } = useQuery(QUERY_kehoachTSNTs, {
    variables: { utilsParams: {} },
  });
  // mutation
  const [createLucLuongThamGiaKH] = useMutation(
    MUTATION_createLucLuongThamGiaKH,
    {
      refetchQueries: [
        { query: QUERY_lucluongThamGiaKHs, variables: { utilsParams: {} } },
      ],
    }
  );
  const [editLucLuongThamGiaKH] = useMutation(MUTATION_editLucLuongThamGiaKH, {
    refetchQueries: [
      { query: QUERY_lucluongThamGiaKHs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [lucluongThamGiaKHs, set_lucluongThamGiaKHs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_LucLuongThamGiaKH);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_lucluongThamGiaKHs(
      handleSearch(
        "LucLuongThamGiaKHs",
        Data_lucluongThamGiaKHs.lucluongThamGiaKHs,
        e.target.value
      )
    );
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "MaKH" || e.target.name === "MaCBCS"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.MaKH) {
      if (statusEdit) {
        editLucLuongThamGiaKH({
          variables: {
            lucluongThamGiaKHInput: {
              ViTri: form.ViTri,
              MaKH: form.MaKH,
              MaCBCS: form.MaCBCS,
            },
            id: form.MaLLTGKH,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật lực lượng tham gia KH "${data.editLucLuongThamGiaKH?.KeHoachTSNT?.So}" thành công`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_LucLuongThamGiaKH);
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        createLucLuongThamGiaKH({
          variables: {
            lucluongThamGiaKHInput: {
              ViTri: form.ViTri,
              MaKH: form.MaKH,
              MaCBCS: form.MaCBCS,
            },
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới lực lượng tham gia KH "${data.createLucLuongThamGiaKH?.KeHoachTSNT?.So}" thành công`,
              "success"
            );
            setForm(FI_LucLuongThamGiaKH);
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

  const onEditData = (lltgkh: any) => {
    setStatusEdit(true);
    setForm({
      ...form,
      MaLLTGKH: lltgkh.MaLLTGKH,
      ViTri: lltgkh.ViTri,
      MaKH: lltgkh.KeHoachTSNT?.MaKH,
      MaCBCS: lltgkh.CBCS?.MaCBCS,
    });
  };

  const onDeleteData = (lltgkh: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: `CBCS ${lltgkh.CBCS?.HoTen} khỏi lực lượng tham gia KH ${lltgkh.KeHoachTSNT?.So}`,
      Table: "LucLuongThamGiaKHs",
      ID: lltgkh.MaLLTGKH,
    });

  useEffect(() => {
    if (Data_lucluongThamGiaKHs) {
      set_lucluongThamGiaKHs(Data_lucluongThamGiaKHs.lucluongThamGiaKHs);
    }
  }, [Data_lucluongThamGiaKHs]);

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

  if (!Data_lucluongThamGiaKHs) return <Spinner />;
  return (
    <InputLucLuongThamGiaKHStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách lực lượng tham gia kế hoạch hiện có{" "}
            <b>({lucluongThamGiaKHs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh LucLuongThamGiaKH..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">SoKH</th>
                  <th scope="col">CBCS</th>
                  <th scope="col">ViTri</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...lucluongThamGiaKHs]
                  .reverse()
                  .map((lltgkh: any, ind: number) => (
                    <tr key={ind} title={`MaLLTGKH: ${lltgkh.MaLLTGKH}`}>
                      <td>{lltgkh.KeHoachTSNT?.So}</td>
                      <td>{lltgkh.CBCS?.HoTen}</td>
                      <td>{lltgkh.ViTri}</td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => onEditData(lltgkh)}
                          title="Sửa"
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeleteData"
                          onClick={() => onDeleteData(lltgkh)}
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
            {statusEdit ? "Chỉnh sửa" : "Thêm mới"} lực lượng tham gia kế hoạch:
          </h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Mã kế hoạch TSNT (MaKH):</label>
              <select
                required
                value={form.MaKH ? form.MaKH : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaKH"
              >
                <option defaultValue={""}>Chọn kế hoạch TSNT</option>
                {Data_kehoachTSNTs &&
                  Data_kehoachTSNTs.kehoachTSNTs.map(
                    (kehoachtsnt: any, ind: number) => (
                      <option key={ind} value={kehoachtsnt.MaKH}>
                        {kehoachtsnt.So}
                      </option>
                    )
                  )}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Mã CBCS tham gia KH (MaCBCS):
              </label>
              <select
                value={form.MaCBCS ? form.MaCBCS : ""}
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaCBCS"
              >
                <option defaultValue={""}>Chọn CBCS tham gia KH</option>
                {Data_cbcss &&
                  Data_cbcss.cbcss.map((cbcs: any, ind: number) => (
                    <option key={ind} value={cbcs.MaCBCS}>
                      {cbcs.HoTen} - {cbcs.Doi?.TenDoi} -{" "}
                      {cbcs.Doi?.CAQHvaTD?.CAQHvaTD}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Vị trí trong kế hoạch:
              </label>
              <input
                value={form.ViTri ? form.ViTri : ""}
                name="ViTri"
                onChange={changeForm}
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
              />
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
    </InputLucLuongThamGiaKHStyled>
  );
}
