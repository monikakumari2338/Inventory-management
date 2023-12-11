package com.inventory.purchaseorder.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Category {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int categoryId;
	private String category;
	
	public int getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public Category(int categoryId, String category) {
		super();
		this.categoryId = categoryId;
		this.category = category;
	}
	
	@Override
	public String toString() {
		return "Category [categoryId=" + categoryId + ", category=" + category + "]";
	}
	public Category() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
