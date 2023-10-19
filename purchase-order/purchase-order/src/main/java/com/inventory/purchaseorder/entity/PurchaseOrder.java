package com.inventory.purchaseorder.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class PurchaseOrder {

	@Id
	private int poNumber;
	private String status;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "asnId", referencedColumnName = "asnId")
	private ASN asn;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "supplier_id", referencedColumnName = "supplierId")
	private DsdSuppliers supplierId;

	public PurchaseOrder() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public PurchaseOrder(int poNumber, String status, ASN asn, DsdSuppliers supplierId) {
		super();
		this.poNumber = poNumber;
		this.status = status;
		this.asn = asn;
		this.supplierId = supplierId;
	}

	public DsdSuppliers getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(DsdSuppliers supplierId) {
		this.supplierId = supplierId;
	}

	public int getPoNumber() {
		return poNumber;
	}

	public void setPoNumber(int poNumber) {
		this.poNumber = poNumber;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getPo_Number() {
		return poNumber;
	}

	public void setPo_Number(int poNumber) {
		this.poNumber = poNumber;
	}

	public ASN getAsn() {
		return asn;
	}

	public void setAsn(ASN asn) {
		this.asn = asn;
	}

}
