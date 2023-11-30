package com.inventory.purchaseorder.dto;

public class SaveStockCountProductsdto {

	private int id;
	private String itemNumber;
	private String itemName;
	private String category;
	private String color;
	private String price;
	private String size;
	private String imageData;
	private String store;
	private int bookQty;
	private int countedQty;
	private int varianceQty;
	private int countId;

	public SaveStockCountProductsdto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getBookQty() {
		return bookQty;
	}

	public void setBookQty(int bookQty) {
		this.bookQty = bookQty;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public String getImageData() {
		return imageData;
	}

	public void setImageData(String imageData) {
		this.imageData = imageData;
	}

	public String getStore() {
		return store;
	}

	public void setStore(String store) {
		this.store = store;
	}

	public int getCountedQty() {
		return countedQty;
	}

	public void setCountedQty(int countedQty) {
		this.countedQty = countedQty;
	}

	public int getVarianceQty() {
		return varianceQty;
	}

	public void setVarianceQty(int varianceQty) {
		this.varianceQty = varianceQty;
	}

	public int getCountId() {
		return countId;
	}

	public void setCountId(int countId) {
		this.countId = countId;
	}

	public SaveStockCountProductsdto(int id, String itemNumber, String itemName, String category, String color,
			String price, String size, String imageData, String store, int bookQty, int countedQty, int varianceQty) {
		super();
		this.id = id;
		this.itemNumber = itemNumber;
		this.itemName = itemName;
		this.category = category;
		this.color = color;
		this.price = price;
		this.size = size;
		this.imageData = imageData;
		this.store = store;
		this.bookQty = bookQty;
		this.countedQty = countedQty;
		this.varianceQty = varianceQty;
	}

}
