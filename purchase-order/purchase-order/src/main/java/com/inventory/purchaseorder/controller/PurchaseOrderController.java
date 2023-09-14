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

import com.inventory.purchaseorder.dto.PurchaseOrderCombineddto;
import com.inventory.purchaseorder.dto.PurchaseOrderCombineddtotoSave;
import com.inventory.purchaseorder.service.PurchaseOrderService;



@RestController
@RequestMapping("/purchaseOrder")
public class PurchaseOrderController {

	
	@Autowired
	private PurchaseOrderService POService;

	
	@PostMapping("/addpoitems")
	public ResponseEntity<List<PurchaseOrderCombineddtotoSave>> add_Products(@RequestBody List<PurchaseOrderCombineddtotoSave> POItems )
	{
		List<PurchaseOrderCombineddtotoSave> POItems1= POService.saveProducts(POItems);
		return new ResponseEntity<>(POItems1,HttpStatus.OK);	
	}
	
//	@PostMapping("/addpoitemDetails")
//	public ResponseEntity<purchaseOrderItemDetailsdto> additemDetails(@RequestBody purchaseOrderItemDetailsdto POitemDetails )
//	{
//		purchaseOrderItemDetailsdto POitemDetails1= POService.savepurchaseOrderItemDetails(POitemDetails);
//		return new ResponseEntity<>(POitemDetails1,HttpStatus.OK);	
//	}
	
	@GetMapping("/findbyPO/{po}")
	public ResponseEntity<PurchaseOrderCombineddto> findbyPO(@PathVariable int po)
	{
		PurchaseOrderCombineddto POitemDetails1= POService.displayPO(po);
		return new ResponseEntity<>(POitemDetails1,HttpStatus.OK);	
	}
}
