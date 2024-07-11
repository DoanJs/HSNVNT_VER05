import { Fragment } from "react";
import { Link } from "react-router-dom";
import { handleTime } from "../../utils/functions";

export default function CBCSItemRelation({ obj }: { obj: any }) {
  return (
    <tr>
      <td>{obj.Ngay && handleTime(obj.Ngay)}</td>
      <td>
        <b>
          <Link to={`/baocaophqh/${obj.MaBCPHQH}`} target="_blank">
            {obj.BiDanh}
          </Link>
        </b>
      </td>
      <td>
        <b>
          <Link
            to={`/doituong/${obj.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong?.MaDoiTuong}`}
            target="_blank"
          >
            {obj.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.BiDanh}
          </Link>
        </b>
      </td>
      <td>
        <b>
          <Link
            to={`/doituong/${obj.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong?.MaDoiTuong}`}
            target="_blank"
          >
            {
              obj.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong
                ?.TenDT
            }
          </Link>
        </b>
      </td>
      <td>
        <b>
          {obj.TSThucHiens?.map((cbcs: any, ind: number) => (
            <Fragment key={ind}>
              <Link to={`/cbcs/${cbcs.MaCBCS}`} target="_blank">
                <span>{cbcs.HoTen}</span>
              </Link>
              <br />
            </Fragment>
          ))}
        </b>
      </td>
    </tr>
  );
}
