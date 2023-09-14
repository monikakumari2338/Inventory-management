package com.inventory.stockcheck.dto;

public class ProductDto {

	private String productName;
	private int productStock;
	private String itemNumber;
	private String color;
	private String price;
	private int storeref;
	private String size;
	private int categoryref;
	private String imageData;

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public int getProductStock() {
		return productStock;
	}

	public void setProductStock(int productStock) {
		this.productStock = productStock;
	}

	public String getItemNumber() {
		return itemNumber;
	}

	public void setItemNumber(String itemNumber) {
		this.itemNumber = itemNumber;
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

	public int getStoreref() {
		return storeref;
	}

	public void setStoreref(int storeref) {
		this.storeref = storeref;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public int getCategoryref() {
		return categoryref;
	}

	public void setCategoryref(int categoryref) {
		this.categoryref = categoryref;
	}

	

	public String getImageData() {
		return imageData;
	}

	public void setImageData(String imageData) {
		this.imageData = imageData;
	}

	public ProductDto(String productName, int productStock, String itemNumber, String color, String price, int storeref,
			String size, int categoryref, String imageData) {
		super();
		this.productName = productName;
		this.productStock = productStock;
		this.itemNumber = itemNumber;
		this.color = color;
		this.price = price;
		this.storeref = storeref;
		this.size = size;
		this.categoryref = categoryref;
		this.imageData = imageData;
	}

	public ProductDto() {
		super();
		// TODO Auto-generated constructor stub
	}

}
