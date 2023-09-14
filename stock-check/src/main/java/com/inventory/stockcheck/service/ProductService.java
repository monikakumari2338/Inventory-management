package com.inventory.stockcheck.service;

import java.util.ArrayList;

import java.util.List;

import com.inventory.stockcheck.dto.ProductDto;

public interface ProductService {

	ArrayList<ProductDto> save_product(ArrayList<ProductDto> productDto);

	ProductDto save(ProductDto productDto);
	
	List<ProductDto> getProduct(String itemNumber);
	
	ProductDto getProductByitemNumberColorSize(String itemNumber,String color,String size);
	
	List<String> getProductByitemNumberSize(String itemNumber,String size);
	
	List<String> getProductByitemNumberColor(String itemNumber,String color);
}
