import { Route, Routes } from "react-router-dom";
import {
  CBCSItem,
  CBCSList,
  CrimeItem,
  CrimeList,
  DecisionList,
  File,
  FileList,
  General,
  Home,
  InputBaoCaoKQGH,
  InputBaoCaoKQGHCBCS,
  InputBaoCaoKQXMDiaChi,
  InputBaoCaoKQXMQuanHe,
  InputBaoCaoKTDN,
  InputBaoCaoPHDC,
  InputBaoCaoPHDCCBCS,
  InputBaoCaoPHPT,
  InputBaoCaoPHPTCBCS,
  InputBaoCaoPHQH,
  InputBaoCaoPHQHCBCS,
  InputBienBanRKN,
  InputBienBanRKNCBCS,
  InputBienPhapDT,
  InputBienPhapDTDoiTuong,
  InputCapbac,
  InputCapCA,
  InputCAQHvaTD,
  InputCATTPvaTD,
  InputCBCS,
  InputChucVu,
  InputChuyenAn,
  InputDanhGiaTSTH,
  InputDanToc,
  InputDauMoiPHDN,
  InputDeNghiTSNT,
  InputDeNghiTSNTTinhTP,
  InputDoi,
  InputDoiTuong,
  InputDoiTuongCA,
  InputHinhThucHD,
  InputKeHoachTSNT,
  InputKeHoachTSNTLLDB,
  InputKetQuaTSNT,
  InputKetQuaTSNTTinhTP,
  InputKetQuaXMDiaChi,
  InputKetQuaXMQuanHe,
  InputKyDuyetDN,
  InputList,
  InputLLDB,
  InputLoaiDT,
  InputLoaiLLDB,
  InputLucLuongThamGiaKH,
  InputQuocTich,
  InputQuyetDinhTSNT,
  InputQuyetDinhTSNTTinhTP,
  InputTinhChatDT,
  InputTinhTP,
  InputTonGiao,
  InputTramCT,
  Login,
  Navbar,
  PlaceDetail,
  PlaceList,
  Profile,
  ProjectItem,
  ProjectList,
  RecordDetail,
  RecordList,
  Register,
  RelationDetail,
  RelationList,
  SuggestList,
  VehicleDetail,
  VehicleList,
} from "./Component";

export default function App() {
  return (
    <div>
      <Navbar />
      <div style={{ margin: "70px 30px 20px 30px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dangnhap" element={<Login />} />
          <Route path="/dangky" element={<Register />} />
          <Route path="/hoso" element={<File />} />
          <Route path="/hoso/:category" element={<FileList />} />
          <Route path="/doituong" element={<CrimeList />} />
          <Route path="/doituong/:id" element={<CrimeItem />} />

          <Route path="/chuyenan" element={<ProjectList />} />
          <Route path="/chuyenan/:id" element={<ProjectItem />} />
          <Route path="/cbcs" element={<CBCSList />} />
          <Route path="/cbcs/:id" element={<CBCSItem />} />
          <Route path="/denghitsnt" element={<SuggestList />} />
          <Route
            path="/denghitsnt/:id"
            element={<p>De nghi trinh sat/:id</p>}
          />
          <Route path="/quyetdinhtsnt" element={<DecisionList />} />
          <Route
            path="/quyetdinhtsnt/:id"
            element={<p>quyet dinh tsnt/:id</p>}
          />
          <Route path="/baocaophqh" element={<RelationList />} />
          <Route path="/baocaophqh/:id" element={<RelationDetail />} />
          <Route path="/baocaokqgh" element={<RecordList />} />
          <Route path="/baocaokqgh/:id" element={<RecordDetail />} />
          <Route path="/baocaophpt" element={<VehicleList />} />
          <Route path="/baocaophpt/:id" element={<VehicleDetail />} />
          <Route path="/baocaophdc" element={<PlaceList />} />
          <Route path="/baocaophdc/:id" element={<PlaceDetail />} /> 
          <Route path="/taikhoan/:id" element={<Profile />} />

          <Route path="/chuyenan/:id/edit" element={<h1>edit chuyen an</h1>} />
          <Route path="/thongke" element={<General />} />

          {/* nhaplieu */}
          <Route path="/nhaplieu" element={<InputList />} />
          <Route path="/nhaplieu/conganttpvatd" element={<InputCATTPvaTD />} />
          <Route path="/nhaplieu/conganqhvatd" element={<InputCAQHvaTD />} />
          <Route path="/nhaplieu/capbac" element={<InputCapbac />} />
          <Route path="/nhaplieu/chucvu" element={<InputChucVu />} />
          <Route path="/nhaplieu/bienphapdt" element={<InputBienPhapDT />} />
          <Route path="/nhaplieu/capca" element={<InputCapCA />} />
          <Route path="/nhaplieu/dantoc" element={<InputDanToc />} />
          <Route path="/nhaplieu/hinhthuchd" element={<InputHinhThucHD />} />
          <Route path="/nhaplieu/loailldb" element={<InputLoaiLLDB />} />
          <Route path="/nhaplieu/loaidt" element={<InputLoaiDT />} />
          <Route path="/nhaplieu/lldb" element={<InputLLDB />} />
          <Route path="/nhaplieu/quoctich" element={<InputQuocTich />} />
          <Route path="/nhaplieu/tinhchatdt" element={<InputTinhChatDT />} />
          <Route path="/nhaplieu/tongiao" element={<InputTonGiao />} />
          <Route path="/nhaplieu/tinhTP" element={<InputTinhTP />} />
          <Route path="/nhaplieu/doi" element={<InputDoi />} />
          <Route path="/nhaplieu/cbcs" element={<InputCBCS />} />
          <Route path="/nhaplieu/doituong" element={<InputDoiTuong />} />
          <Route
            path="/nhaplieu/bienphapdtdt"
            element={<InputBienPhapDTDoiTuong />}
          />
          <Route path="/nhaplieu/denghitsnt" element={<InputDeNghiTSNT />} />
          <Route
            path="/nhaplieu/denghitsnttinhtp"
            element={<InputDeNghiTSNTTinhTP />}
          />
          <Route path="/nhaplieu/daumoiphdn" element={<InputDauMoiPHDN />} />
          <Route path="/nhaplieu/kyduyetdn" element={<InputKyDuyetDN />} />
          <Route
            path="/nhaplieu/quyetdinhtsnt"
            element={<InputQuyetDinhTSNT />}
          />
          <Route
            path="/nhaplieu/quyetdinhtsnttinhtp"
            element={<InputQuyetDinhTSNTTinhTP />}
          />
          <Route path="/nhaplieu/kehoachtsnt" element={<InputKeHoachTSNT />} />
          <Route
            path="/nhaplieu/kehoachtsntlldb"
            element={<InputKeHoachTSNTLLDB />}
          />
          <Route
            path="/nhaplieu/lucluongthamgiakh"
            element={<InputLucLuongThamGiaKH />}
          />
          <Route path="/nhaplieu/tramct" element={<InputTramCT />} />
          <Route path="/nhaplieu/bienbanrkn" element={<InputBienBanRKN />} />
          <Route
            path="/nhaplieu/bienbanrkncbcs"
            element={<InputBienBanRKNCBCS />}
          />
          <Route path="/nhaplieu/baocaokqgh" element={<InputBaoCaoKQGH />} />
          <Route
            path="/nhaplieu/baocaokqghcbcs"
            element={<InputBaoCaoKQGHCBCS />}
          />
          <Route
            path="/nhaplieu/baocaokqxmquanhe"
            element={<InputBaoCaoKQXMQuanHe />}
          />
          <Route
            path="/nhaplieu/baocaokqxmdiachi"
            element={<InputBaoCaoKQXMDiaChi />}
          />
          <Route path="/nhaplieu/baocaoktdn" element={<InputBaoCaoKTDN />} />
          <Route path="/nhaplieu/baocaophqh" element={<InputBaoCaoPHQH />} />
          <Route
            path="/nhaplieu/baocaophqhcbcs"
            element={<InputBaoCaoPHQHCBCS />}
          />
          <Route path="/nhaplieu/ketquatsnt" element={<InputKetQuaTSNT />} />
          <Route
            path="/nhaplieu/ketquatsnttinhtp"
            element={<InputKetQuaTSNTTinhTP />}
          />
          <Route
            path="/nhaplieu/ketquaxmquanhe"
            element={<InputKetQuaXMQuanHe />}
          />
          <Route
            path="/nhaplieu/ketquaxmdiachi"
            element={<InputKetQuaXMDiaChi />}
          />
          <Route path="/nhaplieu/baocaophpt" element={<InputBaoCaoPHPT />} />
          <Route path="/nhaplieu/baocaophptcbcs" element={<InputBaoCaoPHPTCBCS />} />
          <Route path="/nhaplieu/danhgiatsth" element={<InputDanhGiaTSTH />} />
          <Route path="/nhaplieu/baocaophdc" element={<InputBaoCaoPHDC />} />
          <Route
            path="/nhaplieu/baocaophdccbcs"
            element={<InputBaoCaoPHDCCBCS />}
          />
          <Route path="/nhaplieu/chuyenan" element={<InputChuyenAn />} />
          <Route path="/nhaplieu/doituongca" element={<InputDoiTuongCA />} />
        </Routes>
      </div>
    </div>
  );
}
