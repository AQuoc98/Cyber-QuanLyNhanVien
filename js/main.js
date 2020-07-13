let nhanvien_1 = new NhanVien(
  "1",
  "Nguyễn Văn A",
  "A@gmail.com",
  "123456789",
  "27/07/2017",
  "Nhân viên"
);
let nhanvien_2 = new NhanVien(
  "2",
  "Nguyễn Văn B",
  "B@gmail.com",
  "123456789",
  "27/07/2017",
  "Sếp"
);
let nhanvien_3 = new NhanVien(
  "T176322",
  "Nguyễn Đình Quốc",
  "nguyendinhanhquocnokia@gmail.com",
  "123456789",
  "27/07/2017",
  "Nhân viên"
);

let nhanvien_4 = new NhanVien(
  "T176323",
  "Nguyễn Đình ",
  "nguyendinh@gmail.com",
  "123456789",
  "27/07/2017",
  "Nhân viên"
);

let danhsachnv = new CongTy();

danhsachnv.ThemNhanVienMoi(nhanvien_1);
danhsachnv.ThemNhanVienMoi(nhanvien_2);
danhsachnv.ThemNhanVienMoi(nhanvien_3);

// GỌi Modal

GoiModal = (modal_title, readonly = false, type = 1) => {
  //type = 1 : them nhan vien, type = 2 : sua thong tin nhan vien
  document.getElementById("header-title").innerHTML = modal_title;
  document.getElementById("msnv").readOnly = readonly;

  switch (type) {
    case 1:
      document.getElementById("btnThemNV").style.display = "block";
      document.getElementById("btnCapNhatNV").style.display = "none";
      break;

    case 2:
      document.getElementById("btnThemNV").style.display = "none";
      document.getElementById("btnCapNhatNV").style.display = "block";
      break;
  }
};

// Xóa Form
xoaForm = () => {
  let elements = document.getElementsByClassName("input-sm");
  for (let element of elements) {
    element.value = "";
  }
  document.getElementById("chucvu").selectedIndex = 0;
};

//

let trangHienTai = 1;
HienThiDanhSach = dsnv => {
  let tbody = document.getElementById("tableDanhSach");
  tbody.innerHTML = "";

  let soNV = dsnv.length;
  let nv, tr, td;

  let ulPhanTrang = document.getElementById("ulPhanTrang");
  ulPhanTrang.innerHTML = "";

  let soDong = 2; //Số dòng hiển thị tối đa trong 1 trang
  let soTrang = Math.ceil(soNV / soDong);

  for (let i = 1; i <= soTrang; i++) {
    let li = document.createElement("li");
    ulPhanTrang.appendChild(li);

    let a = document.createElement("a");
    a.setAttribute("class", "page-link");
    a.setAttribute("id", "trang_" + i);
    a.innerHTML = i;
    li.appendChild(a);

    // Chức năng chuyển trang
    ChuyenTrang("trang_" + i);
  }

  let batDau = (trangHienTai - 1) * soDong;
  let ketThuc = trangHienTai * soDong;

  if (soNV < ketThuc) {
    ketThuc = soNV;
  }

  for (let i = batDau; i < ketThuc; i++) {
    nv = dsnv[i];

    tr = document.createElement("tr");
    tbody.appendChild(tr);

    for (let j = 0; j < nv.mangDoiChieu.length; j++) {
      td = document.createElement("td");
      td.innerHTML = nv.mangDoiChieu[j];
      tr.appendChild(td);
    }

    let btnSua = `<a class="btn btn-primary text-white" data-toggle="modal" href="#myModal" id="sua_${
      nv.maNV
    }" ><em class="fa fa-pencil"></em></a>`; // Tạo nút sửa

    let btnXoa = `<a class="btn btn-danger text-white ml-2" id="xoa_${
      nv.maNV
    }" ><em class="fa fa-trash"></em></a>`; // Tạo nút xóa

    td = document.createElement("td");
    td.innerHTML = btnSua + btnXoa;
    td.setAttribute("align", "center");
    tr.appendChild(td);

    // Tạo sự kiện cho btnSua và btnXoa
    SuaNhanVien("sua_" + nv.maNV);
    XoaNhanVien("xoa_" + nv.maNV);
  }
};

// Thêm Nhân Viên

document.getElementById("btnThem").addEventListener("click", () => {
  xoaForm();
  GoiModal("Thêm Người Dùng");
});

document.getElementById("btnThemNV").addEventListener("click", () => {
  let maNV = document.getElementById("msnv").value;
  let hoTen = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let matKhau = document.getElementById("password").value;
  let ngayLam = document.getElementById("datepicker").value;
  let chucVu = document.getElementById("chucvu").value;

  let nhanvienmoi = new NhanVien(maNV, hoTen, email, matKhau, ngayLam, chucVu);
  danhsachnv.ThemNhanVienMoi(nhanvienmoi);

  swal("Thêm thành công", "Danh sách nhân viên đã được cập nhật", "success");

  HienThiDanhSach(danhsachnv.DanhSachNhanVien);
});

// Sửa Nhân Viên
SuaNhanVien = idButton => {
  document.getElementById(idButton).addEventListener("click", () => {
    let id = idButton;
    let mangTam = id.split("_");
    let maNV = mangTam[1];

    let nhanvien = danhsachnv.TimNhanVien(maNV);

    document.getElementById("msnv").value = maNV;
    document.getElementById("name").value = nhanvien.hoTen;
    document.getElementById("email").value = nhanvien.email;
    document.getElementById("password").value = nhanvien.matKhau;
    document.getElementById("datepicker").value = nhanvien.ngayLam;
    document.getElementById("chucvu").value = nhanvien.chucVu;

    GoiModal("Cập nhật thông tin", true, 2);
  });
};

document.getElementById("btnCapNhatNV").addEventListener("click", () => {
  let maNV = document.getElementById("msnv").value;
  let hoTen = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let matKhau = document.getElementById("password").value;
  let ngayLam = document.getElementById("datepicker").value;
  let chucVu = document.getElementById("chucvu").value;

  let nhanvienmoi = new NhanVien(maNV, hoTen, email, matKhau, ngayLam, chucVu);
  danhsachnv.SuaNhanVien(nhanvienmoi);

  swal(
    "Cập nhật thành công",
    "Danh sách nhân viên đã được cập nhật",
    "success"
  );

  HienThiDanhSach(danhsachnv.DanhSachNhanVien);
});

//Xóa Nhân Viên

XoaNhanVien = idButton => {
  document.getElementById(idButton).addEventListener("click", () => {
    swal({
      title: "Bạn có chắc muốn xóa",
      text: "Một khi đã xóa thì không khôi phục lại được",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        let id = idButton;
        let mangTam = id.split("_");
        let maNV = mangTam[1];
        
        danhsachnv.XoaNhanVien(maNV);
        HienThiDanhSach(danhsachnv.DanhSachNhanVien);
        swal("Đã xóa thành công", {
          icon: "success"
        });
      } else {
        swal("Data của bạn vẫn an toàn");
      }
    });
  });
};

// Tìm nhân viên theo tên
document.getElementById("searchName").addEventListener("keyup", () => {
  let tukhoa = document.getElementById("searchName").value;
  let dskq = danhsachnv.TimNhanVienTheoTen(tukhoa);
  HienThiDanhSach(dskq.DanhSachNhanVien);
});

// Sắp xếp nhân viên
document.getElementById("SapXepTang").addEventListener("click", () => {
  document.getElementById("SapXepTang").style.display = "none";
  document.getElementById("SapXepGiam").style.display = "inline";
  danhsachnv.SapXepNhanVien(1);
  HienThiDanhSach(danhsachnv.DanhSachNhanVien);
});

document.getElementById("SapXepGiam").addEventListener("click", () => {
  document.getElementById("SapXepTang").style.display = "inline";
  document.getElementById("SapXepGiam").style.display = "none";
  danhsachnv.SapXepNhanVien(-1);
  HienThiDanhSach(danhsachnv.DanhSachNhanVien);
});

// Chuyển trang
ChuyenTrang = idButton => {
  document.getElementById(idButton).addEventListener("click", () => {
    let id = idButton;
    let mangTam = id.split("_");
    trangHienTai = mangTam[1];
    HienThiDanhSach(danhsachnv.DanhSachNhanVien);
  });
};

HienThiDanhSach(danhsachnv.DanhSachNhanVien);
