package com.inventory.purchaseorder.entity;

import jakarta.persistence.CascadeType;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class PurchaseOrder {

	@Id
	private String poNumber;
	private String status;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "asnId", referencedColumnName = "asnId")
	private ASN asn;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "supplier_id", referencedColumnName = "supplierId")
	private DsdSuppliers supplierId;
	private int expected_qty;
	private int received_qty;

	public PurchaseOrder() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getPoNumber() {
		return poNumber;
	}

	public void setPoNumber(String poNumber) {
		this.poNumber = poNumber;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public ASN getAsn() {
		return asn;
	}

	public void setAsn(ASN asn) {
		this.asn = asn;
	}

	public DsdSuppliers getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(DsdSuppliers supplierId) {
		this.supplierId = supplierId;
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

	public PurchaseOrder(String poNumber, String status, ASN asn, DsdSuppliers supplierId, int expected_qty,
			int received_qty) {
		super();
		this.poNumber = poNumber;
		this.status = status;
		this.asn = asn;
		this.supplierId = supplierId;
		this.expected_qty = expected_qty;
		this.received_qty = received_qty;
	}

	@Override
	public String toString() {
		return "PurchaseOrder [poNumber=" + poNumber + ", status=" + status + ", asn=" + asn + ", supplierId="
				+ supplierId + ", expected_qty=" + expected_qty + ", received_qty=" + received_qty + "]";
	}

}
