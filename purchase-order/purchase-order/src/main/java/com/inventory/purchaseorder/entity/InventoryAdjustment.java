package com.inventory.purchaseorder.entity;

import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "inv_adjustment")
public class InventoryAdjustment {

	@Id
	private String adjId;
	private String reason;
	private String status;
	private int supplierId;
	private LocalDate date;

	public InventoryAdjustment() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getAdjId() {
		return adjId;
	}

	public void setAdjId(String adjId) {
		this.adjId = adjId;
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

	public InventoryAdjustment(String adjId, String reason, String status, int supplierId, LocalDate date) {
		super();
		this.adjId = adjId;
		this.reason = reason;
		this.status = status;
		this.supplierId = supplierId;
		this.date = date;
	}

	@Override
	public String toString() {
		return "InventoryAdjustment [adjId=" + adjId + ", reason=" + reason + ", status=" + status + ", supplierId="
				+ supplierId + ", date=" + date + "]";
	}

}
