package com.inventory.purchaseorder.serviceimpl;

import java.time.LocalDate;
import java.util.ArrayList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.inventory.purchaseorder.dto.ReturnToVendorCombinedDto;
import com.inventory.purchaseorder.dto.ReturnToVendorInfodto;
import com.inventory.purchaseorder.dto.ReturnToVendorProcessDto;
import com.inventory.purchaseorder.dto.ReturnToVendorProductsdto;
import com.inventory.purchaseorder.entity.DsdInvoice;
import com.inventory.purchaseorder.entity.DsdSuppliers;
import com.inventory.purchaseorder.entity.InventoryAdjustment;
import com.inventory.purchaseorder.entity.ReturnToVendorInfo;
import com.inventory.purchaseorder.entity.ReturnToVendorProcessInfo;
import com.inventory.purchaseorder.entity.ReturnToVendorProcessProducts;
import com.inventory.purchaseorder.entity.ReturnToVendorProducts;
import com.inventory.purchaseorder.exception.ExceptionHandling;
import com.inventory.purchaseorder.repository.ReturnTovendorInfoRepo;
import com.inventory.purchaseorder.repository.ReturnTovendorProcessInfoRepo;
import com.inventory.purchaseorder.repository.ReturnTovendorProcessProductsRepo;
import com.inventory.purchaseorder.service.ReturnToVendorService;
import com.inventory.purchaseorder.repository.ReturnTovendorProductsRepo;

@Service
public class RerurnToVendorServiceImpl implements ReturnToVendorService {

	@Autowired
	private ReturnTovendorInfoRepo rtvInfoRepo;

	@Autowired
	private ReturnTovendorProductsRepo rtvProductsRepo;

	@Autowired
	private ReturnTovendorProcessInfoRepo rtvProcessInfoRepo;

	@Autowired
	private ReturnTovendorProcessProductsRepo rtvProcessProductsRepo;

	// Function to save RTV list
	@Override
	public String saveProducts(ReturnToVendorCombinedDto RTVCombinedDto) {

		ReturnToVendorInfo RTVInfo = new ReturnToVendorInfo(RTVCombinedDto.getRtvInfodto().getPoNumber(),
				RTVCombinedDto.getRtvInfodto().getSupplierId(), RTVCombinedDto.getRtvInfodto().getSupplierName(),
				RTVCombinedDto.getRtvInfodto().getDate());

		rtvInfoRepo.save(RTVInfo);

		ReturnToVendorInfo RTVInfo1 = rtvInfoRepo.findByrtvId(RTVInfo.getRtvId());
		List<ReturnToVendorProducts> rtvProducts = new ArrayList<>();
		for (int i = 0; i < RTVCombinedDto.getRtvProductsdto().size(); i++) {
			rtvProducts.add(new ReturnToVendorProducts(RTVCombinedDto.getRtvProductsdto().get(i).getItemNumber(),
					RTVCombinedDto.getRtvProductsdto().get(i).getItemName(),
					RTVCombinedDto.getRtvProductsdto().get(i).getCategory(),
					RTVCombinedDto.getRtvProductsdto().get(i).getColor(),
					RTVCombinedDto.getRtvProductsdto().get(i).getPrice(),
					RTVCombinedDto.getRtvProductsdto().get(i).getSize(),
					RTVCombinedDto.getRtvProductsdto().get(i).getImageData(),
					RTVCombinedDto.getRtvProductsdto().get(i).getStore(),
					RTVCombinedDto.getRtvProductsdto().get(i).getReturnQty(), RTVInfo1));
		}

		rtvProductsRepo.saveAll(rtvProducts);
		return "Products saved successfully";
	}

	// Function to get RTV list
	@Override
	public ReturnToVendorCombinedDto getRTVProducts(int rtvId) {
		ReturnToVendorCombinedDto RTvCombinedDto = new ReturnToVendorCombinedDto();
		ReturnToVendorInfo RTVInfo = rtvInfoRepo.findByrtvId(rtvId);

		ReturnToVendorInfodto ReturnToVendorInfodto = new ReturnToVendorInfodto(RTVInfo.getPoNumber(),
				RTVInfo.getSupplierId(), RTVInfo.getSupplierName(), RTVInfo.getDate());

		RTvCombinedDto.setRtvInfodto(ReturnToVendorInfodto);

		List<ReturnToVendorProducts> rtvProducts = rtvProductsRepo.findByrtvInfo(RTVInfo);
		List<ReturnToVendorProductsdto> rtvProductsdto = new ArrayList<>();

		for (int i = 0; i < rtvProducts.size(); i++) {
			rtvProductsdto.add(new ReturnToVendorProductsdto(rtvProducts.get(i).getId(),
					rtvProducts.get(i).getItemNumber(), rtvProducts.get(i).getItemName(),
					rtvProducts.get(i).getCategory(), rtvProducts.get(i).getColor(), rtvProducts.get(i).getPrice(),
					rtvProducts.get(i).getSize(), rtvProducts.get(i).getImageData(), rtvProducts.get(i).getStore(),
					rtvProducts.get(i).getReturnQty(), rtvProducts.get(i).getRtvInfo().getRtvId()));
		}

		RTvCombinedDto.setRtvProductsdto(rtvProductsdto);
		System.out.println("RTvCombinedDto : " + RTvCombinedDto);
		return RTvCombinedDto;

	}

	// Function to save RTV data in RTV table
	@Override
	public String saveRTVProcessProducts(ReturnToVendorProcessDto RTVProcessDto) {

		ReturnToVendorProcessInfo RTVProcessInfo = new ReturnToVendorProcessInfo(
				RTVProcessDto.getRtvProcessInfo().getRtvId(), RTVProcessDto.getRtvProcessInfo().getPoNumber(),
				RTVProcessDto.getRtvProcessInfo().getSupplierId(), RTVProcessDto.getRtvProcessInfo().getSupplierName(),
				RTVProcessDto.getRtvProcessInfo().getStatus(), RTVProcessDto.getRtvProcessInfo().getReason(),
				RTVProcessDto.getRtvProcessInfo().getDate());

		rtvProcessInfoRepo.save(RTVProcessInfo);

		ReturnToVendorProcessInfo RTVProcessInfo1 = rtvProcessInfoRepo.findByrtvId(RTVProcessInfo.getRtvId());
		List<ReturnToVendorProcessProducts> rtvProcessProducts = new ArrayList<>();
		for (int i = 0; i < RTVProcessDto.getRtvProcessProducts().size(); i++) {
			rtvProcessProducts
					.add(new ReturnToVendorProcessProducts(RTVProcessDto.getRtvProcessProducts().get(i).getItemNumber(),
							RTVProcessDto.getRtvProcessProducts().get(i).getItemName(),
							RTVProcessDto.getRtvProcessProducts().get(i).getCategory(),
							RTVProcessDto.getRtvProcessProducts().get(i).getColor(),
							RTVProcessDto.getRtvProcessProducts().get(i).getPrice(),
							RTVProcessDto.getRtvProcessProducts().get(i).getSize(),
							RTVProcessDto.getRtvProcessProducts().get(i).getImageData(),
							RTVProcessDto.getRtvProcessProducts().get(i).getStore(),
							RTVProcessDto.getRtvProcessProducts().get(i).getReturnQty(), RTVProcessInfo1));
		}

		rtvProcessProductsRepo.saveAll(rtvProcessProducts);
		return "Products saved successfully";
	}

	// Function to get RTV list from Master process table
	@Override
	public List<ReturnToVendorProcessProducts> getRTVProcessProducts(String rtvId) {

		ReturnToVendorProcessInfo RTVinfo = rtvProcessInfoRepo.findByrtvId(rtvId);
		List<ReturnToVendorProcessProducts> products = rtvProcessProductsRepo.findByrtvProcessInfo(RTVinfo);
		return products;

	}

	// Function to get all RTV
	@Override
	public List<ReturnToVendorProcessInfo> getAllViewVendorReturn() {
		List<ReturnToVendorProcessInfo> RTVProcessInfo = rtvProcessInfoRepo.findAll();
		System.out.println("RTVProcessInfo : " + RTVProcessInfo);
		return RTVProcessInfo;
	}
	@Override
	public List<ReturnToVendorProcessInfo> getMatchedRTVById(String id) {
		List<ReturnToVendorProcessInfo> ReturnToVendor = rtvProcessInfoRepo.findByRtvIdContaining(id);
		return ReturnToVendor;
	}
	
	@Override
	public List<ReturnToVendorProcessInfo> getMatchedRTVBySupplier(String name) {
		List<ReturnToVendorProcessInfo> ReturnToVendor = rtvProcessInfoRepo.findBySupplierNameContaining(name);
		return ReturnToVendor;
	}

}
