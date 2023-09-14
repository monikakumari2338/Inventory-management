package com.inventory.purchaseorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.purchaseorder.dto.PurchaseOrderCombineddto;
import com.inventory.purchaseorder.entity.PurchaseOrder;

public interface PurchaseOrderRepo extends JpaRepository<PurchaseOrder, Integer> {
	
	PurchaseOrder findByPoNumber(int id);
	
	
	//PurchaseOrderCombineddto findAllByPoNumber(int id);
	

}