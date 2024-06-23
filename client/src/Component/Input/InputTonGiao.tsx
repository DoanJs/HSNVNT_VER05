import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createTonGiao,
  MUTATION_editTonGiao,
  QUERY_tonGiaos,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";

const InputTonGiaoStyled = styled.div`
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

export default function InputTonGiao() {
  const navigate = useNavigate();
  const { data: Data_tonGiaos, error } = useQuery(QUERY_tonGiaos, {
    variables: { utilsParams: {} },
  });
  const [createTonGiao] = useMutation(MUTATION_createTonGiao, {
    refetchQueries: [{ query: QUERY_tonGiaos, variables: { utilsParams: {} } }],
  });
  const [editTonGiao] = useMutation(MUTATION_editTonGiao, {
    refetchQueries: [{ query: QUERY_tonGiaos, variables: { utilsParams: {} } }],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [tonGiaos, set_tonGiaos] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState({
    MaTG: 0,
    TenTG: "",
  });

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_tonGiaos(
      handleSearch("TonGiaos", Data_tonGiaos.tonGiaos, e.target.value)
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
    if (form.TenTG.trim() !== "") {
      if (statusEdit) {
        editTonGiao({
          variables: {
            tenTG: form.TenTG,
            id: form.MaTG,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật "${data.editTonGiao.TenTG}" thành công`,
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
        createTonGiao({
          variables: {
            tenTG: form.TenTG,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới "${data.createTonGiao.TenTG}" thành công`,
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

  const onEditData = (tongiao: any) => {
    setStatusEdit(true);
    setForm({
      ...form,
      MaTG: tongiao.MaTG,
      TenTG: tongiao.TenTG,
    });
  };

  const onDeleteData = (tongiao: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: tongiao.TenTG,
      Table: "TonGiaos",
      ID: tongiao.MaTG,
    });

  useEffect(() => {
    if (Data_tonGiaos) {
      set_tonGiaos(Data_tonGiaos.tonGiaos);
    }
  }, [Data_tonGiaos]);

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

  if (!Data_tonGiaos) return <Spinner />;
  return (
    <InputTonGiaoStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách tôn giáo hiện có <b>({tonGiaos.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh TonGiao..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">MaTG</th>
                  <th scope="col">TenTG</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...tonGiaos].reverse().map((tongiao: any, ind: number) => (
                  <tr key={ind}>
                    <td>{tongiao.MaTG}</td>
                    <td>{tongiao.TenTG}</td>
                    <td className="ip-ls-action">
                      <i
                        className="fa-solid fa-pen"
                        onClick={() => onEditData(tongiao)}
                        title="Sửa"
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        data-bs-toggle="modal"
                        data-bs-target="#modalDeleteData"
                        onClick={() => onDeleteData(tongiao)}
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
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} tôn giáo:</h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Tôn giáo (TenTG):</label>
              <input
                required
                value={form.TenTG}
                name="TenTG"
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
    </InputTonGiaoStyled>
  );
}
