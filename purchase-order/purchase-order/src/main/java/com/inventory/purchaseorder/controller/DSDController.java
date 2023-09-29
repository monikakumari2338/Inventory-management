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

import com.inventory.purchaseorder.dto.DsdReceiveItemsdto;

import com.inventory.purchaseorder.service.DSDService;

@RestController
@RequestMapping("/dsd")
public class DSDController {

	@Autowired
	private DSDService dsdService;

	@GetMapping("/findby/supplier/{supplier}")
	public ResponseEntity< List<DsdReceiveItemsdto>> getDSD(@PathVariable int supplier) {
		 List<DsdReceiveItemsdto> DsdReceiveItemsdto = dsdService.getDsdItems(supplier);
		return new ResponseEntity<>(DsdReceiveItemsdto, HttpStatus.OK);
	}
	
	@PostMapping("/savedsd")
	public ResponseEntity<DsdReceiveItemsdto> saveDSDItems(@RequestBody DsdReceiveItemsdto DsdReceiveItemsdto) {
		 DsdReceiveItemsdto DsdReceiveItemsdto1 = dsdService.saveDsd(DsdReceiveItemsdto);
		return new ResponseEntity<>(DsdReceiveItemsdto1, HttpStatus.OK);
	}

}
