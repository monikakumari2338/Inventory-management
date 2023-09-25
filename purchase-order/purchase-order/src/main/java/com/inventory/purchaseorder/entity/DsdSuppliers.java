package com.inventory.purchaseorder.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "suppliers")
public class DsdSuppliers {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int supplierId;
	private String supplierName;

	public int getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(int supplierId) {
		this.supplierId = supplierId;
	}

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public DsdSuppliers(int supplierId, String supplierName) {
		super();
		this.supplierId = supplierId;
		this.supplierName = supplierName;
	}

	@Override
	public String toString() {
		return "DsdSuppliers [supplierId=" + supplierId + ", supplierName=" + supplierName + "]";
	}

	public DsdSuppliers() {
		super();
		// TODO Auto-generated constructor stub
	}

}
