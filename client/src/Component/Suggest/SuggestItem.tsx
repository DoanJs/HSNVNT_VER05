import { Link } from "react-router-dom";
import { handleTime } from "../../utils/functions";

export default function SuggestItem({ denghiTSNT }: { denghiTSNT: any }) {
  return (
    <tr>
      <td>{denghiTSNT.So}</td>
      <td>{denghiTSNT.Ngay && handleTime(denghiTSNT.Ngay)}</td>
      <td>
        {denghiTSNT.CAQHvaTD?.CAQHvaTD}-
        {denghiTSNT.CAQHvaTD?.CATTPvaTD?.CATTPvaTD}
      </td>
      <td>
        <Link
          to={`/doituong/${denghiTSNT.DoiTuong?.MaDoiTuong}`}
          target="_blank"
        >
          {denghiTSNT.DoiTuong?.TenDT}
        </Link>
      </td>
      <td>{denghiTSNT.ThoiGianBD && handleTime(denghiTSNT.ThoiGianBD)}</td>
      <td>{denghiTSNT.ThoiGianKT && handleTime(denghiTSNT.ThoiGianKT)}</td>
      <td>
        {denghiTSNT.DiaBanDNs?.map((obj: any, ind: number) => (
          <span key={ind}>
            {ind !== 0 && " - "}
            {obj.TinhTP}
          </span>
        ))}
      </td>
    </tr>
  );
}
