package com.inventory.purchaseorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.inventory.purchaseorder.entity.Product;
import com.inventory.purchaseorder.entity.ProductDetails;
import com.inventory.purchaseorder.entity.Stores;

public interface ProductDetailsRepo extends JpaRepository<ProductDetails, Integer> {

	ProductDetails findByColorAndSizeAndStoreAndProduct(String color, String size, Stores stores, Product Product);

	List<ProductDetails> findAllByProduct(Product Product);

	List<ProductDetails> findByProductAndColorAndSize(Product Product, String color, String size);
	// ProductDetails findByProduct(Product Product);
	
	@Query(nativeQuery = true, value = "SELECT product_details.* FROM product_details INNER JOIN products_db ON products_db.item_number = product_details.item_number WHERE products_db.item_number=:item_number ")
	List<ProductDetails> findAllProductDetailsByitemNumber(@Param("item_number") String item_number);
}