package com.inventory.purchaseorder.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "rtv_info")
public class ReturnToVendorInfo {

	@Id
	private int rtvId;
	private int poNumber;
	private int supplierId;
	private String supplierName;

	public ReturnToVendorInfo() {
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

	public ReturnToVendorInfo(int rtvId, int poNumber, int supplierId, String supplierName) {
		super();
		this.rtvId = rtvId;
		this.poNumber = poNumber;
		this.supplierId = supplierId;
		this.supplierName = supplierName;
	}

	@Override
	public String toString() {
		return "ReturnToVendorInfo [rtvId=" + rtvId + ", poNumber=" + poNumber + ", supplierId=" + supplierId
				+ ", supplierName=" + supplierName + "]";
	}

}
