package com.inventory.purchaseorder.serviceimpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory.purchaseorder.dto.InventoryAdjustmentCombinedDto;
import com.inventory.purchaseorder.entity.InventoryAdjustment;
import com.inventory.purchaseorder.entity.InventoryAdjustmentProducts;
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
				InvAdjCombinedDto.getInvCombined().getStatus(),
				InvAdjCombinedDto.getInvCombined().getSupplierId(),
				InvAdjCombinedDto.getInvCombined().getDate());

		invAdjRepo.save(InvAdj);

		InventoryAdjustment InvAdj1 = invAdjRepo.findByadjId(InvAdj.getAdjId());
		List<InventoryAdjustmentProducts> InvAdjProducts = new ArrayList<>();
		for (int i = 0; i < InvAdjCombinedDto.getProductDto().size(); i++) {
			InvAdjProducts.add(new InventoryAdjustmentProducts(
					InvAdjCombinedDto.getProductDto().get(i).getItemNumber(),
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


}
