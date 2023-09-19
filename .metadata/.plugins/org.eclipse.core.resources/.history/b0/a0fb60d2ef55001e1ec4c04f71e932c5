package com.inventory.purchaseorder.repository;



import org.springframework.data.jpa.repository.JpaRepository;


import com.inventory.purchaseorder.entity.Product;
import com.inventory.purchaseorder.entity.PurchaseOrder;


public interface ProductRepo extends JpaRepository<Product, String> {

	Product findByitemNumber(String itemNumber);

	void save(PurchaseOrder purchaseOrder);
	
}