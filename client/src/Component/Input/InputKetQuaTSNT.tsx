import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createKetQuaTSNT,
  MUTATION_editKetQuaTSNT,
  QUERY_kehoachTSNTs,
  QUERY_ketquaTSNTs,
} from "../../graphql/documentNode";
import {
  handleSearch,
  handleTime,
  showNotification,
} from "../../utils/functions";
import { FI_KetQuaTSNT } from "./FormInitial";

const InputKetQuaTSNTStyled = styled.div`
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

export default function InputKetQuaTSNT() {
  const navigate = useNavigate();
  const { data: Data_ketquaTSNTs, error } = useQuery(QUERY_ketquaTSNTs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_kehoachTSNTs } = useQuery(QUERY_kehoachTSNTs, {
    variables: { utilsParams: {} },
  });
  const [createKetQuaTSNT] = useMutation(MUTATION_createKetQuaTSNT, {
    refetchQueries: [
      { query: QUERY_ketquaTSNTs, variables: { utilsParams: {} } },
    ],
  });
  const [editKetQuaTSNT] = useMutation(MUTATION_editKetQuaTSNT, {
    refetchQueries: [
      { query: QUERY_ketquaTSNTs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [ketquaTSNTs, set_ketquaTSNTs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_KetQuaTSNT);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_ketquaTSNTs(
      handleSearch("KetQuaTSNTs", Data_ketquaTSNTs.ketquaTSNTs, e.target.value)
    );
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "MaKH" ? Number(e.target.value) : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.ThoiGianBD.trim() !== "") {
      if (
        // check one-to-one with MaQD
        ketquaTSNTs.filter(
          (ketquatsnt: any) => ketquatsnt.KeHoachTSNT?.MaKH === form.MaKH
        ).length === 0 ||
        (ketquaTSNTs.filter(
          (ketquatsnt: any) => ketquatsnt.KeHoachTSNT?.MaKH === form.MaKH
        ).length !== 0 &&
          form.MaKH_edit === form.MaKH)
      ) {
        if (statusEdit) {
          const { MaKQ, MaKH_edit, ...ketquaTSNTInput } = form;
          editKetQuaTSNT({
            variables: {
              ketquaTSNTInput,
              id: form.MaKQ,
            },
            onCompleted: (data) => {
              showNotification(
                "Chúc mừng",
                `Cập nhật kết quả TSNT ngày "${handleTime(
                  data.editKetQuaTSNT?.ThoiGianBD
                )}" thành công`,
                "success"
              );
              setStatusEdit(false);
              setForm(FI_KetQuaTSNT);
            },
            onError: (error) => {
              showNotification("Lỗi!", error.message, "danger");
              navigate("/dangnhap");
            },
          });
        } else {
          const { MaKQ, MaKH_edit, ...ketquaTSNTInput } = form;
          createKetQuaTSNT({
            variables: {
              ketquaTSNTInput,
            },
            onCompleted: (data) => {
              showNotification(
                "Chúc mừng",
                `Thêm mới kết quả TSNT ngày "${handleTime(
                  data.createKetQuaTSNT?.ThoiGianBD
                )}" thành công`,
                "success"
              );
              setForm(FI_KetQuaTSNT);
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

  const onEditData = (ketquatsnt: any) => {
    setStatusEdit(true);
    setForm({
      ...form,
      MaKQ: ketquatsnt.MaKQ,
      ThoiGianBD: ketquatsnt.ThoiGianBD,
      ThoiGianKT: ketquatsnt.ThoiGianKT,
      DDNB: ketquatsnt.DDNB,

      MaKH: ketquatsnt.KeHoachTSNT?.MaKH,
      MaKH_edit: ketquatsnt.KeHoachTSNT?.MaKH,
    });
  };

  const onDeleteData = (ketquatsnt: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: handleTime(ketquatsnt.ThoiGianBD),
      Table: "KetQuaTSNTs",
      ID: ketquatsnt.MaKQ,
    });

  useEffect(() => {
    if (Data_ketquaTSNTs) {
      set_ketquaTSNTs(Data_ketquaTSNTs.ketquaTSNTs);
    }
  }, [Data_ketquaTSNTs]);

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

  if (!Data_ketquaTSNTs) return <Spinner />;
  return (
    <InputKetQuaTSNTStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách kết quả TSNT hiện có <b>({ketquaTSNTs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh KetQuaTSNT..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">ThoiGianBD</th>
                  <th scope="col">ThoiGianKT</th>
                  <th scope="col">KHTSNT</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...ketquaTSNTs]
                  .reverse()
                  .map((ketquatsnt: any, ind: number) => (
                    <tr key={ind} title={`MaKQ: ${ketquatsnt.MaKQ}`}>
                      <td>
                        {ketquatsnt.ThoiGianBD &&
                          handleTime(ketquatsnt.ThoiGianBD)}
                      </td>
                      <td>
                        {ketquatsnt.ThoiGianKT &&
                          handleTime(ketquatsnt.ThoiGianKT)}
                      </td>
                      <td>{ketquatsnt.KeHoachTSNT?.So}</td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => onEditData(ketquatsnt)}
                          title="Sửa"
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeleteData"
                          onClick={() => onDeleteData(ketquatsnt)}
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
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} kết quả TSNT:</h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Thời gian bắt đầu:</label>
              <input
                required
                value={form.ThoiGianBD ? form.ThoiGianBD : ""}
                name="ThoiGianBD"
                onChange={changeForm}
                type="date"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Thời gian kết thúc:</label>
              <input
                required
                value={form.ThoiGianKT ? form.ThoiGianKT : ""}
                name="ThoiGianKT"
                onChange={changeForm}
                type="date"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Đặc điểm nổi bật:</label>
              <input
                value={form.DDNB ? form.DDNB : ""}
                name="DDNB"
                onChange={changeForm}
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
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
    </InputKetQuaTSNTStyled>
  );
}
