package com.inventory.purchaseorder.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class StockCountCreation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int countId;
	private String countDescription;
	// private LocalDateTime date;
	private LocalDate date;
	private String status;
	private int totalBookQty;

	public StockCountCreation() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getCountId() {
		return countId;
	}

	public void setCountId(int countId) {
		this.countId = countId;
	}

	public String getCountDescription() {
		return countDescription;
	}

	public void setCountDescription(String countDescription) {
		this.countDescription = countDescription;
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

	public int getTotalBookQty() {
		return totalBookQty;
	}

	public void setTotalBookQty(int totalBookQty) {
		this.totalBookQty = totalBookQty;
	}

	public StockCountCreation(int countId, String countDescription, LocalDate date, String status, int totalBookQty) {
		super();
		this.countId = countId;
		this.countDescription = countDescription;
		this.date = date;
		this.status = status;
		this.totalBookQty = totalBookQty;
	}

	@Override
	public String toString() {
		return "StockCountCreation [countId=" + countId + ", countDescription=" + countDescription + ", date=" + date
				+ ", status=" + status + ", totalBookQty=" + totalBookQty + "]";
	}

}
