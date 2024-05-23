package com.inventory.purchaseorder.dto;

import java.time.LocalDate;

public class ReturnToVendorInfodto {

	private int totalSKU;
	private int supplierId;
	private LocalDate creationDate;
	private String status;
	private String defaultReasonCode;
	private int storeId;
	private String createdBy;
	private LocalDate dispatchedDate;
	private String dispatchedUser;

	public ReturnToVendorInfodto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getTotalSKU() {
		return totalSKU;
	}

	public void setTotalSKU(int totalSKU) {
		this.totalSKU = totalSKU;
	}

	public int getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(int supplierId) {
		this.supplierId = supplierId;
	}

	public LocalDate getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(LocalDate creationDate) {
		this.creationDate = creationDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDefaultReasonCode() {
		return defaultReasonCode;
	}

	public void setDefaultReasonCode(String defaultReasonCode) {
		this.defaultReasonCode = defaultReasonCode;
	}

	public int getStoreId() {
		return storeId;
	}

	public void setStoreId(int storeId) {
		this.storeId = storeId;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public LocalDate getDispatchedDate() {
		return dispatchedDate;
	}

	public void setDispatchedDate(LocalDate dispatchedDate) {
		this.dispatchedDate = dispatchedDate;
	}

	public String getDispatchedUser() {
		return dispatchedUser;
	}

	public void setDispatchedUser(String dispatchedUser) {
		this.dispatchedUser = dispatchedUser;
	}

	public ReturnToVendorInfodto(int totalSKU, int supplierId, LocalDate creationDate, String status,
			String defaultReasonCode, int storeId, String createdBy, LocalDate dispatchedDate, String dispatchedUser) {
		super();
		this.totalSKU = totalSKU;
		this.supplierId = supplierId;
		this.creationDate = creationDate;
		this.status = status;
		this.defaultReasonCode = defaultReasonCode;
		this.storeId = storeId;
		this.createdBy = createdBy;
		this.dispatchedDate = dispatchedDate;
		this.dispatchedUser = dispatchedUser;
	}

}
