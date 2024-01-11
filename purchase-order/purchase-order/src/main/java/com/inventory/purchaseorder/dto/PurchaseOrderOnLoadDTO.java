package com.inventory.purchaseorder.dto;

public class PurchaseOrderOnLoadDTO {

	private String poNumber;
	private String status;
	private String supplier;

	public String getPoNumber() {
		return poNumber;
	}

	public void setPoNumber(String poNumber) {
		this.poNumber = poNumber;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public PurchaseOrderOnLoadDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getSupplier() {
		return supplier;
	}

	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}

	public PurchaseOrderOnLoadDTO(String poNumber, String status, String supplier) {
		super();
		this.poNumber = poNumber;
		this.status = status;
		this.supplier = supplier;
	}

}
