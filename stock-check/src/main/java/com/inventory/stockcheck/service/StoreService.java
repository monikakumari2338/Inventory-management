package com.inventory.stockcheck.service;

import java.util.List;

import com.inventory.stockcheck.dto.StoresDto;
import com.inventory.stockcheck.entity.Stores;

public interface StoreService {

	StoresDto save_stores(StoresDto storesDto);
	List<Stores> getStores();
	String deleteStore(int id);
	StoresDto updateStore(int id, StoresDto storesDto);
}
