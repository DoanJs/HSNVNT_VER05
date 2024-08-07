import { useQuery } from "@apollo/client";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PlaceItem, Spinner } from "..";
import { QUERY_baocaoPHDCs } from "../../graphql/documentNode";
import { handleSearch, showNotification } from "../../utils/functions";

const PlaceListStyled = styled.div`
  .place-ls-title {
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    h5 {
      font-weight: bold;
      color: red;
      margin: 0 4px 0 0;
    }
    span {
      font-weight: bold;
    }
    .place-ls-tt-search {
      margin: 20px 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      form {
        display: flex;
        align-items: center;
        justify-content: center;
        input {
          width: 700px;
        }
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        padding-left: 16px;
        input {
          border: 1px solid #ffffff;
          box-shadow: none;
        }
        i {
          color: blue;
        }
      }
    }
  }
`;
export default function PlaceList() {
  const navigate = useNavigate();
  const { data: Data_baocaoPHDCs, error } = useQuery(QUERY_baocaoPHDCs, {
    variables: { utilsParams: {} },
  });
  const [baocaoPHDCs, setbaocaoPHDCs] = useState([]);

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

  useEffect(() => {
    if (Data_baocaoPHDCs) {
      setbaocaoPHDCs(Data_baocaoPHDCs.baocaoPHDCs);
    }
  }, [Data_baocaoPHDCs]);

  const onFilterPlace = (e: ChangeEvent<HTMLInputElement>) => {
    setbaocaoPHDCs(
      handleSearch("BaoCaoPHDCs", Data_baocaoPHDCs.baocaoPHDCs, e.target.value)
    );
  };

  if (!Data_baocaoPHDCs) return <Spinner />;
  return (
    <PlaceListStyled>
      <div className="place-ls-title">
        <h5>DANH SÁCH CÁC ĐỊA CHỈ NGHI VẤN TRONG CSDL</h5>
        <span>Số lượng: {baocaoPHDCs.length} địa chỉ nghi vấn</span>
        <div className="place-ls-tt-search">
          <form className="form-inline">
            <i className="fas fa-search"></i>
            <input
              onChange={onFilterPlace}
              className="form-control mr-sm-2"
              type="search"
              placeholder="Tìm nhanh theo thời gian, địa điểm, yêu cầu, đối tượng, TS thực hiện"
              aria-label="Search"
            />
          </form>
        </div>
      </div>
      <hr />

      <div className="place-ls-body">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Thời gian PH</th>
              <th scope="col">Hình Ảnh</th>
              <th scope="col">Yêu cầu cụ thể</th>
              <th scope="col">Đối tượng liên quan</th>
              <th scope="col">TS thực hiện</th>
            </tr>
          </thead>
          <tbody>
            {baocaoPHDCs.map((baocaophdc: any, ind: number) => (
              <PlaceItem baocaophdc={baocaophdc} key={ind} />
            ))}
          </tbody>
        </table>
      </div>
    </PlaceListStyled>
  );
}
