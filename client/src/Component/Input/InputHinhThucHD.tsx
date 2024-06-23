import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createHinhThucHD,
  MUTATION_editHinhThucHD,
  QUERY_hinhthucHDs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";

const InputHinhThucHDStyled = styled.div`
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

export default function InputHinhThucHD() {
  const navigate = useNavigate();
  const { data: Data_hinhthucHDs, error } = useQuery(QUERY_hinhthucHDs, {
    variables: { utilsParams: {} },
  });
  const [createHinhThucHD] = useMutation(MUTATION_createHinhThucHD, {
    refetchQueries: [
      { query: QUERY_hinhthucHDs, variables: { utilsParams: {} } },
    ],
  });
  const [editHinhThucHD] = useMutation(MUTATION_editHinhThucHD, {
    refetchQueries: [
      { query: QUERY_hinhthucHDs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [hinhthucHDs, set_hinhthucHDs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState({
    MaHTHD: 0,
    HinhThuc: "",
  });

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_hinhthucHDs(
      handleSearch("HinhThucHDs", Data_hinhthucHDs.hinhthucHDs, e.target.value)
    );
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.HinhThuc.trim() !== "") {
      if (statusEdit) {
        editHinhThucHD({
          variables: {
            hinhthuc: form.HinhThuc,
            id: form.MaHTHD,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật "${data.editHinhThucHD.HinhThuc}" thành công`,
              "success"
            );
            setStatusEdit(false);
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        createHinhThucHD({
          variables: {
            hinhthuc: form.HinhThuc,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới "${data.createHinhThucHD.HinhThuc}" thành công`,
              "success"
            );
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      }
    } else {
      showNotification(
        "Cảnh báo",
        "Vui lòng nhập đúng và đầy đủ giá trị!",
        "warning"
      );
    }
  };

  const onEditData = (hinhthuc: any) => {
    setStatusEdit(true);
    setForm({
      ...form,
      MaHTHD: hinhthuc.MaHTHD,
      HinhThuc: hinhthuc.HinhThuc,
    });
  };

  const onDeleteData = (hinhthuc: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: hinhthuc.HinhThuc,
      Table: "HinhThucHDs",
      ID: hinhthuc.MaHTHD,
    });

  useEffect(() => {
    if (Data_hinhthucHDs) {
      set_hinhthucHDs(Data_hinhthucHDs.hinhthucHDs);
    }
  }, [Data_hinhthucHDs]);

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

  if (!Data_hinhthucHDs) return <Spinner />;
  return (
    <InputHinhThucHDStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách hình thức hoạt động hiện có <b>({hinhthucHDs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh HinhThuc..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">MaHTHD</th>
                  <th scope="col">HinhThuc</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...hinhthucHDs]
                  .reverse()
                  .map((hinhthuc: any, ind: number) => (
                    <tr key={ind}>
                      <td>{hinhthuc.MaHTHD}</td>
                      <td>{hinhthuc.HinhThuc}</td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => onEditData(hinhthuc)}
                          title="Sửa"
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeleteData"
                          onClick={() => onDeleteData(hinhthuc)}
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
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} hình thức hoạt động:</h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">
                Hình thức hoạt động (HinhThuc):
              </label>
              <input
                required
                value={form.HinhThuc}
                name="HinhThuc"
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
    </InputHinhThucHDStyled>
  );
}
