package com.inventory.purchaseorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.purchaseorder.entity.Product;
import com.inventory.purchaseorder.entity.ProductDetails;
import com.inventory.purchaseorder.entity.Stores;

public interface ProductDetailsRepo extends JpaRepository<ProductDetails, Integer> {

	ProductDetails findByColorAndSizeAndStoreAndProduct(String color, String size, Stores stores, Product Product);

	List<ProductDetails> findAllByProduct(Product Product);

	List<ProductDetails> findByProductAndColorAndSize(Product Product, String color, String size);
	// ProductDetails findByProduct(Product Product);
	
}