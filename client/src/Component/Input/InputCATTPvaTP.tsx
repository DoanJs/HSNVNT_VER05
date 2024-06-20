import { useMutation, useQuery } from "@apollo/client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Spinner } from "..";
import {
  MUTATION_createCATTPvaTD,
  QUERY_capCAs,
  QUERY_caTTPvaTDs,
} from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";

const InputCATTPvaTPStyled = styled.div`
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
      ::-webkit-scrollbar {
        background-color: #e4e6eb;
        width: 4px;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #007bff;
        border-radius: 10px;
      }
    }
  }
`;

export default function InputCATTPvaTP() {
  const navigate = useNavigate();
  const [createCATTPvaTD, { data }] = useMutation(MUTATION_createCATTPvaTD);
  console.log(data);

  const { data: Data_caTTPvaTDs, error } = useQuery(QUERY_caTTPvaTDs, {
    variables: { utilsParams: {} },
  });
  const { data: Data_capCAs } = useQuery(QUERY_capCAs, {
    variables: { utilsParams: {} },
  });
  const [caTTPvaTDs, set_caTTPvaTDs] = useState([]);
  const [form, setForm] = useState({
    CATTPvaTD: "",
    MaCapCA: 0,
  });

  const onSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    set_caTTPvaTDs(
      handleSearch("caTTPvaTDs", Data_caTTPvaTDs.caTTPvaTDs, e.target.value)
    );
  };

  const changeForm = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "MaCapCA" ? Number(e.target.value) : e.target.value,
    });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.CATTPvaTD.trim() !== "" && form.MaCapCA !== 0) {
      createCATTPvaTD({
        variables: {
          caTTPvaTDInput: form,
        },
        onCompleted: (data) => {
          console.log(data);
        },
        onError: (error) => {
          showNotification("Lỗi!", error.message, "danger");
          navigate("/dangnhap");
        },
      });
    } else {
      showNotification("Cảnh báo", "Vui lòng nhập đầy đủ giá trị!", "warning");
    }
  };

  useEffect(() => {
    if (Data_caTTPvaTDs) {
      set_caTTPvaTDs(Data_caTTPvaTDs.caTTPvaTDs);
    }
  }, [Data_caTTPvaTDs]);

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

  if (!Data_caTTPvaTDs) return <Spinner />;
  return (
    <InputCATTPvaTPStyled className="container">
      <div className="row justify-content-center">
        <div className="col-6 ip-ls-old">
          <h5>
            Danh sách CATTPvaTD hiện có <b>({caTTPvaTDs.length})</b>:
          </h5>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Tìm kiếm nhanh CATTPvaTD..."
              aria-label="Search"
              onChange={onSearchData}
            />
          </form>
          <div className="ip-ls-old-content">
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">MaCATTPvaTD</th>
                  <th scope="col">CATTPvaTD</th>
                  <th scope="col">CapCA</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {caTTPvaTDs.map((caTTPvaTD: any, ind: number) => (
                  <tr key={ind}>
                    <td>{caTTPvaTD.MaCATTPvaTD}</td>
                    <td>{caTTPvaTD.CATTPvaTD}</td>
                    <td>{caTTPvaTD.CapCA.CapCA}</td>
                    <td className="ip-ls-action">
                      <i className="fa-solid fa-pen" title="Sửa"></i>
                      <i className="fa-solid fa-trash" title="Xóa"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-6">
          <h5>Thêm mới CATTPvaTD:</h5>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">
                Công an Tỉnh/Thành phố (CATTPvaTD):
              </label>
              <input
                name="CATTPvaTD"
                onChange={changeForm}
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mã cấp Công an (MaCapCA):</label>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={changeForm}
                name="MaCapCA"
              >
                <option defaultValue={""}>Chọn cấp Công an</option>
                {Data_capCAs &&
                  Data_capCAs.capCAs.map((capCA: any, ind: number) => (
                    <option key={ind} value={capCA.MaCapCA}>
                      {capCA.CapCA}
                    </option>
                  ))}
              </select>
            </div>
            <button type="submit" className="btn btn-success">
              Thêm mới
            </button>
          </form>
        </div>
      </div>
    </InputCATTPvaTPStyled>
  );
}
