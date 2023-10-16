package com.inventory.purchaseorder.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
public class TransferReceiveInfo {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int transferId;
	private String storeFrom;
	private String storeTo;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "asnId", referencedColumnName = "asnId")
	private ASN asn;

	public int getTransferId() {
		return transferId;
	}

	public void setTransferId(int transferId) {
		this.transferId = transferId;
	}

	public String getStoreFrom() {
		return storeFrom;
	}

	public void setStoreFrom(String storeFrom) {
		this.storeFrom = storeFrom;
	}

	public String getStoreTo() {
		return storeTo;
	}

	public void setStoreTo(String storeTo) {
		this.storeTo = storeTo;
	}

	public ASN getAsn() {
		return asn;
	}

	public void setAsn(ASN asn) {
		this.asn = asn;
	}

	public TransferReceiveInfo(String storeFrom, String storeTo, ASN asn) {
		super();
		
		this.storeFrom = storeFrom;
		this.storeTo = storeTo;
		this.asn = asn;
	}

	@Override
	public String toString() {
		return "TransferReceiveInfo [transferId=" + transferId + ", storeFrom=" + storeFrom + ", storeTo=" + storeTo
				+ ", asn=" + asn + "]";
	}

	public TransferReceiveInfo() {
		super();
		// TODO Auto-generated constructor stub
	}

}
