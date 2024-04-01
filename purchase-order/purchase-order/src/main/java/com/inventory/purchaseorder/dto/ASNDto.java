package com.inventory.purchaseorder.dto;

import java.time.LocalDate;
import java.util.List;

import com.inventory.purchaseorder.entity.PurchaseOrder;

public class ASNDto {

	private int quantity;
	private LocalDate creationDate;
	private String status;
	private List<Integer> PoNumber;
	// private String attachedImage;

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

	public List<Integer> getPoNumber() {
		return PoNumber;
	}

	public void setPoNumber(List<Integer> poNumber) {
		PoNumber = poNumber;
	}

	public ASNDto(int quantity, LocalDate creationDate, String status, List<Integer> poNumber) {
		super();
		this.quantity = quantity;
		this.creationDate = creationDate;
		this.status = status;
		PoNumber = poNumber;
	}

	public ASNDto() {
		super();
		// TODO Auto-generated constructor stub
	}
}
