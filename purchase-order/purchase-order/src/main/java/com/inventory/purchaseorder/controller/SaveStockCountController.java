package com.inventory.purchaseorder.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.purchaseorder.dto.SaveStockCountCombinedDto;
import com.inventory.purchaseorder.entity.EmailRequest;
import com.inventory.purchaseorder.entity.SaveStockCountInfo;
import com.inventory.purchaseorder.service.EmailService;
import com.inventory.purchaseorder.service.SaveStockCountService;

@RestController
@RequestMapping("/savestockcount")
public class SaveStockCountController {

	@Autowired
	private SaveStockCountService saveStockCountService;

	@Autowired
	private EmailService emailService;

	@PostMapping("/save")
	public ResponseEntity<SaveStockCountCombinedDto> saveStockCount(
			@RequestBody SaveStockCountCombinedDto saveStockCountCombinedDto) {
		SaveStockCountCombinedDto stockCount = saveStockCountService.saveProducts(saveStockCountCombinedDto);
		return new ResponseEntity<>(stockCount, HttpStatus.OK);
	}

	@GetMapping("/getinfolist")
	public ResponseEntity<List<SaveStockCountInfo>> getStockInfo() {
		List<SaveStockCountInfo> stockCountList = saveStockCountService.getStockCountInfo();
		return new ResponseEntity<>(stockCountList, HttpStatus.OK);
	}

	@PostMapping(value="/mail", consumes = "multipart/form-data")
	public void sendEMail(@ModelAttribute EmailRequest emailRequest) {
		System.out.println("Going to Send email: " + emailRequest.toString());
		emailService.sendEmail(emailRequest);
	}

}
