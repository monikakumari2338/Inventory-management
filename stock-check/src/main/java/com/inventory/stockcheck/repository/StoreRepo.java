package com.inventory.stockcheck.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.inventory.stockcheck.entity.Stores;

public interface StoreRepo extends JpaRepository<Stores, Integer> {
	
	Stores findByStoreId(int storeId);

}
