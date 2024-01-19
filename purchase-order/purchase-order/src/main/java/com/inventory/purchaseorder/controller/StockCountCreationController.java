package com.inventory.purchaseorder.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.purchaseorder.dto.ProductsByItemNumberdto;
import com.inventory.purchaseorder.dto.StockCountCreationCombinedDto;

import com.inventory.purchaseorder.service.StockCountCreationService;

@RestController
@RequestMapping("/stockcount")
public class StockCountCreationController {

	@Autowired
	private StockCountCreationService stockCountCreationService;

	
	@PostMapping("/createstockcount")
	public ResponseEntity<StockCountCreationCombinedDto> saveStockCount(
			@RequestBody StockCountCreationCombinedDto stockCountCombinedDto) {
		StockCountCreationCombinedDto stockCountCreationCombinedDto = stockCountCreationService
				.saveProducts(stockCountCombinedDto);
		return new ResponseEntity<>(stockCountCreationCombinedDto, HttpStatus.OK);
	}
	
	@GetMapping("/getProductsbydate/{date}")
	public ResponseEntity<StockCountCreationCombinedDto> geTodaysProduct(@PathVariable LocalDate date )
	{
		StockCountCreationCombinedDto products=stockCountCreationService.getProductsByDate(date);
		return new ResponseEntity<>(products,HttpStatus.OK);	
	}

}
