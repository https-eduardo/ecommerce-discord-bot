export interface Payment {
  body: PaymentBody;
}

interface PaymentBody {
  id: number;
  status: string;
  point_of_interaction: PointOfInteraction
}

interface PointOfInteraction {
  transaction_data: PaymentTransactionData;
}

interface PaymentTransactionData {
  qr_code_base64: string;
  qr_code: string;
  ticket_url: string;
}