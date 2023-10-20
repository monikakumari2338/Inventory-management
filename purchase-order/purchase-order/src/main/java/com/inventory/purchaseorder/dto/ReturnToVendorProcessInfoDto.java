package com.inventory.purchaseorder.dto;

public class ReturnToVendorProcessInfoDto {

	private int rtvId;
	private int poNumber;
	private int supplierId;
	private String supplierName;
	private String status;
	private String reason;

	public ReturnToVendorProcessInfoDto() {
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public ReturnToVendorProcessInfoDto(int rtvId, int poNumber, int supplierId, String supplierName, String status,
			String reason) {
		super();
		this.rtvId = rtvId;
		this.poNumber = poNumber;
		this.supplierId = supplierId;
		this.supplierName = supplierName;
		this.status = status;
		this.reason = reason;
	}

	@Override
	public String toString() {
		return "ReturnToVendorProcessInfo [rtvId=" + rtvId + ", poNumber=" + poNumber + ", supplierId=" + supplierId
				+ ", supplierName=" + supplierName + ", status=" + status + ", reason=" + reason + "]";
	}

}
