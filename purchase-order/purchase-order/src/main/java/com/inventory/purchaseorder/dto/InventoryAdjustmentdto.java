package com.inventory.purchaseorder.dto;

import java.time.LocalDate;

public class InventoryAdjustmentdto {

	private String reason;
	private String status;
	private int supplierId;
	private LocalDate date;

	public InventoryAdjustmentdto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(int supplierId) {
		this.supplierId = supplierId;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public InventoryAdjustmentdto(String reason, String status, int supplierId, LocalDate date) {
		super();

		this.reason = reason;
		this.status = status;
		this.supplierId = supplierId;
		this.date = date;
	}

	@Override
	public String toString() {
		return "InventoryAdjustment [reason=" + reason + ", status=" + status + ", supplierId=" + supplierId + ", date="
				+ date + "]";
	}

}
