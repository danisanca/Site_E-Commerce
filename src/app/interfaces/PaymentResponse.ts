
export interface MercadoPagoResponse {
    collection_id: string;
    collection_status: string;
    payment_id: string;
    status: string;
    external_reference: string;
    payment_type: string;
    merchamt_order_id: string;
    preference_id: string;
    site_id: string;
    processing_mode: string;
    merchant_account_id: string;
}