package com.inventory.purchaseorder.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class PurchaseOrderItems {

	@Id
	private String itemNumber;
	private String itemName;
	private int expectedQty;
	private String category;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "poNumber", referencedColumnName = "poNumber")
	private PurchaseOrder purchaseOrder;

	public PurchaseOrderItems() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PurchaseOrderItems(String itemNumber, String itemName, int expectedQty, String category, PurchaseOrder purchaseOrder) {
		super();
		this.itemNumber = itemNumber;
		this.itemName = itemName;
		this.expectedQty = expectedQty;
		this.category = category;
		this.purchaseOrder = purchaseOrder;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getItemNumber() {
		return itemNumber;
	}

	public void setItemNumber(String itemNumber) {
		this.itemNumber = itemNumber;
	}

	public int getExpectedQty() {
		return expectedQty;
	}

	public void setExpectedQty(int expectedQty) {
		this.expectedQty = expectedQty;
	}

	public PurchaseOrder getPurchaseOrder() {
		return purchaseOrder;
	}

	public void setPurchaseOrder(PurchaseOrder purchaseOrder) {
		this.purchaseOrder = purchaseOrder;
	}
}
