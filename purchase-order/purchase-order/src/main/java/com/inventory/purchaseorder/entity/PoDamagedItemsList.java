package com.inventory.purchaseorder.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class PoDamagedItemsList {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int generatedId;
	private String itemNumber;
	private String itemName;
	private int expectedQty;
	private int receivedQty;
	private int damageQty;
	@Column(length = 65555)
	private String damageImage;
	private String category;
	private String color;
	private String price;
	private String size;
	private String itemImage;
	private String upc;
	private String sku;
	private String taxPercentage;
	private String taxCode;
	private int poNumber;
	private int asnNumber;
	private String store;

	public PoDamagedItemsList() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getGeneratedId() {
		return generatedId;
	}

	public void setGeneratedId(int generatedId) {
		this.generatedId = generatedId;
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

	public int getPoNumber() {
		return poNumber;
	}

	public void setPoNumber(int poNumber) {
		this.poNumber = poNumber;
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

	public int getReceivedQty() {
		return receivedQty;
	}

	public void setReceivedQty(int receivedQty) {
		this.receivedQty = receivedQty;
	}

	public int getDamageQty() {
		return damageQty;
	}

	public void setDamageQty(int damageQty) {
		this.damageQty = damageQty;
	}

	public int getAsnNumber() {
		return asnNumber;
	}

	public void setAsnNumber(int asnNumber) {
		this.asnNumber = asnNumber;
	}

	public String getDamageImage() {
		return damageImage;
	}

	public void setDamageImage(String damageImage) {
		this.damageImage = damageImage;
	}

	public String getItemImage() {
		return itemImage;
	}

	public void setItemImage(String itemImage) {
		this.itemImage = itemImage;
	}

	public String getStore() {
		return store;
	}

	public void setStore(String store) {
		this.store = store;
	}

	public PoDamagedItemsList(String itemNumber, String itemName, int expectedQty, int receivedQty, int damageQty,
			String damageImage, String category, String color, String price, String size, String itemImage, String upc,
			String sku, String taxPercentage, String taxCode, int poNumber, int asnNumber, String store) {
		super();
		this.itemNumber = itemNumber;
		this.itemName = itemName;
		this.expectedQty = expectedQty;
		this.receivedQty = receivedQty;
		this.damageQty = damageQty;
		this.damageImage = damageImage;
		this.category = category;
		this.color = color;
		this.price = price;
		this.size = size;
		this.itemImage = itemImage;
		this.upc = upc;
		this.sku = sku;
		this.taxPercentage = taxPercentage;
		this.taxCode = taxCode;
		this.poNumber = poNumber;
		this.asnNumber = asnNumber;
		this.store = store;
	}

}