import { Link } from "react-router-dom";
import { handleTime } from "../../utils/functions";

export default function DecisionItem({
  quyetdinhTSNT,
}: {
  quyetdinhTSNT: any;
}) {
  return (
    <tr>
      <td>
        <Link to={`/quyetdinhtsnt/${quyetdinhTSNT.MaQD}`} target="_blank">
          {quyetdinhTSNT.So}
        </Link>
      </td>
      <td>{quyetdinhTSNT.Ngay && handleTime(quyetdinhTSNT.Ngay)}</td>
      <td>
        <Link
          to={`/doituong/${quyetdinhTSNT.DeNghiTSNT?.DoiTuong?.MaDoiTuong}`}
          target="_blank"
        >
          {quyetdinhTSNT.DeNghiTSNT?.DoiTuong?.TenDT}
        </Link>
      </td>
      <td>
        <Link
          to={`/doituong/${quyetdinhTSNT.DoiTuong?.MaDoiTuong}`}
          target="_blank"
        >
          {quyetdinhTSNT.BiDanh}
        </Link>
      </td>
      <td>
        {quyetdinhTSNT.ThoiGianBD && handleTime(quyetdinhTSNT.ThoiGianBD)}
      </td>
      <td>
        {quyetdinhTSNT.ThoiGianKT && handleTime(quyetdinhTSNT.ThoiGianKT)}
      </td>
    </tr>
  );
}
