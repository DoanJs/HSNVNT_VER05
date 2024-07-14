import { useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { ProjectCrime, Spinner } from "..";
import { QUERY_chuyenan } from "../../graphql/documentNode";
import { handleDoiTuongCA, handleTime } from "../../utils/functions";

const ProjectItemStyled = styled.div`
  .caDetails-header {
    p,
    h5,
    h4 {
      text-align: center;
      font-weight: bold;
    }
    h5 {
      color: red;
    }
  }
  h6 {
    font-weight: bold;
  }
  .fa-money-bill-transfer {
    color: green;
    cursor: pointer;
  }
  .fa-trash {
    color: red;
    cursor: pointer;
  }
`;
export default function ProjectItem() {
  const { id } = useParams();
  const { data: Data_chuyenan } = useQuery(QUERY_chuyenan, {
    variables: { id: Number(id) },
  });
  const chuyenan = Data_chuyenan?.chuyenan;

  if (!Data_chuyenan) return <Spinner />;
  return (
    <ProjectItemStyled>
      <div className="caDetails-header">
        <h5>"{chuyenan.TenCA}"</h5>
        <h4>Bí số: {chuyenan.BiSo}</h4>
        <p>
          <i>Thời gian bắt đầu: {handleTime(chuyenan.ThoiGianBD)}</i>
        </p>
      </div>
      <hr />

      <div className="caDetails-crime">
        <div className="d-flex align-items-start justify-content-between">
          <h5>I. CÁC ĐỐI TƯỢNG TRONG CHUYÊN ÁN</h5>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Họ và tên</th>
              <th scope="col">Bí số</th>
              <th scope="col">Năm sinh</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">CMCCHC</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th style={{ textAlign: "center", color: "red" }} colSpan={6}>
                ĐỐI TƯỢNG CHÍNH (
                <span style={{ color: "blue" }}>
                  {handleDoiTuongCA(chuyenan.DoiTuongCAs).DTChinh.length} đối
                  tượng
                </span>
                )
              </th>
            </tr>
            {handleDoiTuongCA(chuyenan.DoiTuongCAs).DTChinh.map(
              (doituongCA: any, ind: number) => (
                <ProjectCrime key={ind} doituongCA={doituongCA} />
              )
            )}

            <tr>
              <th style={{ textAlign: "center", color: "red" }} colSpan={6}>
                ĐỐI TƯỢNG PHỤ (
                <span style={{ color: "blue" }}>
                  {handleDoiTuongCA(chuyenan.DoiTuongCAs).DTPhu.length} đối
                  tượng
                </span>
                )
              </th>
            </tr>
            {handleDoiTuongCA(chuyenan.DoiTuongCAs).DTPhu.map(
              (doituongCA: any, ind: number) => (
                <ProjectCrime key={ind} doituongCA={doituongCA} />
              )
            )}
            <tr>
              <th style={{ textAlign: "center", color: "red" }} colSpan={6}>
                ĐỐI TƯỢNG LIÊN QUAN (
                <span style={{ color: "blue" }}>
                  {handleDoiTuongCA(chuyenan.DoiTuongCAs).DTKhac.length} đối
                  tượng
                </span>
                )
              </th>
            </tr>
            {handleDoiTuongCA(chuyenan.DoiTuongCAs).DTKhac.map(
              (doituongCA: any, ind: number) => (
                <ProjectCrime key={ind} doituongCA={doituongCA} />
              )
            )}
          </tbody>
        </table>
      </div>

      <hr />
      <h5>II. THÔNG TIN CHUYÊN ÁN</h5>
      <p>
        <b>
          1. Thành viên ban chuyên án:{" "}
          <b>{chuyenan.ThanhVienBCAs?.length} thành viên</b>
        </b>
      </p>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">HoTen</th>
            <th scope="col">ViTri</th>
            <th scope="col">BiDanh</th>
            <th scope="col">DonVi</th>
          </tr>
        </thead>
        <tbody>
          {chuyenan.ThanhVienBCAs?.map((thanhvienbca: any, ind: number) => (
            <tr key={ind}>
              <td>
                <Link to={`/cbcs/${thanhvienbca.CBCS?.MaCBCS}`}>
                  {thanhvienbca.CBCS?.HoTen}
                </Link>
              </td>
              <td>{thanhvienbca.ViTri}</td>
              <td>{thanhvienbca.BiDanh}</td>
              <td>
                {thanhvienbca.CBCS?.Doi?.TenDoi} -{" "}
                {thanhvienbca.CBCS?.Doi?.CAQHvaTD?.CAQHvaTD} -{" "}
                {thanhvienbca.CBCS?.Doi?.CAQHvaTD?.CATTPvaTD?.CATTPvaTD}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {ca.members.map((member: string, ind: number) => {
          if (ind === 0) {
            return <p key={ind}>- {member} - Trưởng ban chuyên án</p>;
          } else if (ind === 1) {
            return <p key={ind}>- {member} - Phó ban chuyên án</p>;
          }
          return <p key={ind}>- {member} - Thành viên ban chuyên án</p>;
        })} */}

      <p>
        <b>2. Nội dung chuyên án</b>
      </p>
      <p>{chuyenan.NoiDung}</p>
      <hr />
    </ProjectItemStyled>
  );
}
