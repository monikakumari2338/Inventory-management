package com.inventory.purchaseorder.dto;

public class TransferReceiveInfodto {

	private int transfer_id;
	private int storeFrom;
	private int storeTo;
	private int asn_id;

	public int getTransfer_id() {
		return transfer_id;
	}

	public void setTransfer_id(int transfer_id) {
		this.transfer_id = transfer_id;
	}

	public int getStoreFrom() {
		return storeFrom;
	}

	public void setStoreFrom(int storeFrom) {
		this.storeFrom = storeFrom;
	}

	public int getStoreTo() {
		return storeTo;
	}

	public void setStoreTo(int storeTo) {
		this.storeTo = storeTo;
	}

	public int getAsn_id() {
		return asn_id;
	}

	public void setAsn_id(int asn_id) {
		this.asn_id = asn_id;
	}

	public TransferReceiveInfodto(int transfer_id, int storeFrom, int storeTo, int asn_id) {
		super();
		this.transfer_id = transfer_id;
		this.storeFrom = storeFrom;
		this.storeTo = storeTo;
		this.asn_id = asn_id;
	}

	@Override
	public String toString() {
		return "TransferReceiveInfo [storeFrom=" + storeFrom + ", storeTo=" + storeTo + ", asn=" + asn_id + "]";
	}

	public TransferReceiveInfodto() {
		super();
		// TODO Auto-generated constructor stub
	}

}
