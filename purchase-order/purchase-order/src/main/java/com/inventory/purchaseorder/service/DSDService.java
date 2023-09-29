
package com.inventory.purchaseorder.service;


import java.util.List;

import com.inventory.purchaseorder.dto.DsdReceiveItemsdto;

public interface DSDService {

	List<DsdReceiveItemsdto> getDsdItems(int id);
	DsdReceiveItemsdto saveDsd(DsdReceiveItemsdto DsdReceiveItemsdto);
}
