package com.inventory.purchaseorder.dto;

import java.time.LocalDate;
import java.util.List;

import com.inventory.purchaseorder.entity.PurchaseOrder;

public class ASNOnLoadDto {

	private int asnNumber;
	private int quantity;
	private LocalDate creationDate;
	private String status;

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
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

	public int getAsnNumber() {
		return asnNumber;
	}

	public void setAsnNumber(int asnNumber) {
		this.asnNumber = asnNumber;
	}

	public ASNOnLoadDto(int asnNumber, int quantity, LocalDate creationDate, String status) {
		super();
		this.asnNumber = asnNumber;
		this.quantity = quantity;
		this.creationDate = creationDate;
		this.status = status;
	}

	public ASNOnLoadDto() {
		super();
		// TODO Auto-generated constructor stub
	}
}
