package com.inventory.purchaseorder.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.purchaseorder.dto.InventoryAdjustmentCombinedDto;
import com.inventory.purchaseorder.entity.DsdInvoice;
import com.inventory.purchaseorder.entity.InventoryAdjustment;
import com.inventory.purchaseorder.entity.InventoryAdjustmentProducts;
import com.inventory.purchaseorder.service.InventoryAdjustmentService;

@RestController
@RequestMapping("/inventoryadjustment")
public class InventoryAdjustmentController {

	@Autowired
	private InventoryAdjustmentService invAdjService;

	// Api to save InventoryAdjustment
	@PostMapping("/add/invadjlist")
	public ResponseEntity<String> add_Products(@RequestBody InventoryAdjustmentCombinedDto InvAdjCombinedDto) {
		String success_msg = invAdjService.saveInventoryAdjustment(InvAdjCombinedDto);
		return new ResponseEntity<>(success_msg, HttpStatus.OK);
	}

	// Api to get InventoryAdjustment List
	@GetMapping("/getinventoryadjustmentlist/{date}")
	public ResponseEntity<List<InventoryAdjustment>> viewInventoryAdjustment(@PathVariable LocalDate date) {
		List<InventoryAdjustment> inventory_list = invAdjService.getInventoryAdjustment(date);
		return new ResponseEntity<>(inventory_list, HttpStatus.OK);
	}

	// Api to get all InventoryAdjustment List
	@GetMapping("/getall/inventoryadjustmentlist")
	public ResponseEntity<List<InventoryAdjustment>> getAllInventoryAdjustment() {
		List<InventoryAdjustment> inventory_list = invAdjService.getAllInventoryAdjustment();
		return new ResponseEntity<>(inventory_list, HttpStatus.OK);
	}

	// Api to get all InventoryAdjustment products List by id
	@GetMapping("/getinventoryadjustmentlist/id/{id}")
	public ResponseEntity<List<InventoryAdjustmentProducts>> getInventoryAdjustmentProducts(@PathVariable int id) {
		List<InventoryAdjustmentProducts> inventory_list = invAdjService.getInventoryAdjustmentProducts(id);
		return new ResponseEntity<>(inventory_list, HttpStatus.OK);
	}
	

	@GetMapping("/getMatched/getinventoryadjustmentlist/id/{id}")
	public ResponseEntity< List<InventoryAdjustment>> getMatchedDsdById(@PathVariable String id) {
		 List<InventoryAdjustment> inventory_list = invAdjService.getMatchedInvAdjByid(id);
		return new ResponseEntity<>(inventory_list, HttpStatus.OK);
	}

}
