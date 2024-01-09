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
	private String asnNumber;
	private int quantity;
	private LocalDate date;
	private String status;

	public int getAsnId() {
		return asnId;
	}

	public void setAsnId(int asnId) {
		this.asnId = asnId;
	}

	public String getAsnNumber() {
		return asnNumber;
	}

	public void setAsnNumber(String asnNumber) {
		this.asnNumber = asnNumber;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public ASN(int asnId, String asnNumber, int quantity, LocalDate date, String status) {
		super();
		this.asnId = asnId;
		this.asnNumber = asnNumber;
		this.quantity = quantity;
		this.date = date;
		this.status = status;
	}

	public ASN() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "ASN [asnId=" + asnId + ", asnNumber=" + asnNumber + ", quantity=" + quantity + ", date=" + date
				+ ", status=" + status + "]";
	}

}
