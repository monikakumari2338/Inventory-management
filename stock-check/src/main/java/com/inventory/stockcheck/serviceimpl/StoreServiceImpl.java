package com.inventory.stockcheck.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.inventory.stockcheck.dto.StoresDto;
import com.inventory.stockcheck.entity.Stores;
import com.inventory.stockcheck.repository.StoreRepo;
import com.inventory.stockcheck.service.StoreService;

@Service
public class StoreServiceImpl implements StoreService{

	@Autowired
	private StoreRepo storeRepo;
	@Override
	public StoresDto save_stores(StoresDto storesDto) {
		Stores stores=new Stores(
			storesDto.getStoreId(),storesDto.getStoreName(),storesDto.getStoreStock(),storesDto.getStoreAddress());
		
		storeRepo.save(stores);
		
		StoresDto storesdto=new StoresDto(stores.getStoreId(), stores.getStoreName(),stores.getStoreStock(),stores.getStoreAddress());
		return storesdto;
	}
	@Override
	public List<Stores> getStores() {
		List<Stores> list=storeRepo.findAll();
		return list;
	}
	@Override
	public String deleteStore(int id) {
		storeRepo.deleteById(id);
		return "Store deleted successfully";
	}
	@Override
	public StoresDto updateStore(int id, StoresDto storesDto) {
		Stores store =storeRepo.findById(id).get();
		
	    store.setStoreName(storesDto.getStoreName());
	    store.setStoreStock(storesDto.getStoreStock());
	    store.setStoreAddress(storesDto.getStoreAddress());
			
	    
	    
			Stores storeSaved = storeRepo.save(store);
			storesDto.setStoreId(storeSaved.getStoreId());
			storesDto.setStoreName(storeSaved.getStoreName());
			storesDto.setStoreAddress(storeSaved.getStoreAddress());
			storesDto.setStoreStock(storeSaved.getStoreStock());

			return storesDto;
	}
	
	
	

}
