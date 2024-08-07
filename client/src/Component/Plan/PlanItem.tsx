import { useReactiveVar } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Spinner } from "..";
import { dataServerConnectVar } from "../../graphql/client/cache";
import {
  handleDanhGiaTSTH,
  handleTime,
  showBOT_Connect,
} from "../../utils/functions";

export const PlanItemStyled = styled.div`
  h5,
  h6 {
    margin: 8px 0;
  }
  .plan-details-title {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    button {
      text-align: center;
    }
  }
  .plan-details-vehicle,
  .plan-details-relationship,
  .plan-details-address,
  .plan-details-record {
    padding-left: 60px;
  }
  .planDetails-edit {
    display: flex;
    justify-content: flex-end;
    text-decoration: none;
    .fa-edit,
    .fa-trash {
      color: orange;
      cursor: pointer;
      margin-left: 20px;
    }
    .fa-trash {
      color: #dc3545;
    }
  }
  .plan-details-THDT-other {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    .plan-details-THDT-first,
    .plan-details-THDT-second {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
  .plan-details-THTS {
    .pi-lltgkh-length {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
  .planDetails-workStation {
    display: flex;
    justify-content: space-between;
    .workStation-img {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        height: 200px;
        width: 200px;
        object-fit: cover;
      }
    }
    .workStation-info {
      font-weight: normal;
    }
  }
`;
export default function PlanItem({
  quyetdinhTSNT,
  numberAction,
}: {
  quyetdinhTSNT: any;
  numberAction: number;
}) {
  const dataServerConnect = useReactiveVar(dataServerConnectVar);

  if (!quyetdinhTSNT) return <Spinner />;
  return (
    <PlanItemStyled id={`plan-${quyetdinhTSNT.MaQD}`}>
      <div className="plan-details-title">
        <button type="button" className="btn btn-success">
          Trinh sát lần {numberAction + 1}
        </button>
        <b>"{quyetdinhTSNT.BiDanh}"</b>
        <b>
          ( {handleTime(quyetdinhTSNT.ThoiGianBD)}_{" "}
          {handleTime(quyetdinhTSNT.ThoiGianKT)} )
        </b>
      </div>

      <div className="plan-details-TCYC">
        <h5>I. NHIỆM VỤ CỤ THỂ, NHỮNG VẤN ĐỀ CẦN CHÚ Ý CỦA ĐỢT TRINH SÁT</h5>
        <p>
          <b>
            <i>- Nhiệm vụ cụ thể:</i>
          </b>
        </p>
        <p>{showBOT_Connect(quyetdinhTSNT.NhiemVuCT, dataServerConnect)}</p>
        <p>
          <b>
            <i>- Những vấn đề cần chú ý:</i>
          </b>
        </p>
        <p>{quyetdinhTSNT.KeHoachTSNT?.VanDeChuY}</p>
        <br />
      </div>

      <div className="plan-details-THDT">
        <h5>
          II. TÌNH HÌNH HOẠT ĐỘNG CỦA ĐỐI TƯỢNG VÀ KẾT QUẢ CÔNG TÁC TRINH SÁT
        </h5>
        <p>
          <b>
            <i>- Tình hình hoạt động của đối tượng:</i>
          </b>
        </p>
        <p>{quyetdinhTSNT.KeHoachTSNT?.KetQuaTSNT?.BaoCaoKTDN?.TinhHinhDT}</p>
        <p>
          <b>
            <i>- Kết quả công tác trinh sát:</i>
          </b>
        </p>

        <div className="plan-details-THDT-other">
          <div className="plan-details-THDT-first">
            <div>
              {quyetdinhTSNT.KeHoachTSNT?.KetQuaTSNT?.BaoCaoPHQHs.length ===
              0 ? (
                <p>
                  Báo cáo phát hiện quan hệ trống!{" "}
                  <Link
                    title="Thêm báo cáo phát hiện quan hệ"
                    to={`/nhaplieu/baocaophqh`}
                  >
                    Thêm
                  </Link>
                </p>
              ) : (
                <>
                  <h6>
                    Quan hệ của đối tượng:{" "}
                    <span style={{ color: "red" }}>
                      (
                      {
                        quyetdinhTSNT.KeHoachTSNT?.KetQuaTSNT?.BaoCaoPHQHs
                          .length
                      }
                      )
                    </span>
                  </h6>
                  <div className="plan-details-relationship">
                    {quyetdinhTSNT.KeHoachTSNT?.KetQuaTSNT?.BaoCaoPHQHs.map(
                      (obj: any) => (
                        // eslint-disable-line
                        <Link
                          key={obj.MaBCPHQH}
                          to={`/baocaophqh/${obj.MaBCPHQH}`}
                        >
                          <p>+ {obj.BiDanh}</p>
                        </Link>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
            <div>
              {quyetdinhTSNT.KeHoachTSNT?.KetQuaTSNT?.BaoCaoPHPTs.length ===
              0 ? (
                <p>
                  Báo cáo phát hiện phương tiện trống!{" "}
                  <Link
                    title="Thêm báo cáo phát hiện phương tiện"
                    to={`/nhaplieu/baocaophpt`}
                  >
                    Thêm
                  </Link>
                </p>
              ) : (
                <>
                  <h6>
                    Báo cáo phát hiện phương tiện:{" "}
                    <span style={{ color: "red" }}>
                      (
                      {
                        quyetdinhTSNT.KeHoachTSNT?.KetQuaTSNT?.BaoCaoPHPTs
                          .length
                      }
                      )
                    </span>
                  </h6>
                  <div className="plan-details-vehicle">
                    {quyetdinhTSNT.KeHoachTSNT?.KetQuaTSNT?.BaoCaoPHPTs.map(
                      (obj: any) => (
                        // eslint-disable-line
                        <Link
                          key={obj.MaBCPHPT}
                          to={`/baocaophpt/${obj.MaBCPHPT}`}
                        >
                          <p>+ {obj.BKS}</p>
                        </Link>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="plan-details-THDT-second">
            <div>
              {quyetdinhTSNT.KeHoachTSNT?.KetQuaTSNT?.BaoCaoKQGHs.length ===
              0 ? (
                <p>
                  Báo cáo kết quả ghi hình trống!{" "}
                  <Link
                    title="Thêm báo cáo kết quả ghi hình"
                    to={`/nhaplieu/baocaokqgh`}
                  >
                    Thêm
                  </Link>
                </p>
              ) : (
                <>
                  <h6>
                    Báo cáo kết quả ghi hình:{" "}
                    <span style={{ color: "red" }}>
                      (
                      {
                        quyetdinhTSNT.KeHoachTSNT?.KetQuaTSNT?.BaoCaoKQGHs
                          .length
                      }
                      )
                    </span>
                  </h6>
                  <div className="plan-details-record">
                    {quyetdinhTSNT.KeHoachTSNT?.KetQuaTSNT?.BaoCaoKQGHs.map(
                      (obj: any, ind: number) => (
                        // eslint-disable-line
                        <Link
                          target="_blank"
                          key={obj.MaBCKQGH}
                          to={`/baocaokqgh/${obj.MaBCKQGH}`}
                        >
                          <p>+ Hình ảnh {ind + 1}</p>
                        </Link>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
            <div>
              {quyetdinhTSNT.KeHoachTSNT?.KetQuaTSNT?.BaoCaoPHDCs.length ===
              0 ? (
                <p>
                  Báo cáo phát hiện địa chỉ trống!{" "}
                  <Link
                    title="Thêm báo cáo phát hiện địa chỉ"
                    to={`/nhaplieu/baocaophdc`}
                  >
                    Thêm
                  </Link>
                </p>
              ) : (
                <>
                  <h6>
                    Báo cáo phát hiện địa chỉ:{" "}
                    <span style={{ color: "red" }}>
                      (
                      {
                        quyetdinhTSNT.KeHoachTSNT?.KetQuaTSNT?.BaoCaoPHDCs
                          .length
                      }
                      )
                    </span>
                  </h6>
                  <div className="plan-details-address">
                    {quyetdinhTSNT.KeHoachTSNT?.KetQuaTSNT?.BaoCaoPHDCs.map(
                      (obj: any) => (
                        <Link
                          key={obj.MaBCPHDC}
                          to={`/baocaophdc/${obj.MaBCPHDC}`}
                        >
                          <p>+ {obj.DiaChi}</p>
                        </Link>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <br />
      </div>

      <div className="plan-details-THTS">
        <h5>III. TÌNH HÌNH TRINH SÁT</h5>

        <div className="pi-lltgkh-length">
          <h6 style={{ marginRight: "10px" }}>
            Trinh sát tham gia:
            <span>
              ({quyetdinhTSNT.KeHoachTSNT?.KetQuaTSNT?.DanhGiaTSTHs.length})
            </span>
          </h6>
          <h6 style={{ color: "Lime", marginRight: "10px" }}>
            Trinh sát được biểu dương:
            <span>
              (
              {
                handleDanhGiaTSTH(
                  quyetdinhTSNT.KeHoachTSNT?.KetQuaTSNT?.DanhGiaTSTHs
                ).arrBD.length
              }
              )
            </span>
          </h6>
          <h6 style={{ color: "red", marginRight: "10px" }}>
            Trinh sát RKN:
            <span>
              (
              {
                handleDanhGiaTSTH(
                  quyetdinhTSNT.KeHoachTSNT?.KetQuaTSNT?.DanhGiaTSTHs
                ).arrRKN.length
              }
              )
            </span>
          </h6>
        </div>

        <div className="pi-lltgkh">
          {quyetdinhTSNT.KetQuaTSNT?.DanhGiaTSTHs.lengthh === 0 ? (
            <b>
              <i>Lực lượng tham gia yêu cầu trống!&emsp;</i>
              <Link to={"/nhaplieu/danhgiatsth"} target="_blank">
                Thêm lực lượng tham gia
              </Link>
            </b>
          ) : (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Vai Trò</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Đánh Giá</th>
                    <th scope="col">Lý Do</th>
                  </tr>
                </thead>
                <tbody>
                  {quyetdinhTSNT.KeHoachTSNT?.KetQuaTSNT?.DanhGiaTSTHs.map(
                    (obj: any, ind: number) => (
                      <tr key={ind}>
                        <th scope="row">{ind + 1}</th>
                        <td>{obj.VaiTro}</td>
                        <td>
                          <Link
                            to={`/cbcs/${obj.CBCS?.MaCBCS}`}
                            target="_blank"
                          >
                            {obj.CBCS?.HoTen}
                          </Link>
                        </td>
                        <td
                          style={{
                            color:
                              obj.DanhGia === "Biểu dương"
                                ? "Lime"
                                : obj.DanhGia === "RKN"
                                ? "red"
                                : "black",
                          }}
                        >
                          {obj.DanhGia}
                        </td>
                        <td>{obj.LyDo}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </>
          )}
        </div>
        <br />
      </div>

      <div className="plan-details-TramCT">
        <h5>IV. TRẠM CÔNG TÁC</h5>
        <div className="pi-tct">
          {quyetdinhTSNT.KeHoachTSNT?.TramCT && (
            <div className="planDetails-workStation">
              <div className="workStation-info">
                <p>
                  <b>
                    <i>- Những vấn đề cần chú ý khi sử dụng trạm:</i>
                  </b>
                </p>
                <p>{quyetdinhTSNT.KeHoachTSNT?.TramCT?.VanDeChuY}</p>
                <p>
                  <b>
                    <i>- Một số quy định:</i>
                  </b>
                </p>
                <p>{quyetdinhTSNT.KeHoachTSNT?.TramCT?.QuyDinh}</p>
              </div>
              <div className="workStation-img">
                <a target="_blank" href="/">
                  <img src="../../img.jpg" alt="" />
                </a>
                <i>{quyetdinhTSNT.KeHoachTSNT?.TramCT?.DiaDiem}</i>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="plan-details-RKN">
        <h5>V. NHỮNG VẤN ĐỀ CẦN RKN</h5>
        <p>{quyetdinhTSNT.KeHoachTSNT?.KetQuaTSNT?.BaoCaoKTDN?.VanDeRKN}</p>
      </div>

      <div className="planDetails-edit">
        {/* {handleAuthorization(accountLogin.role, ["admin", "leader", "manager"]) && (
          <Link
            to={`/editPlan/${plan.id}`}
            title="Chỉnh sửa"
            className="fas fa-edit"
          ></Link>
        )}
        {handleAuthorization(accountLogin.role, ["admin"]) && (
          <span
            onClick={() => takeData(plan)}
            data-bs-toggle="modal"
            data-bs-target="#modal-delete-object"
            title="Xóa"
            className="fas fa-trash"
          ></span>
        )} */}
      </div>
      <hr />
    </PlanItemStyled>
  );
}
