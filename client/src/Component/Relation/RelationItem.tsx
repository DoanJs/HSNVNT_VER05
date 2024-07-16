import { Link } from "react-router-dom";
import { handleTime } from "../../utils/functions";
import { Fragment } from "react";

export default function RelationItem({ baocaoPHQH }: { baocaoPHQH: any }) {
  return (
    <tr>
      <td>
        <Link to={`/baocaophqh/${baocaoPHQH.MaBCPHQH}`} target="_blank">
          {baocaoPHQH.ThoiGianPH && handleTime(baocaoPHQH.ThoiGianPH)}
        </Link>
      </td>
      <td>{baocaoPHQH.DiaDiemPH}</td>
      <td>{baocaoPHQH.HinhAnh && <Link to="/">link</Link>}</td>
      <td>{baocaoPHQH.DiaChiCC}</td>
      <td>
        <Link
          to={`/doituong/${baocaoPHQH.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong?.MaDoiTuong}`}
        >
          {baocaoPHQH.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.BiDanh}
        </Link>
      </td>
      <td>
        <Link
          to={`/doituong/${baocaoPHQH.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong?.MaDoiTuong}`}
          target="_blank"
        >
          {
            baocaoPHQH.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT
              ?.DoiTuong?.TenDT
          }
        </Link>
      </td>
      <td>
        {baocaoPHQH.TSThucHiens.map((cbcs: any, ind: number) => (
          <Fragment key={ind}>
            {ind !== 0 && "; "}
            <Link to={`/cbcs/${cbcs?.MaCBCS}`} target="_blank">
              {cbcs?.HoTen}
            </Link>
          </Fragment>
        ))}
      </td>
    </tr>
  );
}
