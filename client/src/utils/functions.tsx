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

export const Filter_File = (type: string | undefined, array: any) => {
  if (type === "anqg") {
    return array?.filter(
      (obj: any) =>
        obj.DoiTuong?.TinhChatDT?.TinhChat === "Gián điệp" ||
        obj.DoiTuong?.TinhChatDT?.TinhChat === "Tình báo"
    );
  } else {
    return array?.filter(
      (obj: any) =>
        obj.DoiTuong?.TinhChatDT?.TinhChat !== "Gián điệp" &&
        obj.DoiTuong?.TinhChatDT?.TinhChat !== "Tình báo"
    );
  }
};

export const handleSearch = (type: string, array: any, keysearch: string) => {
  let arr: any = [];
  switch (type) {
    case "Files":
      arr = array.filter((obj: any) =>
        obj.QuyetDinhTSNT?.BiDanh?.toLowerCase().includes(keysearch)
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
    case "ChuyenAns":
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
          obj.HinhThucHD?.HinhThuc?.toLowerCase().includes(keysearch) ||
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
    case "QuyetDinhTSNTs":
      arr = array.filter(
        (obj: any) =>
          obj.So.toLowerCase().includes(keysearch) ||
          obj.DeNghiTSNT?.So.toLowerCase().includes(keysearch) ||
          obj.DeNghiTSNT?.DoiTuong?.TenDT.toLowerCase().includes(keysearch) ||
          obj.BiDanh?.toLowerCase().includes(keysearch) ||
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
    case "KeHoachTSNTs":
      arr = array.filter(
        (obj: any) =>
          obj.So.toLowerCase().includes(keysearch) ||
          obj.QuyetDinhTSNT?.So.toLowerCase().includes(keysearch) ||
          obj.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong?.TenDT.toLowerCase().includes(
            keysearch
          ) ||
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
    case "BaoCaoPHQHs":
      arr = array.filter(
        (obj: any) =>
          obj.DiaDiemPH?.toLowerCase().includes(keysearch) ||
          obj.BiDanh?.toLowerCase().includes(keysearch) ||
          obj.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong?.TenDT.toLowerCase().includes(
            keysearch
          ) ||
          obj.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.BiDanh.toLowerCase().includes(
            keysearch
          ) ||
          obj.TSThucHiens?.filter((cbcs: any) =>
            cbcs.HoTen?.toLowerCase().includes(keysearch)
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
    case "BaoCaoKQGHs":
      arr = array.filter(
        (obj: any) =>
          obj.DiaDiem?.toLowerCase().includes(keysearch) ||
          obj.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong?.TenDT.toLowerCase().includes(
            keysearch
          ) ||
          obj.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.BiDanh.toLowerCase().includes(
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
          moment(obj.NgaySinh)
            .year()
            .toString()
            .toLowerCase()
            .includes(keysearch)
      );
      break;
    case "DauMoiPH_DNs":
      arr = array.filter(
        (obj: any) =>
          obj.DeNghiTSNT?.So?.toLowerCase().includes(keysearch) ||
          obj.LDDonViDN?.HoTen?.toLowerCase().includes(keysearch) ||
          obj.CBTrucTiepPH?.HoTen?.toLowerCase().includes(keysearch)
      );
      break;
    case "KyDuyet_DNs":
      arr = array.filter(
        (obj: any) =>
          obj.DeNghiTSNT?.So?.toLowerCase().includes(keysearch) ||
          obj.DaiDienCATTPvaTD?.HoTen?.toLowerCase().includes(keysearch) ||
          obj.DaiDienDonViDN?.HoTen?.toLowerCase().includes(keysearch) ||
          obj.DaiDienDonViTSNT?.HoTen?.toLowerCase().includes(keysearch)
      );
      break;
    case "LucLuongThamGiaKHs":
      arr = array.filter(
        (obj: any) =>
          obj.KeHoachTSNT?.So?.toLowerCase().includes(keysearch) ||
          obj.CBCS?.HoTen?.toLowerCase().includes(keysearch) ||
          obj.ViTri?.toLowerCase().includes(keysearch)
      );
      break;
    case "TramCTs":
      arr = array.filter(
        (obj: any) =>
          obj.DiaDiem?.toLowerCase().includes(keysearch) ||
          obj.TSXayDung?.HoTen?.toLowerCase().includes(keysearch) ||
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
    case "BienBanRKNs":
      arr = array.filter(
        (obj: any) =>
          obj.ChuToa?.HoTen?.toLowerCase().includes(keysearch) ||
          obj.ThuKy?.HoTen?.toLowerCase().includes(keysearch) ||
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
    case "BaoCaoKQXMQuanHes":
      arr = array.filter(
        (obj: any) =>
          obj.HoTen?.toLowerCase().includes(keysearch) ||
          obj.BaoCaoPHQH?.BiDanh?.toLowerCase().includes(keysearch) ||
          obj.BaoCaoPHQH?.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.BiDanh?.toLowerCase().includes(
            keysearch
          ) ||
          obj.BaoCaoPHQH?.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong?.TenDT?.toLowerCase().includes(
            keysearch
          ) ||
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
    case "BaoCaoKQXMDiaChis":
      arr = array.filter(
        (obj: any) =>
          obj.HoTenChuHo?.toLowerCase().includes(keysearch) ||
          obj.BaoCaoPHDC?.DiaChi?.toLowerCase().includes(keysearch) ||
          obj.BaoCaoPHDC?.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.BiDanh?.toLowerCase().includes(
            keysearch
          ) ||
          obj.BaoCaoPHDC?.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong?.TenDT?.toLowerCase().includes(
            keysearch
          ) ||
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
    case "BaoCaoKTDNs":
      arr = array.filter(
        (obj: any) =>
          obj.TinhHinhDT?.toLowerCase().includes(keysearch) ||
          obj.VanDeRKN?.toLowerCase().includes(keysearch) ||
          obj.KetQuaTSNT?.KeHoachTSNT?.So?.toLowerCase().includes(keysearch) ||
          obj.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.BiDanh?.toLowerCase().includes(
            keysearch
          ) ||
          obj.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong?.TenDT?.toLowerCase().includes(
            keysearch
          ) ||
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
    case "KetQuaTSNTs":
      arr = array.filter(
        (obj: any) =>
          obj.DDNB?.toLowerCase().includes(keysearch) ||
          obj.KeHoachTSNT?.So?.toLowerCase().includes(keysearch)
      );
      break;
    case "KetQuaXMQuanHes":
      arr = array.filter(
        (obj: any) =>
          obj.So?.toLowerCase().includes(keysearch) ||
          obj.BaoCaoPHQH?.BiDanh?.toLowerCase().includes(keysearch) ||
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
    case "BaoCaoPHPTs":
      arr = array.filter(
        (obj: any) =>
          obj.BKS?.toLowerCase().includes(keysearch) ||
          obj.DiaDiemPH?.toLowerCase().includes(keysearch) ||
          obj.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.BiDanh?.toLowerCase().includes(
            keysearch
          ) ||
          obj.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong?.TenDT?.toLowerCase().includes(
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
    case "BaoCaoPHDCs":
      arr = array.filter(
        (obj: any) =>
          obj.DiaChi?.toLowerCase().includes(keysearch) ||
          obj.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.BiDanh?.toLowerCase().includes(
            keysearch
          ) ||
          obj.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong?.TenDT?.toLowerCase().includes(
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
    case "DanhGiaTSTHs":
      arr = array.filter(
        (obj: any) =>
          obj.CBCS?.HoTen.toLowerCase().includes(keysearch) ||
          obj.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.BiDanh?.toLowerCase().includes(
            keysearch
          ) ||
          obj.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong?.TenDT?.toLowerCase().includes(
            keysearch
          )
      );
      break;
    case "ChuyenAns":
      arr = array.filter(
        (obj: any) =>
          obj.BiSo?.toLowerCase().includes(keysearch) ||
          obj.TenCA?.toLowerCase().includes(keysearch) ||
          obj.TinhChatDT?.TinhChat?.toLowerCase().includes(keysearch) ||
          moment(obj.ThoiGianBD)
            .date()
            .toString()
            .toLowerCase()
            .includes(keysearch) ||
          (moment(obj.ThoiGianBD).month() + 1)
            .toString()
            .toLowerCase()
            .includes(keysearch) ||
          moment(obj.ThoiGianBD)
            .year()
            .toString()
            .toLowerCase()
            .includes(keysearch)
      );
      break;
    case "DoiTuongCAs":
      arr = array.filter(
        (obj: any) =>
          obj.BiSo?.toLowerCase().includes(keysearch) ||
          obj.ViTri?.toLowerCase().includes(keysearch) ||
          obj.ChuyenAn?.BiSo?.toLowerCase().includes(keysearch) ||
          obj.DoiTuong?.TenDT?.toLowerCase().includes(keysearch)
      );
      break;
    case "ThanhVienBCAs":
      arr = array.filter(
        (obj: any) =>
          obj.BiDanh?.toLowerCase().includes(keysearch) ||
          obj.ViTri?.toLowerCase().includes(keysearch) ||
          obj.ChuyenAn?.BiSo?.toLowerCase().includes(keysearch) ||
          obj.CBCS?.HoTen?.toLowerCase().includes(keysearch)
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

export const handleValueSame_One = (array: any) => {
  let result: any = [];
  array.map((item: any) => {
    if (!result.includes(item)) {
      result.push(item);
    }
  });
  return result.filter((obj: any) => obj !== null);
};
export const handleValueSame_Two = (arrParent: any, property: string) => {
  let result: any = [];
  arrParent?.map((arr: any) =>
    arr?.map((obj: any) => {
      if (!result.includes(obj[property])) {
        result.push(obj[property]);
      }
    })
  );
  return result.filter((obj: any) => obj !== null);
};
export const handleValueSame = (key: string, arr: any[]) => {
  let array: any = [];
  let checkKeyValueSame: string | null = keyValueSame_TenDT.includes(key)
    ? "keyValueSame_TenDT"
    : "keyValueSame_BiDanh_YC";

  switch (checkKeyValueSame) {
    case "keyValueSame_TenDT":
      arr.map((obj: any) => {
        if (
          !array.includes(
            obj.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong
              ?.TenDT
          )
        ) {
          array.push(
            obj.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.DeNghiTSNT?.DoiTuong
              ?.TenDT
          );
        }
        return false;
      });
      break;
    default:
      arr.map((obj: any) => {
        if (
          !array.includes(obj.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.BiDanh)
        ) {
          array.push(obj.KetQuaTSNT?.KeHoachTSNT?.QuyetDinhTSNT?.BiDanh);
        }
        return false;
      });
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
export const handleAuthorization = (role: string, arrayPermis: string[]) => {
  return arrayPermis.includes(role);
};
export const roleGroup = (key: string): String[] => {
  let result: any;
  switch (key) {
    case "insert":
      result = ["PTP_4", "BCH_4", "CBCS_4"];
      break;
    case "update":
      result = ["PTP_4", "BCH_4", "CBCS_4"];
      break;
    case "delete":
      result = ["PTP_4", "BCH_4", "CBCS_4"];
      break;
    default:
      result = ["TP", "PTP", "PTP_4", "BCH", "BCH_4", "CBCS", "CBCS_4"];
      break;
  }
  return result;
};
