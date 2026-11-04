/* Contrato de dados para a futura API do painel do vendedor. */
window.NexaSellerModel = {
  commissionRate: 0.1,
  listingStatuses: ['active', 'paused', 'sold'],
  listing: ['sellerId', 'name', 'category', 'platform', 'description', 'priceInCents', 'imageUrls', 'accountInfo', 'status'],
  sale: ['orderId', 'listingId', 'buyerId', 'grossAmountInCents', 'commissionInCents', 'netAmountInCents', 'paymentStatus', 'deliveryStatus', 'createdAt'],
  sellerProfile: ['sellerId', 'storeName', 'avatarUrl', 'description', 'contact', 'payoutSettings']
};
