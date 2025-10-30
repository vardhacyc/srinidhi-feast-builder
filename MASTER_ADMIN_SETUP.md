# Master Admin Setup Guide

## 🛡️ Master Admin System

A complete master admin system has been created with full feature parity to the regular admin system, with enhanced security and distinct branding.

## 📁 Files Created/Modified

### New Files:
1. **`src/pages/MasterAdminLogin.tsx`** - Master admin login page
2. **`src/pages/MasterAdminDashboard.tsx`** - Master admin dashboard (full copy of AdminDashboard)

### Modified Files:
1. **`src/lib/supabase.ts`** - Added `isMasterAdmin()` function
2. **`src/App.tsx`** - Added master admin routes

## 🔐 Authentication

### Auth Service Update
Added new function to check master admin privileges:

```typescript
async isMasterAdmin() {
  try {
    const user = await this.getCurrentUser();
    if (!user) return false;

    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (error) return false;
    return data?.role === 'master_admin';
  } catch {
    return false;
  }
}
```

## 🌐 Routes

### New Routes Added:
- **`/master-admin-login`** - Master admin login page
- **`/master-admin`** - Master admin dashboard

## 🎨 Branding Differences

### Master Admin Login:
- **Color Scheme**: Purple/Indigo gradient (vs Amber/Orange for regular admin)
- **Title**: "Master Admin Login"
- **Subtitle**: "Super admin access - Full control dashboard"
- **Shield Icon**: Added to logo indicating elevated privileges
- **Button**: Purple gradient with Shield icon

### Master Admin Dashboard:
- **Header Title**: 🛡️ Master Admin Dashboard (with purple gradient text)
- **Subtitle**: "Full system control & order management"
- **Access Check**: Uses `isMasterAdmin()` instead of `isAdmin()`

## ✨ Features

Both admin systems have **complete feature parity**:

### Dashboard Features:
- ✅ Real-time order management
- ✅ Auto-refresh with live updates
- ✅ Order status management (New Order, Preparing, Delivered, Cancelled)
- ✅ Payment status tracking (Pending, Paid)
- ✅ Time range filters (Last 30 mins, 1 hour, 1 day, All)
- ✅ Bulk actions (Mark Processing, Mark Completed, Print Orders, Export Selected)
- ✅ Individual order actions:
  - WhatsApp messaging
  - Payment reminders (for New Order/Preparing status only)
  - Print order
  - Download order
  - View details
  - Delete order
- ✅ Order statistics dashboard
- ✅ Search and filter capabilities
- ✅ Bulk order sheet printing
- ✅ CSV export functionality

## 🗄️ Database Setup Required

You need to add master admin role to the `user_roles` table:

```sql
-- Add master_admin role to a user
INSERT INTO user_roles (user_id, role)
VALUES ('your-user-id-here', 'master_admin')
ON CONFLICT (user_id) 
DO UPDATE SET role = 'master_admin';
```

## 🔒 Security

- Master admin has separate authentication flow
- Different role check (`master_admin` vs `admin`)
- Separate login page with distinct branding
- Separate dashboard route
- Both systems are fully isolated

## 🚀 Usage

### For Master Admin:
1. Navigate to `/master-admin-login`
2. Enter master admin credentials
3. Access full control dashboard at `/master-admin`

### For Regular Admin:
1. Navigate to `/admin-login`
2. Enter admin credentials
3. Access orders dashboard at `/admin`

## 💡 Navigation

### Master Admin Login Page:
- Button to "Regular Admin Login" → `/admin-login`
- Button to "Back to Diwali Store" → `/diwali`

### Regular Admin Login Page:
- Button to "Back to Diwali Store" → `/diwali`

## 🎯 Next Steps

1. **Create master admin user** in Supabase
2. **Test master admin login** at `/master-admin-login`
3. **Verify access controls** work correctly
4. **Customize master admin features** if needed (both dashboards are identical currently)

## 📝 Notes

- Both admin systems share the same order database
- Master admin can see all orders just like regular admin
- Future enhancement: Add user management features exclusive to master admin
- Future enhancement: Add system settings exclusive to master admin
- Future enhancement: Add analytics and reporting exclusive to master admin
