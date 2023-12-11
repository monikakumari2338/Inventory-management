package com.inventory.purchaseorder.controller;

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

import com.inventory.purchaseorder.dto.ProductCombineddto;
import com.inventory.purchaseorder.dto.ProductDetailsdto;
import com.inventory.purchaseorder.dto.Productdto;
import com.inventory.purchaseorder.dto.ProductsByItemNumberdto;
import com.inventory.purchaseorder.dto.categorydto;
import com.inventory.purchaseorder.service.ProductService;


@RestController
@RequestMapping("/product")
public class ProductController {

	@Autowired
	private ProductService productService;

	
	// Api to save data in Master product table
	@PostMapping("/addproducts/{received_qty}")
	public ResponseEntity<List<ProductCombineddto>> add_Products(@RequestBody List<ProductCombineddto> productCombineddto,@PathVariable int received_qty) {
		List<ProductCombineddto> productCombineddto1 = productService.saveProducts(productCombineddto,received_qty);
		return new ResponseEntity<>(productCombineddto1, HttpStatus.OK);
	}
	
	@GetMapping("/getProductByitemNumber/{itemNumber}")
	public ResponseEntity<ProductsByItemNumberdto> getProductByitemNumber(@PathVariable String itemNumber )
	{
		ProductsByItemNumberdto productDto=productService.getByItemnumber(itemNumber);
		return new ResponseEntity<>(productDto,HttpStatus.OK);	
	}
	
	@GetMapping("/getinventory")
	public ResponseEntity<List<categorydto>> getInventory()
	{
		List<categorydto> categorydto=productService.getCategoryStock();
		return new ResponseEntity<>(categorydto,HttpStatus.OK);	
	}
	
	

}
