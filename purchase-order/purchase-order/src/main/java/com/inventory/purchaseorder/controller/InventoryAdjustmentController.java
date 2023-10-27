package com.inventory.purchaseorder.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.purchaseorder.dto.InventoryAdjustmentCombinedDto;
import com.inventory.purchaseorder.service.InventoryAdjustmentService;

@RestController
@RequestMapping("/inventoryadjustment")
public class InventoryAdjustmentController {

	@Autowired
	private InventoryAdjustmentService invAdjService;

	// Api to save RTV list
	@PostMapping("/add/invadjlist")
	public ResponseEntity<String> add_Products(@RequestBody InventoryAdjustmentCombinedDto InvAdjCombinedDto) {
		String success_msg = invAdjService.saveInventoryAdjustment(InvAdjCombinedDto);
		return new ResponseEntity<>(success_msg, HttpStatus.OK);
	}

}
