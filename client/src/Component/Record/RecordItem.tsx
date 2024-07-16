import { Link } from "react-router-dom";
import { handleTime } from "../../utils/functions";
import { Fragment } from "react";

export default function RecordItem({ baocaoKQGH }: { baocaoKQGH: any }) {
  return (
    <tr>
      <td>
        <Link to={`/baocaokqgh/${baocaoKQGH.MaBCKQGH}`} target="_blank">
          {baocaoKQGH.ThoiGian && handleTime(baocaoKQGH.ThoiGian)}
        </Link>
      </td>
      <td>{baocaoKQGH.DiaDiem}</td>
      <td>
        <Link to={baocaoKQGH.HinhAnh} target="_blank">
          link
        </Link>
      </td>
      <td>
        <Link
          to={`/doituong/${baocaoKQGH.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong?.MaDoiTuong}`}
          target="_blank"
        >
          {baocaoKQGH.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.BiDanh}
        </Link>
      </td>
      <td>
        <Link
          to={`/doituong/${baocaoKQGH.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong?.MaDoiTuong}`}
          target="_blank"
        >
          {
            baocaoKQGH.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT
              ?.DoiTuong?.TenDT
          }
        </Link>
      </td>
      <td>
        {baocaoKQGH.TSThucHiens.map((cbcs: any, ind: number) => (
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
