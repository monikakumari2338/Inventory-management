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
import com.inventory.purchaseorder.dto.PurchaseOrderdto;
import com.inventory.purchaseorder.entity.ASN;
import com.inventory.purchaseorder.entity.PurchaseOrder;
import com.inventory.purchaseorder.service.PurchaseOrderService;



@RestController
@RequestMapping("/purchaseOrder")
public class PurchaseOrderController {

	
	@Autowired
	private PurchaseOrderService POService;

	// Api to save data in Purchase order table
	@PostMapping("/addpoitems")
	public ResponseEntity<List<PurchaseOrderCombineddtotoSave>> add_Products(@RequestBody List<PurchaseOrderCombineddtotoSave> POItems )
	{
		List<PurchaseOrderCombineddtotoSave> POItems1= POService.saveProducts(POItems);
		return new ResponseEntity<>(POItems1,HttpStatus.OK);	
	}
	
	
	@GetMapping("/findbyPO/{po}")
	public ResponseEntity<PurchaseOrderCombineddto> findbyPO(@PathVariable int po)
	{
		PurchaseOrderCombineddto POitemDetails1= POService.displayPO(po);
		return new ResponseEntity<>(POitemDetails1,HttpStatus.OK);	
	}
	
	// API's for finding asn and po list by status
	
	@GetMapping("/findASN/{status}")
	public ResponseEntity<List<ASN>> findAsn(@PathVariable String status)
	{
		List<ASN> asn= POService.findByStatus(status);
		return new ResponseEntity<>(asn,HttpStatus.OK);	
	}
	
	@GetMapping("/findPO/{status}")
	public ResponseEntity<List<PurchaseOrderdto>> findPo(@PathVariable String status)
	{
		List<PurchaseOrderdto> purchaseOrder= POService.findpoByStatus(status);
		return new ResponseEntity<>(purchaseOrder,HttpStatus.OK);	
	}
}
