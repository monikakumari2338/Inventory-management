package com.inventory.purchaseorder.dto;

public class ProductDetailsdto {

	private String color;
	private String price;
	private String size;
	private int stock;
	private String imageData;
	private String store;
	private String itemNumber;
	
	
	private int poNumber;
	private String status;
	private int received_qty;
	
	

	public ProductDetailsdto(String color, String price, String size, int stock, String imageData, String store,
			String itemNumber, int poNumber, String status,int received_qty) {
		super();
		this.color = color;
		this.price = price;
		this.size = size;
		this.stock = stock;
		this.imageData = imageData;
		this.store = store;
		this.itemNumber = itemNumber;
		this.poNumber = poNumber;
		this.status = status;
		this.received_qty=received_qty;
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

	public ProductDetailsdto() {
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

	public String getStore() {
		return store;
	}

	public void setStore(String store) {
		this.store = store;
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
	

	public int getReceived_qty() {
		return received_qty;
	}

	public void setReceived_qty(int received_qty) {
		this.received_qty = received_qty;
	}

	@Override
	public String toString() {
		return "ProductDetailsdto [color=" + color + ", price=" + price + ", size=" + size + ", stock=" + stock
				+ ", imageData=" + imageData + ", store=" + store + ", itemNumber=" + itemNumber + ", poNumber="
				+ poNumber + ", status=" + status + "]";
	}

	public ProductDetailsdto(String color, String price, String size, int stock, String imageData, String store,
			String itemNumber) {
		super();
		this.color = color;
		this.price = price;
		this.size = size;
		this.stock = stock;
		this.imageData = imageData;
		this.store = store;
		this.itemNumber = itemNumber;
	}



}
