class CongTy {
  constructor() {
    this.DanhSachNhanVien = new Array();
  }

  ThemNhanVienMoi(nhanvienmoi) {
    this.DanhSachNhanVien = [...this.DanhSachNhanVien, nhanvienmoi];
  }

  //Tìm vị trí của nhân viên qua mã nhân viên
  TimViTriNV(manv) {
    for (let vitri in this.DanhSachNhanVien) {
      if (this.DanhSachNhanVien[vitri].maNV === manv) return vitri;
    }
  }

  //Tìm thông tin của nhân viên theo mã nhân viên
  TimNhanVien(manv) {
    for (let nhanvien of this.DanhSachNhanVien) {
      if (nhanvien.maNV === manv) return nhanvien;
    }
  }

  TimNhanVienTheoTen(hoten) {
    let dskq = new CongTy();
    hoten = hoten.trim().toUpperCase();

    for (let nhanvien of this.DanhSachNhanVien) {
      let hotenNV = nhanvien.hoTen.trim().toUpperCase();

      if (hotenNV.search(hoten) !== -1) {
        dskq.DanhSachNhanVien = [...dskq.DanhSachNhanVien, nhanvien];
      }
    }

    return dskq;
  }

  XoaNhanVien(manv) {
    let vitri = this.TimViTriNV(manv);
    console.log(vitri);
    this.DanhSachNhanVien.splice(vitri, 1);
  }

  // Nhập vào nhân viên cần sửa > sửa thông tin nhân viên
  SuaNhanVien(nhanvien) {
    let vitri = this.TimViTriNV(nhanvien.maNV);
    this.DanhSachNhanVien[vitri] = nhanvien;
  }

  // Sắp xếp nhân viên theo mã nhân viên tăng dần + giảm dần
  SapXepNhanVien(type) {
    //type = 1 > tăng dần ; type = -1 > giảm dần
    if (type === 1) {
      this.DanhSachNhanVien.sort((a, b) => {
        let x = a.maNV.toLowerCase();
        let y = b.maNV.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
    } else {
      this.DanhSachNhanVien.sort((a, b) => {
        let x = a.maNV.toLowerCase();
        let y = b.maNV.toLowerCase();
        if (x > y) {
          return -1;
        }
        if (x < y) {
          return 1;
        }
        return 0;
      });
    }
  }
}
