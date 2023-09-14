package com.inventory.purchaseorder.entity;

import java.time.LocalDate;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ASN {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int asnId;
	private int asnNumber;
	private int quantity;
	private LocalDate date;
	private String status;

	public ASN(int asnId, int asnNumber, int quantity, LocalDate date, String status) {
		super();
		this.asnId = asnId;
		this.asnNumber = asnNumber;
		this.quantity = quantity;
		this.date = date;
		this.status = status;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public ASN() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getAsnId() {
		return asnId;
	}

	public void setAsnId(int asnId) {
		this.asnId = asnId;
	}

	public int getAsnNumber() {
		return asnNumber;
	}

	public void setAsnNumber(int asnNumber) {
		this.asnNumber = asnNumber;
	}

}
