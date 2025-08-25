# Delivery and GST Configuration

This file contains centralized configuration for delivery terms and GST information used across the Sri Nidhi Diwali website.

## 📝 Configuration File Location

`src/config/deliveryConfig.ts`

## 🛠 How to Update Values

To change delivery or GST information, simply edit the values in `DELIVERY_CONFIG`:

```typescript
export const DELIVERY_CONFIG = {
  // Update minimum order amount for free delivery
  freeDeliveryAmount: 6000,  // Change this number
  
  // Update delivery area
  deliveryArea: "Coimbatore",  // Change this city/area
  
  // Update GST rates
  gstRates: {
    sweets: 5,      // Change GST % for sweets
    savouries: 12   // Change GST % for savouries
  },
  
  // Update disclaimer text
  availabilityNote: "All items are subject to availability."
};
```

## 📍 Where These Values Are Used

- **DiwaliHero.tsx**: Main hero section with delivery/GST info banner
- **DiwaliFooter.tsx**: Footer delivery information
- Any future components that need delivery/GST info

## 🔄 Adding New Fields

To add new configurable fields:

1. Add the field to `DELIVERY_CONFIG`
2. Create a helper function if needed
3. Export it from the config file
4. Import and use in components

## ✅ Benefits

- **Single source of truth**: Update once, changes everywhere
- **Easy maintenance**: No need to search through multiple files
- **Type safety**: TypeScript ensures correct usage
- **Consistency**: All components use the same values
