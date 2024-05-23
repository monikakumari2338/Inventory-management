package com.inventory.purchaseorder.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inventory.purchaseorder.entity.RTV;

public interface ReturnTovendorInfoRepo extends JpaRepository<RTV, Integer> {

	RTV findByrtvId(String id);

}
