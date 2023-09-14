package com.inventory.purchaseorder.dto;

public class purchaseOrderItemDetailsdto {

	private String color;
	private String price;
	private String size;
	private int stock;
	private String imageData;
	private String itemNumber;
	private String store_name;

	public purchaseOrderItemDetailsdto() {
		super();
		// TODO Auto-generated constructor stub
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

	public purchaseOrderItemDetailsdto(String color, String price, String size, int stock, String imageData,
			String itemNumber, String store_name) {
		super();
		this.color = color;
		this.price = price;
		this.size = size;
		this.stock = stock;
		this.imageData = imageData;
		this.itemNumber = itemNumber;
		this.store_name = store_name;
	}

	public String getStore_name() {
		return store_name;
	}

	public void setStore_name(String store_name) {
		this.store_name = store_name;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public String getImageData() {
		return imageData;
	}

	public void setImageData(String imageData) {
		this.imageData = imageData;
	}

	public String getItemNumber() {
		return itemNumber;
	}

	public void setItemNumber(String itemNumber) {
		this.itemNumber = itemNumber;
	}

}
