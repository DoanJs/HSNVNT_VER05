import { Link } from "react-router-dom";
import { handleTime } from "../../utils/functions";

export default function PlaceItem({
  baocaophdc,
  ind,
}: {
  baocaophdc: any;
  ind: number;
}) {
  return (
    <tr>
      <th>{ind + 1}</th>
      <td>
        <Link to={`/baocaophdc/${baocaophdc.MaBCPHDC}`} target="_blank">
          {handleTime(baocaophdc.ThoiGianPH)}
        </Link>
      </td>
      <td>{baocaophdc.DiaChi}</td>
      <td>
        <Link to={baocaophdc.HinhAnh} target="_blank">
          Hình ảnh
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
          {baocaophdc.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong?.TenDT}
        </Link>
      </td>
      <td>
        {baocaophdc.TSThucHiens?.map((cbcs: any, ind: number) => (
          <Link key={ind} to={`/cbcs/${cbcs?.MaCBCS}`} target="_blank">
            <p>{cbcs?.HoTen}</p>
          </Link>
        ))}
      </td>
    </tr>
  );
}
