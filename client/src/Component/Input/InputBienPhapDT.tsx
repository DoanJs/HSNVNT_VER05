import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalDeleteData, Spinner } from "..";
import { infoDeleteDataVar } from "../../graphql/client/cache";
import {
  MUTATION_createBienPhapDT,
  MUTATION_editBienPhapDT,
  QUERY_bienPhapDTs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";
import { FI_BienPhapDT } from "./FormInitial";

const InputBienPhapDTStyled = styled.div`
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

export default function InputBienPhapDT() {
  const navigate = useNavigate();
  const { data: Data_bienPhapDTs, error } = useQuery(QUERY_bienPhapDTs, {
    variables: { utilsParams: {} },
  });
  const [createBienPhapDT] = useMutation(MUTATION_createBienPhapDT, {
    refetchQueries: [
      { query: QUERY_bienPhapDTs, variables: { utilsParams: {} } },
    ],
  });
  const [editBienPhapDT] = useMutation(MUTATION_editBienPhapDT, {
    refetchQueries: [
      { query: QUERY_bienPhapDTs, variables: { utilsParams: {} } },
    ],
  });
  const infoDeleteData = useReactiveVar(infoDeleteDataVar);
  const [bienPhapDTs, set_bienPhapDTs] = useState([]);
  const [statusEdit, setStatusEdit] = useState(false);
  const [form, setForm] = useState(FI_BienPhapDT);

  // --------------------------------------------------------------------------------------------

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_bienPhapDTs(
      handleSearch("BienPhapDTs", Data_bienPhapDTs.bienPhapDTs, e.target.value)
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
    if (form.BienPhapDT.trim() !== "") {
      if (statusEdit) {
        editBienPhapDT({
          variables: {
            bienPhapDT: form.BienPhapDT,
            id: form.MaBPDT,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Cập nhật "${data.editBienPhapDT.BienPhapDT}" thành công`,
              "success"
            );
            setStatusEdit(false);
            setForm(FI_BienPhapDT)
          },
          onError: (error) => {
            showNotification("Lỗi!", error.message, "danger");
            navigate("/dangnhap");
          },
        });
      } else {
        createBienPhapDT({
          variables: {
            bienPhapDT: form.BienPhapDT,
          },
          onCompleted: (data) => {
            showNotification(
              "Chúc mừng",
              `Thêm mới biện pháp điều tra "${data.createBienPhapDT.BienPhapDT}" thành công`,
              "success"
            );
            setForm(FI_BienPhapDT)
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

  const onEditData = (bienphapDT: any) => {
    setStatusEdit(true);
    setForm({
      ...form,
      MaBPDT: bienphapDT.MaBPDT,
      BienPhapDT: bienphapDT.BienPhapDT,
    });
  };

  const onDeleteData = (bienphapDT: any) =>
    infoDeleteDataVar({
      ...infoDeleteData,
      Title: bienphapDT.BienPhapDT,
      Table: "BienPhapDTs",
      ID: bienphapDT.MaBPDT,
    });

  useEffect(() => {
    if (Data_bienPhapDTs) {
      set_bienPhapDTs(Data_bienPhapDTs.bienPhapDTs);
    }
  }, [Data_bienPhapDTs]);

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

  if (!Data_bienPhapDTs) return <Spinner />;
  return (
    <InputBienPhapDTStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách biện pháp điều tra hiện có <b>({bienPhapDTs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh BienPhapDT..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">BienPhapDT</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...bienPhapDTs]
                  .reverse()
                  .map((bienPhapDT: any, ind: number) => (
                    <tr key={ind} title={`MaBPDT: ${bienPhapDT.MaBPDT}`}>
                      <td>{bienPhapDT.BienPhapDT}</td>
                      <td className="ip-ls-action">
                        <i
                          className="fa-solid fa-pen"
                          onClick={() => onEditData(bienPhapDT)}
                          title="Sửa"
                        ></i>
                        <i
                          className="fa-solid fa-trash"
                          data-bs-toggle="modal"
                          data-bs-target="#modalDeleteData"
                          onClick={() => onDeleteData(bienPhapDT)}
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
          <h5>{statusEdit ? "Chỉnh sửa" : "Thêm mới"} biện pháp điều tra:</h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">
                Biện pháp điều tra (BienPhapDT):
              </label>
              <input
                required
                value={form.BienPhapDT ? form.BienPhapDT : ""}
                name="BienPhapDT"
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
    </InputBienPhapDTStyled>
  );
}
