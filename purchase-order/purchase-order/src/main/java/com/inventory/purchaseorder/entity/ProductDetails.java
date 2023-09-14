package com.inventory.purchaseorder.entity;

import jakarta.persistence.CascadeType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;

import jakarta.persistence.ManyToOne;

@Entity
public class ProductDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String color;
	private String price;
	private String size;
	private int stock;
	private String imageData;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "store_id", referencedColumnName = "storeId")
	private Stores store;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "itemNumber", referencedColumnName = "itemNumber")
	private Product product;

	

	public ProductDetails() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Stores getStore() {
		return store;
	}

	public void setStore(Stores store) {
		this.store = store;
	}

	
	public ProductDetails(String color, String price, String size, int stock, String imageData, Stores store,
			Product product) {
		super();
		this.color = color;
		this.price = price;
		this.size = size;
		this.stock = stock;
		this.imageData = imageData;
		this.store = store;
		this.product = product;
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

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}
	

}
