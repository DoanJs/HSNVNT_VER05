import { Link } from "react-router-dom";
import { handleTime } from "../../utils/functions";

export default function ProjectCrime({ doituongCA }: { doituongCA: any }) {
  return (
    <tr>
      <td>
        <Link
          to={`/doituong/${doituongCA.DoiTuong?.MaDoiTuong}`}
          target="_blank"
        >
          {doituongCA.DoiTuong?.TenDT}
        </Link>
      </td>
      <td>{doituongCA.BiSo}</td>
      <td>
        {doituongCA.DoiTuong?.NgaySinh &&
          handleTime(doituongCA.DoiTuong?.NgaySinh)}
      </td>
      <td>{doituongCA.DoiTuong?.NoiO}</td>
      <td>{doituongCA.DoiTuong?.CMCCHC}</td>
    </tr>
  );
}
