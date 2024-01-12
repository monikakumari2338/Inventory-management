package com.inventory.purchaseorder.serviceimpl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.inventory.purchaseorder.dto.InventoryAdjustmentCombinedDto;
import com.inventory.purchaseorder.entity.DsdInvoice;
import com.inventory.purchaseorder.entity.InventoryAdjustment;
import com.inventory.purchaseorder.entity.InventoryAdjustmentProducts;
import com.inventory.purchaseorder.exception.ExceptionHandling;
import com.inventory.purchaseorder.repository.InventoryAdjustmentProductsRepo;
import com.inventory.purchaseorder.repository.InventoryAdjustmentRepo;
import com.inventory.purchaseorder.service.InventoryAdjustmentService;

@Service
public class InventoryAdjustmentServiceImpl implements InventoryAdjustmentService {

	@Autowired
	private InventoryAdjustmentRepo invAdjRepo;

	@Autowired
	private InventoryAdjustmentProductsRepo invAdjProductsRepo;

	// Function to save RTV list
	@Override
	public String saveInventoryAdjustment(InventoryAdjustmentCombinedDto InvAdjCombinedDto) {

		System.out.println("InvAdjCombinedDto: " + InvAdjCombinedDto);
		InventoryAdjustment InvAdj = new InventoryAdjustment(InvAdjCombinedDto.getInvCombined().getReason(),
				InvAdjCombinedDto.getInvCombined().getStatus(), InvAdjCombinedDto.getInvCombined().getSupplierId(),
				InvAdjCombinedDto.getInvCombined().getDate());

		invAdjRepo.save(InvAdj);

		System.out.println("InvAdj : "+InvAdj);
		
		InventoryAdjustment InvAdj1 = invAdjRepo.findByadjId(InvAdj.getAdjId());
		
		System.out.println("InvAdj1 : "+InvAdj1);
		List<InventoryAdjustmentProducts> InvAdjProducts = new ArrayList<>();
		for (int i = 0; i < InvAdjCombinedDto.getProductDto().size(); i++) {
			InvAdjProducts.add(new InventoryAdjustmentProducts(InvAdjCombinedDto.getProductDto().get(i).getItemNumber(),
					InvAdjCombinedDto.getProductDto().get(i).getItemName(),
					InvAdjCombinedDto.getProductDto().get(i).getCategory(),
					InvAdjCombinedDto.getProductDto().get(i).getColor(),
					InvAdjCombinedDto.getProductDto().get(i).getPrice(),
					InvAdjCombinedDto.getProductDto().get(i).getSize(),
					InvAdjCombinedDto.getProductDto().get(i).getImageData(),
					InvAdjCombinedDto.getProductDto().get(i).getStore(),
					InvAdjCombinedDto.getProductDto().get(i).getAdjQty(), InvAdj1));
		}

		invAdjProductsRepo.saveAll(InvAdjProducts);
		return "Products saved successfully";
	}

	@Override
	public List<InventoryAdjustment> getInventoryAdjustment(LocalDate date) {
		
		List<InventoryAdjustment> inventory_list= new ArrayList<>();
		inventory_list=invAdjRepo.findByDate(date);
		System.out.println("inventory_list " +inventory_list);
		if(inventory_list.size()==0) {
			throw new ExceptionHandling(HttpStatus.BAD_REQUEST, "No data was created on "+date);
		}
		return inventory_list;
	}
	
	@Override
	public List<InventoryAdjustment> getAllInventoryAdjustment() {
		
		List<InventoryAdjustment> inventory_list= new ArrayList<>();
		inventory_list=invAdjRepo.findAll();
		System.out.println("inventory_list " +inventory_list);
		if(inventory_list.size()==0) {
			throw new ExceptionHandling(HttpStatus.BAD_REQUEST, "No data");
		}
		return inventory_list;
	}
	
	@Override
	public List<InventoryAdjustmentProducts> getInventoryAdjustmentProducts(int id) {
		
		List<InventoryAdjustmentProducts> inventoryProducts_list= new ArrayList<>();
		InventoryAdjustment inventoryAdjustment=invAdjRepo.findByadjId(id);
		inventoryProducts_list=invAdjProductsRepo.findByInvAdjustment(inventoryAdjustment);
		System.out.println("inventory_list " +inventoryProducts_list);
		if(inventoryProducts_list.size()==0) {
			throw new ExceptionHandling(HttpStatus.BAD_REQUEST, "No data");
		}
		return inventoryProducts_list;
	}
	
	@Override
	public List<InventoryAdjustment> getMatchedInvAdjByid(String id) {
		List<InventoryAdjustment> inventoryAdjustment = invAdjRepo.findByAdjIdContaining(id);
		return inventoryAdjustment;
	}
}
