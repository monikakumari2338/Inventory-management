package com.inventory.purchaseorder.dto;

public class PurchaseOrderItemsdto {

	private String itemNumber;
	private String itemName;
	private int expectedQty;
	private String category;
	private int poNumber;
	private int received_qty;

	public PurchaseOrderItemsdto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getItemNumber() {
		return itemNumber;
	}

	public void setItemNumber(String itemNumber) {
		this.itemNumber = itemNumber;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public int getExpectedQty() {
		return expectedQty;
	}

	public void setExpectedQty(int expectedQty) {
		this.expectedQty = expectedQty;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public int getPoNumber() {
		return poNumber;
	}

	public void setPoNumber(int poNumber) {
		this.poNumber = poNumber;
	}

	public int getReceived_qty() {
		return received_qty;
	}

	public void setReceived_qty(int received_qty) {
		this.received_qty = received_qty;
	}

	public PurchaseOrderItemsdto(String itemNumber, String itemName, int expectedQty, String category, int poNumber,
			int received_qty) {
		super();
		this.itemNumber = itemNumber;
		this.itemName = itemName;
		this.expectedQty = expectedQty;
		this.category = category;
		this.poNumber = poNumber;
		this.received_qty = received_qty;
	}

	@Override
	public String toString() {
		return "PurchaseOrderItemsdto [itemNumber=" + itemNumber + ", itemName=" + itemName + ", expectedQty="
				+ expectedQty + ", category=" + category + ", poNumber=" + poNumber + ", received_qty=" + received_qty
				+ "]";
	}

}
