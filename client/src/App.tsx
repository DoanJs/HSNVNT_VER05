import { Route, Routes } from "react-router-dom";
import {
  CBCSItem,
  CBCSList,
  CrimeItem,
  CrimeList,
  DecisionList,
  File,
  FileList,
  Home,
  InputBienPhapDT,
  InputBienPhapDTDoiTuong,
  InputCapbac,
  InputCapCA,
  InputCAQHvaTD,
  InputCATTPvaTD,
  InputCBCS,
  InputChucVu,
  InputDanToc,
  InputDauMoiPHDN,
  InputDDNB,
  InputDeNghiTSNT,
  InputDeNghiTSNTTinhTP,
  InputDoi,
  InputDoiTuong,
  InputHinhThucHD,
  InputKeHoachTSNT,
  InputKyDuyetDN,
  InputList,
  InputLLDB,
  InputLoaiDT,
  InputLoaiLLDB,
  InputQuocTich,
  InputQuyetDinhTSNT,
  InputQuyetDinhTSNTTinhTP,
  InputTinhChatDT,
  InputTinhTP,
  InputTonGiao,
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
          <Route path="/phuongtiennv" element={<VehicleList />} />
          <Route path="/phuongtiennv/:id" element={<VehicleDetail />} />
          <Route path="/diachinv" element={<PlaceList />} />
          <Route path="/diachinv/:id" element={<PlaceDetail />} />
          <Route path="/taikhoan/:id" element={<Profile />} />
          <Route path="/nhaplieu" element={<InputList />} />
          <Route path="/nhaplieu/conganttpvatd" element={<InputCATTPvaTD />} />
          <Route path="/nhaplieu/conganqhvatd" element={<InputCAQHvaTD />} />
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
          <Route path="/nhaplieu/ddnb" element={<InputDDNB />} />
          <Route path="/nhaplieu/doi" element={<InputDoi />} />
          <Route path="/nhaplieu/cbcs" element={<InputCBCS />} />
          <Route path="/nhaplieu/doituong" element={<InputDoiTuong />} />
          <Route path="/nhaplieu/bienphapdtdt" element={<InputBienPhapDTDoiTuong />} />
          <Route path="/nhaplieu/denghitsnt" element={<InputDeNghiTSNT />} />
          <Route path="/nhaplieu/denghitsnttinhtp" element={<InputDeNghiTSNTTinhTP />} />
          <Route path="/nhaplieu/daumoiphdn" element={<InputDauMoiPHDN />} />
          <Route path="/nhaplieu/kyduyetdn" element={<InputKyDuyetDN />} />
          <Route path="/nhaplieu/quyetdinhtsnt" element={<InputQuyetDinhTSNT />} />
          <Route path="/nhaplieu/quyetdinhtsnttinhtp" element={<InputQuyetDinhTSNTTinhTP />} />
          <Route path="/nhaplieu/kehoachtsnt" element={<InputKeHoachTSNT />} />










          <Route path="/nhaplieu/capbac" element={<InputCapbac />} />
          <Route
            path="/nhaplieu/chuyenan"
            element={<p>nhap lieu/chuyen an</p>}
          />
          <Route path="/chuyenan/:id/edit" element={<h1>edit chuyen an</h1>} />
        </Routes>
      </div>
    </div>
  );
}
