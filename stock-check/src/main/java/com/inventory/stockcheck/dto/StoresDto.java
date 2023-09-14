package com.inventory.stockcheck.dto;


public class StoresDto {

	private int storeId;
	private String storeName;
	private int storeStock;
	private String storeAddress;
	
	public int getStoreId() {
		return storeId;
	}
	public void setStoreId(int storeId) {
		this.storeId = storeId;
	}
	public String getStoreName() {
		return storeName;
	}
	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}
	public int getStoreStock() {
		return storeStock;
	}
	public void setStoreStock(int storeStock) {
		this.storeStock = storeStock;
	}
	
	public String getStoreAddress() {
		return storeAddress;
	}
	public void setStoreAddress(String storeAddress) {
		this.storeAddress = storeAddress;
	}


	public StoresDto(int storeId, String storeName, int storeStock, String storeAddress) {
		super();
		this.storeId = storeId;
		this.storeName = storeName;
		this.storeStock = storeStock;
		this.storeAddress = storeAddress;
	}
	public StoresDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
}
