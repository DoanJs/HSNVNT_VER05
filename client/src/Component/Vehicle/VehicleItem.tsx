import { Link } from "react-router-dom";
import { handleTime } from "../../utils/functions";

export default function VehicleItem({ baocaophpt }: { baocaophpt: any }) {
  return (
    <tr>
      <td>
        <Link to={`/baocaophpt/${baocaophpt.MaBCPHPT}`} target="_blank">
          {baocaophpt.BKS}
        </Link>
      </td>
      <td>{baocaophpt.ThoiGianPH && handleTime(baocaophpt.ThoiGianPH)}</td>
      <td>{baocaophpt.DiaDiemPH}</td>
      <td>
        <Link to={baocaophpt.HinhAnh} target="_blank">
          link
        </Link>
      </td>
      <td>
        <Link
          to={`/doituong/${baocaophpt.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong?.MaDoiTuong}`}
          target="_blank"
        >
          {baocaophpt.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.BiDanh}
        </Link>
      </td>
      <td>
        <Link
          to={`/doituong/${baocaophpt.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong?.MaDoiTuong}`}
          target="_blank"
        >
          {
            baocaophpt.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT
              ?.DoiTuong?.TenDT
          }
        </Link>
      </td>
      <td>
        {baocaophpt.TSThucHiens?.map((cbcs: any, ind: number) => (
          <Link key={ind} to={`/cbcs/${cbcs?.MaCBCS}`} target="_blank">
            <p>{cbcs?.HoTen}</p>
          </Link>
        ))}
      </td>
    </tr>
  );
}
