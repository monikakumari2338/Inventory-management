package com.inventory.purchaseorder.dto;

public class ReturnToVendorProductsdto {

	private String itemNumber;
	private String itemName;
	private String category;
	private String color;
	private String price;
	private String cost;
	private String size;
	private String attachedImage;
	private String upc;
	private String sku;
	private String taxPercentage;
	private String taxCode;
	private String store;
	private String returnReason;
	private int returnQty;
	private int rtvId;

	public ReturnToVendorProductsdto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getRtvId() {
		return rtvId;
	}

	public void setRtvId(int rtvId) {
		this.rtvId = rtvId;
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

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getStore() {
		return store;
	}

	public void setStore(String store) {
		this.store = store;
	}

	public int getReturnQty() {
		return returnQty;
	}

	public void setReturnQty(int returnQty) {
		this.returnQty = returnQty;
	}

	public String getAttachedImage() {
		return attachedImage;
	}

	public void setAttachedImage(String attachedImage) {
		this.attachedImage = attachedImage;
	}

	public String getUpc() {
		return upc;
	}

	public void setUpc(String upc) {
		this.upc = upc;
	}

	public String getSku() {
		return sku;
	}

	public void setSku(String sku) {
		this.sku = sku;
	}

	public String getTaxPercentage() {
		return taxPercentage;
	}

	public void setTaxPercentage(String taxPercentage) {
		this.taxPercentage = taxPercentage;
	}

	public String getTaxCode() {
		return taxCode;
	}

	public void setTaxCode(String taxCode) {
		this.taxCode = taxCode;
	}

	public String getReturnReason() {
		return returnReason;
	}

	public void setReturnReason(String returnReason) {
		this.returnReason = returnReason;
	}

	public String getCost() {
		return cost;
	}

	public void setCost(String cost) {
		this.cost = cost;
	}

	public ReturnToVendorProductsdto(String itemNumber, String itemName, String category, String color, String price,
			String cost, String size, String attachedImage, String upc, String sku, String taxPercentage,
			String taxCode, String store, String returnReason, int returnQty, int rtvId) {
		super();
		this.itemNumber = itemNumber;
		this.itemName = itemName;
		this.category = category;
		this.color = color;
		this.price = price;
		this.cost = cost;
		this.size = size;
		this.attachedImage = attachedImage;
		this.upc = upc;
		this.sku = sku;
		this.taxPercentage = taxPercentage;
		this.taxCode = taxCode;
		this.store = store;
		this.returnReason = returnReason;
		this.returnQty = returnQty;
		this.rtvId = rtvId;
	}

}
