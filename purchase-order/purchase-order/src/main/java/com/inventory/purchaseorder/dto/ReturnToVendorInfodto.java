package com.inventory.purchaseorder.dto;

import java.time.LocalDate;
import java.util.Date;

public class ReturnToVendorInfodto {

	private int rtvId;
	private int poNumber;
	private int supplierId;
	private String supplierName;
	private LocalDate date;

	public ReturnToVendorInfodto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getRtvId() {
		return rtvId;
	}

	public void setRtvId(int rtvId) {
		this.rtvId = rtvId;
	}

	public int getPoNumber() {
		return poNumber;
	}

	public void setPoNumber(int poNumber) {
		this.poNumber = poNumber;
	}

	public int getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(int supplierId) {
		this.supplierId = supplierId;
	}

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public ReturnToVendorInfodto(int rtvId, int poNumber, int supplierId, String supplierName, LocalDate date) {
		super();
		this.rtvId = rtvId;
		this.poNumber = poNumber;
		this.supplierId = supplierId;
		this.supplierName = supplierName;
		this.date = date;
	}

	@Override
	public String toString() {
		return "ReturnToVendorInfodto [rtvId=" + rtvId + ", poNumber=" + poNumber + ", supplierId=" + supplierId
				+ ", supplierName=" + supplierName + ", date=" + date + "]";
	}

}
