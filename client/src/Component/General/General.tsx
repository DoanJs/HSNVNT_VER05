import { useQuery } from "@apollo/client";
import moment from "moment";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Spinner } from "..";
import { QUERY_denghiTSNTs } from "../../graphql/documentNode";
import {
  handleTime,
  handleValueSame_One,
  handleValueSame_Two,
  showNotification,
} from "../../utils/functions";

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
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    keySearch: "",
  });

  const changeForm = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSort = () => {
    const startDate = moment(form.startDate).format();
    const endDate = moment(form.endDate).format();
    let denghiTSNTs_Time: any = [];
    let denghiTSNTs_KeySearch: any = [];

    if (form.endDate !== "" && form.startDate !== "") {
      denghiTSNTs_Time = Data_denghiTSNTs.denghiTSNTs?.filter(
        (denghitsnt: any) =>
          moment(denghitsnt.QuyetDinhTSNT?.ThoiGianBD).format() >= startDate &&
          moment(denghitsnt.QuyetDinhTSNT?.ThoiGianBD).format() <= endDate
      );
    } else {
      denghiTSNTs_Time = Data_denghiTSNTs.denghiTSNTs;
    }

    if (form.keySearch !== "") {
      denghiTSNTs_KeySearch = denghiTSNTs_Time.filter(
        (denghitsnt: any) =>
          denghitsnt.QuyetDinhTSNT?.BiDanh?.toLowerCase().indexOf(
            form.keySearch.toLowerCase()
          ) !== -1 ||
          denghitsnt.CAQHvaTD?.CAQHvaTD?.toLowerCase().indexOf(
            form.keySearch.toLowerCase()
          ) !== -1 ||
          denghitsnt.DoiTuong?.TenDT?.toLowerCase().indexOf(
            form.keySearch.toLowerCase()
          ) !== -1
        // ||
        // denghitsnt.QuyeDinhTSNT?.KeHoachTSNT?.KetQuaTSNT?.BaoCaoPHQHs?.map(
        //   (bcphqh: any) => bcphqh.BiDanh?.toLowerCase()
        // )
        //   .join(",")
        //   .indexOf(form.keySearch.toLowerCase()) !== -1 ||
        // denghitsnt.QuyeDinhTSNT?.KeHoachTSNT?.KetQuaTSNT?.BaoCaoPHPTs?.map(
        //   (bcphpt: any) => bcphpt.BKS.toLowerCase()
        // )
        //   .join(",")
        //   .indexOf(form.keySearch.toLowerCase()) !== -1 ||
        // denghitsnt.QuyeDinhTSNT?.KeHoachTSNT?.KetQuaTSNT?.BaoCaoPHDCs?.map(
        //   (bcphdc: any) => bcphdc.DiaChi.toLowerCase()
        // )
        //   .join(",")
        //   .indexOf(form.keySearch.toLowerCase()) !== -1
      );
    } else {
      denghiTSNTs_KeySearch = denghiTSNTs_Time;
    }
    setdenghiTSNTs(denghiTSNTs_KeySearch);
  };


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

  if (!Data_denghiTSNTs) return <Spinner />;
  return (
    <GeneralStyled>
      <div className="generals-title">
        <h5>THỐNG KÊ, LỌC DỮ LIỆU TRONG CSDL</h5>
        <span>
          Số lượng: <i>{denghiTSNTs.length} đề nghị trinh sát</i>
        </span>
      </div>

      <div className="row generals-handle d-flex align-items-center">
        <h5>
          <i>Lọc dữ liệu</i>
        </h5>
        <div className="col col-2">
          <div className="form-group d-flex flex-column align-items-center">
            <label>Từ ngày:</label>
            <input
              onChange={changeForm}
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
              onChange={changeForm}
              name="endDate"
              type="date"
              className="form-control"
            />
          </div>
        </div>
        <div className="col col-2">
          <div className="form-group d-flex flex-column align-items-center">
            <label>Từ khóa:</label>
            <input
              onChange={changeForm}
              name="keySearch"
              type="text"
              className="form-control"
            />
          </div>
        </div>
        <div className="col col-1" style={{ placeSelf: "end" }}>
          <button
            onClick={handleSort}
            className="btn btn-primary"
            type="button"
          >
            Lọc
          </button>
        </div>
      </div>
      <hr />

      <table className="table">
        <thead style={{ color: "blue" }}>
          <tr>
            <th scope="col" style={{ lineHeight: 3 }}>
              Đề Nghị TSNT
            </th>
            <th scope="col" style={{ lineHeight: 3 }}>
              Đối tượng
            </th>
            <th scope="col" style={{ lineHeight: 3 }}>
              Thời gian
            </th>
            <th scope="col" style={{ lineHeight: 3 }}>
              Đơn vị giao
            </th>
            <th scope="col" style={{ lineHeight: 3 }}>
              Quan hệ
            </th>
            <th scope="col" style={{ lineHeight: 3 }}>
              Địa Chỉ
            </th>
            <th scope="col" style={{ lineHeight: 3 }}>
              Phương tiện
            </th>
            <th scope="col" style={{ lineHeight: 3 }}>
              Hình ảnh
            </th>
          </tr>
          <tr>
            <th>{denghiTSNTs.length}</th>
            <th>
              {
                handleValueSame_One(
                  denghiTSNTs.map((obj: any) => obj.DoiTuong?.TenDT)
                ).length
              }
            </th>
            <th></th>
            <th>
              {
                handleValueSame_One(
                  denghiTSNTs.map((obj: any) => obj.CAQHvaTD?.CAQHvaTD)
                ).length
              }
            </th>
            <th>
              {
                handleValueSame_Two(
                  denghiTSNTs.map(
                    (obj: any) =>
                      obj.QuyetDinhTSNT?.KeHoachTSNT?.KetQuaTSNT?.BaoCaoPHQHs
                  ), 'BiDanh'
                ).length
              }
            </th>
            <th>
            {
                handleValueSame_Two(
                  denghiTSNTs.map(
                    (obj: any) =>
                      obj.QuyetDinhTSNT?.KeHoachTSNT?.KetQuaTSNT?.BaoCaoPHDCs
                  ), 'DiaChi'
                ).length
              }
            </th>
            <th>
            {
                handleValueSame_Two(
                  denghiTSNTs.map(
                    (obj: any) =>
                      obj.QuyetDinhTSNT?.KeHoachTSNT?.KetQuaTSNT?.BaoCaoPHPTs
                  ), 'BKS'
                ).length
              }
            </th>
            <th>
            {
                handleValueSame_Two(
                  denghiTSNTs.map(
                    (obj: any) =>
                      obj.QuyetDinhTSNT?.KeHoachTSNT?.KetQuaTSNT?.BaoCaoKQGHs
                  ), 'MaBCKQGH'
                ).length
              }
            </th>
          </tr>
        </thead>
        <tbody>
          {denghiTSNTs.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center">
                CSDL về đề nghị TSNT trống!{" "}
                <Link style={{ marginLeft: "10px" }} to="/nhaplieu/denghitsnt">
                  Thêm đề nghị TSNT mới
                </Link>
              </td>
            </tr>
          ) : (
            denghiTSNTs?.map((denghitsnt: any, ind: number) => (
              <tr key={ind}>
                <td>
                  <Link
                    target="_blank"
                    to={`/doituong/${denghitsnt.DoiTuong?.MaDoiTuong}`}
                  >
                    {denghitsnt.QuyetDinhTSNT?.BiDanh}
                  </Link>
                </td>
                <td>
                  <Link
                    target="_blank"
                    to={`/doituong/${denghitsnt.DoiTuong?.MaDoiTuong}`}
                  >
                    {denghitsnt.DoiTuong?.TenDT}
                  </Link>
                </td>
                <td>
                  {denghitsnt.QuyetDinhTSNT?.ThoiGianBD &&
                    handleTime(denghitsnt.QuyetDinhTSNT?.ThoiGianBD)}
                </td>
                <td title={denghitsnt.CAQHvaTD?.CATTPvaTD?.CATTPvaTD}>
                  {denghitsnt.CAQHvaTD?.CAQHvaTD}
                </td>
                <td>
                  {denghitsnt.QuyetDinhTSNT?.KeHoachTSNT?.KetQuaTSNT?.BaoCaoPHQHs?.map(
                    (bcphqh: any, ind: number) => (
                      <Fragment key={ind}>
                        <Link to={`/baocaophqh/${bcphqh.MaBCPHQH}`}>
                          {bcphqh.BiDanh}
                        </Link>
                        &emsp;
                      </Fragment>
                    )
                  )}
                </td>
                <td>
                  {denghitsnt.QuyetDinhTSNT?.KeHoachTSNT?.KetQuaTSNT?.BaoCaoPHDCs?.map(
                    (bcphdc: any, ind: number) => (
                      <Fragment key={ind}>
                        <Link to={`/baocaophdc/${bcphdc.MaBCPHDC}`}>
                          {bcphdc.DiaChi}
                        </Link>
                        &emsp;
                      </Fragment>
                    )
                  )}
                </td>
                <td>
                  {denghitsnt.QuyetDinhTSNT?.KeHoachTSNT?.KetQuaTSNT?.BaoCaoPHPTs?.map(
                    (bcphpt: any, ind: number) => (
                      <Fragment key={ind}>
                        <Link to={`/baocaophpt/${bcphpt.MaBCPHPT}`}>
                          {bcphpt.BKS}
                        </Link>
                        &emsp;
                      </Fragment>
                    )
                  )}
                </td>
                <td>
                  {denghitsnt.QuyetDinhTSNT?.KeHoachTSNT?.KetQuaTSNT?.BaoCaoKQGHs?.map(
                    (bckqgh: any, ind: number) => (
                      <Fragment key={ind}>
                        <Link to={`/baocaokqgh/${bckqgh.MaBCKQGH}`}>link</Link>
                        &emsp;
                      </Fragment>
                    )
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </GeneralStyled>
  );
}
