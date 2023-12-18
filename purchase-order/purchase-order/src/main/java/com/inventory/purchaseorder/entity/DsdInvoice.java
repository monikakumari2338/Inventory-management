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
	private int expected_qty;
	private int received_qty;

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

	public LocalDate getExpDate() {
		return expDate;
	}

	public void setExpDate(LocalDate expDate) {
		this.expDate = expDate;
	}

	public int getExpected_qty() {
		return expected_qty;
	}

	public void setExpected_qty(int expected_qty) {
		this.expected_qty = expected_qty;
	}

	public int getReceived_qty() {
		return received_qty;
	}

	public void setReceived_qty(int received_qty) {
		this.received_qty = received_qty;
	}

	public DsdSuppliers getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(DsdSuppliers supplierId) {
		this.supplierId = supplierId;
	}

	public DsdInvoice(int invoiceId, int invoiceNumber, LocalDate expDate, String status, int expected_qty,
			int received_qty, DsdSuppliers supplierId) {
		super();
		this.invoiceId = invoiceId;
		this.invoiceNumber = invoiceNumber;
		this.expDate = expDate;
		this.status = status;
		this.expected_qty = expected_qty;
		this.received_qty = received_qty;
		this.supplierId = supplierId;
	}

	@Override
	public String toString() {
		return "DsdInvoice [invoiceId=" + invoiceId + ", invoiceNumber=" + invoiceNumber + ", expDate=" + expDate
				+ ", status=" + status + ", expected_qty=" + expected_qty + ", received_qty=" + received_qty
				+ ", supplierId=" + supplierId + "]";
	}

	public DsdInvoice() {
		super();
		// TODO Auto-generated constructor stub
	}

}
