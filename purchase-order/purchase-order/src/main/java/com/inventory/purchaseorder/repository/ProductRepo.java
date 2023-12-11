package com.inventory.purchaseorder.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.purchaseorder.dto.ProductsByItemNumberdto;
import com.inventory.purchaseorder.entity.Product;
import com.inventory.purchaseorder.entity.PurchaseOrder;
import com.inventory.purchaseorder.entity.Category;



public interface ProductRepo extends JpaRepository<Product, String> {

	//Product findByitemNumber(String itemNumber);
	
	Product findByItemNumber(String itemNumber);

	void save(PurchaseOrder purchaseOrder);
	
	List<Product> findByCategory(Category category);
	
}