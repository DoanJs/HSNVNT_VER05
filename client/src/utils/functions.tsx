import axios, { Method } from "axios";
import moment from "moment";
import {
  NOTIFICATION_TYPE,
  NotificationTitleMessage,
  Store,
} from "react-notifications-component";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import JWTManager from "./jwt";
import { MenuLinkParamsType } from "./type";
import {
  IPADDRESS,
  PORTSERVER,
  arr_server,
  keyValueSame_BiDanh_YC,
  keyValueSame_TenDT,
} from "./variable";

export const MenuLink = ({ children, to, ...props }: MenuLinkParamsType) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <li className={`nav-item ${match ? "active" : ""}`}>
      <Link to={to} {...props} className="nav-link">
        {children}
      </Link>
    </li>
  );
};

export const Filter_Data = (type: string | undefined, array: any) => {
  if (type === "anqg") {
    return array?.filter((obj: any) =>
      ["Gián điệp", "Tình báo"].includes(obj.DoiTuong.TinhChatDT.TinhChat)
    );
  } else {
    return array?.filter((obj: any) =>
      ["Phản động", "Kinh tế", "Ma túy", "Hình sự"].includes(
        obj.DoiTuong.TinhChatDT.TinhChat
      )
    );
  }
};

export const handleSearch = (type: string, array: any, keysearch: string) => {
  let arr: any = [];
  switch (type) {
    case "files":
      arr = array.filter((obj: any) =>
        obj.BiDanh.toLowerCase().includes(keysearch)
      );
      break;
    case "DoiTuongs":
      arr = array.filter(
        (obj: any) =>
          obj.TenDT?.toLowerCase().includes(keysearch) ||
          moment(obj.NgaySinh)
            .year()
            .toString()
            .toLowerCase()
            .includes(keysearch) ||
          obj.NoiO?.toLowerCase().includes(keysearch) ||
          obj.NgheNghiep?.toLowerCase().includes(keysearch) ||
          obj.NoiLamViec?.toLowerCase().includes(keysearch) ||
          obj.TinhChatDT?.TinhChat.toLowerCase().includes(keysearch) ||
          obj.LoaiDT?.LoaiDT.toLowerCase().includes(keysearch)
      );
      break;
    case "chuyenans":
      arr = array.filter(
        (obj: any) =>
          obj.BiSo?.toLowerCase().includes(keysearch) ||
          obj.TenCA?.toLowerCase().includes(keysearch) ||
          obj.TinhChat?.TinhChat.toLowerCase().includes(keysearch) ||
          moment(obj.ThoiGianBD)
            .year()
            .toString()
            .toLowerCase()
            .includes(keysearch)
      );
      break;
    case "DeNghiTSNTs":
      arr = array.filter(
        (obj: any) =>
          obj.So.toLowerCase().includes(keysearch) ||
          obj.DoiTuong?.TenDT?.toLowerCase().includes(keysearch) ||
          obj.CATTPvaTD?.CATTPvaTD?.toLowerCase().includes(keysearch) ||
          obj.CAQHvaTD?.CAQHvaTD?.toLowerCase().includes(keysearch) ||
          moment(obj.Ngay)
            .date()
            .toString()
            .toLowerCase()
            .includes(keysearch) ||
          (moment(obj.Ngay).month() + 1)
            .toString()
            .toLowerCase()
            .includes(keysearch) ||
          moment(obj.Ngay).year().toString().toLowerCase().includes(keysearch)
      );
      break;
    case "quyetdinhTSNTs":
      arr = array.filter(
        (obj: any) =>
          obj.So.toLowerCase().includes(keysearch) ||
          obj.DoiTuong?.TenDT.toLowerCase().includes(keysearch) ||
          obj.BiDanh.toLowerCase().includes(keysearch) ||
          moment(obj.Ngay)
            .date()
            .toString()
            .toLowerCase()
            .includes(keysearch) ||
          moment(obj.Ngay)
            .month()
            .toString()
            .toLowerCase()
            .includes(keysearch) ||
          moment(obj.Ngay).year().toString().toLowerCase().includes(keysearch)
      );
      break;
    case "baocaoPHQHs":
      arr = array.filter(
        (obj: any) =>
          obj.DiaDiemPH.toLowerCase().includes(keysearch) ||
          obj.DiaChiCC.toLowerCase().includes(keysearch) ||
          obj.DoiTuong?.TenDT.toLowerCase().includes(keysearch) ||
          obj.KetQuaTSNT?.QuyetDinhTSNT?.BiDanh.toLowerCase().includes(
            keysearch
          ) ||
          obj.TSThucHiens?.filter((cbcs: any) =>
            cbcs.HoTen.toLowerCase().includes(keysearch)
          ).length !== 0 ||
          moment(obj.ThoiGianPH)
            .date()
            .toString()
            .toLowerCase()
            .includes(keysearch) ||
          (moment(obj.ThoiGianPH).month() + 1)
            .toString()
            .toLowerCase()
            .includes(keysearch) ||
          moment(obj.ThoiGianPH)
            .year()
            .toString()
            .toLowerCase()
            .includes(keysearch)
      );
      break;
    case "diachiNVs":
      arr = array.filter(
        (obj: any) =>
          obj.DiaChi.toLowerCase().includes(keysearch) ||
          obj.KetQuaTSNT?.QuyetDinhTSNT?.DoiTuong?.TenDT.toLowerCase().includes(
            keysearch
          ) ||
          obj.KetQuaTSNT?.QuyetDinhTSNT?.BiDanh.toLowerCase().includes(
            keysearch
          ) ||
          obj.TSThucHiens?.filter((cbcs: any) =>
            cbcs.HoTen.toLowerCase().includes(keysearch)
          ).length !== 0 ||
          moment(obj.ThoiGianPH)
            .date()
            .toString()
            .toLowerCase()
            .includes(keysearch) ||
          (moment(obj.ThoiGianPH).month() + 1)
            .toString()
            .toLowerCase()
            .includes(keysearch) ||
          moment(obj.ThoiGianPH)
            .year()
            .toString()
            .toLowerCase()
            .includes(keysearch)
      );
      break;
    case "phuongtienNVs":
      arr = array.filter(
        (obj: any) =>
          obj.DiaDiemPH.toLowerCase().includes(keysearch) ||
          obj.BKS.toLowerCase().includes(keysearch) ||
          obj.KetQuaTSNT?.QuyetDinhTSNT?.DoiTuong?.TenDT.toLowerCase().includes(
            keysearch
          ) ||
          obj.KetQuaTSNT?.QuyetDinhTSNT?.BiDanh.toLowerCase().includes(
            keysearch
          ) ||
          obj.TSThucHiens?.filter((cbcs: any) =>
            cbcs.HoTen.toLowerCase().includes(keysearch)
          ).length !== 0 ||
          moment(obj.ThoiGianPH)
            .date()
            .toString()
            .toLowerCase()
            .includes(keysearch) ||
          (moment(obj.ThoiGianPH).month() + 1)
            .toString()
            .toLowerCase()
            .includes(keysearch) ||
          moment(obj.ThoiGianPH)
            .year()
            .toString()
            .toLowerCase()
            .includes(keysearch)
      );
      break;
    case "baocaoKQGHs":
      arr = array.filter(
        (obj: any) =>
          obj.DiaDiem.toLowerCase().includes(keysearch) ||
          obj.DoiTuong?.TenDT.toLowerCase().includes(keysearch) ||
          obj.KetQuaTSNT?.QuyetDinhTSNT?.BiDanh.toLowerCase().includes(
            keysearch
          ) ||
          obj.TSThucHiens?.filter((cbcs: any) =>
            cbcs.HoTen.toLowerCase().includes(keysearch)
          ).length !== 0 ||
          moment(obj.ThoiGian)
            .date()
            .toString()
            .toLowerCase()
            .includes(keysearch) ||
          (moment(obj.ThoiGian).month() + 1)
            .toString()
            .toLowerCase()
            .includes(keysearch) ||
          moment(obj.ThoiGian)
            .year()
            .toString()
            .toLowerCase()
            .includes(keysearch)
      );
      break;
    case "nhaplieu":
      arr = array.filter((obj: any) =>
        obj.label.toLowerCase().includes(keysearch)
      );
      break;
    case "caTTPvaTDs":
      arr = array.filter(
        (obj: any) =>
          obj.CATTPvaTD?.toLowerCase().includes(keysearch) ||
          obj.CapCA?.CapCA.toLowerCase().includes(keysearch)
      );
      break;
    case "CAQHvaTDs":
      arr = array.filter(
        (obj: any) =>
          obj.CAQHvaTD?.toLowerCase().includes(keysearch) ||
          obj.CATTPvaTD?.CATTPvaTD.toLowerCase().includes(keysearch)
      );
      break;
    case "ChucVus":
      arr = array.filter((obj: any) =>
        obj.ChucVu?.toLowerCase().includes(keysearch)
      );
      break;
    case "BienPhapDTs":
      arr = array.filter((obj: any) =>
        obj.BienPhapDT?.toLowerCase().includes(keysearch)
      );
      break;
    case "CapBacs":
      arr = array.filter((obj: any) =>
        obj.CapBac?.toLowerCase().includes(keysearch)
      );
      break;
    case "CapCAs":
      arr = array.filter((obj: any) =>
        obj.CapCA?.toLowerCase().includes(keysearch)
      );
      break;
    case "DanTocs":
      arr = array.filter(
        (obj: any) =>
          obj.TenDT?.toLowerCase().includes(keysearch) ||
          obj.QuocTich?.TenQT?.toLowerCase().includes(keysearch)
      );
      break;
    case "HinhThucHDs":
      arr = array.filter((obj: any) =>
        obj.HinhThuc?.toLowerCase().includes(keysearch)
      );
      break;
    case "LoaiLLDBs":
      arr = array.filter(
        (obj: any) =>
          obj.TenLLDB?.toLowerCase().includes(keysearch) ||
          obj.KyHieu?.toLowerCase().includes(keysearch)
      );
      break;
    case "LoaiDTs":
      arr = array.filter((obj: any) =>
        obj.LoaiDT?.toLowerCase().includes(keysearch)
      );
      break;
    case "LLDBs":
      arr = array.filter(
        (obj: any) =>
          obj.BiDanh?.toLowerCase().includes(keysearch) ||
          obj.LoaiLLDB?.TenLLDB?.toLowerCase().includes(keysearch) ||
          obj.TSQuanLy?.HoTen?.toLowerCase().includes(keysearch)
      );
      break;
    case "QuocTichs":
      arr = array.filter((obj: any) =>
        obj.TenQT?.toLowerCase().includes(keysearch)
      );
      break;
    case "TinhChatDTs":
      arr = array.filter((obj: any) =>
        obj.TinhChat?.toLowerCase().includes(keysearch)
      );
      break;
    case "TonGiaos":
      arr = array.filter((obj: any) =>
        obj.TenTG?.toLowerCase().includes(keysearch)
      );
      break;
    case "TinhTPs":
      arr = array.filter(
        (obj: any) =>
          obj.TinhTP?.toLowerCase().includes(keysearch) ||
          obj.Cap?.toLowerCase().includes(keysearch)
      );
      break;
    case "DDNBs":
      arr = array.filter((obj: any) =>
        obj.DacDiem?.toLowerCase().includes(keysearch)
      );
      break;
    case "Dois":
      arr = array.filter(
        (obj: any) =>
          obj.TenDoi?.toLowerCase().includes(keysearch) ||
          obj.CAQHvaTD?.CAQHvaTD?.toLowerCase().includes(keysearch)
      );
      break;
    case "CBCSs":
      arr = array.filter(
        (obj: any) =>
          obj.HoTen?.toLowerCase().includes(keysearch) ||
          obj.TenKhac?.toLowerCase().includes(keysearch) ||
          obj.ChucVu?.ChucVu?.toLowerCase().includes(keysearch) ||
          obj.Doi?.TenDoi?.toLowerCase().includes(keysearch) ||
          obj.CAQHvaTD?.CAQHvaTD?.toLowerCase().includes(keysearch) ||
          moment(obj.NgaySinh)
            .year()
            .toString()
            .toLowerCase()
            .includes(keysearch)
      );
      break;
    default:
  }

  return arr;
};

export const handleTime = (time: any) => {
  let day = moment(time).date();
  let month = moment(time).month();
  let year = moment(time).year();
  return `${Number(day) < 10 ? "0" + day : day}/${
    Number(month) < 9 ? "0" + (Number(month) + 1) : Number(month) + 1
  }/${year}`;
};
export const handleDanhGiaTSTH = (arr: any[]) => {
  const arrBD = arr.filter((obj: any) => obj.DanhGia === "Biểu dương");
  const arrRKN = arr.filter((obj: any) => obj.DanhGia === "RKN");
  const arrExist = arr.filter(
    (obj: any) => obj.DanhGia !== "Biểu dương" && obj.DanhGia !== "RKN"
  );
  return { arrBD, arrRKN, arrExist };
};

export const handleSort = (arr: any[]) =>
  arr.sort(function (a: any, b: any) {
    let x = a.label.toLowerCase();
    let y = b.label.toLowerCase();
    if (x > y) {
      return 1;
    }
    if (x < y) {
      return -1;
    }
    return 0;
  });

export const CALLAPI = (method: Method, endpoint: string, data: any) => {
  return axios({
    method,
    url: `http://${IPADDRESS}:${PORTSERVER}/${endpoint}`,
    data,
    withCredentials: true,
    headers: {
      Authorization: "Bearer " + JWTManager.getToken(),
    },
  });
};

export const showNotification = (
  title: NotificationTitleMessage,
  message: NotificationTitleMessage,
  type: NOTIFICATION_TYPE
) =>
  Store.addNotification({
    title,
    message,
    type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 5000,
      onScreen: true,
      pauseOnHover: true,
    },
  });

export const handleValueSame = (key: string, arr: any[]) => {
  let array: any = [];
  let checkKeyValueSame: string | null = keyValueSame_TenDT.includes(key)
    ? "keyValueSame_TenDT"
    : keyValueSame_BiDanh_YC.includes(key)
    ? "keyValueSame_BiDanh_YC"
    : null;

  switch (checkKeyValueSame) {
    case "keyValueSame_TenDT":
      arr.map((obj: any) => {
        if (!array.includes(obj.KetQuaTSNT?.QuyetDinhTSNT?.DoiTuong?.TenDT)) {
          array.push(obj.KetQuaTSNT?.QuyetDinhTSNT?.DoiTuong?.TenDT);
        }
        return false;
      });
      break;
    case "keyValueSame_BiDanh_YC":
      arr.map((obj: any) => {
        if (!array.includes(obj.KetQuaTSNT?.QuyetDinhTSNT?.BiDanh)) {
          array.push(obj.KetQuaTSNT?.QuyetDinhTSNT?.BiDanh);
        }
        return false;
      });
      break;

    default:
      break;
  }
  return array;
};

export const handleMiddleArr = (arr: any[]) => {
  const indexMid: number = Math.ceil(arr.length / 2);
  const arrLeft = arr.slice(0, indexMid);
  const arrRight = arr.slice(indexMid, arr.length);
  return { indexMid, arrLeft, arrRight };
};

export const handleDoiTuongCA = (arr: any[]) => {
  const DTChinh = arr.filter((obj: any) => obj.ViTri === "Đối tượng chính");
  const DTPhu = arr.filter((obj: any) => obj.ViTri === "Đối tượng phụ");
  const DTKhac = arr.filter(
    (obj: any) =>
      obj.ViTri !== "Đối tượng chính" && obj.ViTri !== "Đối tượng phụ"
  );
  return {
    DTChinh,
    DTPhu,
    DTKhac,
  };
};

export const handleBOTCONECT = (
  text: string,
  col_Check: string,
  col_ID: string,
  link: string
) => {
  let result: any = [];

  arr_server.map((obj: any) => {
    let fromIndex: number = 0;
    while (
      text.toLowerCase().indexOf(obj[col_Check].toLowerCase(), fromIndex) !== -1
    ) {
      result.push({
        position: text
          .toLowerCase()
          .indexOf(obj[col_Check].toLowerCase(), fromIndex),
        length: obj[col_Check].length,
        content: {
          connect: obj[col_Check],
          link: `${link}/${obj[col_ID]}`,
        },
      });
      fromIndex =
        text.toLowerCase().indexOf(obj[col_Check].toLowerCase(), fromIndex) +
        obj[col_Check].length;
    }
    return false;
  });
  return result.sort(function (a: any, b: any) {
    let x = a.position;
    let y = b.position;
    if (x > y) {
      return 1;
    }
    if (x < y) {
      return -1;
    }
    return 0;
  });
};
