import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { QUERY_denghiTSNTs } from "../../graphql/documentNode";
import { showNotification } from "../../utils/functions";

const GeneralStyled = styled.div`
  .generals-title {
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
  }
  h6 {
    text-align: center;
    color: blue;
  }
  .list-person-type {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .list-person-dropdow {
      p {
        cursor: pointer;
      }
    }
    form {
      display: flex;
      align-items: center;
      justify-content: center;
      input {
        width: 400px;
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
  .generals-handle {
    h5 {
      text-align: center;
      color: blue;
    }
    justify-content: center;
    margin: 20px 0;
  }
  tr {
    border: 1px solid black;
    text-align: center;
    th {
      border: 1px solid black;
    }
    td {
      text-align: left;
      border: 1px solid black;
    }
  }
  .list-file-btn {
    font-size: 20px;
    text-decoration: none;
    cursor: pointer;
  }
  .list-file-btn-details {
    color: #00cc00;
  }
  .list-file-btn-edit {
    color: #0069d9;
    margin: 0 10px;
  }
  .list-file-btn-delete {
    color: #dc3545;
  }
`;

export default function General() {
  const navigate = useNavigate();
  const { data: Data_denghiTSNTs, error } = useQuery(QUERY_denghiTSNTs, {
    variables: { utilsParams: {} },
  });

  const [denghiTSNTs, setdenghiTSNTs] = useState([]);
  // const [formInputDetails, setFormInputDetails] = useState({
  //   startDate: "",
  //   endDate: "",
  //   shortNamePlan: "",
  //   nameCBCS: "",
  // });
console.log(denghiTSNTs)





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
    if (Data_denghiTSNTs) {
      setdenghiTSNTs(Data_denghiTSNTs.denghiTSNTs);
    }
  }, [Data_denghiTSNTs]);

  // const onFilterCBCS = (e: ChangeEvent<HTMLInputElement>) => {
  //   setdenghiTSNTs(handleSearch("denghiTSNTs", Data_denghiTSNTs.denghiTSNTs, e.target.value));
  // };

  // const onChangeFilterDetails = (e: ChangeEvent<HTMLInputElement>) => {
  //   setFormInputDetails({
  //     ...formInputDetails,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const onFilterDetails = () => {
  //   let newdenghiTSNTs: any = [];
  //   let newdenghiTSNTsPlan: any = [];
  //   let newdenghiTSNTsNameCBCS: any = [];
  //   const startDate = moment(formInputDetails.startDate).format();
  //   const endDate = moment(formInputDetails.endDate).format();

  //   if (formInputDetails.startDate !== "" && formInputDetails.endDate !== "") {
  //     newdenghiTSNTs = Data_denghiTSNTs.denghiTSNTs?.map((cbcs: any) => {
  //       return {
  //         ...cbcs,
  //         DanhGiaTSTHs: cbcs.DanhGiaTSTHs.filter(
  //           (obj: any) =>
  //             moment(obj.KetQuaTSNT?.ThoiGianBD).format() >= startDate &&
  //             moment(obj.KetQuaTSNT?.ThoiGianBD).format() < endDate
  //         ),
  //       };
  //     });
  //   } else {
  //     newdenghiTSNTs = Data_denghiTSNTs.denghiTSNTs;
  //   }

  //   if (formInputDetails.shortNamePlan !== "") {
  //     newdenghiTSNTsPlan = newdenghiTSNTs?.map((cbcs: any) => {
  //       return {
  //         ...cbcs,
  //         DanhGiaTSTHs: cbcs.DanhGiaTSTHs.filter((obj: any) =>
  //           obj.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.BiDanh?.toLowerCase().includes(
  //             formInputDetails.shortNamePlan
  //           )
  //         ),
  //       };
  //     });
  //   } else {
  //     newdenghiTSNTsPlan = newdenghiTSNTs;
  //   }

  //   if (formInputDetails.nameCBCS !== "") {
  //     newdenghiTSNTsNameCBCS = newdenghiTSNTsPlan?.filter((cbcs: any) =>
  //       cbcs.HoTen?.toLowerCase().includes(formInputDetails.nameCBCS)
  //     );
  //   } else {
  //     newdenghiTSNTsNameCBCS = newdenghiTSNTsPlan;
  //   }

  //   setdenghiTSNTs(newdenghiTSNTsNameCBCS);
  // };

  // if (!Data_denghiTSNTs) return <Spinner />;
  return (
    <GeneralStyled>
      <div className="generals-title">
        <h5>THỐNG KÊ, LỌC DỮ LIỆU TRONG CSDL</h5>
        <span>
          Số lượng: <i>{denghiTSNTs.length} đề nghị trinh sát</i>
        </span>
      </div>
      <div className="list-person-type">
        <form className="form-inline my-2 my-lg-0">
          <i className="fas fa-search"></i>
          <input
            // onChange={onFilterCBCS}
            className="form-control mr-sm-2"
            type="search"
            placeholder="Tìm nhanh theo số đề nghị, bí danh, đối tượng..."
            aria-label="Search"
          />
        </form>
      </div>
      <hr />

      <div className="row generals-handle d-flex align-items-center">
        <h5>
          <i>Lọc dữ liệu</i>
        </h5>
        <div className="col col-2">
          <div className="form-group d-flex flex-column align-items-center">
            <label>Từ ngày:</label>
            <input
              // onChange={onChangeFilterDetails}
              name="startDate"
              type="date"
              className="form-control"
            />
          </div>
        </div>
        <div className="col col-2">
          <div className="form-group d-flex flex-column align-items-center">
            <label>Đến ngày:</label>
            <input
              // onChange={onChangeFilterDetails}
              name="endDate"
              type="date"
              className="form-control"
            />
          </div>
        </div>
        <div className="col col-2">
          <div className="form-group d-flex flex-column align-items-center">
            <label>Tên yêu cầu:</label>
            <input
              // onChange={onChangeFilterDetails}
              name="shortNamePlan"
              type="text"
              className="form-control"
            />
          </div>
        </div>
        <div className="col col-2">
          <div className="form-group d-flex flex-column align-items-center">
            <label>Tên CBCS</label>
            <input
              // onChange={onChangeFilterDetails}
              name="nameCBCS"
              className="form-control mr-sm-2"
              type="text"
              placeholder="Nhập tên của CBCS"
            />
          </div>
        </div>
        <div className="col col-1" style={{ placeSelf: "end" }}>
          <button
            // onClick={onFilterDetails}
            className="btn btn-primary"
            type="button"
          >
            Lọc
          </button>
        </div>
      </div>
      <hr />

      <table className="table">
        <thead style={{ color: "#000000" }}>
          <tr>
            <th scope="col" style={{ lineHeight: 3 }}>
              Tên CBCS
            </th>
            <th scope="col" style={{ lineHeight: 3 }}>
              Số lượng
            </th>
            <th scope="col" style={{ lineHeight: 3 }}>
              Yêu cầu thực hiện
            </th>
            <th scope="col" style={{ lineHeight: 3, color: "green" }}>
              Yêu cầu biểu dương
            </th>
            <th scope="col" style={{ lineHeight: 3, color: "red" }}>
              Yêu cầu RKN
            </th>
          </tr>
        </thead>
        <tbody>
          {/* {denghiTSNTs.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center">
                CSDL về CBCS trống!{" "}
                <Link style={{ marginLeft: "10px" }} to="/nhaplieu/cbcs">
                  Thêm CBCS mới
                </Link>
              </td>
            </tr>
          ) : (
            denghiTSNTs.map((cbcs: any, ind: number) => (
              <CBCS key={ind} ind={ind} cbcs={cbcs} />
            ))
          )} */}
        </tbody>
      </table>
    </GeneralStyled>
  );
}
