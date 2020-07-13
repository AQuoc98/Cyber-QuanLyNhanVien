class NhanVien {
  constructor(maNV, hoTen, email, matKhau, ngayLam, chucVu) {
    this.maNV = maNV;
    this.hoTen = hoTen;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.chucVu = chucVu;

    this.mangDoiChieu = [
      this.maNV,
      this.hoTen,
      this.email,
      this.ngayLam,
      this.chucVu
    ];
  }
}
