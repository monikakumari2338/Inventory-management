package com.inventory.purchaseorder.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.SequenceGenerator;

@Entity
public class ASN {
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "my_sequence")
	@SequenceGenerator(name = "my_sequence", sequenceName = "my_sequence", initialValue = 300000)
	private int asnNumber;
	private int quantity;
	private LocalDate creationDate;
	private String status;
	private String attachedImage;

	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
	@JoinTable(name = "asn_po", joinColumns = {
			@JoinColumn(name = "asnNumber", referencedColumnName = "asnNumber") }, inverseJoinColumns = {
					@JoinColumn(name = "poNumber", referencedColumnName = "poNumber") })
	private List<PurchaseOrder> purchaseOrder;

	public int getAsnNumber() {
		return asnNumber;
	}

	public void setAsnNumber(int asnNumber) {
		this.asnNumber = asnNumber;
	}

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

	public List<PurchaseOrder> getPurchaseOrder() {
		return purchaseOrder;
	}

	public void setPurchaseOrder(List<PurchaseOrder> purchaseOrder) {
		this.purchaseOrder = purchaseOrder;
	}

	public String getAttachedImage() {
		return attachedImage;
	}

	public void setAttachedImage(String attachedImage) {
		this.attachedImage = attachedImage;
	}

	public ASN(int quantity, LocalDate creationDate, String status, String attachedImage,
			List<PurchaseOrder> purchaseOrder) {
		super();
		this.quantity = quantity;
		this.creationDate = creationDate;
		this.status = status;
		this.attachedImage = attachedImage;
		this.purchaseOrder = purchaseOrder;
	}

	public ASN() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "ASN [asnNumber=" + asnNumber + ", quantity=" + quantity + ", creationDate=" + creationDate + ", status="
				+ status + ", purchaseOrder=" + purchaseOrder + "]";
	}

}
