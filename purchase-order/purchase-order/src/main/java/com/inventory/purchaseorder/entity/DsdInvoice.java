package com.inventory.purchaseorder.entity;

import java.time.LocalDate;

import jakarta.persistence.CascadeType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import jakarta.persistence.Table;

@Entity
@Table(name = "invoice_dsd")
public class DsdInvoice {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int invoiceId;
	private int invoiceNumber;
	private LocalDate expDate;
	private String status;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "supplier_id", referencedColumnName = "supplierId")
	private DsdSuppliers supplierId;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getInvoiceNumber() {
		return invoiceNumber;
	}

	public void setInvoiceNumber(int invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}

	public LocalDate getExp_date() {
		return expDate;
	}

	public void setExp_date(LocalDate exp_date) {
		this.expDate = exp_date;
	}

	public int getInvoiceId() {
		return invoiceId;
	}

	public void setInvoiceId(int invoiceId) {
		this.invoiceId = invoiceId;
	}

	public DsdInvoice(int invoiceId, int invoiceNumber, LocalDate exp_date, String status, DsdSuppliers supplierId) {
		super();
		this.invoiceId = invoiceId;
		this.invoiceNumber = invoiceNumber;
		this.expDate = exp_date;
		this.status = status;
		this.supplierId = supplierId;
	}

	public DsdSuppliers getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(DsdSuppliers supplierId) {
		this.supplierId = supplierId;
	}

	@Override
	public String toString() {
		return "DsdInvoice [invoiceId=" + invoiceId + ", invoiceNumber=" + invoiceNumber + ", exp_date=" + expDate
				+ ", status=" + status + ", supplierId=" + supplierId + "]";
	}

	public DsdInvoice() {
		super();
		// TODO Auto-generated constructor stub
	}

}
