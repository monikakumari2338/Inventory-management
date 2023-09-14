package com.inventory.stockcheck.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.stockcheck.entity.Product;

public interface ProductRepo extends JpaRepository<Product, Integer> {

	List<Product> findAllByItemNumber(String itemNumber);
	Product findAllByItemNumberAndColorAndSize(String modelNumber,String color,String size);
	List<Product> findAllByItemNumberAndSize(String itemNumber,String size);
	List<Product> findAllByItemNumberAndColor(String itemNumber,String color);
	
}
