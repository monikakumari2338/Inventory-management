package com.inventory.purchaseorder.controller;

import java.time.LocalDate;
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
import com.inventory.purchaseorder.dto.ProductCombineddto;
import com.inventory.purchaseorder.entity.DsdInvoice;
import com.inventory.purchaseorder.entity.DsdSuppliers;
import com.inventory.purchaseorder.service.DSDService;

@RestController
@RequestMapping("/dsd")
public class DSDController {

	@Autowired
	private DSDService dsdService;

	@GetMapping("/findby/supplier/{supplier}")
	public ResponseEntity< List<DsdInvoice>> getDSD(@PathVariable int supplier) {
		 List<DsdInvoice> DsdReceiveItemsdto = dsdService.getDsdSupplierInvoices(supplier);
		return new ResponseEntity<>(DsdReceiveItemsdto, HttpStatus.OK);
	}
	
	@PostMapping("/savedsd")
	public ResponseEntity<DsdReceiveItemsdto> saveDSDItems(@RequestBody DsdReceiveItemsdto DsdReceiveItemsdto) {
		 DsdReceiveItemsdto DsdReceiveItemsdto1 = dsdService.saveDsd(DsdReceiveItemsdto);
		return new ResponseEntity<>(DsdReceiveItemsdto1, HttpStatus.OK);
	}
	
	//Api to save dsd items in master product table
	
	@PostMapping("/savedsdproduct/{invoiceNumber}")
	public ResponseEntity<List<ProductCombineddto>> saveDsdProducts(@RequestBody List<ProductCombineddto> productCombineddto,@PathVariable int invoiceNumber) {
		 List<ProductCombineddto> DsdReceiveItemsdto1 = dsdService.saveDSdProducts(productCombineddto, invoiceNumber);
		return new ResponseEntity<>(DsdReceiveItemsdto1, HttpStatus.OK);
	}
	
	@GetMapping("/findby/invoicenumber/{invoiceNumber}")
	public ResponseEntity< List<DsdReceiveItemsdto>> getDSDProducts(@PathVariable int invoiceNumber) {
		 List<DsdReceiveItemsdto> DsdReceiveItemsdto = dsdService.getInvoiceProducts(invoiceNumber);
		return new ResponseEntity<>(DsdReceiveItemsdto, HttpStatus.OK);
	}

	@GetMapping("/viewdsd")
	public ResponseEntity< List<DsdInvoice>> viewDSD() {
		 List<DsdInvoice> dsdInvoice = dsdService.getViewDsd();
		return new ResponseEntity<>(dsdInvoice, HttpStatus.OK);
	}
	
	@GetMapping("/viewdsd/date/{date}")
	public ResponseEntity< List<DsdInvoice>> viewDSDByDate(@PathVariable LocalDate date) {
		 List<DsdInvoice> dsdInvoice = dsdService.getViewDsdByDate(date);
		return new ResponseEntity<>(dsdInvoice, HttpStatus.OK);
	}
	
	@GetMapping("/viewdsd/supplier/{suppliername}")
	public ResponseEntity< List<DsdInvoice>> viewDSDBySupplier(@PathVariable String suppliername) {
		 List<DsdInvoice> dsdInvoice = dsdService.getViewDsdBySupplier(suppliername);
		return new ResponseEntity<>(dsdInvoice, HttpStatus.OK);
	}

}
