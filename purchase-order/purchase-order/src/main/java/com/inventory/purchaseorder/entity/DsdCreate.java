package com.inventory.purchaseorder.entity;

import jakarta.persistence.CascadeType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "receive_dsd")
public class DsdCreate {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int dsdId;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "supplier_id", referencedColumnName = "supplierId")
	private DsdSuppliers dsdsuppliers;

	public int getDsdId() {
		return dsdId;
	}

	public void setDsdId(int dsdId) {
		this.dsdId = dsdId;
	}

	
	
	public DsdSuppliers getDsdsuppliers() {
		return dsdsuppliers;
	}

	public void setDsdsuppliers(DsdSuppliers dsdsuppliers) {
		this.dsdsuppliers = dsdsuppliers;
	}
	

	public DsdCreate(int dsdId, DsdSuppliers dsdsuppliers) {
		super();
		this.dsdId = dsdId;
		this.dsdsuppliers = dsdsuppliers;
	}

	@Override
	public String toString() {
		return "DsdCreate [dsdId=" + dsdId + ", dsdsuppliers=" + dsdsuppliers + "]";
	}

	public DsdCreate() {
		super();
		// TODO Auto-generated constructor stub
	}

}
