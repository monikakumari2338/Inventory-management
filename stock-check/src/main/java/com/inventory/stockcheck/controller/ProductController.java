
package com.inventory.stockcheck.controller;

import java.util.ArrayList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.stockcheck.dto.ProductDto;
import com.inventory.stockcheck.service.ProductService;


@RestController
@RequestMapping("/product")
public class ProductController {

	@Autowired
	private ProductService productService;
	

	@PostMapping("/addproducts")
	public ResponseEntity<String> add_Products(@RequestBody ArrayList<ProductDto> productDto )
	{
		productService.save_product(productDto);
		return new ResponseEntity<>("products added successfully",HttpStatus.OK);	
	}
	
	@PostMapping("/addproduct")
	public ResponseEntity<ProductDto> add_product(@RequestBody ProductDto productDto )
	{
		productService.save(productDto);
		return new ResponseEntity<>(productDto,HttpStatus.OK);	
	}
	
	@GetMapping("/getProductByitemNumber/{modelNumber}")
	public ResponseEntity<List<ProductDto>> getProductByitemNumber(@PathVariable String modelNumber )
	{
		List<ProductDto> productDto=productService.getProduct(modelNumber);
		return new ResponseEntity<>(productDto,HttpStatus.OK);	
	}
	
	@GetMapping("/getProductByitemNumberColorsize/{itemNumber}/{color}/{size}")
	public ResponseEntity<ProductDto> getProductByitemNumberColorSize(@PathVariable String itemNumber,@PathVariable String color,@PathVariable String size)
	{
		ProductDto productDto=productService.getProductByitemNumberColorSize(itemNumber, color, size);
		return new ResponseEntity<>(productDto,HttpStatus.OK);	
	}

	@GetMapping("/getProductByitemNumberSize/{itemNumber}/{size}")
	public ResponseEntity<List<String>> getProductByitemNumberSize(@PathVariable String itemNumber,@PathVariable String size)
	{
		List<String> colors=productService.getProductByitemNumberSize(itemNumber, size);
		return new ResponseEntity<>(colors,HttpStatus.OK);	
	}
	
	@GetMapping("/getProductByitemNumberColor/{itemNumber}/{color}")
	public ResponseEntity<List<String>> getProductByitemNumberColor(@PathVariable String itemNumber,@PathVariable String color)
	{
		List<String> sizes=productService.getProductByitemNumberColor(itemNumber, color);
		return new ResponseEntity<>(sizes,HttpStatus.OK);	
	}
	
}
