import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createDDNB,
  MUTATION_editDDNB,
  QUERY_ddnbs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_DDNB } from "./FormInitial";

const InputDDNBStyled = styled.div`
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

export default function InputDDNB() {
  const navigate = useNavigate();
  const { data: Data_ddnbs, error } = useQuery(QUERY_ddnbs, {
    variables: { utilsParams: {} },
  });
  const [createDDNB] = useMutation(MUTATION_createDDNB, {
    refetchQueries: [{ query: QUERY_ddnbs, variables: { utilsParams: {} } }],
  });
  const [editDDNB] = useMutation(MUTATION_editDDNB, {
    refetchQueries: [{ query: QUERY_ddnbs, variables: { utilsParams: {} } }],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [ddnbs, set_ddnbs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_DDNB);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_ddnbs(handleSearch("DDNBs", Data_ddnbs.ddnbs, e.target.value));
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.DacDiem.trim() !== "") {
      if (statusEdit) {
        editDDNB({
          variables: {
            ddnb: form.DacDiem,
            id: form.MaDDNB,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật "${data.editDDNB.DacDiem}" thành công`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_DDNB);
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        createDDNB({
          variables: {
            ddnb: form.DacDiem,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới "${data.createDDNB.DacDiem}" thành công`,
              "success"
            );
            setForm(FI_DDNB);
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

  const onEditData = (ddnb: any) => {
    setStatusEdit(true);
    setForm({
      ...form,
      MaDDNB: ddnb.MaDDNB,
      DacDiem: ddnb.DacDiem,
    });
  };

  const onDeleteData = (ddnb: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: ddnb.DacDiem,
      Table: "DDNBs",
      ID: ddnb.MaDDNB,
    });

  useEffect(() => {
    if (Data_ddnbs) {
      set_ddnbs(Data_ddnbs.ddnbs);
    }
  }, [Data_ddnbs]);

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

  if (!Data_ddnbs) return <Spinner />;
  return (
    <InputDDNBStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách đặc điểm nổi bật hiện có <b>({ddnbs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh DDNB..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">DacDiem</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...ddnbs].reverse().map((ddnb: any, ind: number) => (
                  <tr key={ind} title={`MaDDNB: ${ddnb.MaDDNB}`}>
                    <td>{ddnb.DacDiem}</td>
                    <td className="ip-ls-action">
                      <i
                        className="fa-solid fa-pen"
                        onClick={() => onEditData(ddnb)}
                        title="Sửa"
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        data-bs-toggle="modal"
                        data-bs-target="#modalDeleteData"
                        onClick={() => onDeleteData(ddnb)}
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
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} đặc điểm nổi bật:</h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">Đặc điểm nổi bật (DacDiem):</label>
              <input
                required
                value={form.DacDiem ? form.DacDiem : ""}
                name="DacDiem"
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
    </InputDDNBStyled>
  );
}
