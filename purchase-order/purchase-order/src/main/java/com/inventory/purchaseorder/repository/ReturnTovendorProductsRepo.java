package com.inventory.purchaseorder.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.purchaseorder.entity.RTV;
import com.inventory.purchaseorder.entity.RTVProducts;

public interface ReturnTovendorProductsRepo extends JpaRepository<RTVProducts, Integer> {

	List<RTVProducts> findByRtv(RTV rTVInfo);

}
