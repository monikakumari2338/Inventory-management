package com.inventory.purchaseorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.purchaseorder.entity.Product;
import com.inventory.purchaseorder.entity.ProductDetails;
import com.inventory.purchaseorder.entity.Stores;


public interface ProductDetailsRepo extends JpaRepository<ProductDetails, Integer> {

	ProductDetails findByColorAndSizeAndStoreAndProduct(String color,String size,Stores stores,Product Product);
	//ProductDetails findByProduct(Product Product);
}