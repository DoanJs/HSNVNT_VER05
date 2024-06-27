import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createTinhChatDT,
  MUTATION_editTinhChatDT,
  QUERY_tinhChatDTs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_TinhChatDT } from "./FormInitial";

const InputTinhChatDTStyled = styled.div`
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

export default function InputTinhChatDT() {
  const navigate = useNavigate();
  const { data: Data_tinhChatDTs, error } = useQuery(QUERY_tinhChatDTs, {
    variables: { utilsParams: {} },
  });
  const [createTinhChatDT] = useMutation(MUTATION_createTinhChatDT, {
    refetchQueries: [
      { query: QUERY_tinhChatDTs, variables: { utilsParams: {} } },
    ],
  });
  const [editTinhChatDT] = useMutation(MUTATION_editTinhChatDT, {
    refetchQueries: [
      { query: QUERY_tinhChatDTs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [tinhChatDTs, set_tinhChatDTs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_TinhChatDT);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_tinhChatDTs(
      handleSearch("TinhChatDTs", Data_tinhChatDTs.tinhChatDTs, e.target.value)
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
    if (form.TinhChat.trim() !== "") {
      if (statusEdit) {
        editTinhChatDT({
          variables: {
            tinhchat: form.TinhChat,
            id: form.MaTCDT,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật "${data.editTinhChatDT.TinhChat}" thành công`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_TinhChatDT)
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        createTinhChatDT({
          variables: {
            tinhchat: form.TinhChat,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới "${data.createTinhChatDT.TinhChat}" thành công`,
              "success"
            );
            setForm(FI_TinhChatDT)
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

  const onEditData = (tinhchat: any) => {
    setStatusEdit(true);
    setForm({
      ...form,
      MaTCDT: tinhchat.MaTCDT,
      TinhChat: tinhchat.TinhChat,
    });
  };

  const onDeleteData = (tinhchat: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: tinhchat.TinhChat,
      Table: "TinhChatDTs",
      ID: tinhchat.MaTCDT,
    });

  useEffect(() => {
    if (Data_tinhChatDTs) {
      set_tinhChatDTs(Data_tinhChatDTs.tinhChatDTs);
    }
  }, [Data_tinhChatDTs]);

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

  if (!Data_tinhChatDTs) return <Spinner />;
  return (
    <InputTinhChatDTStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách tính chất đối tượng hiện có <b>({tinhChatDTs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh TinhChatDT..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">TinhChat</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...tinhChatDTs]
                  .reverse()
                  .map((tinhchat: any, ind: number) => (
                    <tr key={ind} title={`MaTCDT: ${tinhchat.MaTCDT}`}>
                      <td>{tinhchat.TinhChat}</td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => onEditData(tinhchat)}
                          title="Sửa"
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeleteData"
                          onClick={() => onDeleteData(tinhchat)}
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
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} tính chất đối tượng:</h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">
                Tính chất đối tượng (TinhChat):
              </label>
              <input
                required
                value={form.TinhChat ? form.TinhChat : ""}
                name="TinhChat"
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
    </InputTinhChatDTStyled>
  );
}
