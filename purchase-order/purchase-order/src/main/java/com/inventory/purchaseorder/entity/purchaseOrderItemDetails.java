package com.inventory.purchaseorder.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class purchaseOrderItemDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String color;
	private String price;
	private String size;
	private int stock;
	private String imageData;

	private String store;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "ItemId", referencedColumnName = "itemNumber")
	private PurchaseOrderItems items;

	public purchaseOrderItemDetails() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public purchaseOrderItemDetails(String color, String price, String size, int stock, String imageData,
			String store, PurchaseOrderItems items) {
		super();
		this.color = color;
		this.price = price;
		this.size = size;
		this.stock = stock;
		this.imageData = imageData;
		this.store = store;
		this.items = items;
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



	public PurchaseOrderItems getItems() {
		return items;
	}

	public void setItems(PurchaseOrderItems items) {
		this.items = items;
	}

}
