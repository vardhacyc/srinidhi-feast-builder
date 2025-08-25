// Centralized configuration for delivery and GST information
// Update these values here to change them across the entire application

export const DELIVERY_CONFIG = {
  // Minimum order amount for free delivery (in INR)
  freeDeliveryAmount: 6000,
  
  // Area where free delivery is available
  deliveryArea: "Coimbatore",
  
  // GST rates for different categories (in percentage)
  gstRates: {
    sweets: 5,
    savouries: 12
  },
  
  // Additional notes and disclaimers
  availabilityNote: "All items are subject to availability.",
  
  // Message templates (for consistency across the app)
  messages: {
    freeDelivery: (amount: number, area: string) => 
      `Free delivery within ${area} for orders above ₹${amount}`,
    
    gstInfo: (sweetRate: number, savouryRate: number) =>
      `GST extra: ${sweetRate}% on Sweets & ${savouryRate}% on Savouries.`,
    
    availability: () => "All items are subject to availability."
  }
};

// Helper function to get formatted delivery message
export const getDeliveryMessage = () => 
  DELIVERY_CONFIG.messages.freeDelivery(
    DELIVERY_CONFIG.freeDeliveryAmount, 
    DELIVERY_CONFIG.deliveryArea
  );

// Helper function to get formatted GST message  
export const getGSTMessage = () =>
  DELIVERY_CONFIG.messages.gstInfo(
    DELIVERY_CONFIG.gstRates.sweets,
    DELIVERY_CONFIG.gstRates.savouries
  );

// Helper function to get availability message
export const getAvailabilityMessage = () =>
  DELIVERY_CONFIG.messages.availability();
