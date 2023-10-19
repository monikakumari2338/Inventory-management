package com.inventory.purchaseorder.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.inventory.purchaseorder.dto.ReturnToVendorCombinedDto;
import com.inventory.purchaseorder.service.ReturnToVendorService;

@RestController
@RequestMapping("/returntovendor")
public class ReturnToVendorController {

	@Autowired
	private ReturnToVendorService RTVService;

	// Api to save data in Purchase order table
	@PostMapping("/addrtvitems")
	public ResponseEntity<String> add_Products(@RequestBody ReturnToVendorCombinedDto RTVCombinedDto) {
		String success_msg = RTVService.saveProducts(RTVCombinedDto);
		return new ResponseEntity<>(success_msg, HttpStatus.OK);
	}
	
	@GetMapping("/getrtvitems/{rtvId}")
	public ResponseEntity<ReturnToVendorCombinedDto> getRTVProducts(@PathVariable int rtvId) {
		ReturnToVendorCombinedDto RTVCombinedDto = RTVService.getRTVProducts(rtvId);
		return new ResponseEntity<>(RTVCombinedDto, HttpStatus.OK);
	}

}
