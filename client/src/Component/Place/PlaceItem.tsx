import { Link } from "react-router-dom";
import { handleTime } from "../../utils/functions";
import { Fragment } from "react";

export default function PlaceItem({ baocaophdc }: { baocaophdc: any }) {
  return (
    <tr>
      <td>
        <Link to={`/baocaophdc/${baocaophdc.MaBCPHDC}`} target="_blank">
          {baocaophdc.DiaChi}
        </Link>
      </td>
      <td>{baocaophdc.ThoiGianPH && handleTime(baocaophdc.ThoiGianPH)}</td>
      <td>
        <Link to={baocaophdc.HinhAnh} target="_blank">
          link
        </Link>
      </td>
      <td>
        <Link
          to={`/doituong/${baocaophdc.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong?.MaDoiTuong}`}
          target="_blank"
        >
          {baocaophdc.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.BiDanh}
        </Link>
      </td>
      <td>
        <Link
          to={`/doituong/${baocaophdc.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong?.MaDoiTuong}`}
          target="_blank"
        >
          {
            baocaophdc.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT
              ?.DoiTuong?.TenDT
          }
        </Link>
      </td>
      <td>
        {baocaophdc.TSThucHiens?.map((cbcs: any, ind: number) => (
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
